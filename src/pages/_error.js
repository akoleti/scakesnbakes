import React from "react";
import Link from "next/link";
import { HomeIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import Meta from "components/Meta";
import Section from "components/Section";

function ErrorPage({ statusCode }) {
  const is404 = statusCode === 404;
  const title = is404
    ? "Page not found | Sravs Signature Bakes"
    : "Something went wrong | Sravs Signature Bakes";
  const description = is404
    ? "This page doesn't exist. Head back to Sravs Signature Bakes for cakes, cupcakes, and sweet treats."
    : "We hit a snag. Head back to the home page and we'll get you back to browsing.";

  return (
    <>
      <Meta title={title} description={description} />
      <Section
        size="lg"
        bgColor="bg-gradient-to-b from-rose-50 to-white"
        textColor=""
      >
        <div className="container max-w-2xl mx-auto text-center">
          <p className="text-primary font-semibold text-sm uppercase tracking-wider mb-2">
            {is404 ? "Oops" : "Sorry"}
          </p>
          <h1 className="text-5xl sm:text-6xl font-bold text-foreground mb-3">
            {statusCode || "Error"}
          </h1>
          <p className="text-xl text-foreground/90 mb-6">
            {is404
              ? "This page doesn't exist. Maybe it was moved or the link is wrong."
              : "Something went wrong on our end. We're sorry for the inconvenience."}
          </p>
          <p className="text-muted-foreground mb-10">
            Head back to the home page to browse our cakes, cupcakes, and sweet treats—or use your browser&apos;s back button to return to where you were.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow hover:bg-primary/90 transition-colors"
            >
              <HomeIcon className="w-5 h-5" />
              Back to home
            </Link>
            {!is404 && (
              <button
                type="button"
                onClick={() => typeof window !== "undefined" && window.location.reload()}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
              >
                <ArrowPathIcon className="w-5 h-5" />
                Try again
              </button>
            )}
            <button
              type="button"
              onClick={() => typeof window !== "undefined" && window.history.back()}
              className="inline-flex items-center justify-center gap-2 rounded-md border border-input bg-background px-6 py-3 text-sm font-semibold text-foreground shadow-sm hover:bg-muted transition-colors"
            >
              Go back
            </button>
          </div>
        </div>
      </Section>
    </>
  );
}

ErrorPage.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default ErrorPage;
