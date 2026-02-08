import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "styles/global.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics";
import Chat from "components/Chat";

function restoreScroll() {
  document.body.style.overflow = "";
  document.documentElement.style.overflow = "";
}

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});
const cormorant = Cormorant_Garamond({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cormorant",
});

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    restoreScroll();
  }, []);

  useEffect(() => {
    router.events.on("routeChangeComplete", restoreScroll);
    return () => {
      router.events.off("routeChangeComplete", restoreScroll);
    };
  }, [router.events]);

  return (
    <div className={`${greatVibes.variable} ${cormorant.variable} font-serif`} style={{ overflow: "visible" }}>
      <Chat />
      <>
        <Navbar bgColor="bg-white" />

        <Component {...pageProps} />

        <Footer
          size="md"
          bgColor="bg-white"
          bgImage=""
          bgImageOpacity={1}
          textColor=""
          sticky={false}
        />
      </>
      <SpeedInsights />
      <Analytics />
    </div>
  );
}

export default MyApp;
