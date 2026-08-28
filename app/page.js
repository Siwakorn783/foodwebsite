import CountryTabs from "./components/CountryTabs";

const COUNTRIES = [
  { code: "Thai", label: "ไทย", flag: "🇹🇭" },
  { code: "Japanese", label: "ญี่ปุ่น", flag: "🇯🇵" },
  { code: "Chinese", label: "จีน", flag: "🇨🇳" },

];

async function fetchMeals(countryCode) {
  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${countryCode}`,
    { next: { revalidate: 3600 } }
  );
  const data = await res.json();
  return data.meals || [];
}

export default async function Page() {
  const data = await Promise.all(
    COUNTRIES.map(async (country) => ({
      ...country,
      meals: await fetchMeals(country.code),
    }))
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-3">
          🍜 เมนูอาหารเอเชีย
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto">
          ค้นพบสูตรอาหารไทย ญี่ปุ่น และจีน พร้อมวิธีทำ วัตถุดิบ และส่วนผสม
        </p>
      </section>

      {/* Tabs + Search + Grid */}
      <CountryTabs data={data} />
    </div>
  );
}

export const dynamic = "force-dynamic";
