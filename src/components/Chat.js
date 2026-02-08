import Script from "next/script";

const config = {
  // Crisp website ID
  crispWebsiteId: process.env.NEXT_PUBLIC_CRISP_WEBSITE_ID,
};

function Chat() {
  if (!config.crispWebsiteId) {
    return null;
  }

  return <CrispScript />;
}

function CrispScript() {
  return (
    <Script
      id="crisp-widget"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `;
          window.$crisp = [];
          window.CRISP_WEBSITE_ID = "${config.crispWebsiteId}";
          (function () {
            const d = document; 
            const s = d.createElement('script');
            s.src = 'https://client.crisp.chat/l.js';
            s.async = 1;
            d.getElementsByTagName('head')[0].appendChild(s);
          })();
        `,
      }}
    />
  );
}

export default Chat;
