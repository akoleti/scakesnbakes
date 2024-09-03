import React from "react";
import "styles/global.css";
import Navbar from "components/Navbar";
import Footer from "components/Footer";
import "util/analytics";
import Chat from "components/Chat";

function MyApp({ Component, pageProps }) {
  return (
    <>
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
    </>
  );
}

export default MyApp;
