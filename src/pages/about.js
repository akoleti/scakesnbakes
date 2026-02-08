import React from "react";
import Meta from "components/Meta";
import HeroSection2 from "components/HeroSection2";
import StatsSection from "components/StatsSection";
import Products from "components/Products";

function AboutPage(props) {
  return (
    <>
      <Meta title="About" description="Learn about Sravs Signature Bakes—cakes, cupcakes, bread, brownies, cookies, and custom orders." />
      <HeroSection2
        title={
          <>
            We are <span className="font-script text-4xl">Sravs</span>{" "}
            <span className="font-serif font-light">Signature Bakes</span>
          </>
        }
        subtitle="A small bakery dedicated to cakes, cupcakes, bread loaves, brownies, cookies, birthday party orders, custom cakes, and cupcake bouquets—all made fresh with care."
        strapline=""
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
        leftImage="https://images.unsplash.com/photo-1578985545062-69986b85fde8?crop=entropy&fit=crop&h=800&w=1280"
        rightImage="https://images.unsplash.com/photo-1488477181946-6428a0291777?crop=entropy&fit=crop&h=800&q=80&w=600"
      />
      <StatsSection
        title="Baked fresh for you"
        subtitle="We focus on quality ingredients, careful baking, and making every order special—whether it’s a single loaf of bread or a full party spread."
        strapline="Our promise"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <Products
        title="What we offer"
        subtitle="Cakes, cupcakes, bread loaves, brownies, cookies, birthday party orders, custom cakes, and cupcake bouquets. Browse and order what you love."
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
