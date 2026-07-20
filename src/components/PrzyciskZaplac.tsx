"use client";

import { useState } from "react"
import { authFetch } from "@/app/lib/authFetch";

type Props = {
    orderId: number;
};

export default function PrzyciskZaplac({orderId}: Props) {
    const [platnoscTrwa, setPlatnoscTrwa] = useState(false);

    const handleZaplac = async () => {
        setPlatnoscTrwa(true);
    
    try{
        const res = await authFetch(
            `http://localhost:5219/api/Payment/zamowienie/${orderId}`,
            {method: "POST"}
        );
        if (res.ok){
            const dane = await res.json();
            window.location.href = dane.linkDoPlatnosci;
        } else {
            alert("Nie udało się rozpocząć płatności.");
            setPlatnoscTrwa(false);
        }
    } catch{
        alert("Błąd połączenia.");
        setPlatnoscTrwa(false);
    }

};

    return (
        <button
            onClick={handleZaplac}
            disabled={platnoscTrwa}
            className="w-full bg-grovly text-white py-3 rounded-xl font-semibold hover:bg-grovly-dark transition cursor-pointer disabled:bg-gray-300"
        >
            {platnoscTrwa ? "Przekierowanie..." : "Zapłać za zamówienie"}
        </button>
    );
}
