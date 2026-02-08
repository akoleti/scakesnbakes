import React from "react";
import Link from "next/link";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Button from "components/Button";

export const PRICING_ITEMS = [
  { name: "Cake", detail: "per lb", price: "$20" },
  { name: "7 Brownie pieces", detail: "", price: "$15" },
  { name: "12 Cupcakes", detail: "", price: "$12" },
  { name: "Bread loaf", detail: "2 lb", price: "$20" },
  { name: "Cupcake", detail: "each", price: "$2" },
  { name: "Mini desserts", detail: "each", price: "$2" },
  { name: "Cupcake bouquet", detail: "7 count", price: "$25" },
];

function PricingSection(props) {
  const showCta = props.showCta !== false;

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="container">
        <SectionHeader
          title={props.title || "Prices"}
          subtitle={props.subtitle || "Our current pricing. Custom cakes and large orders—we'll quote based on your needs."}
          strapline={props.strapline || "Pricing"}
          className="text-center"
        />
        <div className="mx-auto max-w-2xl">
          <ul className="space-y-0 divide-y divide-gray-200 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
            {PRICING_ITEMS.map((item, index) => (
              <li
                key={index}
                className="flex flex-wrap items-center justify-between gap-2 px-5 py-4 sm:px-6"
              >
                <span className="font-medium text-gray-900">
                  {item.name}
                  {item.detail && (
                    <span className="font-normal text-gray-500 ml-1">({item.detail})</span>
                  )}
                </span>
                <span className="text-lg font-semibold text-primary tabular-nums">
                  {item.price}
                </span>
              </li>
            ))}
          </ul>
          {showCta && (
            <p className="mt-6 text-center">
              <Button href="/order" size="lg">
                Order now
              </Button>
            </p>
          )}
        </div>
      </div>
    </Section>
  );
}

export default PricingSection;
