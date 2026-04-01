export interface PlannerSection {
  id: string;
  label: string;
  height: number; // relative height units
}

export interface PlannerType {
  id: string;
  label: string;
  icon: string;
  pro: boolean;
  defaultSections: PlannerSection[];
}

export const PLANNER_TYPES: PlannerType[] = [
  {
    id: "daily",
    label: "Daily Planner",
    icon: "📅",
    pro: false,
    defaultSections: [
      { id: "schedule", label: "Schedule", height: 4 },
      { id: "tasks", label: "To-Do List", height: 3 },
      { id: "notes", label: "Notes", height: 2 },
      { id: "priorities", label: "Top Priorities", height: 1 },
    ],
  },
  {
    id: "weekly",
    label: "Weekly Planner",
    icon: "📆",
    pro: false,
    defaultSections: [
      { id: "mon", label: "Monday", height: 1 },
      { id: "tue", label: "Tuesday", height: 1 },
      { id: "wed", label: "Wednesday", height: 1 },
      { id: "thu", label: "Thursday", height: 1 },
      { id: "fri", label: "Friday", height: 1 },
      { id: "sat", label: "Saturday", height: 1 },
      { id: "sun", label: "Sunday", height: 1 },
      { id: "notes", label: "Weekly Notes", height: 1 },
    ],
  },
  {
    id: "monthly",
    label: "Monthly Planner",
    icon: "🗓️",
    pro: false,
    defaultSections: [
      { id: "calendar", label: "Calendar Grid", height: 5 },
      { id: "goals", label: "Monthly Goals", height: 2 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "meal",
    label: "Meal Planner",
    icon: "🍽️",
    pro: true,
    defaultSections: [
      { id: "breakfast", label: "Breakfast", height: 1 },
      { id: "lunch", label: "Lunch", height: 1 },
      { id: "dinner", label: "Dinner", height: 1 },
      { id: "snacks", label: "Snacks", height: 1 },
      { id: "grocery", label: "Grocery List", height: 2 },
      { id: "prep", label: "Meal Prep Notes", height: 1 },
    ],
  },
  {
    id: "wedding",
    label: "Wedding Planner",
    icon: "💒",
    pro: true,
    defaultSections: [
      { id: "timeline", label: "Timeline", height: 3 },
      { id: "vendors", label: "Vendors", height: 2 },
      { id: "budget", label: "Budget Tracker", height: 2 },
      { id: "guests", label: "Guest List", height: 2 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "fitness",
    label: "Fitness Planner",
    icon: "💪",
    pro: true,
    defaultSections: [
      { id: "workout", label: "Workout Plan", height: 3 },
      { id: "cardio", label: "Cardio Log", height: 2 },
      { id: "meals", label: "Nutrition", height: 2 },
      { id: "progress", label: "Progress Tracker", height: 1 },
      { id: "goals", label: "Fitness Goals", height: 1 },
    ],
  },
  {
    id: "cleaning",
    label: "Cleaning Schedule",
    icon: "🧹",
    pro: true,
    defaultSections: [
      { id: "daily", label: "Daily Tasks", height: 2 },
      { id: "weekly", label: "Weekly Tasks", height: 2 },
      { id: "monthly", label: "Monthly Tasks", height: 2 },
      { id: "supplies", label: "Supplies Needed", height: 1 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "garden",
    label: "Garden Planner",
    icon: "🌱",
    pro: true,
    defaultSections: [
      { id: "layout", label: "Garden Layout", height: 3 },
      { id: "planting", label: "Planting Schedule", height: 2 },
      { id: "watering", label: "Watering Log", height: 1 },
      { id: "harvest", label: "Harvest Tracker", height: 1 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "vacation",
    label: "Vacation Planner",
    icon: "✈️",
    pro: true,
    defaultSections: [
      { id: "itinerary", label: "Itinerary", height: 3 },
      { id: "packing", label: "Packing List", height: 2 },
      { id: "budget", label: "Budget", height: 2 },
      { id: "reservations", label: "Reservations", height: 1 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "budget",
    label: "Budget Planner",
    icon: "💰",
    pro: true,
    defaultSections: [
      { id: "income", label: "Income", height: 2 },
      { id: "expenses", label: "Expenses", height: 3 },
      { id: "savings", label: "Savings Goals", height: 2 },
      { id: "bills", label: "Bills Due", height: 2 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
  {
    id: "student",
    label: "Student Planner",
    icon: "📚",
    pro: true,
    defaultSections: [
      { id: "classes", label: "Class Schedule", height: 3 },
      { id: "assignments", label: "Assignments", height: 2 },
      { id: "exams", label: "Exam Dates", height: 1 },
      { id: "study", label: "Study Plan", height: 2 },
      { id: "notes", label: "Notes", height: 1 },
    ],
  },
];

export const COLORS = [
  { id: "slate", label: "Slate", primary: "#475569", light: "#f1f5f9", border: "#cbd5e1" },
  { id: "rose", label: "Rose", primary: "#e11d48", light: "#fff1f2", border: "#fecdd3" },
  { id: "blue", label: "Blue", primary: "#2563eb", light: "#eff6ff", border: "#bfdbfe" },
  { id: "emerald", label: "Emerald", primary: "#059669", light: "#ecfdf5", border: "#a7f3d0" },
  { id: "amber", label: "Amber", primary: "#d97706", light: "#fffbeb", border: "#fde68a" },
  { id: "violet", label: "Violet", primary: "#7c3aed", light: "#f5f3ff", border: "#c4b5fd" },
  { id: "teal", label: "Teal", primary: "#0d9488", light: "#f0fdfa", border: "#99f6e4" },
  { id: "pink", label: "Pink", primary: "#db2777", light: "#fdf2f8", border: "#f9a8d4" },
];

export const FONTS = [
  { id: "sans", label: "Sans Serif", family: "Helvetica" },
  { id: "serif", label: "Serif", family: "Times-Roman" },
  { id: "mono", label: "Monospace", family: "Courier" },
];

export type PageSize = "letter" | "a4";
export type Orientation = "portrait" | "landscape";

export const PAGE_SIZES: Record<PageSize, { width: number; height: number; label: string }> = {
  letter: { width: 612, height: 792, label: "US Letter" },
  a4: { width: 595, height: 842, label: "A4" },
};
