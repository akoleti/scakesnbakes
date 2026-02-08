const { Pool } = require("pg");

const DATABASE_URL = process.env.DATABASE_URL || process.env.POSTGRES_URL;

let pool = null;

function getPool() {
  if (!DATABASE_URL) return null;
  if (!pool) {
    pool = new Pool({
      connectionString: DATABASE_URL,
      ssl: DATABASE_URL.includes("sslmode=require") || DATABASE_URL.includes("ssl=true") ? { rejectUnauthorized: false } : undefined,
    });
  }
  return pool;
}

const CREATE_TABLE_SQL = `
  CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    type VARCHAR(20) NOT NULL DEFAULT 'contact',
    name TEXT,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    message TEXT,
    product_type TEXT,
    quantity_or_size TEXT,
    date_needed TEXT,
    dietary TEXT,
    image_filename TEXT,
    image_data BYTEA,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  );
`;

async function ensureTable(client) {
  await client.query(CREATE_TABLE_SQL);
}

/**
 * Create the submissions table if it doesn't exist. Use this to init DB without submitting a form.
 * @returns {Promise<{ ok: boolean, error?: string }>}
 */
async function initDb() {
  const p = getPool();
  if (!p) {
    return { ok: false, error: "DATABASE_URL (or POSTGRES_URL) is not set" };
  }
  const client = await p.connect();
  try {
    await ensureTable(client);
    return { ok: true };
  } catch (err) {
    return { ok: false, error: err.message };
  } finally {
    client.release();
  }
}

/**
 * Saves a contact or order submission to the database.
 * @param {Object} record - { type, name, email, phone, subject, message, product_type?, quantity_or_size?, date_needed?, dietary?, image_filename?, image_base64? }
 * @returns {Promise<{ id: number } | null>} - Inserted row id or null if DB not configured
 */
async function saveSubmission(record) {
  const p = getPool();
  if (!p) return null;

  const client = await p.connect();
  try {
    await ensureTable(client);
    const type = record.type === "order" ? "order" : "contact";
    let imageBuffer = null;
    if (record.image_base64 && typeof record.image_base64 === "string") {
      try {
        imageBuffer = Buffer.from(record.image_base64, "base64");
      } catch (_) {}
    }
    const res = await client.query(
      `INSERT INTO submissions (
        type, name, email, phone, subject, message,
        product_type, quantity_or_size, date_needed, dietary,
        image_filename, image_data
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
      RETURNING id`,
      [
        type,
        record.name || null,
        record.email || null,
        record.phone || null,
        record.subject || null,
        record.message || null,
        record.product_type || null,
        record.quantity_or_size || null,
        record.date_needed || null,
        record.dietary || null,
        record.image_filename || null,
        imageBuffer,
      ]
    );
    return res.rows[0] ? { id: res.rows[0].id } : null;
  } finally {
    client.release();
  }
}

module.exports = { getPool, saveSubmission, initDb, CREATE_TABLE_SQL };
