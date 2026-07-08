import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center min-h-[80vh] flex items-center"
      style={{ backgroundImage: "url('/hero-bg.png')" }}
    >
      <div className="max-w-2xl px-8 md:px-16">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
          Zabawa, która rozwija
        </h1>
        <p className="mt-6 text-lg text-gray-700 max-w-lg">
          Starannie dobrane zabawki edukacyjne, które wspierają rozwój Twojego
          dziecka - bezpieczne, przemyślane, oparte na badaniach.
        </p>
        <div className="mt-8 flex gap-4">
          <Link
            href="/produkty"
            className="bg-[#8FB859] text-white px-8 py-3 rounded-full font-semibold hover:bg-[#7da54c] transition"
          >
            Zobacz produkty
          </Link>
          <Link
            href="/kategorie"
            className="bg-white text-gray-800 px-8 py-3 rounded-full font-semibold border border-gray-200 hover:bg-gray-50 transition"
          >
            Kategorie
          </Link>
        </div>
      </div>
    </section>
  );
}