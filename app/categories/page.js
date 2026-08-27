import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "หมวดหมู่อาหาร - Thai Kitchen",
};

export default async function CategoriesPage() {
  const res = await fetch(
    "https://www.themealdb.com/api/json/v1/1/categories.php",
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  const categories = data.categories || [];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <section className="text-center mb-10">
        <h1 className="text-4xl font-bold text-foreground mb-3">🏷️ หมวดหมู่อาหาร</h1>
        <p className="text-muted text-lg">เลือกหมวดหมู่เพื่อดูเมนูอาหารที่ต้องการ</p>
      </section>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.idCategory}
            href={`/?category=${cat.strCategory}`}
            className="block group"
          >
            <div className="bg-card-bg rounded-xl overflow-hidden shadow-md card-hover border border-card-border text-center">
              <div className="relative aspect-square w-full">
                <Image
                  src={`${cat.strCategoryThumb}`}
                  alt={cat.strCategory}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-contain p-2 group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm text-foreground group-hover:text-primary transition-colors">
                  {cat.strCategory}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export const dynamic = "force-dynamic";
