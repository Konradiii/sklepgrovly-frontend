"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

type Pozycja = {
    id_Produkt: number;
    nazwaProduktu: string;
    ilosc: number;
    cenaJednostkowa: number;
    cenaPozycji: number;
};

type OrderConfirmation = {
    id_Zamowienie: number;
    dataZamowienia: string;
    status: string | number;
    sumaCalkowita: number;
    pozycje: Pozycja[];
    imieOdbiorcy: string;
    nazwiskoOdbiorcy: string;
    ulica: string;
    nrDomu: string;
    kodPocztowy: string;
    miejscowosc: string;
    telefonOdbiorcy: string;
};

export default function ZamowienieZlozonePage() {
    const [zamowienie, setZamowienie] = useState<OrderConfirmation | null>(null);

    useEffect(() => {
        const zapisane = sessionStorage.getItem("ostatnieZamowienie");
        if (zapisane) {
            setZamowienie(JSON.parse(zapisane));
        }
    }, []);

    // brak danych (np. wejście bezpośrednio na URL)
    if (!zamowienie) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex flex-col items-center justify-center text-center">
                <CheckCircle className="w-16 h-16 text-grovly mb-6" strokeWidth={1.5} />
                <h1 className="text-3xl font-bold text-gray-900 mb-3">Dziękujemy za zamówienie!</h1>
                <p className="text-gray-500 mb-6">Twoje zamówienie zostało przyjęte.</p>
                <Link href="/produkty" className="text-grovly font-medium hover:underline">
                    Przeglądaj produkty →
                </Link>
            </main>
        );
    }

    const data = new Date(zamowienie.dataZamowienia).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <main className="py-16 px-6 bg-white min-h-[70vh]">
            <div className="max-w-2xl mx-auto">
                {/* Nagłówek sukcesu */}
                <div className="text-center mb-10">
                    <div className="flex justify-center mb-4">
                        <CheckCircle className="w-16 h-16 text-grovly" strokeWidth={1.5} />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Dziękujemy za zamówienie!
                    </h1>
                    <p className="text-gray-500">
                        Zamówienie #{zamowienie.id_Zamowienie} zostało przyjęte {data}.
                    </p>
                </div>

                {/* Pozycje */}
                <div className="border border-gray-200 rounded-2xl p-6 mb-6">
                    <h2 className="font-semibold text-gray-900 mb-4">Zamówione produkty</h2>
                    <div className="space-y-3">
                        {zamowienie.pozycje.map((p) => (
                            <div key={p.id_Produkt} className="flex justify-between items-center text-sm">
                                <div>
                                    <span className="text-gray-900">{p.nazwaProduktu}</span>
                                    <span className="text-gray-400"> × {p.ilosc}</span>
                                </div>
                                <span className="text-gray-900 font-medium">
                                    {p.cenaPozycji.toFixed(2)} zł
                                </span>
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between border-t border-gray-200 pt-4 mt-4">
                        <span className="text-gray-500">Razem</span>
                        <span className="text-xl font-bold text-gray-900">
                            {zamowienie.sumaCalkowita.toFixed(2)} zł
                        </span>
                    </div>
                </div>

                {/* Adres dostawy */}
                <div className="border border-gray-200 rounded-2xl p-6 mb-8">
                    <h2 className="font-semibold text-gray-900 mb-4">Adres dostawy</h2>
                    <div className="text-sm text-gray-600 space-y-1">
                        <p className="text-gray-900 font-medium">
                            {zamowienie.imieOdbiorcy} {zamowienie.nazwiskoOdbiorcy}
                        </p>
                        <p>{zamowienie.ulica} {zamowienie.nrDomu}</p>
                        <p>{zamowienie.kodPocztowy} {zamowienie.miejscowosc}</p>
                        <p>tel. {zamowienie.telefonOdbiorcy}</p>
                    </div>
                </div>

                {/* Akcje */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <Link href="/konto/zamowienia" className="flex-1 bg-grovly text-white text-center py-3 rounded-xl font-semibold hover:bg-grovly-dark transition">
                        Moje zamówienia
                    </Link>
                    <Link href="/produkty" className="flex-1 border border-gray-300 text-gray-700 text-center py-3 rounded-xl font-medium hover:bg-gray-50 transition">
                        Kontynuuj zakupy
                    </Link>
                </div>
            </div>
        </main>
    );
}