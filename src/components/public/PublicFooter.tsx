import { Link } from "react-router-dom";
import { Logo } from "../ui/Logo";
import { PUBLIC_ROUTES } from "../../config/routes";
import { siteConfig } from "../../config/site";

const footerLinks = {
  Product: [
    { name: "Features", href: PUBLIC_ROUTES.FEATURES },
    { name: "Roadmap", href: PUBLIC_ROUTES.ROADMAP },
    { name: "Changelog", href: PUBLIC_ROUTES.CHANGELOG },
  ],
  Resources: [
    { name: "About", href: PUBLIC_ROUTES.ABOUT },
    { name: "FAQ", href: PUBLIC_ROUTES.FAQ },
    { name: "Contact", href: PUBLIC_ROUTES.CONTACT },
  ],
  Legal: [
    { name: "Privacy Policy", href: PUBLIC_ROUTES.PRIVACY },
    { name: "Terms of Service", href: "#" },
  ],
};

export function PublicFooter() {
  return (
    <footer className="border-t border-border bg-background py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          <div className="col-span-2">
            <Link to={PUBLIC_ROUTES.HOME} className="hover:opacity-80 transition-opacity inline-block">
              <Logo />
            </Link>
            <p className="mt-4 text-muted-foreground max-w-sm text-sm leading-relaxed">
              {siteConfig.description}
            </p>
          </div>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold text-foreground mb-4">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex gap-4">
            <a href={siteConfig.links.twitter} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noreferrer">
              Twitter
            </a>
            <a href={siteConfig.links.github} className="text-muted-foreground hover:text-foreground transition-colors" target="_blank" rel="noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
