"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";
import { Check } from "lucide-react";

export default function LogowaniePage() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [haslo, setHaslo] = useState("");
    const [blad, setBlad] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlad("");

        try {
            const res = await fetch("http://localhost:5219/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, haslo }),
            });

            if (!res.ok) {
                if (res.status === 401) {
                    setBlad("Nieprawidłowy email lub hasło.");
                } else {
                    setBlad("Nie udało się zalogować. Spróbuj ponownie.");
                }
                return;
            }

            const data = await res.json();
            login(data.accessToken, data.refreshToken);
            router.push("/");
        } catch (err) {
            setBlad("Błąd połączenia z serwerem.");
        }
    };

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-8">
                {/* LEWA — logowanie */}
                <div className="md:pr-8 md:border-r border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Mam już konto
                    </h1>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                E-mail
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Hasło
                            </label>
                            <input
                                type="password"
                                value={haslo}
                                onChange={(e) => setHaslo(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                required
                            />
                        </div>

                        {blad && (
                            <p className="text-red-600 text-sm">{blad}</p>
                        )}

                        <button
                            type="submit"
                            className="mt-2 bg-grovly text-white py-3 rounded-lg font-semibold hover:bg-grovly-dark transition cursor-pointer"
                        >
                            Zaloguj się
                        </button>
                    </form>
                </div>

                {/* PRAWA — załóż konto */}
                <div className="md:pl-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                        Nie mam konta
                    </h2>

                    <Link
                        href="/rejestracja"
                        className="block w-full text-center border-2 border-grovly text-grovly py-3 rounded-lg font-semibold hover:bg-grovly hover:text-white transition cursor-pointer"
                    >
                        Załóż konto
                    </Link>

                    <div className="mt-8">
                        <p className="text-sm font-semibold text-gray-900 mb-4">
                            Zakładając konto:
                        </p>
                        <ul className="space-y-3">
                            {[
                                "Śledź swoje zamówienia",
                                "Wystawiaj opinie o produktach",
                                "Kupuj szybciej przy kolejnych zakupach",
                                "Miej wgląd w historię swoich zamówień",
                            ].map((korzysc) => (
                                <li key={korzysc} className="flex items-center gap-3">
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-grovly/10 flex items-center justify-center">
                                        <Check className="w-3 h-3 text-grovly" strokeWidth={3} />
                                    </span>
                                    <span className="text-sm text-gray-600">{korzysc}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </main>
    );
}