"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import { authFetch } from "@/app/lib/authFetch";
import Link from "next/link";

export default function KasaPage() {
    const router = useRouter();
    const { items, total, clearCart } = useCart();

    // pola dostawy
    const [imieOdbiorcy, setImieOdbiorcy] = useState("");
    const [nazwiskoOdbiorcy, setNazwiskoOdbiorcy] = useState("");
    const [ulica, setUlica] = useState("");
    const [nrDomu, setNrDomu] = useState("");
    const [kodPocztowy, setKodPocztowy] = useState("");
    const [miejscowosc, setMiejscowosc] = useState("");
    const [telefonOdbiorcy, setTelefonOdbiorcy] = useState("");

    const [blad, setBlad] = useState("");
    const [skladanie, setSkladanie] = useState(false);

    // podpowiadanie — pobierz dane zalogowanego usera i wstępnie wypełnij
    useEffect(() => {
        const pobierzDane = async () => {
            try {
                const res = await authFetch("http://localhost:5219/api/Auth/me");
                if (res.ok) {
                    const dane = await res.json();
                    setImieOdbiorcy(dane.imie ?? "");
                    setNazwiskoOdbiorcy(dane.nazwisko ?? "");
                    setTelefonOdbiorcy(dane.nrTelefonu ?? "");
                }
                // jak 401 — niezalogowany, pola zostają puste (albo przekierowanie)
            } catch {
                // cichy błąd — user i tak może wypełnić ręcznie
            }
        };
        pobierzDane();
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setBlad("");

        // walidacja kodu pocztowego (format XX-XXX) — szybka informacja dla usera
        const kodRegex = /^\d{2}-\d{3}$/;
        if (!kodRegex.test(kodPocztowy)) {
            setBlad("Kod pocztowy musi mieć format XX-XXX (np. 00-950).");
            return;
        }

        setSkladanie(true);

        const pozycje = items.map((item) => ({
            id_Produkt: item.id_Produkt,
            ilosc: item.ilosc,
        }));

        try {
            const res = await authFetch("http://localhost:5219/api/Order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    pozycje,
                    imieOdbiorcy,
                    nazwiskoOdbiorcy,
                    ulica,
                    nrDomu,
                    kodPocztowy,
                    miejscowosc,
                    telefonOdbiorcy,
                }),
            });

            if (res.status === 401) {
                router.push("/logowanie");
                return;
            }

            if (!res.ok) {
                setBlad("Nie udało się złożyć zamówienia. Sprawdź dane i dostępność produktów.");
                return;
            }

            const potwierdzenie = await res.json();
            sessionStorage.setItem("ostatnieZamowienie", JSON.stringify(potwierdzenie));
            clearCart();
            router.push("/zamowienie-zlozone");
        } catch {
            setBlad("Błąd połączenia z serwerem.");
        } finally {
            setSkladanie(false);
        }
    };

    // pusty koszyk — nie ma czego zamawiać
    if (items.length === 0) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">
                    Twój koszyk jest pusty
                </h1>
                <Link href="/produkty" className="text-grovly font-medium hover:underline">
                    Przeglądaj produkty →
                </Link>
            </main>
        );
    }

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Dane do wysyłki</h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* FORMULARZ — 2/3 szerokości */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 flex flex-col gap-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Imię</label>
                                <input
                                    type="text"
                                    value={imieOdbiorcy}
                                    onChange={(e) => setImieOdbiorcy(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nazwisko</label>
                                <input
                                    type="text"
                                    value={nazwiskoOdbiorcy}
                                    onChange={(e) => setNazwiskoOdbiorcy(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ulica</label>
                                <input
                                    type="text"
                                    value={ulica}
                                    onChange={(e) => setUlica(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Nr domu / lok.</label>
                                <input
                                    type="text"
                                    value={nrDomu}
                                    onChange={(e) => setNrDomu(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Kod pocztowy</label>
                                <input
                                    type="text"
                                    value={kodPocztowy}
                                    onChange={(e) => setKodPocztowy(e.target.value)}
                                    placeholder="XX-XXX"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Miejscowość</label>
                                <input
                                    type="text"
                                    value={miejscowosc}
                                    onChange={(e) => setMiejscowosc(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                            <input
                                type="text"
                                value={telefonOdbiorcy}
                                onChange={(e) => setTelefonOdbiorcy(e.target.value)}
                                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:border-grovly focus:ring-1 focus:ring-grovly transition"
                                required
                            />
                        </div>

                        {blad && <p className="text-red-600 text-sm">{blad}</p>}

                        <button
                            type="submit"
                            disabled={skladanie}
                            className="mt-2 bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition cursor-pointer disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                            {skladanie ? "Składanie zamówienia..." : "Złóż zamówienie"}
                        </button>

                        <Link href="/koszyk" className="text-center text-sm text-gray-500 hover:text-gray-700">
                            ← Wróć do koszyka
                        </Link>
                    </form>

                    {/* PODSUMOWANIE — 1/3 szerokości */}
                    <div className="lg:col-span-1">
                        <div className="border border-gray-200 rounded-2xl p-6 sticky top-24">
                            <h2 className="font-semibold text-gray-900 mb-4">Podsumowanie</h2>

                            <div className="space-y-3 mb-4">
                                {items.map((item) => (
                                    <div key={item.id_Produkt} className="flex justify-between text-sm">
                                        <span className="text-gray-600">
                                            {item.nazwa} <span className="text-gray-400">× {item.ilosc}</span>
                                        </span>
                                        <span className="text-gray-900 font-medium">
                                            {(item.cena * item.ilosc).toFixed(2)} zł
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-between border-t border-gray-200 pt-4">
                                <span className="text-gray-500">Razem</span>
                                <span className="text-xl font-bold text-gray-900">{total.toFixed(2)} zł</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}