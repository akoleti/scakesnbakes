import React from "react";
import { useRouter } from "next/router";
import Meta from "components/Meta";
import OrderSection from "components/OrderSection";

function OrderPage(props) {
  const router = useRouter();
  const product = typeof router.query.product === "string" ? router.query.product : "";
  const details = typeof router.query.details === "string" ? router.query.details : "";

  return (
    <>
      <Meta
        title="Order Now"
        description="Place an order for cakes, cupcakes, cake pops, and more from Sravs Signature Bakes."
      />
      <OrderSection
        title="Place an order"
        subtitle="Tell us what you'd like and when you need it. We'll confirm availability and pricing."
        strapline="Order now"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
        defaultProduct={product}
        defaultDetails={details}
      />
    </>
  );
}

export default OrderPage;
