import { SectionHeader } from "../../components/public/SectionHeader";
import { Seo } from "../../components/seo/Seo";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-24 pb-32 max-w-3xl">
      <Seo title="Contact" description="Get in touch with the StudentOS team." />
      <SectionHeader
        title="Contact Us"
        description="We'd love to hear from you."
      />
      <div className="mt-12 p-8 rounded-2xl border border-border bg-card text-center">
        <p className="text-lg text-muted-foreground mb-6">
          Have a question, feedback, or need support? Reach out to us directly.
        </p>
        <a href="mailto:support@studentos.com" className="inline-block px-6 py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity">
          tetrauv7@gmail.com
        </a>
      </div>
    </div>
  );
}
