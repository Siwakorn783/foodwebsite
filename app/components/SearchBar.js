"use client";

import { useState, useEffect } from "react";

export default function SearchBar({ meals }) {
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (query.trim().length === 0) {
      setFiltered([]);
      setShowResults(false);
      // Show all meals again
      document.querySelectorAll("[data-meal-card]").forEach((el) => {
        el.style.display = "";
      });
      return;
    }

    const lower = query.toLowerCase();
    const matches = meals.filter((m) =>
      m.strMeal.toLowerCase().includes(lower)
    );
    setFiltered(matches);
    setShowResults(true);

    // Show/hide cards in the grid
    document.querySelectorAll("[data-meal-card]").forEach((el) => {
      const name = el.getAttribute("data-meal-name") || "";
      el.style.display = name.toLowerCase().includes(lower) ? "" : "none";
    });
  }, [query, meals]);

  return (
    <div className="mb-8">
      <div className="max-w-md mx-auto relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="ค้นหาเมนูอาหาร..."
          className="w-full px-4 py-3 pl-10 rounded-xl border border-card-border bg-card-bg shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary text-foreground"
        />
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {query && (
          <button
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
          >
            ✕
          </button>
        )}
      </div>
      {showResults && (
        <p className="text-center text-sm text-muted mt-3">
          พบ <span className="font-bold text-primary">{filtered.length}</span> เมนู
        </p>
      )}
    </div>
  );
}
