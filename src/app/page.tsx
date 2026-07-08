import Link from "next/link";

export default function Home() {
  return (
    <main className="p-8 flex flex-col items-center justify-center text-center gap-6 mt-20">
      <h1 className="text-5xl font-bold">Witaj w SklepGrovly</h1>
      <p className="text-lg text-gray-600 max-w-xl">
        Twój sklep. Przeglądaj produkty, wybieraj kategorie i rób zakupy.
      </p>
      <div className="flex gap-4">
        <Link
          href="/produkty"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Zobacz produkty
        </Link>
        <Link
          href="/kategorie"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 transition"
        >
          Przeglądaj kategorie
        </Link>
      </div>
    </main>
  );
}