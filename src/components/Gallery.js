import React, { useState } from "react";
import Image from "next/image";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import ImageLightbox from "components/ImageLightbox";

const GALLERY_IMAGES = Array.from({ length: 37 }, (_, i) => ({
  src: `/products/sravs-bakes-${String(i + 1).padStart(2, "0")}.jpeg`,
  alt: `Sravs Signature Bakes – creation ${i + 1}`,
}));

function Gallery(props) {
  const [lightbox, setLightbox] = useState({ src: null, alt: null });

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
            <button
              key={index}
              type="button"
              onClick={() => setLightbox({ src: img.src, alt: img.alt })}
              className="relative aspect-square rounded-xl overflow-hidden bg-muted group shadow-lg ring-1 ring-black/5 text-left cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
              />
            </button>
          ))}
        </div>
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          onClose={() => setLightbox({ src: null, alt: null })}
        />
      </div>
    </Section>
  );
}

export default Gallery;
