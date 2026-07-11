"use client";

import { useCart } from "@/context/CartContext";
import Link from "next/link";

export default function KoszykPage() {
    const { items, removeFromCart, updateQuantity, total, clearCart } = useCart();

    if (items.length === 0) {
        return (
            <main className="py-16 px-8 bg-white min-h-[70vh] flex flex-col items-center justify-center">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Twój koszyk jest pusty</h1>
                <Link href="/produkty" className="text-grovly font-medium hover:underline">
                    Przeglądaj produkty →
                </Link>
            </main>
        );
    }

    return (
        <main className="py-16 px-8 bg-white min-h-[70vh]">
            <div className="max-w-3xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">Twój koszyk</h1>

                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id_Produkt}
                            className="flex items-center justify-between border border-gray-200 rounded-xl p-4"
                        >
                            <div className="flex-1">
                                <h2 className="font-medium text-gray-900">{item.nazwa}</h2>
                                <p className="text-sm text-gray-500">{item.cena.toFixed(2)} zł / szt.</p>
                            </div>

                            {/* Zmiana ilości */}
                            <div className="flex items-center gap-2 mx-4">
                                <button
                                    onClick={() => updateQuantity(item.id_Produkt, Math.max(1, item.ilosc - 1))}
                                    className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                                >
                                    −
                                </button>
                                <span className="w-8 text-center">{item.ilosc}</span>
                                <button
                                    onClick={() => updateQuantity(item.id_Produkt, item.ilosc + 1)}
                                    className="w-8 h-8 rounded-full border border-gray-300 hover:bg-gray-100"
                                >
                                    +
                                </button>
                            </div>

                            {/* Cena pozycji */}
                            <span className="font-semibold text-gray-900 w-24 text-right">
                                {(item.cena * item.ilosc).toFixed(2)} zł
                            </span>

                            {/* Usuń */}
                            <button
                                onClick={() => removeFromCart(item.id_Produkt)}
                                className="ml-4 text-red-500 hover:text-red-700 text-sm"
                            >
                                Usuń
                            </button>
                        </div>
                    ))}
                </div>

                {/* Podsumowanie */}
                <div className="mt-8 flex items-center justify-between border-t border-gray-200 pt-6">
                    <button
                        onClick={clearCart}
                        className="text-sm text-gray-500 hover:text-gray-700"
                    >
                        Wyczyść koszyk
                    </button>
                    <div className="text-right">
                        <p className="text-sm text-gray-500">Razem</p>
                        <p className="text-2xl font-bold text-gray-900">{total.toFixed(2)} zł</p>
                    </div>
                </div>

                <button className="mt-6 w-full bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition">
                    Przejdź do kasy
                </button>
            </div>
        </main>
    );
}