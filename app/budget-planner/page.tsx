import type { Metadata } from "next";
import LandingPage from "../components/LandingPage";

export const metadata: Metadata = {
  title: "Budget Planner Printable — Free Customizable PDF | Printable Planner Maker",
  description:
    "Create a free budget planner printable with income, expenses, savings goals, and bills sections. Customize and download a print-ready PDF.",
  openGraph: {
    title: "Budget Planner Printable — Free Customizable PDF",
    description:
      "Take control of your finances with a customizable printable budget planner. Track income, expenses, and savings. Download as PDF.",
    url: "https://printableplanner.org/budget-planner",
  },
};

const faqs = [
  {
    question: "What sections does the budget planner include?",
    answer:
      "The default layout includes income, expenses, savings goals, bills due, and notes. You can customize all sections to match your financial planning style.",
  },
  {
    question: "Can I use this for monthly budgeting?",
    answer:
      "Yes. Print a new copy each month to track your income, expenses, and savings. The layout works great for monthly budget reviews.",
  },
  {
    question: "Is the budget planner free?",
    answer:
      "The budget planner is a Pro template. Pro gives you access to all planner types, full customization, and watermark-free PDFs for $3.99/month or $29.99/year.",
  },
  {
    question: "Can I add categories like groceries, rent, or entertainment?",
    answer:
      "Absolutely. Rename or add sections for any expense category. The editor lets you fully customize the layout to match how you track your money.",
  },
];

const relatedPlanners = [
  { slug: "daily-planner", label: "Daily Planner" },
  { slug: "weekly-planner", label: "Weekly Planner" },
  { slug: "wedding-planner", label: "Wedding Planner" },
  { slug: "meal-planner", label: "Meal Planner" },
  { slug: "cleaning-planner", label: "Cleaning Planner" },
];

export default function BudgetPlannerPage() {
  return (
    <LandingPage
      plannerTypeId="budget"
      title="Free Budget Planner Printable"
      description="Take control of your finances with a customizable budget planner. Track income, expenses, savings goals, and bills — download as a print-ready PDF."
      features={[
        "Income section to track all sources of earnings",
        "Expenses tracker organized by category",
        "Savings goals section to stay on target",
        "Bills due section so you never miss a payment",
        "Customizable layout, colors, and fonts",
        "Print-ready PDF in US Letter or A4 size",
      ]}
      faqs={faqs}
      relatedPlanners={relatedPlanners}
    />
  );
}
