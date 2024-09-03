import React from "react";
import Meta from "components/Meta";
import ContactSection from "components/ContactSection";

function OrderPage(props) {
  return (
    <>
      <Meta title="Order" />
      <ContactSection
        title="Get in touch"
        subtitle="If something does not make sense, feel free to contact us and we will get back to you as soon as possible."
        strapline="We reply in 24hrs"
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
