import React from "react";
import Link from "next/link";
import Meta from "components/Meta";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function TermsOfServicePage() {
  return (
    <>
      <Meta
        title="Terms of Service"
        description="Terms of service for Sravs Signature Bakes—orders, payments, and use of our bakery services."
      />
      <Section size="md" bgColor="bg-white" textColor="">
        <div className="container max-w-3xl">
          <SectionHeader
            title="Terms of Service"
            subtitle="Please read these terms before placing an order or using our services."
            strapline="Legal"
            className="text-center mb-12"
          />
          <div className="prose prose-gray max-w-none text-gray-700 space-y-6">
            <p className="text-sm text-gray-500">Last updated: February 2025</p>

            <h2 className="text-xl font-semibold text-foreground mt-8">1. Agreement</h2>
            <p>
              By placing an order or using the website and services of Sravs Signature Bakes (“we”, “us”, “our”), you agree to these Terms of Service. If you do not agree, please do not use our services.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">2. Orders</h2>
            <p>
              Orders are subject to availability. We reserve the right to refuse or cancel an order. Custom and themed orders may require advance notice; we will confirm timing when you contact us. You are responsible for providing accurate contact and delivery/pickup details.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">3. Payment & Pricing</h2>
            <p>
              Prices are as quoted at the time of order. We will confirm the total before payment. Payment terms (e.g., deposit, full payment) will be agreed when you place your order. All amounts are in the currency we specify (e.g., local currency).
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">4. Cancellation & Refunds</h2>
            <p>
              Cancellation and refund policies depend on the type of order and how close it is to the delivery/pickup date. We will confirm our policy when you order. Custom or large orders may have different cancellation terms.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">5. Allergens & Dietary Information</h2>
            <p>
              Our products may contain or come into contact with allergens (e.g., gluten, nuts, dairy). Please inform us of any allergies or dietary requirements when ordering. We will do our best to accommodate but cannot guarantee an allergen-free environment.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">6. Use of Website</h2>
            <p>
              You may use this website only for lawful purposes. You may not misuse the site, attempt to gain unauthorized access, or use our content (text, images, logos) without permission.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">7. Changes</h2>
            <p>
              We may update these terms from time to time. The “Last updated” date at the top will change when we do. Continued use of our services after changes means you accept the updated terms.
            </p>

            <h2 className="text-xl font-semibold text-foreground mt-8">8. Contact</h2>
            <p>
              For questions about these terms, please use our{" "}
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

export default TermsOfServicePage;
