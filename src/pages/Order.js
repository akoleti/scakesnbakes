import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/ContactSection";

function OrderPage(props) {
  return (
    <>
      <Meta
        title="Order Now"
        description="Place an order for cakes, cupcakes, cake pops, and more from Sravs Signature Bakes."
      />
      <ContactSection
        title="Place an order"
        subtitle="Tell us what you’d like—cakes, cupcakes, cake pops, themed orders, or a custom cake. Include item, quantity, date needed, and any dietary needs. We’ll get back to you to confirm details and pricing."
        strapline="Order now"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default OrderPage;
