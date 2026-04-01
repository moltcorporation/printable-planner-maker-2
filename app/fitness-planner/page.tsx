import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Fitness Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free fitness planner printable with workout plan, cardio log, nutrition tracker, and progress sections. Customize and download a print-ready PDF.",
  openGraph: {
    title: "Fitness Planner Printable — Free Customizable PDF",
    description:
      "Track your workouts and nutrition with a customizable printable fitness planner. Download as print-ready PDF.",
    url: "https://printableplanner.org/fitness-planner",
  },
};

const faqs = [
  {
    question: "What sections are in the fitness planner?",
    answer:
      "The default layout includes a workout plan, cardio log, nutrition tracker, progress tracker, and fitness goals. All sections are fully customizable.",
  },
  {
    question: "Can I track both strength training and cardio?",
    answer:
      "Yes. Dedicated sections for workout plans and cardio logs let you track both. Add more sections if you need to separate them further.",
  },
  {
    question: "Is the fitness planner free?",
    answer:
      "The fitness planner is a Pro template. Pro unlocks all planner types, full customization, and watermark-free PDFs for $3.99/month or $29.99/year.",
  },
  {
    question: "Can I use this for a 30-day fitness challenge?",
    answer:
      "Absolutely. Print 30 copies (one per day) or customize the layout to track all 30 days on a single page. The editor gives you full flexibility.",
  },
];

const relatedPlanners = [
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "budget-planner", label: "Budget Planner" },
  { slug: "cleaning-planner", label: "Cleaning Planner" },
];

export default function FitnessPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="fitness"
      title="Free Fitness Planner Printable"
      description="Reach your fitness goals with a customizable fitness planner. Track workouts, cardio, nutrition, and progress — download as a print-ready PDF."
      features={[
        "Workout plan section for strength training routines",
        "Cardio log to track runs, cycling, and more",
        "Nutrition section to plan meals around your training",
        "Progress tracker for weight, reps, and milestones",
        "Fitness goals section to stay motivated",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
