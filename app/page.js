import Link from "next/link";
import SearchBar from "./components/SearchBar";

export default async function Page() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/filter.php?a=Thai",
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const meals = data.meals || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          🇹🇭 เมนูอาหารไทย
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          ค้นพบสูตรอาหารไทยแท้ๆ ทั้งวิธีทำ วัตถุดิบ และส่วนผสมที่ครบถ้วน
        </p>
      </section>

      {/* Search Bar */}
      <SearchBar meals={meals} />

      {/* Meal Grid */}
      <div
        id="meal-grid"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {meals.map((meal) => (
          <div key={meal.idMeal} data-meal-card data-meal-name={meal.strMeal}>
            <Link href={`/meal/${meal.idMeal}`} className="block group">
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
          </div>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
