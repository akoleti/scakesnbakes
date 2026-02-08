import nodemailer from "nodemailer";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL;
const SMTP_HOST = process.env.SMTP_HOST;
const SMTP_PORT = parseInt(process.env.SMTP_PORT || "587", 10);
const SMTP_SECURE = process.env.SMTP_SECURE === "true" || SMTP_PORT === 465;
const SMTP_USER = process.env.SMTP_USER;
const SMTP_PASS = process.env.SMTP_PASS;
const FROM_EMAIL = process.env.FROM_EMAIL || process.env.SMTP_FROM || CONTACT_EMAIL;

const SENDFOX_ACCESS_TOKEN = process.env.SENDFOX_ACCESS_TOKEN;
const SENDFOX_LIST_IDS = process.env.SENDFOX_LIST_ID
  ? [parseInt(process.env.SENDFOX_LIST_ID, 10)].filter((n) => !Number.isNaN(n))
  : [];

export const config = {
  api: { bodyParser: { sizeLimit: "4mb" } },
};

function getTransporter() {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_SECURE,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });
}

async function addContactToSendFox(email, firstName, message, phone, subject) {
  const contactFields = [
    { name: "message", value: message || "" },
    ...(phone ? [{ name: "phone", value: phone }] : []),
    ...(subject ? [{ name: "subject", value: subject }] : []),
  ];
  const body = {
    email,
    first_name: firstName || "",
    contact_fields: contactFields,
  };
  if (SENDFOX_LIST_IDS.length > 0) {
    body.lists = SENDFOX_LIST_IDS;
  }
  const res = await fetch("https://api.sendfox.com/contacts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SENDFOX_ACCESS_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.message || data?.error || res.statusText || "SendFox request failed";
    throw new Error(msg);
  }
  return data;
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "error", code: "METHOD_NOT_ALLOWED", message: "Method not allowed" });
  }

  const {
    name = "",
    email = "",
    message = "",
    phone = "",
    subject: enquiryType = "",
    imageBase64 = "",
    imageFilename = "",
    product_type: productType = "",
    quantity_or_size: quantityOrSize = "",
    date_needed: dateNeeded = "",
    dietary = "",
  } = req.body || {};
  const trimmedName = String(name).trim();
  const trimmedEmail = String(email).trim();
  const trimmedMessage = String(message).trim();
  const trimmedPhone = String(phone).trim();
  const trimmedSubject = String(enquiryType).trim();
  const hasImage = Boolean(imageBase64 && typeof imageBase64 === "string" && imageBase64.length > 0);
  const trimmedImageFilename = String(imageFilename).trim() || "reference-image";
  const isOrder = trimmedSubject === "Order";

  if (!trimmedEmail) {
    return res.status(400).json({
      status: "error",
      code: "VALIDATION",
      message: "Please enter an email address.",
    });
  }

  const useSendFox = Boolean(SENDFOX_ACCESS_TOKEN);
  const transporter = getTransporter();
  const useEmail = Boolean(CONTACT_EMAIL && transporter);

  if (!useSendFox && !useEmail) {
    return res.status(500).json({
      status: "error",
      code: "CONFIG",
      message: "Contact form is not configured. Set CONTACT_EMAIL and SMTP_* (or SENDFOX_ACCESS_TOKEN) in your hosting environment (e.g. Vercel Environment Variables).",
    });
  }

  const errors = [];

  try {
    const { saveSubmission } = require("../../lib/db");
    await saveSubmission({
      type: isOrder ? "order" : "contact",
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      subject: trimmedSubject,
      message: trimmedMessage,
      product_type: String(productType || "").trim() || null,
      quantity_or_size: String(quantityOrSize || "").trim() || null,
      date_needed: String(dateNeeded || "").trim() || null,
      dietary: String(dietary || "").trim() || null,
      image_filename: hasImage ? trimmedImageFilename : null,
      image_base64: hasImage ? imageBase64 : null,
    });
  } catch (dbErr) {
    console.error("Database save error:", dbErr);
  }

  if (useSendFox) {
    try {
      const namePart = trimmedName.split(/\s+/);
      const firstName = namePart[0] || "";
      await addContactToSendFox(trimmedEmail, firstName, trimmedMessage, trimmedPhone, trimmedSubject);
    } catch (err) {
      console.error("SendFox contact error:", err);
      errors.push({ source: "SendFox", message: err.message });
    }
  }

  if (useEmail) {
    const isResend = SMTP_HOST && String(SMTP_HOST).includes("resend");
    const unverifiedDomains = /@(gmail|yahoo|outlook|hotmail|live|icloud|aol)\.(com|co\.uk|net)$/i;
    const fromCandidate = FROM_EMAIL || (isResend ? "onboarding@resend.dev" : CONTACT_EMAIL);
    const fromAddress = isResend && unverifiedDomains.test(String(fromCandidate).trim())
      ? "onboarding@resend.dev"
      : fromCandidate;
    const attachments = [];
    if (hasImage) {
      try {
        const buffer = Buffer.from(imageBase64, "base64");
        if (buffer.length > 0) {
          attachments.push({
            filename: trimmedImageFilename.replace(/[^a-zA-Z0-9.-]/g, "_") + (trimmedImageFilename.includes(".") ? "" : ".jpg"),
            content: buffer,
          });
        }
      } catch (e) {
        console.error("Contact form image decode error:", e);
      }
    }
    const mailOptions = {
      from: `Sravs Signature Bakes Contact <${fromAddress}>`,
      to: CONTACT_EMAIL,
      replyTo: trimmedEmail,
      subject: trimmedSubject
        ? `[${trimmedSubject}] ${trimmedName || "Contact form"} – Sravs Signature Bakes`
        : `New message from ${trimmedName || "Contact form"} – Sravs Signature Bakes`,
      attachments: attachments.length > 0 ? attachments : undefined,
      text: [
        "Hello,",
        "",
        "You have a new message from your website contact form.",
        "",
        `From: ${trimmedName || "—"} <${trimmedEmail}>`,
        ...(trimmedPhone ? [`Phone: ${trimmedPhone}`, ""] : []),
        ...(trimmedSubject ? [`Enquiry type: ${trimmedSubject}`, ""] : []),
        ...(hasImage ? ["Attachment: reference image", ""] : []),
        "Message:",
        trimmedMessage || "(No message)",
        "",
        "— Sravs Signature Bakes",
      ].join("\n"),
      html: `
        <p>Hello,</p>
        <p>You have a new message from your website contact form.</p>
        <p><strong>From:</strong> ${trimmedName || "—"} &lt;${trimmedEmail}&gt;</p>
        ${trimmedPhone ? `<p><strong>Phone:</strong> ${trimmedPhone}</p>` : ""}
        ${trimmedSubject ? `<p><strong>Enquiry type:</strong> ${trimmedSubject}</p>` : ""}
        ${hasImage ? "<p><strong>Attachment:</strong> reference image</p>" : ""}
        <p><strong>Message:</strong></p>
        <p>${(trimmedMessage || "(No message)").replace(/\n/g, "<br>")}</p>
        <p>— Sravs Signature Bakes</p>
      `,
    };
    try {
      await transporter.sendMail(mailOptions);
    } catch (err) {
      console.error("Contact form send error:", err);
      errors.push({ source: "Email", message: err.message });
    }
  }

  if (errors.length > 0) {
    const allFailed = errors.length === (useSendFox ? 1 : 0) + (useEmail ? 1 : 0);
    return res.status(allFailed ? 500 : 200).json({
      status: "error",
      code: "SEND_FAILED",
      message: errors.map((e) => `${e.source}: ${e.message}`).join("; "),
    });
  }

  return res.status(200).json({ data: { ok: true } });
}
