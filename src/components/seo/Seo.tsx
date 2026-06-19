import { useEffect } from "react";
import { siteConfig } from "../../config/site";

interface SeoProps {
  title?: string;
  description?: string;
}

export function Seo({ title, description }: SeoProps) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${siteConfig.name}` : `${siteConfig.name} - ${siteConfig.tagline}`;
    const desc = description || siteConfig.description;

    document.title = fullTitle;

    const updateMetaTag = (name: string, content: string) => {
      let meta = document.querySelector(`meta[name="${name}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", name);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    const updatePropertyTag = (property: string, content: string) => {
      let meta = document.querySelector(`meta[property="${property}"]`);
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("property", property);
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", content);
    };

    updateMetaTag("description", desc);
    updatePropertyTag("og:title", fullTitle);
    updatePropertyTag("og:description", desc);
    updatePropertyTag("og:site_name", siteConfig.name);
  }, [title, description]);

  return null;
}
