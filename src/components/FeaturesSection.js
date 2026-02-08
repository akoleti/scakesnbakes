import React, { useState } from "react";
import Image from "next/image";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import ImageLightbox from "components/ImageLightbox";

function FeaturesSection(props) {
  const [lightbox, setLightbox] = useState({ src: null, alt: null, orderHref: "/order" });
  const features = [
    {
      title: "Cakes",
      description:
        "Layer cakes, sheet cakes, and round cakes for any occasion. Moist, flavorful, and beautifully finished.",
      image: "/products/sravs-bakes-33.jpeg",
    },
    {
      title: "Cupcakes",
      description:
        "Classic and gourmet cupcakes in a variety of flavors and frostings. Perfect for parties and gifts.",
      image: "/products/sravs-bakes-36.jpeg",
    },
    {
      title: "Cake Pops",
      description:
        "Individually wrapped cake pops in assorted flavors and colors. Perfect for party favors and sweet gifts.",
      image: "/products/sravs-bakes-31.jpeg",
    },
    {
      title: "Themed Birthday Cakes",
      description:
        "Kids’ themes, characters, and personalized designs. We bring your birthday vision to life.",
      image: "/products/sravs-bakes-03.jpeg",
    },
    {
      title: "Themed Cupcake Sets",
      description:
        "Cupcake sets that match your cake or party theme. Coordinated flavors and designs for a polished look.",
      image: "/products/sravs-bakes-04.jpeg",
    },
    {
      title: "Tiramisu & Layer Cakes",
      description:
        "Signature mocha tiramisu and chocolate layer cakes. Elegant and indulgent for any celebration.",
      image: "/products/sravs-bakes-34.jpeg",
    },
    {
      title: "Dessert Cups & Parfaits",
      description:
        "Layered fruit parfaits and mini dessert cups. Perfect individual portions for events and catering.",
      image: "/products/sravs-bakes-35.jpeg",
    },
    {
      title: "Bread Loaves",
      description:
        "Fresh-baked bread loaves—white, whole wheat, sourdough, and more. Great for breakfast or dinner.",
      image: "/products/sravs-bakes-11.jpeg",
    },
    {
      title: "Brownies",
      description:
        "Fudgy, chewy brownies and blondies. Plain, nutty, or swirled—order by the pan or by the dozen.",
      image: "/products/sravs-bakes-07.jpeg",
    },
    {
      title: "Cookies",
      description:
        "Butter cookies, chocolate chip, frosted swirl, and seasonal varieties. Ideal for cookie trays and favors.",
      image: "/products/sravs-bakes-02.jpeg",
    },
    {
      title: "Birthday Party Orders",
      description:
        "Full dessert spreads for birthday parties: cakes, cupcakes, cookies, and more, all coordinated for your theme.",
      image: "/products/sravs-bakes-03.jpeg",
    },
    {
      title: "Custom Cakes",
      description:
        "One-of-a-kind cakes designed for you. Tell us your theme, flavors, and size—we’ll bring your vision to life.",
      image: "/products/sravs-bakes-01.jpeg",
    },
    {
      title: "Cupcake Bouquets",
      description:
        "Cupcakes arranged like a bouquet—perfect as a gift or centerpiece. Choose flavors and colors to match the occasion.",
      image: "/products/sravs-bakes-30.jpeg",
    },
  ];

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="space-y-16 container">
        <SectionHeader
          title={props.title}
          subtitle={props.subtitle}
          strapline={props.strapline}
          className="text-center"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => {
            const orderHref = `/order?product=${encodeURIComponent(feature.title)}&details=${encodeURIComponent(feature.description.slice(0, 80) + (feature.description.length > 80 ? "…" : ""))}`;
            return (
              <div
                className="group text-center"
                key={index}
              >
                <button
                  type="button"
                  onClick={() => setLightbox({ src: feature.image, alt: feature.title, orderHref })}
                  className="relative overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 aspect-square w-full max-w-xs mx-auto mb-4 block cursor-zoom-in focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 text-left"
                  aria-label={`View ${feature.title} and order`}
                >
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover transition duration-200 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </button>
                <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        <ImageLightbox
          src={lightbox.src}
          alt={lightbox.alt}
          orderHref={lightbox.orderHref}
          onClose={() => setLightbox({ src: null, alt: null, orderHref: "/order" })}
        />
      </div>
    </Section>
  );
}

export default FeaturesSection;
