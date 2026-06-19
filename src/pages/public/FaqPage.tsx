import { Container } from "../../components/ui/Container";
import { SectionHeader } from "../../components/public/SectionHeader";
import { Seo } from "../../components/seo/Seo";

export default function FaqPage() {
  const faqs = [
    { question: "Is StudentOS free?", answer: "Yes, the core features of StudentOS are completely free for students." },
    { question: "Does it work offline?", answer: "Yes, StudentOS is built as a PWA with full offline support. Your data syncs when you reconnect." },
    { question: "Can I use it on my phone?", answer: "Absolutely. StudentOS is fully responsive and can be installed on your iOS or Android device." }
  ];

  return (
    <Container className="py-24 max-w-3xl">
      <Seo title="FAQ" description="Frequently asked questions about StudentOS." />
      <SectionHeader 
        title="Frequently Asked Questions"
        description="Got questions? We've got answers."
      />
      <div className="mt-12 space-y-6">
        {faqs.map((faq, i) => (
          <div key={i} className="p-6 rounded-2xl border border-border bg-card">
            <h3 className="text-lg font-semibold mb-2 text-foreground">{faq.question}</h3>
            <p className="text-muted-foreground">{faq.answer}</p>
          </div>
        ))}
      </div>
    </Container>
  );
}
