
"use client";

import { OrderDetail } from "@/types/OrderDetail";
import Link from "next/link";

type Props = {
    order: OrderDetail;
};

export default function OrderDetailsCard({ order }: Props) {
    const data = new Date(order.dataZamowienia).toLocaleDateString("pl-PL", {
        day: "numeric",
        month: "long",
        year: "numeric",
    });

    return (
        <div className="w-full max-w-5xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
            {/* Lewa strona */}
            <div className="md:w-1/2 p-8 border-r border-gray-100">
                <h2 className="text-2xl font-bold text-gray-900">
                    Zamówienie #{order.id_Zamowienie}
                </h2>

                <p className="text-gray-500 mt-2">{data}</p>

                <span className="inline-block mt-4 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold">
                    {order.status}
                </span>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Dane odbiorcy
                    </h3>

                    <div className="space-y-2 text-gray-700">
                        <p>
                            <strong>Imię i nazwisko:</strong>{" "}
                            {order.imieOdbiorcy} {order.nazwiskoOdbiorcy}
                        </p>

                        <p>
                            <strong>Adres:</strong>{" "}
                            {order.ulica} {order.nrDomu}
                        </p>

                        <p>
                            <strong>Kod pocztowy:</strong>{" "}
                            {order.kodPocztowy}
                        </p>

                        <p>
                            <strong>Miejscowość:</strong>{" "}
                            {order.miejscowosc}
                        </p>

                        <p>
                            <strong>Telefon:</strong>{" "}
                            {order.telefonOdbiorcy}
                        </p>
                    </div>
                </div>

                <div className="mt-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Płatność
                    </h3>

                    <p>
                        <strong>Metoda:</strong>{" "}
                        {order.metodaPlatnosci ?? "Nie wybrano"}
                    </p>

                    <p>
                        <strong>Status:</strong>{" "}
                        {order.statusPlatnosci ?? "Oczekuje"}
                    </p>
                </div>
            </div>

            {/* Prawa strona */}
            <div className="md:w-1/2 p-8 flex flex-col">
                <h3 className="text-xl font-bold text-gray-900 mb-6">
                    Zamówione produkty
                </h3>

                <div className="space-y-4 flex-1">
                    {order.pozycje.map((p) => (
                        <div
                            key={p.id_Produkt}
                            className="border border-gray-200 rounded-xl p-4"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h4 className="font-semibold text-gray-900">
                                        {p.nazwaProduktu}
                                    </h4>

                                    <p className="text-sm text-gray-500 mt-1">
                                        {p.ilosc} × {p.cenaJednostkowa.toFixed(2)} zł
                                    </p>
                                </div>

                                <span className="font-bold">
                                    {p.cenaPozycji.toFixed(2)} zł
                                </span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="border-t border-gray-200 mt-8 pt-6">
                    <div className="flex justify-between text-xl font-bold">
                        <span>Razem</span>

                        <span>{order.sumaCalkowita.toFixed(2)} zł</span>
                    </div>
                </div>

                <Link
                    href="/konto/zamowienia"
                    className="mt-6 w-full text-center border-2 border-grovly text-grovly py-3 rounded-xl font-semibold hover:bg-grovly hover:text-white transition"
                >
                    ← Wróć do zamówień
                </Link>
            </div>
        </div>
    );
}