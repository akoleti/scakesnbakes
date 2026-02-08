import React from "react";
import {
  HeartIcon,
  FireIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/solid";
import Meta from "components/Meta";
import HeroSection2 from "components/HeroSection2";
import StatsSection from "components/StatsSection";
import Products from "components/Products";

const ABOUT_ITEMS = [
  {
    title: "Made with care",
    description:
      "Every cake, cupcake, and treat is baked with attention to detail. We take pride in making your celebrations and everyday moments a little sweeter.",
    icon: HeartIcon,
    iconColor: "text-red-500",
  },
  {
    title: "Fresh ingredients",
    description:
      "We use quality ingredients and bake to order so you get the freshest cakes, themed treats, tiramisu, dessert cups, and custom creations.",
    icon: FireIcon,
    iconColor: "text-amber-500",
  },
  {
    title: "Made to order",
    description:
      "From custom cakes and themed birthday cakes to cupcake bouquets and party spreads—tell us what you need and we'll make it special for you.",
    icon: CheckCircleIcon,
    iconColor: "text-green-600",
  },
];

const ABOUT_STATS = [
  { title: "Orders fulfilled", count: "500+" },
  { title: "Treats baked", count: "5k+" },
  { title: "Happy customers", count: "100%" },
];

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about Sravs Signature Bakes—cakes, cupcakes, cake pops, themed orders, custom cakes, and more. Fresh-baked with care." />
      <HeroSection2
        title={
          <>
            We are <span className="font-script text-4xl">Sravs</span>{" "}
            <span className="font-serif font-light">Signature Bakes</span>
          </>
        }
        subtitle="A small bakery dedicated to cakes, cupcakes, cake pops, themed birthday cakes, tiramisu, dessert cups, cookies, custom cakes, and cupcake bouquets—all made fresh with care."
        strapline="Our story"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
        leftImage="/products/sravs-bakes-19.jpeg"
        rightImage="/products/sravs-bakes-01.jpeg"
        items={ABOUT_ITEMS}
        showTopIcon={false}
      />
      <StatsSection
        title="Baked fresh for you"
        subtitle="We focus on quality ingredients, careful baking, and making every order special—whether it’s a single treat or a full party spread."
        strapline="Our promise"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
        stats={ABOUT_STATS}
      />
      <Products
        title="What we offer"
        subtitle="Cakes, cupcakes, cake pops, themed birthday cakes, tiramisu, dessert cups, cookies, custom cakes, cupcake bouquets, and more. Browse and order what you love."
        strapline=""
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default AboutPage;
