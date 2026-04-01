import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Weekly Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free weekly planner printable with all 7 days and notes. Customize colors, fonts, and layout, then download a print-ready PDF.",
  openGraph: {
    title: "Weekly Planner Printable — Free Customizable PDF",
    description:
      "Create a free weekly planner printable with Monday through Sunday sections. Download as print-ready PDF.",
    url: "https://printableplanner.org/weekly-planner",
  },
};

const faqs = [
  {
    question: "Is the weekly planner printable free?",
    answer:
      "Yes! The weekly planner with Monday through Sunday sections plus a weekly notes area is completely free. No account or signup needed.",
  },
  {
    question: "Can I change what day the week starts on?",
    answer:
      "You can reorder the day sections in the editor to start your week on any day you prefer — Monday, Sunday, or any other day.",
  },
  {
    question: "What size paper does it print on?",
    answer:
      "Choose between US Letter (8.5 x 11 inches) or A4 size. Both produce crisp, print-ready PDFs.",
  },
  {
    question: "Can I add extra sections like goals or habits?",
    answer:
      "Yes. The editor lets you add, remove, and rename sections, so you can include habit trackers, goal lists, or anything else you need for your week.",
  },
];

const relatedPlanners = [
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-meal-planner", label: "Weekly Meal Planner" },
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "fitness-planner", label: "Fitness Planner" },
  { slug: "cleaning-planner", label: "Cleaning Planner" },
];

export default function WeeklyPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="weekly"
      title="Free Weekly Planner Printable"
      description="Organize your entire week with a customizable weekly planner. Sections for every day of the week plus notes — download as a print-ready PDF."
      features={[
        "Dedicated section for each day of the week",
        "Weekly notes area for goals and reminders",
        "Fully customizable layout — add, remove, or reorder sections",
        "Choose your colors and fonts to match your style",
        "Portrait or landscape orientation",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
