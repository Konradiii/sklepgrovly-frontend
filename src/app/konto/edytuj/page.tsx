"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/app/lib/authFetch";
import Link from "next/link";

export default function EdytujDanePage() {
    const router = useRouter();

    const [imie, setImie] = useState("");
    const [nazwisko, setNazwisko] = useState("");
    const [nrTelefonu, setNrTelefonu] = useState("");

    const [ladowanie, setLadowanie] = useState(true);
    const [zapisywanie, setZapisywanie] = useState(false);
    const [blad, setBlad] = useState("");

    // podpowiadanie — pobierz obecne dane
    useEffect(() => {
        const pobierz = async () => {
            try {
                const res = await authFetch("http://localhost:5219/api/Auth/me");
                if (res.ok) {
                    const dane = await res.json();
                    setImie(dane.imie ?? "");
                    setNazwisko(dane.nazwisko ?? "");
                    setNrTelefonu(dane.nrTelefonu ?? "");
                } else {
                    setBlad("Nie udało się pobrać danych.");
                }
            } catch {
                setBlad("Błąd połączenia z serwerem.");
            } finally {
                setLadowanie(false);
            }
        };
        pobierz();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlad("");
        setZapisywanie(true);

        try {
            const res = await authFetch("http://localhost:5219/api/Auth/me", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ imie, nazwisko, nrTelefonu }),
            });

            if (res.ok) {
                router.push("/konto");
            } else {
                setBlad("Nie udało się zapisać zmian. Sprawdź dane.");
                setZapisywanie(false);
            }
        } catch {
            setBlad("Błąd połączenia z serwerem.");
            setZapisywanie(false);
        }
    };

    if (ladowanie) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex items-center justify-center">
                <p className="text-gray-500">Ładowanie...</p>
            </main>
        );
    }

    const inputClass =
        "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition";

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-md mx-auto">
                <Link href="/konto" className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block">
                    ← Wróć do konta
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-8">Edytuj dane</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Imię</label>
                        <input
                            type="text"
                            value={imie}
                            onChange={(e) => setImie(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nazwisko</label>
                        <input
                            type="text"
                            value={nazwisko}
                            onChange={(e) => setNazwisko(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                        <input
                            type="text"
                            value={nrTelefonu}
                            onChange={(e) => setNrTelefonu(e.target.value)}
                            className={inputClass}
                        />
                    </div>

                    {blad && <p className="text-red-600 text-sm">{blad}</p>}

                    <button
                        type="submit"
                        disabled={zapisywanie}
                        className="mt-2 bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {zapisywanie ? "Zapisywanie..." : "Zapisz zmiany"}
                    </button>
                </form>
            </div>
        </main>
    );
}