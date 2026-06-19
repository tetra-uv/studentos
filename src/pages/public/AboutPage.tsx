import { Container } from "../../components/ui/Container";
import { SectionHeader } from "../../components/public/SectionHeader";
import { Seo } from "../../components/seo/Seo";

export default function AboutPage() {
  return (
    <Container className="py-24 max-w-3xl">
      <Seo title="About Us" description="Learn more about the StudentOS mission." />
      <SectionHeader 
        title="About StudentOS"
        description="Our mission is to build the ultimate digital workspace for students."
      />
      <div className="mt-12 prose dark:prose-invert prose-slate mx-auto">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          StudentOS started with a simple observation: students need better tools. Most academic software feels like it was built in 2005. It's clunky, confusing, and makes studying more stressful than it needs to be. We wanted to build something different.
        </p>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Our mission is to empower students with a beautifully designed, lightning-fast workspace to track attendance, crush deadlines, and build habits that stick. Because good design shouldn't be reserved for enterprise software—students deserve it too.
        </p>
      </div>
    </Container>
  );
}
