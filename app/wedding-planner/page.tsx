import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Wedding Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free wedding planner printable with timeline, vendors, budget tracker, and guest list sections. Customize and download a print-ready PDF.",
  openGraph: {
    title: "Wedding Planner Printable — Free Customizable PDF",
    description:
      "Organize your wedding with a customizable printable planner. Timeline, vendors, budget, guest list. Download as PDF.",
    url: "https://printableplanner.org/wedding-planner",
  },
};

const faqs = [
  {
    question: "What sections are in the wedding planner?",
    answer:
      "The default layout includes a timeline, vendor contacts, budget tracker, guest list, and notes. You can customize all sections in the editor.",
  },
  {
    question: "Can I add more sections like seating charts or registry?",
    answer:
      "Yes. The editor lets you add custom sections, so you can include seating arrangements, registry links, RSVP tracking, or anything else you need.",
  },
  {
    question: "Is this free?",
    answer:
      "The wedding planner is a Pro template. Pro unlocks all planner types, full customization, and watermark-free PDFs for $3.99/month or $29.99/year.",
  },
  {
    question: "Can I print multiple pages for different aspects of the wedding?",
    answer:
      "Absolutely. Create separate planner pages for the timeline, budget, guest list, and more. Each one is a separate PDF download you can print and organize in a binder.",
  },
];

const relatedPlanners = [
  { slug: "budget-planner", label: "Budget Planner" },
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "cleaning-planner", label: "Cleaning Planner" },
];

export default function WeddingPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="wedding"
      title="Free Wedding Planner Printable"
      description="Stay organized for your big day with a customizable wedding planner. Track your timeline, vendors, budget, and guest list — download as a print-ready PDF."
      features={[
        "Wedding timeline section to plan every milestone",
        "Vendor contacts tracker for caterers, florists, and more",
        "Budget tracker to keep spending on target",
        "Guest list section with space for names and RSVPs",
        "Customizable layout, colors, and fonts",
        "Print-ready PDF — organize in a wedding binder",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
