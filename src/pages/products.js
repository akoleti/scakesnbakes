import React from "react";
import Meta from "components/Meta";
import Products from "components/Products";

function ProductsPage(props) {
  return (
    <>
      <Meta title="Products" />
      <Products
        title="Meet our amazing Products"
        subtitle="Home Baked with Love"
        strapline="your "
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
