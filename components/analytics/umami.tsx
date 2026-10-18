import Script from "next/script";

// Cookieless visit counting on our own server (analiz.vexloft.com), one
// dashboard for every Vexloft site. No cookies, no stored IP, so it does not
// wait for the cookie banner — unlike GA, it also counts visitors who decline.
const UMAMI_WEBSITE_ID = "a32a6530-3aeb-42fa-961a-23d9d3a6c90e";

export function Umami(): React.ReactElement {
  return (
    <Script
      src="https://analiz.vexloft.com/script.js"
      data-website-id={UMAMI_WEBSITE_ID}
      strategy="afterInteractive"
    />
  );
}
