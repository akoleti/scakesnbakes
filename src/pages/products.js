import React from "react";
import Meta from "components/Meta";
import Products from "components/Products";

function ProductsPage(props) {
  return (
    <>
      <Meta title="Products" description="Cakes, cupcakes, bread loaves, brownies, cookies, birthday orders, custom cakes, cupcake bouquets." />
      <Products
        title="Our Products"
        subtitle="Cakes, cupcakes, bread loaves, brownies, cookies, birthday party orders, custom cakes, and cupcake bouquets—all baked with love."
        strapline="Fresh from our kitchen"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default ProductsPage;
