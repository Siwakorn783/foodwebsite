import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

function extractIngredients(meal) {
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
  return ingredients;
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals?.[0];

  if (!meal) {
    return { title: "ไม่พบเมนูอาหาร" };
  }

  return {
    title: `${meal.strMeal} - Thai Kitchen`,
    description: `${meal.strMeal} - สูตรอาหารไทยแท้จาก Thai Kitchen`,
  };
}

export default async function MealDetailPage({ params }) {
  const { id } = await params;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );
  const data = await res.json();
  const meal = data.meals?.[0];

  if (!meal) {
    notFound();
  }

  const ingredients = extractIngredients(meal);
  const instructions = meal.strInstructions
    .split(/\r?\n/)
    .filter((line) => line.trim());

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-sm text-muted mb-6">
        <Link href="/" className="hover:text-primary transition-colors">
          หน้าแรก
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium line-clamp-1">
          {meal.strMeal}
        </span>
      </nav>

      {/* Hero */}
      <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden mb-8 shadow-lg">
        <Image
          src={meal.strMealThumb}
          alt={meal.strMeal}
          fill
          sizes="(max-width: 896px) 100vw, 896px"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            {meal.strMeal}
          </h1>
          <div className="flex flex-wrap gap-2">
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

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Ingredients - Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-card-bg rounded-xl border border-card-border p-6 sticky top-24">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
              <span className="text-accent">🥄</span> วัตถุดิบ
            </h2>
            <ul className="space-y-2">
              {ingredients.map((item, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-sm py-1.5 border-b border-card-border last:border-0"
                >
                  <img
                    src={`https://www.themealdb.com/images/ingredients/${item.ingredient}-Small.png`}
                    alt={item.ingredient}
                    className="w-8 h-8 rounded-full bg-stone-100 p-0.5"
                    loading="lazy"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="font-medium text-foreground">
                      {item.ingredient}
                    </span>
                    {item.measure && (
                      <span className="text-muted ml-1">
                        {item.measure}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Instructions */}
        <div className="lg:col-span-2">
          <div className="bg-card-bg rounded-xl border border-card-border p-6 md:p-8">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="text-accent">📖</span> วิธีทำ
            </h2>
            <ol className="space-y-4">
              {instructions.filter((step) => step.trim() !== "" && !/^step\s*\d+/i.test(step.trim())).map((step, index) => (
                <li key={index} className="flex gap-3">
                  <span className="flex-shrink-0 w-7 h-7 bg-primary text-white rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </span>
                  <p className="text-foreground leading-relaxed pt-0.5">
                    {step}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          {/* Video */}
          {meal.strYoutube && (
            <div className="mt-8 bg-card-bg rounded-xl border border-card-border p-6 md:p-8">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <span className="text-red-500">▶️</span> วิดีโอวิธีทำ
              </h2>
              <div className="relative w-full aspect-video rounded-xl overflow-hidden">
                <iframe
                  src={`https://www.youtube.com/embed/${meal.strYoutube.split("v=")[1]}`}
                  title={`วิดีโอวิธีทำ ${meal.strMeal}`}
                  className="absolute inset-0 w-full h-full"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          )}

          {/* Source */}
          {meal.strSource && (
            <div className="mt-6 text-center">
              <a
                href={meal.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                ดูสูตรต้นฉบับ &rarr;
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Back button */}
      <div className="mt-10 text-left">
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-medium hover:bg-red-700 transition-colors shadow-md"
        >
          &larr; กลับไปดูเมนูอื่น
        </Link>
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
