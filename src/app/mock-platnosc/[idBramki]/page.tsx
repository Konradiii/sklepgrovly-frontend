"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

type MockPaymentInfo = {
    idBramki: string;
    kwota: number;
    id_Zamowienie: number;
    status: string;
};

export default function MockPlatnoscPage() {
    const params = useParams();
    const router = useRouter();
    const idBramki = params.idBramki as string;

    const [info, setInfo] = useState<MockPaymentInfo | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [przetwarzanie, setPrzetwarzanie] = useState(false);

    // pobierz dane płatności z backendu (kwota, numer, status)
    useEffect(() => {
        const pobierz = async () => {
            try {
                const res = await fetch(`http://localhost:5219/api/Payment/mock/${idBramki}`);
                if (res.ok) {
                    setInfo(await res.json());
                } else {
                    setError("Nie znaleziono płatności.");
                }
            } catch {
                setError("Błąd połączenia z bramką.");
            } finally {
                setLoading(false);
            }
        };
        pobierz();
    }, [idBramki]);

    // wyślij webhook (sukces = true/false), opcjonalnie wróć na sklep
    const wyslijWebhook = async (sukces: boolean, wracaj: boolean) => {
        setPrzetwarzanie(true);
        try {
            await fetch("http://localhost:5219/api/Payment/webhook", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idBramki, sukces }),
            });

            if (wracaj && info) {
                router.push(`/konto/zamowienia/${info.id_Zamowienie}`);
            } else {
                // "zapłać i zniknij" — nie wracamy, pokazujemy komunikat
                setInfo((prev) => (prev ? { ...prev, status: sukces ? "Zrealizowana" : "Odrzucona" } : prev));
                setPrzetwarzanie(false);
            }
        } catch {
            setError("Nie udało się przetworzyć płatności.");
            setPrzetwarzanie(false);
        }
    };

    if (loading) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-gray-50">
                <p className="text-gray-500">Ładowanie bramki...</p>
            </main>
        );
    }

    if (error || !info) {
        return (
            <main className="min-h-screen flex flex-col items-center justify-center bg-gray-50 gap-4">
                <p className="text-red-600">{error || "Nie znaleziono płatności."}</p>
                <Link href="/" className="text-grovly font-medium hover:underline">
                    ← Wróć do sklepu
                </Link>
            </main>
        );
    }

    const zaplacona = info.status === "Zrealizowana";
    const odrzucona = info.status === "Odrzucona";
    const oczekujaca = info.status === "Oczekujaca";

    return (
        <main className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-lg overflow-hidden">
                {/* Pasek "operatora" */}
                <div className="bg-grovly px-6 py-4">
                    <div className="flex items-center gap-2 text-white">
                        <span className="text-lg font-bold">Grovly Pay</span>
                        <span className="text-xs opacity-80">· bezpieczne płatności</span>
                    </div>
                </div>

                <div className="p-8">
                    <p className="text-sm text-gray-500 mb-1">Płatność za zamówienie #{info.id_Zamowienie}</p>
                    <p className="text-4xl font-bold text-gray-900 mb-8">{info.kwota.toFixed(2)} zł</p>

                    {oczekujaca && (
                        <div className="flex flex-col gap-3">
                            <button
                                onClick={() => wyslijWebhook(true, true)}
                                disabled={przetwarzanie}
                                className="w-full bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition cursor-pointer disabled:bg-gray-300"
                            >
                                {przetwarzanie ? "Przetwarzanie..." : "Zapłać"}
                            </button>

                            <button
                                onClick={() => wyslijWebhook(false, true)}
                                disabled={przetwarzanie}
                                className="w-full border border-gray-300 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-50 transition cursor-pointer disabled:opacity-50"
                            >
                                Odrzuć płatność
                            </button>

                            {/* demo: pokazuje, że webhook działa nawet gdy klient nie wraca */}
                            <button
                                onClick={() => wyslijWebhook(true, false)}
                                disabled={przetwarzanie}
                                className="w-full text-xs text-gray-400 hover:text-gray-600 py-2 transition cursor-pointer"
                            >
                                (demo) Zapłać i nie wracaj na sklep
                            </button>
                        </div>
                    )}

                    {zaplacona && (
                        <div className="text-center py-4">
                            <p className="text-green-600 font-semibold mb-2">✓ Płatność zrealizowana</p>
                            <p className="text-sm text-gray-500 mb-4">
                                To zamówienie zostało już opłacone.
                            </p>
                            <Link href={`/konto/zamowienia/${info.id_Zamowienie}`} className="text-grovly font-medium hover:underline">
                                Zobacz zamówienie →
                            </Link>
                        </div>
                    )}

                    {odrzucona && (
                        <div className="text-center py-4">
                            <p className="text-red-600 font-semibold mb-2">Płatność odrzucona</p>
                            <Link href={`/konto/zamowienia/${info.id_Zamowienie}`} className="text-grovly font-medium hover:underline">
                                Wróć do zamówienia →
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}