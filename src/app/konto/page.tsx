"use client";

import { useState, useEffect } from "react";
import { authFetch } from "@/app/lib/authFetch";
import Link from "next/link";

type UserDetails = {
    imie: string;
    nazwisko: string;
    email: string;
    nrTelefonu: string;
};

export default function KontoPage() {
    const [dane, setDane] = useState<UserDetails | null>(null);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const pobierz = async () => {
            try {
                const res = await authFetch("http://localhost:5219/api/Auth/me");
                if (res.ok) {
                    const data = await res.json();
                    setDane(data);
                } else {
                    setError(`Nie udało się pobrać danych (${res.status})`);
                }
            } catch {
                setError("Błąd połączenia z serwerem");
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
                    Zaloguj się ponownie →
                </Link>
            </main>
        );
    }

    return (
        <main className="py-16 px-8 bg-white min-h-[70vh]">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Moje konto</h1>

                {/* Karta z danymi */}
                <div className="border border-gray-200 rounded-2xl p-6 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-full bg-grovly/10 flex items-center justify-center text-grovly text-2xl font-bold">
                            {dane?.imie?.[0]}{dane?.nazwisko?.[0]}
                        </div>
                        <div>
                            <h2 className="text-xl font-semibold text-gray-900">
                                {dane?.imie} {dane?.nazwisko}
                            </h2>
                            <p className="text-gray-500 text-sm">{dane?.email}</p>
                        </div>
                    </div>

                    <div className="space-y-3 border-t border-gray-100 pt-4">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Imię</span>
                            <span className="text-gray-900 font-medium">{dane?.imie}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Nazwisko</span>
                            <span className="text-gray-900 font-medium">{dane?.nazwisko}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Email</span>
                            <span className="text-gray-900 font-medium">{dane?.email}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Telefon</span>
                            <span className="text-gray-900 font-medium">{dane?.nrTelefonu}</span>
                        </div>
                    </div>
                </div>

                {/* Akcje — na razie placeholdery */}
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <Link href="/konto/edytuj" className="flex-1 border border-gray-300 text-gray-700 text-center py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">
                        Edytuj dane
                    </Link>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl font-medium hover:bg-gray-50 transition">
                        Zmień hasło
                    </button>
                    <Link href="/konto/zamowienia" className="flex-1 bg-grovly text-white text-center py-2.5 rounded-xl font-medium hover:bg-grovly-dark transition">
                        Moje zamówienia
                    </Link>
                </div>
            </div>
        </main>
    );
}