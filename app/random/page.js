import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata = {
  title: "สุ่มเมนูอาหาร - Thai Kitchen",
};

export default async function RandomPage() {
  const detailRes = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const detailData = await detailRes.json();
  const meal = detailData.meals?.[0];

  if (!meal) {
    notFound();
  }

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        ingredient: ingredient.trim(),
        measure: measure ? measure.trim() : "",
      });
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <section className="text-center mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-3">🎲 สุ่มเมนูอาหาร</h1>
        <p className="text-muted text-lg">เมนูสุ่มสำหรับวันนี้!</p>
      </section>

      <div className="bg-card-bg rounded-2xl border border-card-border overflow-hidden shadow-lg">
        <div className="relative w-full aspect-[16/9]">
          <Image
            src={meal.strMealThumb}
            alt={meal.strMeal}
            fill
            sizes="(max-width: 896px) 100vw, 896px"
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <h2 className="text-3xl font-bold text-white">{meal.strMeal}</h2>
            <div className="flex gap-2 mt-2">
              {meal.strArea && (
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  🌍 {meal.strArea}
                </span>
              )}
              {meal.strCategory && (
                <span className="bg-white/20 backdrop-blur-sm text-white text-sm px-3 py-1 rounded-full">
                  🏷️ {meal.strCategory}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-accent">🥄</span> วัตถุดิบ
            </h3>
            <ul className="space-y-1.5">
              {ingredients.map((item, index) => (
                <li key={index} className="text-sm flex items-center gap-2 py-1 border-b border-card-border last:border-0">
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                    alt={item.ingredient}
                    className="w-6 h-6 rounded-full bg-stone-100 p-0.5"
                    loading="lazy"
                  />
                  <span className="font-medium">{item.ingredient}</span>
                  <span className="text-muted">{item.measure}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-2">
              <span className="text-accent">📖</span> วิธีทำ
            </h3>
            <div className="text-sm leading-relaxed text-foreground whitespace-pre-line">
              {meal.strInstructions}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-4 justify-center">
        <Link
          href={`/meal/${meal.idMeal}`}
          className="bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-md"
        >
          ดูรายละเอียดแบบเต็ม
        </Link>
        <Link
          href="/random"
          className="bg-accent text-white px-6 py-3 rounded-xl font-medium hover:bg-amber-600 transition-colors shadow-md"
        >
          🎲 สุ่มอีกครั้ง
        </Link>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
