import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";
import { getValentinePromoEndDate } from "@/lib/siteConfig";

/** Promo is hidden after this date. Configure in src/lib/siteConfig.js (VALENTINE_PROMO_END_MONTH / VALENTINE_PROMO_END_DAY). */
const PROMO_END = getValentinePromoEndDate();

const PROMO_SLIDES = [
  { type: "image", src: "/products/sravs-bakes-27.jpeg", alt: "Cupcake bouquet" },
  { type: "image", src: "/products/sravs-bakes-28.jpeg", alt: "Cupcake bouquet" },
  { type: "image", src: "/products/sravs-bakes-30.jpeg", alt: "Cupcake bouquet" },
  {
    type: "video",
    src: "/products/cupcake_bouquets.mp4",
    poster: "/products/sravs-bakes-30.jpeg",
    alt: "Cupcake bouquet",
  },
];

const CAROUSEL_AUTO_MS = 4500;

function ValentinePromo(props) {
  const now = new Date();
  if (PROMO_END && now >= PROMO_END) return null;

  const [index, setIndex] = useState(0);
  const slideCount = PROMO_SLIDES.length;

  const goTo = useCallback(
    (i) => {
      setIndex((prev) => (i + slideCount) % slideCount);
    },
    [slideCount]
  );

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (slideCount <= 1) return;
    const t = setInterval(next, CAROUSEL_AUTO_MS);
    return () => clearInterval(t);
  }, [index, next, slideCount]);

  return (
    <Section
      size={props.size || "md"}
      bgColor="bg-gradient-to-b from-rose-50 to-white"
      textColor=""
    >
      {/* Layout mirrors HeroSection: same structure, opposite sides (text LEFT, carousel RIGHT) */}
      <div className="container flex flex-col lg:flex-row space-y-3 lg:space-y-0 text-center lg:text-left">
        <div className="lg:w-1/2 lg:self-center lg:mr-16">
          <SectionHeader
            title="Valentine's Day – Cupcake Bouquets"
            subtitle="Surprise someone special with a gift-ready cupcake bouquet. Order by Feb 14 for Valentine's Day."
            strapline="Limited time"
          />
          <p className="text-muted-foreground pt-10 pb-4 max-w-xl">
            Our 7-count cupcake bouquets are perfect for Valentine's Day—beautiful, delicious, and ready to gift.
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-2 pt-0 pb-16">
            <Link
              href="/order?product=Cupcake%20Bouquets&details=Gift-ready%20arrangements"
              className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
            >
              Order Cupcake Bouquet
              <ArrowRightIcon className="ml-2 opacity-70 inline-block w-5 h-5" />
            </Link>
          </div>
        </div>
        <div className="lg:w-1/2 lg:flex lg:justify-center lg:items-center pb-12 md:pb-0">
          <div className="relative w-full max-w-md mx-auto">
            <div className="absolute pattern-dots text-secondary top-0 left-0 w-32 h-48 md:h-96 transform -translate-y-12 -translate-x-16 -rotate-3 pointer-events-none" />
            <div className="absolute pattern-dots text-secondary bottom-0 right-0 w-32 h-48 md:h-96 transform translate-y-12 translate-x-16 rotate-3 pointer-events-none" />
            <div className="absolute rounded-full top-0 right-0 w-32 h-32 bg-accent/50 -mt-12 -mr-12 pointer-events-none" />
            <div className="absolute rounded-xl bottom-0 left-0 w-32 h-32 bg-secondary/60 -mb-10 -ml-10 transform rotate-3 pointer-events-none" />

            {/* Carousel: images + video */}
            <div className="relative overflow-hidden rounded-2xl shadow-xl ring-1 ring-black/5 aspect-[4/3] lg:aspect-square max-h-96 lg:max-h-[28rem]">
              {PROMO_SLIDES.map((slide, i) => (
                <div
                  key={slide.type === "video" ? "video" : slide.src}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                    zIndex: i === index ? 1 : 0,
                  }}
                >
                  {slide.type === "image" ? (
                    <Image
                      src={slide.src}
                      alt={slide.alt}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      priority={i === 0}
                    />
                  ) : (
                    <>
                      {i === index ? (
                        <video
                          className="w-full h-full object-cover"
                          controls
                          playsInline
                          autoPlay
                          muted
                          loop
                          poster={slide.poster}
                          title={slide.alt}
                        >
                          <source src={slide.src} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <Image
                          src={slide.poster}
                          alt={slide.alt}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      )}
                    </>
                  )}
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
                {PROMO_SLIDES.map((_, i) => (
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

export default ValentinePromo;
