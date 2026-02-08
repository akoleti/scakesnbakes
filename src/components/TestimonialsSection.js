import React from "react";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Avatar from "components/Avatar";

function TestimonialsSection(props) {
  const testimonials = [
    {
      avatar: null,
      name: "Maria L.",
      body: "The custom birthday cake for my daughter was stunning—exactly what we asked for. Moist, delicious, and the cupcake bouquet was the hit of the party!",
      role: "Birthday party order",
    },
    {
      avatar: null,
      name: "James T.",
      body: "We order the bread loaves and brownies every week. Fresh, consistent, and the cookies are perfect with coffee. Sravs Signature Bakes is our go-to bakery.",
      role: "Regular customer",
    },
    {
      avatar: null,
      name: "Sarah K.",
      body: "Ordered a custom cake and cupcake bouquets for our office event. Beautiful presentation and everyone asked where we got them. Will definitely order again!",
      role: "Corporate order",
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {testimonials.map((testimonial, index) => (
            <div
              className="border border-border rounded-md bg-muted/50 shadow-sm relative"
              key={index}
            >
              <div className="absolute top-0 right-0 text-8xl mt-1 mr-2 text-primary/20 opacity-75 font-serif">
                “
              </div>
              <div className="px-4 pt-14 pb-6 sm:px-6 sm:pb-6 relative">
                <blockquote>
                  <p className="leading-7 mb-5">{testimonial.body}</p>
                  <footer className="flex items-center space-x-4">
                    <Avatar image={testimonial.avatar} alt={testimonial.name} size="sm" />
                    <div>
                      <span className="font-semibold text-primary">
                        {testimonial.name}
                      </span>
                      <p className="text-muted-foreground font-medium text-sm">
                        {testimonial.role}
                      </p>
                    </div>
                  </footer>
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

export default TestimonialsSection;
