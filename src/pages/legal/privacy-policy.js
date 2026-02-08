import React from "react";
import Link from "next/link";
import Meta from "components/Meta";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function PrivacyPolicyPage() {
  return (
    <>
      <Meta
        title="Privacy Policy"
        description="Privacy policy for Sravs Signature Bakes—how we collect, use, and protect your information."
      />
      <Section size="md" bgColor="bg-white" textColor="">
        <div className="container max-w-3xl">
          <SectionHeader
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your personal information."
            strapline="Legal"
            className="text-center mb-12"
          />
          <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last updated: February 2025</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Who We Are</h2>
            <p>
              Sravs Signature Bakes (“we”, “us”, “our”) operates this website and provides bakery and order services. This policy describes how we handle your personal data.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Information We Collect</h2>
            <p>
              We may collect information you give us when you contact us or place an order, such as name, email, phone number, delivery/pickup address, and order details. We may also collect technical data (e.g., IP address, browser type) when you use our website.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. How We Use It</h2>
            <p>
              We use your information to process orders, communicate with you about your order, respond to enquiries, and improve our services. We do not sell your personal information to third parties.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Sharing</h2>
            <p>
              We may share your information only as needed with service providers (e.g., payment or delivery) or if required by law. We do not share your data for marketing by other companies.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Security</h2>
            <p>
              We take reasonable steps to protect your personal information. No method of transmission or storage is 100% secure; we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Your Rights</h2>
            <p>
              Depending on where you live, you may have the right to access, correct, or delete your personal data, or to object to or restrict certain processing. Contact us using our{" "}
              <Link href="/contact" legacyBehavior passHref>
                <a className="text-primary font-medium hover:underline">Contact</a>
              </Link>{" "}
              page to make a request.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Cookies & Analytics</h2>
            <p>
              Our website may use cookies or similar technologies for operation and analytics. You can adjust your browser settings to limit or block cookies.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Changes</h2>
            <p>
              We may update this privacy policy from time to time. The “Last updated” date at the top will change when we do. We encourage you to review this page periodically.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">9. Contact</h2>
            <p>
              For privacy-related questions or requests, please use our{" "}
              <Link href="/contact" legacyBehavior passHref>
                <a className="text-primary font-medium hover:underline">Contact</a>
              </Link>{" "}
              page.
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}

export default PrivacyPolicyPage;
