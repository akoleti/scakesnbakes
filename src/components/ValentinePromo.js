import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Section from "components/Section";
import SectionHeader from "components/SectionHeader";

const PROMO_END = new Date(new Date().getFullYear(), 1, 15); // Feb 15 00:00 – hide from then

const CUPCAKE_BOUQUET_IMAGES = [
  { src: "/products/sravs-bakes-27.jpeg", alt: "Cupcake bouquet" },
  { src: "/products/sravs-bakes-28.jpeg", alt: "Cupcake bouquet" },
  { src: "/products/sravs-bakes-30.jpeg", alt: "Cupcake bouquet" },
];

const VIDEO_PATH = "/products/cupcake_bouquets";
const CAROUSEL_AUTO_MS = 4500;

function ValentinePromo(props) {
  const now = new Date();
  if (now >= PROMO_END) return null;

  const [index, setIndex] = useState(0);
  const slides = CUPCAKE_BOUQUET_IMAGES.length;

  const goTo = useCallback((i) => {
    setIndex((prev) => (i + slides) % slides);
  }, [slides]);

  const next = useCallback(() => goTo(index + 1), [index, goTo]);
  const prev = useCallback(() => goTo(index - 1), [index, goTo]);

  useEffect(() => {
    if (slides <= 1) return;
    const t = setInterval(next, CAROUSEL_AUTO_MS);
    return () => clearInterval(t);
  }, [index, next, slides]);

  return (
    <Section
      size={props.size || "md"}
      bgColor="bg-gradient-to-b from-rose-50 to-white"
      textColor=""
    >
      <div className="container">
        <SectionHeader
          title="Valentine's Day – Cupcake Bouquets"
          subtitle="Surprise someone special with a gift-ready cupcake bouquet. Order by Feb 14 for Valentine's Day."
          strapline="Limited time"
          className="text-center"
        />
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.35fr] gap-10 items-center max-w-6xl mx-auto">
          <div className="space-y-4">
            <p className="text-center lg:text-left text-gray-700">
              Our 7-count cupcake bouquets are perfect for Valentine's Day—beautiful, delicious, and ready to gift.
            </p>
            <div className="relative overflow-hidden rounded-xl shadow-xl ring-1 ring-black/5 aspect-square max-w-sm mx-auto lg:mx-0 bg-gray-100">
              {CUPCAKE_BOUQUET_IMAGES.map((img, i) => (
                <div
                  key={i}
                  className="absolute inset-0 transition-all duration-500 ease-out"
                  style={{
                    opacity: i === index ? 1 : 0,
                    pointerEvents: i === index ? "auto" : "none",
                    zIndex: i === index ? 1 : 0,
                  }}
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              {slides > 1 && (
                <>
                  <button
                    type="button"
                    onClick={prev}
                    className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700"
                    aria-label="Previous"
                  >
                    <ChevronLeftIcon className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-md flex items-center justify-center text-gray-700"
                    aria-label="Next"
                  >
                    <ChevronRightIcon className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-3 left-0 right-0 z-10 flex justify-center gap-1.5">
                    {CUPCAKE_BOUQUET_IMAGES.map((_, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setIndex(i)}
                        className="w-2 h-2 rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: i === index ? "rgba(255,255,255,0.95)" : "rgba(255,255,255,0.4)",
                          transform: i === index ? "scale(1.25)" : "scale(1)",
                        }}
                        aria-label={`Slide ${i + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
            <p className="text-center lg:text-left">
              <Link
                href="/order?product=Cupcake%20Bouquets&details=Gift-ready%20arrangements"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 transition-colors"
              >
                Order Cupcake Bouquet
              </Link>
            </p>
          </div>
          <div className="rounded-xl overflow-hidden shadow-xl ring-1 ring-black/5 bg-gray-100 aspect-video min-h-[240px] sm:min-h-[280px] lg:min-h-[320px]">
            <video
              className="w-full h-full object-cover"
              controls
              playsInline
              autoPlay
              muted
              loop
              poster="/products/sravs-bakes-30.jpeg"
              title="Cupcake bouquet"
            >
              <source src={`${VIDEO_PATH}.mp4`} type="video/mp4" />
              <source src={`${VIDEO_PATH}.webm`} type="video/webm" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </Section>
  );
}

export default ValentinePromo;
