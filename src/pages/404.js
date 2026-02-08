import React from "react";
import Link from "next/link";
import { HomeIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import Meta from "components/Meta";
import Section from "components/Section";

function NotFoundPage() {
  return (
    <>
      <Meta
        title="Page not found | Sravs Signature Bakes"
        description="This page doesn't exist. Head back to Sravs Signature Bakes for cakes, cupcakes, and sweet treats."
      />
      <Section
        size="lg"
        bgColor="bg-gradient-to-b from-rose-50 to-white"
        textColor=""
      >
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            Oops
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-3">
            404
          </h1>
          <p className="text-xl text-gray-700 mb-6">
            This page doesn&apos;t exist. Maybe it was moved or the link is wrong.
          </p>
          <p className="text-gray-600 mb-10">
            No worries—head back to the home page to browse our cakes, cupcakes, and sweet treats.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Back to home
            </Link>
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-gray-300 bg-white px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftIcon className="w-5 h-5" />
              Go back
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}

export default NotFoundPage;
