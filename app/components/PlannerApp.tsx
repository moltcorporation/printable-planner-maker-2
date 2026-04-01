"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  PLANNER_TYPES,
  COLORS,
  FONTS,
  PAGE_SIZES,
  type PlannerSection,
  type PlannerType,
  type PageSize,
  type Orientation,
} from "./planner-data";

const MONTHLY_LINK = "https://buy.stripe.com/cNi7sL9JVaWt9LDd6I3Nm0x";
const YEARLY_LINK = "https://buy.stripe.com/7sY5kD7BN9Spf5X3w83Nm0y";

function UpgradeModal({ onClose }: { onClose: () => void }) {
  const [plan, setPlan] = useState<"monthly" | "yearly">("yearly");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <h3 className="text-2xl font-bold text-gray-900">Unlock Pro Planners</h3>
        <p className="mt-2 text-gray-600">
          Get access to all 11 planner types, custom layouts, and watermark-free PDF exports.
        </p>
        <div className="mt-6 space-y-3">
          <button
            onClick={() => setPlan("yearly")}
            className={`w-full rounded-xl p-4 text-left transition ${
              plan === "yearly"
                ? "border-2 border-indigo-500 bg-indigo-50"
                : "border border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold text-gray-900">Yearly</p>
                  <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Save 37%</span>
                </div>
                <p className="text-sm text-gray-600">$2.50/mo billed annually</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">$29.99<span className="text-sm font-normal text-gray-500">/yr</span></p>
            </div>
          </button>
          <button
            onClick={() => setPlan("monthly")}
            className={`w-full rounded-xl p-4 text-left transition ${
              plan === "monthly"
                ? "border-2 border-indigo-500 bg-indigo-50"
                : "border border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-900">Monthly</p>
                <p className="text-sm text-gray-600">Billed monthly</p>
              </div>
              <p className="text-2xl font-bold text-gray-900">$3.99<span className="text-sm font-normal text-gray-500">/mo</span></p>
            </div>
          </button>
        </div>
        <a
          href={plan === "monthly" ? MONTHLY_LINK : YEARLY_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 block w-full rounded-lg bg-indigo-600 py-3 text-center text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Get Pro Access
        </a>
        <button
          onClick={onClose}
          className="mt-3 w-full rounded-lg bg-gray-100 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-200"
        >
          Maybe Later
        </button>
        <p className="mt-3 text-center text-xs text-gray-400">
          Already subscribed?{" "}
          <a href="/success" className="text-indigo-600 hover:underline">
            Activate your account
          </a>
        </p>
      </div>
    </div>
  );
}

function SectionEditor({
  sections,
  onChange,
  color,
}: {
  sections: PlannerSection[];
  onChange: (sections: PlannerSection[]) => void;
  color: string;
}) {
  const moveSection = (index: number, direction: -1 | 1) => {
    const next = [...sections];
    const target = index + direction;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const removeSection = (index: number) => {
    if (sections.length <= 1) return;
    onChange(sections.filter((_, i) => i !== index));
  };

  const addSection = () => {
    onChange([
      ...sections,
      { id: `custom-${Date.now()}`, label: "New Section", height: 1 },
    ]);
  };

  const updateLabel = (index: number, label: string) => {
    const next = [...sections];
    next[index] = { ...next[index], label };
    onChange(next);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium text-gray-700">Sections</label>
        <button
          onClick={addSection}
          className="rounded-md px-2 py-1 text-xs font-medium hover:bg-gray-100"
          style={{ color }}
        >
          + Add Section
        </button>
      </div>
      <div className="space-y-1.5">
        {sections.map((section, i) => (
          <div
            key={section.id + i}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-2 py-1.5"
          >
            <div className="flex flex-col">
              <button
                onClick={() => moveSection(i, -1)}
                disabled={i === 0}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ▲
              </button>
              <button
                onClick={() => moveSection(i, 1)}
                disabled={i === sections.length - 1}
                className="text-xs text-gray-400 hover:text-gray-600 disabled:opacity-30"
              >
                ▼
              </button>
            </div>
            <input
              type="text"
              value={section.label}
              onChange={(e) => updateLabel(i, e.target.value)}
              className="min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none"
            />
            <button
              onClick={() => removeSection(i)}
              disabled={sections.length <= 1}
              className="text-xs text-gray-400 hover:text-red-500 disabled:opacity-30"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

function PlannerPreview({
  plannerType,
  sections,
  colorScheme,
  font,
  orientation,
  svgRef,
  isPro,
}: {
  plannerType: PlannerType;
  sections: PlannerSection[];
  colorScheme: (typeof COLORS)[number];
  font: (typeof FONTS)[number];
  orientation: Orientation;
  svgRef: React.RefObject<SVGSVGElement | null>;
  isPro: boolean;
}) {
  const isLandscape = orientation === "landscape";
  const viewW = isLandscape ? 792 : 612;
  const viewH = isLandscape ? 612 : 792;
  const margin = 36;
  const contentW = viewW - margin * 2;
  const contentH = viewH - margin * 2;
  const headerH = 60;
  const sectionStartY = margin + headerH + 10;
  const availableH = contentH - headerH - 10;

  const totalWeight = sections.reduce((s, sec) => s + sec.height, 0);
  const gap = 8;
  const totalGaps = (sections.length - 1) * gap;
  const usableH = availableH - totalGaps;

  let currentY = sectionStartY;

  const fontFamily =
    font.id === "serif"
      ? "Georgia, 'Times New Roman', serif"
      : font.id === "mono"
        ? "'Courier New', Courier, monospace"
        : "system-ui, -apple-system, sans-serif";

  return (
    <div className="overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-4">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${viewW} ${viewH}`}
        className="mx-auto w-full max-w-lg rounded-lg shadow-lg"
        style={{ backgroundColor: "white", fontFamily }}
      >
        {/* Background */}
        <rect width={viewW} height={viewH} fill="white" />

        {/* Header */}
        <rect
          x={margin}
          y={margin}
          width={contentW}
          height={headerH}
          rx={8}
          fill={colorScheme.light}
          stroke={colorScheme.border}
          strokeWidth={1}
        />
        <text
          x={margin + 16}
          y={margin + 28}
          fontSize={20}
          fontWeight="bold"
          fill={colorScheme.primary}
          fontFamily={fontFamily}
        >
          {plannerType.label}
        </text>
        <text
          x={margin + 16}
          y={margin + 48}
          fontSize={11}
          fill={colorScheme.primary}
          opacity={0.6}
          fontFamily={fontFamily}
        >
          {isLandscape ? "Landscape" : "Portrait"} Layout
        </text>

        {/* Sections */}
        {sections.map((section, i) => {
          const sectionH = (section.height / totalWeight) * usableH;
          const y = currentY;
          currentY += sectionH + gap;

          // Draw lined rows inside section
          const labelH = 24;
          const innerY = y + labelH;
          const innerH = sectionH - labelH;
          const lineSpacing = 22;
          const lines = [];
          for (let ly = innerY + lineSpacing; ly < y + sectionH - 2; ly += lineSpacing) {
            lines.push(ly);
          }

          return (
            <g key={section.id + i}>
              <rect
                x={margin}
                y={y}
                width={contentW}
                height={sectionH}
                rx={6}
                fill="white"
                stroke={colorScheme.border}
                strokeWidth={1}
              />
              <rect
                x={margin}
                y={y}
                width={contentW}
                height={labelH}
                rx={6}
                fill={colorScheme.light}
              />
              {/* Cover bottom radius of label bg */}
              <rect
                x={margin}
                y={y + labelH - 6}
                width={contentW}
                height={6}
                fill={colorScheme.light}
              />
              <line
                x1={margin}
                y1={y + labelH}
                x2={margin + contentW}
                y2={y + labelH}
                stroke={colorScheme.border}
                strokeWidth={0.5}
              />
              <text
                x={margin + 12}
                y={y + 16}
                fontSize={11}
                fontWeight="600"
                fill={colorScheme.primary}
                fontFamily={fontFamily}
              >
                {section.label}
              </text>
              {lines.map((ly) => (
                <line
                  key={ly}
                  x1={margin + 8}
                  y1={ly}
                  x2={margin + contentW - 8}
                  y2={ly}
                  stroke={colorScheme.border}
                  strokeWidth={0.3}
                  opacity={0.5}
                />
              ))}
            </g>
          );
        })}

        {/* Watermark for free tier */}
        {!isPro && (
          <text
            x={viewW / 2}
            y={viewH - 16}
            textAnchor="middle"
            fontSize={9}
            fill="#999"
            fontFamily="system-ui, sans-serif"
          >
            Made with Printable Planner Maker — printableplanner.org
          </text>
        )}
      </svg>
    </div>
  );
}

export default function PlannerApp() {
  const [selectedTypeId, setSelectedTypeId] = useState("daily");
  const [sections, setSections] = useState<PlannerSection[]>(
    PLANNER_TYPES[0].defaultSections.map((s) => ({ ...s }))
  );
  const [colorId, setColorId] = useState("slate");
  const [fontId, setFontId] = useState("sans");
  const [orientation, setOrientation] = useState<Orientation>("portrait");
  const [pageSize, setPageSize] = useState<PageSize>("letter");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Check pro status on mount
  useEffect(() => {
    const email = localStorage.getItem("planner-pro-email");
    if (email) {
      fetch(`/api/check-pro?email=${encodeURIComponent(email)}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.pro) setIsPro(true);
          else localStorage.removeItem("planner-pro-email");
        })
        .catch(() => {});
    }
  }, []);

  // Handle ?type= query parameter from landing page CTAs
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const typeParam = params.get("type");
    if (typeParam) {
      const type = PLANNER_TYPES.find((t) => t.id === typeParam);
      if (type) {
        setSelectedTypeId(type.id);
        setSections(type.defaultSections.map((s) => ({ ...s })));
        if (type.pro) {
          setShowUpgrade(true);
        }
      }
    }
  }, []);

  const selectedType = PLANNER_TYPES.find((t) => t.id === selectedTypeId)!;
  const selectedColor = COLORS.find((c) => c.id === colorId)!;
  const selectedFont = FONTS.find((f) => f.id === fontId)!;

  const handleTypeSelect = useCallback((type: PlannerType) => {
    if (type.pro && !isPro) {
      setShowUpgrade(true);
      return;
    }
    setSelectedTypeId(type.id);
    setSections(type.defaultSections.map((s) => ({ ...s })));
  }, [isPro]);

  const generatePDF = useCallback(() => {
    setGenerating(true);
    try {
      const isLandscape = orientation === "landscape";
      const size = PAGE_SIZES[pageSize];
      const pxToMm = 25.4 / 72;
      const pageW = (isLandscape ? size.height : size.width) * pxToMm;
      const pageH = (isLandscape ? size.width : size.height) * pxToMm;

      const doc = new jsPDF({
        orientation: isLandscape ? "landscape" : "portrait",
        unit: "mm",
        format: pageSize === "a4" ? "a4" : "letter",
      });

      const margin = 36 * pxToMm;
      const contentW = pageW - margin * 2;
      const contentH = pageH - margin * 2;
      const headerH = 60 * pxToMm;

      // Font
      const fontName = selectedFont.family;

      // Header background
      doc.setFillColor(selectedColor.light);
      doc.roundedRect(margin, margin, contentW, headerH, 2, 2, "F");
      doc.setDrawColor(selectedColor.border);
      doc.roundedRect(margin, margin, contentW, headerH, 2, 2, "S");

      // Header text
      doc.setFont(fontName, "bold");
      doc.setFontSize(18);
      doc.setTextColor(selectedColor.primary);
      doc.text(selectedType.label, margin + 5, margin + 10);

      doc.setFont(fontName, "normal");
      doc.setFontSize(9);
      const r = parseInt(selectedColor.primary.slice(1, 3), 16);
      const g = parseInt(selectedColor.primary.slice(3, 5), 16);
      const b = parseInt(selectedColor.primary.slice(5, 7), 16);
      doc.setTextColor(r, g, b);
      doc.text(
        `${isLandscape ? "Landscape" : "Portrait"} Layout`,
        margin + 5,
        margin + 17
      );

      // Sections
      const sectionStartY = margin + headerH + 3;
      const availableH = contentH - headerH - 3;
      const totalWeight = sections.reduce((s, sec) => s + sec.height, 0);
      const gap = 2.5;
      const totalGaps = (sections.length - 1) * gap;
      const usableH = availableH - totalGaps;

      let currentY = sectionStartY;

      sections.forEach((section) => {
        const sectionH = (section.height / totalWeight) * usableH;
        const labelH = 7;

        // Section box
        doc.setDrawColor(selectedColor.border);
        doc.setFillColor("#ffffff");
        doc.roundedRect(margin, currentY, contentW, sectionH, 1.5, 1.5, "FD");

        // Label background
        doc.setFillColor(selectedColor.light);
        doc.rect(margin + 0.3, currentY + 0.3, contentW - 0.6, labelH, "F");
        doc.setDrawColor(selectedColor.border);
        doc.line(margin, currentY + labelH, margin + contentW, currentY + labelH);

        // Label text
        doc.setFont(fontName, "bold");
        doc.setFontSize(9);
        doc.setTextColor(selectedColor.primary);
        doc.text(section.label, margin + 4, currentY + 5);

        // Lines
        const lineSpacing = 6;
        doc.setDrawColor(selectedColor.border);
        doc.setLineWidth(0.1);
        for (
          let ly = currentY + labelH + lineSpacing;
          ly < currentY + sectionH - 1;
          ly += lineSpacing
        ) {
          doc.line(margin + 3, ly, margin + contentW - 3, ly);
        }

        currentY += sectionH + gap;
      });

      // Watermark (free tier only)
      if (!isPro) {
        doc.setFont("Helvetica", "normal");
        doc.setFontSize(7);
        doc.setTextColor(153, 153, 153);
        doc.text(
          "Made with Printable Planner Maker — printableplanner.org",
          pageW / 2,
          pageH - 5,
          { align: "center" }
        );
      }

      doc.save(`${selectedType.id}-planner.pdf`);
    } finally {
      setGenerating(false);
    }
  }, [orientation, pageSize, selectedType, selectedColor, selectedFont, sections, isPro]);

  return (
    <div className="min-h-screen bg-gray-50">
      {showUpgrade && <UpgradeModal onClose={() => setShowUpgrade(false)} />}

      {/* Header */}
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <h1 className="text-xl font-bold text-gray-900">
              Printable Planner Maker
            </h1>
            <p className="text-sm text-gray-500">
              Create custom planners and download as PDF
            </p>
          </div>
          <button
            onClick={generatePDF}
            disabled={generating}
            className="rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition disabled:opacity-50"
            style={{ backgroundColor: selectedColor.primary }}
          >
            {generating ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Sidebar Controls */}
          <div className="w-full space-y-6 lg:w-80 lg:shrink-0">
            {/* Planner Type */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Planner Type
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {PLANNER_TYPES.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeSelect(type)}
                    className={`relative flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-sm transition ${
                      selectedTypeId === type.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <span className="text-base">{type.icon}</span>
                    <span className="truncate text-xs font-medium">
                      {type.label}
                    </span>
                    {type.pro && !isPro && (
                      <span className="absolute -right-1 -top-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                        PRO
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Color Scheme
              </h2>
              <div className="flex flex-wrap gap-2">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setColorId(color.id)}
                    className={`h-8 w-8 rounded-full border-2 transition ${
                      colorId === color.id
                        ? "border-gray-900 ring-2 ring-gray-300"
                        : "border-transparent hover:scale-110"
                    }`}
                    style={{ backgroundColor: color.primary }}
                    title={color.label}
                  />
                ))}
              </div>
            </div>

            {/* Font */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">Font</h2>
              <div className="flex gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => setFontId(font.id)}
                    className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                      fontId === font.id
                        ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                    style={{
                      fontFamily:
                        font.id === "serif"
                          ? "Georgia, serif"
                          : font.id === "mono"
                            ? "monospace"
                            : "system-ui",
                    }}
                  >
                    {font.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Layout */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Layout
              </h2>
              <div className="space-y-3">
                <div className="flex gap-2">
                  {(["portrait", "landscape"] as const).map((o) => (
                    <button
                      key={o}
                      onClick={() => setOrientation(o)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium capitalize transition ${
                        orientation === o
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {o}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  {(["letter", "a4"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setPageSize(s)}
                      className={`flex-1 rounded-lg border px-3 py-2 text-xs font-medium transition ${
                        pageSize === s
                          ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                          : "border-gray-200 text-gray-600 hover:border-gray-300"
                      }`}
                    >
                      {PAGE_SIZES[s].label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Section Editor */}
            <div className="rounded-xl border border-gray-200 bg-white p-4">
              <SectionEditor
                sections={sections}
                onChange={setSections}
                color={selectedColor.primary}
              />
            </div>
          </div>

          {/* Preview */}
          <div className="flex-1">
            <div className="sticky top-6">
              <h2 className="mb-3 text-sm font-semibold text-gray-900">
                Live Preview
              </h2>
              <PlannerPreview
                plannerType={selectedType}
                sections={sections}
                colorScheme={selectedColor}
                font={selectedFont}
                orientation={orientation}
                svgRef={svgRef}
                isPro={isPro}
              />
              <div className="mt-4 flex justify-center">
                <button
                  onClick={generatePDF}
                  disabled={generating}
                  className="rounded-lg px-8 py-3 text-sm font-semibold text-white shadow-md transition hover:shadow-lg disabled:opacity-50"
                  style={{ backgroundColor: selectedColor.primary }}
                >
                  {generating ? "Generating..." : "Download PDF"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      {!isPro && (
        <section className="border-t border-gray-200 bg-gradient-to-b from-indigo-50 to-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="text-center text-2xl font-bold text-gray-900">
              Unlock All Planner Types
            </h2>
            <p className="mx-auto mt-2 max-w-xl text-center text-gray-600">
              Upgrade to Pro for access to meal, wedding, fitness, budget, and 4 more planner types — plus watermark-free PDF exports.
            </p>
            <div className="mx-auto mt-8 grid max-w-2xl gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <h3 className="font-semibold text-gray-900">Free</h3>
                <p className="mt-1 text-3xl font-bold text-gray-900">$0</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>3 planner types (daily, weekly, monthly)</li>
                  <li>Basic customization</li>
                  <li>PDF download with watermark</li>
                </ul>
              </div>
              <div className="rounded-xl border-2 border-indigo-500 bg-white p-6 shadow-md">
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-indigo-600">Pro</h3>
                  <span className="rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">Popular</span>
                </div>
                <p className="mt-1 text-3xl font-bold text-gray-900">$2.50<span className="text-base font-normal text-gray-500">/mo</span></p>
                <p className="text-xs text-gray-500">$29.99/yr or $3.99/mo</p>
                <ul className="mt-4 space-y-2 text-sm text-gray-600">
                  <li>All 11 planner types</li>
                  <li>Full customization</li>
                  <li>No watermark</li>
                  <li>Landscape + A4 layouts</li>
                </ul>
                <button
                  onClick={() => setShowUpgrade(true)}
                  className="mt-4 w-full rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Upgrade to Pro
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* SEO / Info Section */}
      <section className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Free Printable Planner Maker
          </h2>
          <p className="mt-3 max-w-3xl text-gray-600">
            Create beautiful, customizable planners and download them as
            print-ready PDFs. Choose from daily, weekly, and monthly layouts.
            Customize sections, colors, and fonts to match your style. All
            planners are generated in your browser — no account required.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            <div>
              <h3 className="font-semibold text-gray-900">Fully Customizable</h3>
              <p className="mt-1 text-sm text-gray-600">
                Add, remove, and reorder sections. Pick from 8 color schemes and 3
                font styles. Portrait or landscape layout.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Print-Ready PDFs</h3>
              <p className="mt-1 text-sm text-gray-600">
                Download high-quality PDFs sized for US Letter or A4 paper. Ready
                to print at home or at any print shop.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">No Account Needed</h3>
              <p className="mt-1 text-sm text-gray-600">
                Everything runs in your browser. No sign-up, no data collection.
                Just create and download your planner.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6">
          <p className="text-center text-sm text-gray-500">
            Printable Planner Maker — Free printable planners for daily, weekly,
            and monthly planning.
          </p>
        </div>
      </footer>
    </div>
  );
}
