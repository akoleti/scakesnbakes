import React from "react";
import Meta from "components/Meta";
import HeroSection from "components/HeroSection";
import FeaturesSection from "components/FeaturesSection";
import StatsSection2 from "components/StatsSection2";
import TestimonialsSection from "components/TestimonialsSection";

function IndexPage(props) {
  return (
    <>
      <Meta />
      <HeroSection
        title="Cakes, Cupcakes & Sweet Treats Made with Love"
        subtitle="Custom cakes, themed birthday cakes, cupcakes, cake pops, tiramisu, dessert cups, cookies, and more—all made to order. Order your party desserts, cupcake bouquets, or a custom cake today."
        strapline="Fresh from our kitchen"
        size="lg"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <FeaturesSection
        title="What We Bake"
        subtitle="Cakes, themed birthday cakes, cupcakes, cake pops, tiramisu, dessert cups & parfaits, cookies, bread, brownies, party orders, custom cakes, and cupcake bouquets—all made to order for you."
        strapline="Our offerings"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <StatsSection2
        title="Baked with care for our community"
        subtitle="Join hundreds of happy customers who trust Sravs Signature Bakes for birthdays, parties, and everyday treats."
        strapline="Why choose us"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
      <TestimonialsSection
        title="What Our Customers Say"
        subtitle="Real stories from people who ordered our cakes, cake pops, themed treats, and custom desserts."
        strapline="Real Feedback"
        size="md"
        bgColor="bg-white"
        bgImage=""
        bgImageOpacity={1}
        textColor=""
      />
    </>
  );
}

export default IndexPage;
