import React from "react";
import { Great_Vibes, Cormorant_Garamond } from "next/font/google";
import "styles/global.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics";
import Chat from "components/Chat";

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
  return (
    <div className={`${greatVibes.variable} ${cormorant.variable} font-serif`}>
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
    </div>
  );
}

export default MyApp;
