import React from "react";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

const GALLERY_IMAGES = Array.from({ length: 37 }, (_, i) => ({
  src: `/products/sravs-bakes-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Sravs Signature Bakes – creation ${i + 1}`,
}));

function Gallery(props) {
  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="space-y-12 container">
        <SectionHeader
          title={props.title || "Gallery"}
          subtitle={props.subtitle || "A taste of what we bake—custom cakes, themed treats, and more."}
          strapline={props.strapline || "From our kitchen"}
          className="text-center"
        />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5">
          {GALLERY_IMAGES.map((img, index) => (
            <div
              key={index}
              className="relative aspect-square rounded-xl overflow-hidden bg-muted group shadow-lg ring-1 ring-black/5"
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Gallery;
