

"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/app/lib/authFetch";
import Link from "next/link";
import { Package } from "lucide-react";

type Zamowienie = {
    id_Zamowienie: number;
    dataZamowienia: string;
    status: string;
    sumaCalkowita: number;
    nazwyProduktow: string[];
};

// kolory badge statusu
const statusStyle: Record<string, string> = {
    Nowe: "bg-blue-100 text-blue-700",
    Oplacone: "bg-green-100 text-green-700",
    Wyslane: "bg-purple-100 text-purple-700",
    Zrealizowane: "bg-gray-100 text-gray-700",
    Anulowane: "bg-red-100 text-red-700",
};

export default function MojeZamowieniaPage() {
    const [zamowienia, setZamowienia] = useState<Zamowienie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const pobierz = async () => {
            try {
                const res = await authFetch("http://localhost:5219/api/Order/me");
                if (res.ok) {
                    const data = await res.json();
                    setZamowienia(data);
                } else if (res.status === 401) {
                    setError("Zaloguj się, aby zobaczyć swoje zamówienia.");
                } else {
                    setError("Nie udało się pobrać zamówień.");
                }
            } catch {
                setError("Błąd połączenia z serwerem.");
            } finally {
                setLoading(false);
            }
        };
        pobierz();
    }, []);

    if (loading) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex items-center justify-center">
                <p className="text-gray-500">Ładowanie...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex flex-col items-center justify-center gap-4">
                <p className="text-red-600">{error}</p>
                <Link href="/logowanie" className="text-grovly font-medium hover:underline">
                    Zaloguj się →
                </Link>
            </main>
        );
    }

    // brak zamówień
    if (zamowienia.length === 0) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex flex-col items-center justify-center text-center">
                <Package className="w-16 h-16 text-gray-300 mb-4" strokeWidth={1.5} />
                <h1 className="text-2xl font-bold text-gray-900 mb-2">Nie masz jeszcze zamówień</h1>
                <p className="text-gray-500 mb-6">Gdy złożysz pierwsze zamówienie, pojawi się tutaj.</p>
                <Link href="/produkty" className="bg-grovly text-white px-6 py-2.5 rounded-xl font-medium hover:bg-grovly-dark transition">
                    Przeglądaj produkty
                </Link>
            </main>
        );
    }

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Moje zamówienia</h1>

                <div className="flex flex-col gap-4">
                    {zamowienia.map((z) => {
                        const data = new Date(z.dataZamowienia).toLocaleDateString("pl-PL", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        });
                        const badge = statusStyle[z.status] ?? "bg-gray-100 text-gray-700";

                        return (
                            <div
                                key={z.id_Zamowienie}
                                className="border border-gray-200 rounded-2xl p-6 hover:shadow-md transition"
                            >
                                {/* Nagłówek — numer, status */}
                                <div className="flex items-center justify-between mb-3">
                                    <div>
                                        <span className="font-semibold text-gray-900">
                                            Zamówienie #{z.id_Zamowienie}
                                        </span>
                                        <span className="text-gray-400 text-sm ml-3">{data}</span>
                                    </div>
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full ${badge}`}>
                                        {z.status}
                                    </span>
                                </div>

                                {/* Produkty */}
                                <p className="text-sm text-gray-600 mb-3">
                                    {z.nazwyProduktow.join(", ")}
                                </p>

                                {/* Suma */}
                                <div className="flex justify-between items-center border-t border-gray-100 pt-3">
                                    <span className="text-sm text-gray-500">
                                        {z.nazwyProduktow.length}{" "}
                                        {z.nazwyProduktow.length === 1 ? "pozycja" : "pozycje"}
                                    </span>
                                    <span className="font-bold text-gray-900">
                                        {z.sumaCalkowita.toFixed(2)} zł
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </main>
    );
}