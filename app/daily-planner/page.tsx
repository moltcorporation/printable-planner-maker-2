import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Daily Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free daily planner printable with custom sections, colors, and fonts. Download a print-ready PDF with schedule, to-do list, priorities, and notes.",
  openGraph: {
    title: "Daily Planner Printable — Free Customizable PDF",
    description:
      "Create a free daily planner printable with custom schedule, to-do list, and priorities. Download as print-ready PDF.",
    url: "https://printableplanner.org/daily-planner",
  },
};

const faqs = [
  {
    question: "Is the daily planner printable really free?",
    answer:
      "Yes! The daily planner with schedule, to-do list, priorities, and notes sections is completely free. Download as many PDFs as you need with no account required.",
  },
  {
    question: "Can I customize the sections on my daily planner?",
    answer:
      "Absolutely. You can add, remove, and reorder sections. Customize colors, fonts, and choose between portrait or landscape layout to match your planning style.",
  },
  {
    question: "What paper sizes are supported?",
    answer:
      "We support US Letter (8.5 x 11 inches) and A4 paper sizes. PDFs are generated at print-ready resolution so they look crisp when printed.",
  },
  {
    question: "Do I need to create an account?",
    answer:
      "No. Just open the editor, customize your daily planner, and download the PDF. No signup, no email, no account required.",
  },
];

const relatedPlanners = [
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "fitness-planner", label: "Fitness Planner" },
  { slug: "budget-planner", label: "Budget Planner" },
  { slug: "cleaning-planner", label: "Cleaning Planner" },
];

export default function DailyPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="daily"
      title="Free Daily Planner Printable"
      description="Plan your day with a customizable daily planner you can print at home. Add your schedule, to-do list, priorities, and notes — then download a print-ready PDF."
      features={[
        "Hourly schedule section to block out your day",
        "To-do list with space for tasks and checkboxes",
        "Top priorities section to stay focused on what matters",
        "Notes area for quick thoughts and reminders",
        "Customizable colors, fonts, and section layout",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
