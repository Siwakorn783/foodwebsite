"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

export default function CountryTabs({ data }) {
  const [activeCountry, setActiveCountry] = useState(data[0].code);
  const [query, setQuery] = useState("");

  const activeMeals = useMemo(() => {
    const country = data.find((c) => c.code === activeCountry);
    if (!query.trim()) return country.meals;
    const lower = query.toLowerCase();
    return country.meals.filter((m) =>
      m.strMeal.toLowerCase().includes(lower)
    );
  }, [activeCountry, query, data]);

  return (
    <>
      {/* Country Tabs */}
      <div className="flex justify-center gap-2 sm:gap-4 mb-6">
        {data.map((country) => (
          <button
            key={country.code}
            onClick={() => {
              setActiveCountry(country.code);
              setQuery("");
            }}
            className={`px-6 py-2.5 rounded-full font-medium text-sm sm:text-base transition-all shadow-sm ${
              activeCountry === country.code
                ? "bg-primary text-white shadow-md scale-105"
                : "bg-card-bg text-muted border border-card-border hover:bg-red-50 hover:text-primary"
            }`}
          >
            {country.flag} {country.label}
          </button>
        ))}
      </div>

      {/* Search Bar */}
      <div className="max-w-md mx-auto relative mb-6">
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

      {query.trim() && (
        <p className="text-center text-sm text-muted mb-6">
          พบ <span className="font-bold text-primary">{activeMeals.length}</span> เมนู
        </p>
      )}

      {/* Meal Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {activeMeals.map((meal) => (
          <Link key={meal.idMeal} href={`/meal/${meal.idMeal}`} className="block group">
            <div className="bg-card-bg rounded-xl overflow-hidden shadow-md card-hover border border-card-border h-full">
              <div className="relative aspect-[4/3] w-full">
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-foreground line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                  {meal.strMeal}
                </h3>
                <span className="inline-block mt-2 text-xs font-medium text-primary bg-red-50 px-2 py-1 rounded-full">
                  ดูสูตรอาหาร &rarr;
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {activeMeals.length === 0 && (
        <p className="text-center text-muted mt-8">
          ไม่พบเมนูที่ค้นหา ลองค้นหาด้วยคำอื่นดู
        </p>
      )}
    </>
  );
}
