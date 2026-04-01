import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Cleaning Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free cleaning planner printable with daily, weekly, and monthly task sections. Customize your cleaning schedule and download a print-ready PDF.",
  openGraph: {
    title: "Cleaning Planner Printable — Free Customizable PDF",
    description:
      "Organize your cleaning routine with a customizable printable cleaning planner. Daily, weekly, and monthly tasks. Download as PDF.",
    url: "https://printableplanner.org/cleaning-planner",
  },
};

const faqs = [
  {
    question: "What sections does the cleaning planner include?",
    answer:
      "The default layout includes daily tasks, weekly tasks, monthly tasks, a supplies needed section, and notes. Customize all sections in the editor.",
  },
  {
    question: "Can I create a cleaning schedule for the whole family?",
    answer:
      "Yes. You can customize sections to assign tasks by family member or room. Print a copy for each week or month.",
  },
  {
    question: "Is the cleaning planner free?",
    answer:
      "The cleaning planner is a Pro template. Pro gives you access to all planner types, full customization, and watermark-free PDFs for $3.99/month or $29.99/year.",
  },
  {
    question: "Can I organize by room instead of frequency?",
    answer:
      "Absolutely. Rename the sections to rooms — kitchen, bathroom, bedroom, living room — and list tasks for each. The editor is fully flexible.",
  },
];

const relatedPlanners = [
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "budget-planner", label: "Budget Planner" },
  { slug: "fitness-planner", label: "Fitness Planner" },
];

export default function CleaningPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="cleaning"
      title="Free Cleaning Planner Printable"
      description="Keep your home spotless with a customizable cleaning planner. Organize daily, weekly, and monthly tasks with a supplies checklist — download as a print-ready PDF."
      features={[
        "Daily cleaning tasks section for quick routines",
        "Weekly deep-cleaning task list",
        "Monthly task section for seasonal cleaning",
        "Supplies needed checklist so you never run out",
        "Customizable layout, colors, and fonts",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
