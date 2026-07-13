"use client";

import { Produkt } from "@/types/produkt";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

type Props = {
    produkt: Produkt;
};

export default function ProductsCard({ produkt }: Props) {

    const { addToCart } = useCart();

    const cenaPoZnizce =
        produkt.znizka > 0
            ? produkt.cena * (1 - produkt.znizka / 100)
            : produkt.cena;

    return (
        <div className="group border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow flex flex-col">
            {/* Zdjęcie — niższe */}
            <div className="relative bg-gray-100 h-40 overflow-hidden">
                <Image
                    src="/placeholder.png"
                    alt={produkt.nazwa}
                    width={300}
                    height={160}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {produkt.znizka > 0 && (
                    <span className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                        -{produkt.znizka}%
                    </span>
                )}
            </div>

            {/* Treść — mniejszy padding */}
            <div className="p-3 flex flex-col flex-1">
                <h2 className="font-medium text-sm text-gray-900 line-clamp-2">
                    {produkt.nazwa}
                </h2>

                <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-base font-bold text-gray-900">
                        {cenaPoZnizce.toFixed(2)} zł
                    </span>
                    {produkt.znizka > 0 && (
                        <span className="text-xs text-gray-400 line-through">
                            {produkt.cena.toFixed(2)} zł
                        </span>
                    )}
                </div>

                <Link href={`/produkty/${produkt.id_Produkt}`} className="mt-auto pt-3">
                    <span className="block w-full border-2 border-grovly text-grovly text-center py-2 text-sm rounded-xl font-medium hover:bg-grovly hover:text-white transition">
                        Pokaż produkt
                    </span>
                </Link>
                <button
                    onClick={() => {
                        console.log("Kliknięto dodaj:", produkt);
                        addToCart(produkt);
                    }}
                    className="mt-2 w-full bg-grovly text-white text-center py-2 rounded-lg font-medium hover:bg-grovly-dark transition cursor-pointer"
                >
                    Dodaj do koszyka
                </button>
            </div>
        </div>
    );
}