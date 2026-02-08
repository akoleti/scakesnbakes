import React, { useState, useEffect, useCallback } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import Button from "components/Button";

const HERO_SLIDES = [
  { src: "/products/sravs-bakes-19.jpeg", alt: "Cakes and baked goods" },
  { src: "/products/sravs-bakes-01.jpeg", alt: "Custom cakes" },
  { src: "/products/sravs-bakes-33.jpeg", alt: "Cakes and desserts" },
  { src: "/products/sravs-bakes-30.jpeg", alt: "Cupcake bouquets" },
  { src: "/products/sravs-bakes-34.jpeg", alt: "Tiramisu and layer cakes" },
];

const AUTO_ADVANCE_MS = 4500;

function HeroSection(props) {
  const [index, setIndex] = useState(0);

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + HERO_SLIDES.length) % HERO_SLIDES.length);
  }, []);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    const t = setInterval(next, AUTO_ADVANCE_MS);
    return () => clearInterval(t);
  }, [index, next]);

  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
    >
      <div className="container flex flex-col lg:flex-row-reverse space-y-3 lg:space-y-0 text-center lg:text-left">
        <div className="lg:w-1/2 lg:self-center">
          <SectionHeader
            title={props.title}
            subtitle={props.subtitle}
            strapline={props.strapline}
          />
          <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-2 pt-10 pb-16">
            <Button
              href="/order"
              size="xl"
              endIcon={
                <ArrowRightIcon className="opacity-70 inline-block w-5 h-5" />
              }
            >
              Order now
            </Button>
          </div>
        </div>
        <div className="lg:w-1/2 lg:mr-16 lg:flex lg:justify-center lg:items-center pb-12 md:pb-0">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute pattern-dots text-secondary top-0 left-0 w-32 h-48 md:h-96 transform -translate-y-12 -translate-x-16 -rotate-3 pointer-events-none" />
            <div className="absolute pattern-dots text-secondary bottom-0 right-0 w-32 h-48 md:h-96 transform translate-y-12 translate-x-16 rotate-3 pointer-events-none" />
            <div className="absolute rounded-full top-0 right-0 w-32 h-32 bg-accent/50 -mt-12 -mr-12 pointer-events-none" />
            <div className="absolute rounded-xl bottom-0 left-0 w-32 h-32 bg-secondary/60 -mb-10 -ml-10 transform rotate-3 pointer-events-none" />

            {/* Carousel */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 aspect-[4/3] lg:aspect-square max-h-96 lg:max-h-[28rem]">
              {HERO_SLIDES.map((slide, i) => (
                <div
                  key={slide.src}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                    zIndex: i === index ? 1 : 0,
                  }}
                >
                  <img
                    className="w-full h-full object-cover"
                    src={slide.src}
                    alt={slide.alt}
                  />
                </div>
              ))}

              {/* Prev / Next */}
              <button
                type="button"
                onClick={prev}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700 hover:text-gray-900 transition-colors"
                aria-label="Next slide"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                {HERO_SLIDES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="w-2 h-2 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                      transform: i === index ? "scale(1.25)" : "scale(1)",
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default HeroSection;
