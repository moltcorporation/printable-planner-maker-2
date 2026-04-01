import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Meal Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free meal planner printable with breakfast, lunch, dinner, snacks, and grocery list sections. Customize and download a print-ready PDF.",
  openGraph: {
    title: "Meal Planner Printable — Free Customizable PDF",
    description:
      "Plan your meals with a customizable printable meal planner. Includes grocery list. Download as print-ready PDF.",
    url: "https://printableplanner.org/meal-planner",
  },
};

const faqs = [
  {
    question: "What sections does the meal planner include?",
    answer:
      "The default layout includes breakfast, lunch, dinner, snacks, grocery list, and meal prep notes. You can customize all sections in the editor.",
  },
  {
    question: "Can I use this for weekly meal planning?",
    answer:
      "Yes! Print multiple copies for each day of the week, or customize the sections to cover a full week on one page. See also our dedicated weekly meal planner template.",
  },
  {
    question: "Is the meal planner printable free?",
    answer:
      "The meal planner is a Pro template. Pro gives you access to all planner types, full customization, and watermark-free PDF downloads for $3.99/month or $29.99/year.",
  },
  {
    question: "Can I add a grocery list section?",
    answer:
      "A grocery list section is included by default. You can resize it, move it, or add additional sections like a budget tracker or recipe notes.",
  },
];

const relatedPlanners = [
  { slug: "weekly-meal-planner", label: "Weekly Meal Planner" },
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "fitness-planner", label: "Fitness Planner" },
  { slug: "budget-planner", label: "Budget Planner" },
];

export default function MealPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="meal"
      title="Free Meal Planner Printable"
      description="Plan your meals and grocery shopping with a customizable meal planner. Sections for breakfast, lunch, dinner, snacks, and a grocery list — download as a print-ready PDF."
      features={[
        "Sections for breakfast, lunch, dinner, and snacks",
        "Built-in grocery list to plan your shopping",
        "Meal prep notes section for batch cooking",
        "Customizable colors and fonts",
        "Print-ready PDF in US Letter or A4 size",
        "Perfect for weekly meal prep and healthy eating goals",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
