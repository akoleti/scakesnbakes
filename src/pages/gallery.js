import React from "react";
import Meta from "components/Meta";
import Gallery from "components/Gallery";

function GalleryPage(props) {
  return (
    <>
      <Meta
        title="Gallery"
        description="See our custom cakes, themed birthday cakes, cupcakes, cookies, tiramisu, and more from Sravs Signature Bakes."
      />
      <Gallery
        title="Our Gallery"
        subtitle="Custom birthday cakes, themed cupcakes, frosted cookies, tiramisu, and more—all made to order."
        strapline="From our kitchen"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default GalleryPage;
