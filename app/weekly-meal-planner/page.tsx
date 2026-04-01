import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "7 Day Weekly Meal Planner Printable — Free PDF | Printable Planner Maker",
  description:
    "Create a free 7 day weekly meal planner printable. Plan breakfast, lunch, dinner, and snacks for the whole week with a grocery list. Download as PDF.",
  openGraph: {
    title: "7 Day Weekly Meal Planner Printable — Free PDF",
    description:
      "Plan your meals for the entire week with a customizable 7-day meal planner. Includes grocery list. Download as PDF.",
    url: "https://printableplanner.org/weekly-meal-planner",
  },
};

const faqs = [
  {
    question: "What is included in the weekly meal planner?",
    answer:
      "The template includes sections for breakfast, lunch, dinner, snacks, a grocery list, and meal prep notes — all customizable to fit your weekly routine.",
  },
  {
    question: "Can I plan all 7 days on one page?",
    answer:
      "Yes. Customize the sections to add day-by-day entries, or print separate daily meal planners for each day. The editor gives you full control over the layout.",
  },
  {
    question: "Is this different from the regular meal planner?",
    answer:
      "This page targets the weekly meal planning workflow specifically. The editor is the same flexible tool — you can set it up for daily or weekly use.",
  },
  {
    question: "Can I include a shopping list?",
    answer:
      "Absolutely. The grocery list section is included by default, making it easy to plan meals and shopping in one printable document.",
  },
];

const relatedPlanners = [
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "fitness-planner", label: "Fitness Planner" },
  { slug: "budget-planner", label: "Budget Planner" },
];

export default function WeeklyMealPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="meal"
      title="7 Day Weekly Meal Planner Printable"
      description="Plan a full week of meals with a customizable weekly meal planner. Organize breakfast, lunch, dinner, snacks, and your grocery list — then download a print-ready PDF."
      features={[
        "Plan all meals for 7 days in one organized layout",
        "Breakfast, lunch, dinner, and snack sections",
        "Built-in grocery list for efficient shopping",
        "Meal prep notes to plan your batch cooking",
        "Customizable colors, fonts, and section layout",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
