import React, { useEffect } from "react";
import Link from "next/link";
import { XMarkIcon } from "@heroicons/react/24/solid";

function ImageLightbox({ src, alt, onClose, orderHref = "/order" }) {
  const closeAndRestoreScroll = () => {
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
    onClose();
  };

  useEffect(() => {
    if (!src) {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
      return;
    }
    const handleEscape = (e) => {
      if (e.key === "Escape") closeAndRestoreScroll();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [src, onClose]);

  if (!src) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90 p-4"
      onClick={closeAndRestoreScroll}
      role="dialog"
      aria-modal="true"
      aria-label="Enlarged image"
    >
      <button
        type="button"
        onClick={closeAndRestoreScroll}
        className="absolute top-4 right-4 z-10 rounded-full bg-white/10 p-2 text-white hover:bg-white/20 transition-colors"
        aria-label="Close"
      >
        <XMarkIcon className="w-6 h-6" />
      </button>
      <div className="flex flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
        <img
          src={src}
          alt={alt || "Enlarged view"}
          className="max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-lg shadow-2xl"
        />
        <Link
          href={orderHref}
          onClick={closeAndRestoreScroll}
          className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Order now
        </Link>
      </div>
    </div>
  );
}

export default ImageLightbox;
