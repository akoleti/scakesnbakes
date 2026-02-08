import React from "react";
import Link from "next/link";
import Section from "components/Section";

function Footer(props) {
  return (
    <Section
      size={props.size}
      bgColor={props.bgColor}
      bgImage={props.bgImage}
      bgImageOpacity={props.bgImageOpacity}
      textColor={props.textColor}
      className={props.sticky && "mt-auto"}
    >
      <footer className="container">
        <div className="flex flex-col md:flex-row-reverse md:justify-between space-y-6 md:space-y-0 text-center md:text-left text-sm lg:text-base">
          <nav className="space-x-4">
            {[
              {
                url: "https://facebook.com",
                icon: (
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                ),
              },
              {
                url: "https://instagram.com",
                icon: (
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                ),
              },
            ].map((link, index) => (
              <Link href={link.url} key={index} legacyBehavior passHref>
                <a
                  className="text-gray-400 hover:text-primary"
                  target="_blank"
                  rel="noreferrer"
                >
                  <svg
                    className="inline-block w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    {link.icon}
                  </svg>
                </a>
              </Link>
            ))}
          </nav>
          <nav className="space-x-5 sm:space-x-7">
            {[
              { url: "/about", name: "About" },
              { url: "/legal/terms-of-service", name: "Terms" },
              { url: "/legal/privacy-policy", name: "Privacy" },
            ].map((link, index) => (
              <Link href={link.url} key={index} legacyBehavior passHref>
                <a className="font-medium text-gray-600 hover:text-gray-500">
                  {link.name}
                </a>
              </Link>
            ))}
          </nav>
          <div className="text-gray-600">
            <span className="font-medium"><span className="font-script text-lg">Sravs</span> <span className="font-serif">Signature Bakes</span></span> ©
          </div>
        </div>
      </footer>
    </Section>
  );
}

export default Footer;
