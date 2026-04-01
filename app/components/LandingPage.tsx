"use client";

import Link from "next/link";
import { PLANNER_TYPES, COLORS } from "./planner-data";

interface FAQ {
  question: string;
  answer: string;
}

interface RelatedPlanner {
  slug: string;
  label: string;
}

interface LandingPageProps {
  plannerTypeId: string;
  title: string;
  description: string;
  features: string[];
  faqs: FAQ[];
  relatedPlanners: RelatedPlanner[];
}

function PlannerPreview({ plannerTypeId }: { plannerTypeId: string }) {
  const planner = PLANNER_TYPES.find((p) => p.id === plannerTypeId);
  if (!planner) return null;

  const color = COLORS[0]; // slate default
  const totalHeight = planner.defaultSections.reduce((s, sec) => s + sec.height, 0);

  return (
    <div className="mx-auto w-full max-w-sm rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <div
        className="mb-3 rounded px-3 py-2 text-center text-sm font-bold text-white"
        style={{ backgroundColor: color.primary }}
      >
        {planner.label}
      </div>
      <div className="space-y-1.5">
        {planner.defaultSections.map((sec) => (
          <div
            key={sec.id}
            className="flex items-center rounded border px-3 text-xs text-gray-600"
            style={{
              minHeight: `${Math.max(24, (sec.height / totalHeight) * 200)}px`,
              borderColor: color.border,
              backgroundColor: color.light,
            }}
          >
            {sec.label}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function LandingPage({
  plannerTypeId,
  title,
  description,
  features,
  faqs,
  relatedPlanners,
}: LandingPageProps) {
  const planner = PLANNER_TYPES.find((p) => p.id === plannerTypeId);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Header */}
      <header className="border-b border-gray-100 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">
            Printable Planner Maker
          </Link>
          <Link
            href={`/?type=${plannerTypeId}`}
            className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Create {planner?.label || "Planner"}
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-12">
        {/* Hero */}
        <section className="text-center">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600">
            {description}
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href={`/?type=${plannerTypeId}`}
              className="rounded-lg bg-indigo-600 px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Create Your {planner?.label || "Planner"} — Free
            </Link>
          </div>
        </section>

        {/* Preview */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Preview
          </h2>
          <PlannerPreview plannerTypeId={plannerTypeId} />
        </section>

        {/* Features */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            What You Get
          </h2>
          <ul className="mx-auto max-w-2xl space-y-3">
            {features.map((feature, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-sm text-indigo-600">
                  ✓
                </span>
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-16 text-center">
          <div className="rounded-2xl bg-indigo-50 px-8 py-10">
            <h2 className="text-2xl font-bold text-gray-900">
              Ready to get organized?
            </h2>
            <p className="mt-2 text-gray-600">
              Create your custom {planner?.label?.toLowerCase() || "planner"} and download a print-ready PDF in seconds.
            </p>
            <Link
              href={`/?type=${plannerTypeId}`}
              className="mt-6 inline-block rounded-lg bg-indigo-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-indigo-700"
            >
              Start Creating — It&apos;s Free
            </Link>
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>
          <div className="mx-auto max-w-3xl divide-y divide-gray-200">
            {faqs.map((faq, i) => (
              <div key={i} className="py-5">
                <h3 className="text-base font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Related Planners */}
        <section className="mt-16">
          <h2 className="mb-6 text-center text-2xl font-bold text-gray-900">
            Explore More Planners
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {relatedPlanners.map((rp) => (
              <Link
                key={rp.slug}
                href={`/${rp.slug}`}
                className="rounded-full border border-gray-200 bg-white px-5 py-2 text-sm font-medium text-gray-700 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700"
              >
                {rp.label}
              </Link>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-gray-100 bg-gray-50 py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-gray-500">
          <Link href="/" className="hover:text-gray-700">
            Printable Planner Maker
          </Link>
          {" — "}Free printable planners you can customize and download as PDFs.
        </div>
      </footer>
    </div>
  );
}
