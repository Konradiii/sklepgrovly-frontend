"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authFetch } from "@/app/lib/authFetch";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ZmienHasloPage() {
    const router = useRouter();
    const { logout } = useAuth();

    const [stareHaslo, setStareHaslo] = useState("");
    const [noweHaslo, setNoweHaslo] = useState("");
    const [potwierdzNoweHaslo, setPotwierdzNoweHaslo] = useState("");

    const [zapisywanie, setZapisywanie] = useState(false);
    const [blad, setBlad] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlad("");

        // walidacja zgodności na froncie (backend też sprawdza)
        if (noweHaslo !== potwierdzNoweHaslo) {
            setBlad("Nowe hasła nie są zgodne.");
            return;
        }
        if (noweHaslo.length < 8) {
            setBlad("Nowe hasło musi mieć min. 8 znaków.");
            return;
        }

        setZapisywanie(true);

        try {
            const res = await authFetch("http://localhost:5219/api/Auth/me/haslo", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ stareHaslo, noweHaslo, potwierdzNoweHaslo }),
            });

            if (res.ok) {
                // hasło zmienione — wszystkie sesje unieważnione, więc wyloguj i przekieruj
                logout();
                router.push("/logowanie?haslo-zmienione=1");
            } else if (res.status === 401) {
                setBlad("Nieprawidłowe obecne hasło.");
                setZapisywanie(false);
            } else {
                setBlad("Nie udało się zmienić hasła. Sprawdź dane.");
                setZapisywanie(false);
            }
        } catch {
            setBlad("Błąd połączenia z serwerem.");
            setZapisywanie(false);
        }
    };

    const inputClass =
        "w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition";

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-md mx-auto">
                <Link href="/konto" className="text-sm text-gray-500 hover:text-gray-700 mb-6 inline-block">
                    ← Wróć do konta
                </Link>

                <h1 className="text-3xl font-bold text-gray-900 mb-2">Zmień hasło</h1>
                <p className="text-sm text-gray-500 mb-8">
                    Po zmianie hasła zostaniesz wylogowany ze wszystkich urządzeń.
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Obecne hasło</label>
                        <input
                            type="password"
                            value={stareHaslo}
                            onChange={(e) => setStareHaslo(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Nowe hasło</label>
                        <input
                            type="password"
                            value={noweHaslo}
                            onChange={(e) => setNoweHaslo(e.target.value)}
                            className={inputClass}
                            required
                        />
                        <p className="text-xs text-gray-400 mt-1">Minimum 8 znaków.</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Powtórz nowe hasło</label>
                        <input
                            type="password"
                            value={potwierdzNoweHaslo}
                            onChange={(e) => setPotwierdzNoweHaslo(e.target.value)}
                            className={inputClass}
                            required
                        />
                    </div>

                    {blad && <p className="text-red-600 text-sm">{blad}</p>}

                    <button
                        type="submit"
                        disabled={zapisywanie}
                        className="mt-2 bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                        {zapisywanie ? "Zmienianie..." : "Zmień hasło"}
                    </button>
                </form>
            </div>
        </main>
    );
}