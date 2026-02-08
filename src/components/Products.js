import React from "react";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

function Products(props) {
  const products = [
    {
      avatar: "/products/sravs-bakes-33.jpeg",
      name: "Cakes",
      role: "Layer, sheet & round cakes",
    },
    {
      avatar: "/products/sravs-bakes-36.jpeg",
      name: "Cupcakes",
      role: "Classic & gourmet flavors",
    },
    {
      avatar: "/products/sravs-bakes-31.jpeg",
      name: "Cake Pops",
      role: "Individually wrapped, assorted flavors",
    },
    {
      avatar: "https://images.unsplash.com/photo-1509440159596-0249088772ff?crop=entropy&fit=crop&h=800&q=80&w=640",
      name: "Bread Loaves",
      role: "Fresh-baked daily",
    },
    {
      avatar: "https://images.unsplash.com/photo-1564355808539-22fda35bed7e?crop=entropy&fit=crop&h=800&q=80&w=640",
      name: "Brownies",
      role: "Fudgy & chewy",
    },
    {
      avatar: "/products/sravs-bakes-02.jpeg",
      name: "Cookies",
      role: "Butter, chocolate chip & frosted swirl",
    },
    {
      avatar: "/products/sravs-bakes-03.jpeg",
      name: "Themed Birthday Cakes",
      role: "Kids' themes, characters & personalized",
    },
    {
      avatar: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?crop=entropy&fit=crop&h=800&q=80&w=640",
      name: "Birthday Party Orders",
      role: "Full dessert spreads",
    },
    {
      avatar: "/products/sravs-bakes-01.jpeg",
      name: "Custom Cakes",
      role: "Made to your design",
    },
    {
      avatar: "/products/sravs-bakes-04.jpeg",
      name: "Themed Cupcake Sets",
      role: "Match your cake theme",
    },
    {
      avatar: "/products/sravs-bakes-34.jpeg",
      name: "Tiramisu & Layer Cakes",
      role: "Signature mocha & chocolate",
    },
    {
      avatar: "/products/sravs-bakes-35.jpeg",
      name: "Dessert Cups & Parfaits",
      role: "Layered fruit & mini desserts",
    },
    {
      avatar: "/products/sravs-bakes-30.jpeg",
      name: "Cupcake Bouquets",
      role: "Gift-ready arrangements",
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
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-16">
          {products.map((product, index) => (
            <Link
              href={`/order?product=${encodeURIComponent(product.name)}&details=${encodeURIComponent(product.role)}`}
              key={index}
              legacyBehavior
              passHref
            >
              <a className="text-center block group">
                <span className="block relative overflow-hidden rounded-xl shadow-lg ring-1 ring-black/5 active:opacity-75 mb-3">
                  <div className="absolute top-0 right-0 w-16 h-16 -mt-8 -mr-8 transform transition ease-out duration-150 rotate-45 scale-0 group-hover:scale-125 bg-white z-10" />
                  <div className="absolute bottom-0 left-0 w-16 h-16 -mb-8 -ml-8 transform transition ease-out duration-150 rotate-45 scale-0 group-hover:scale-125 bg-white z-10" />
                  <img
                    className="rounded-xl object-cover w-full aspect-square transform transition ease-out duration-200 group-hover:scale-105"
                    src={product.avatar}
                    alt={product.name}
                  />
                </span>
                <h4 className="text-xl font-semibold mb-1 text-gray-900 group-hover:text-primary">{product.name}</h4>
                <p className="text-gray-600 font-medium">{product.role}</p>
              </a>
            </Link>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default Products;
