"use client";

import {useState, useEffect} from "react";
import { authFetch } from "@/app/lib/authFetch";

export default function KontoPage(){

    const [dane, setDane] = useState<any>(null);
    const [error, setError] = useState("");


    

    useEffect(()=>{
        const pobierz = async()=>{
            const res = await authFetch("http://localhost:5219/api/Auth/me");

            if(res.ok) {
                const data = await res.json();
                setDane(data);
            } else {
                setError(`Błąd: ${res.status}`);
            }
        };
        pobierz();
    }, []);

    

    return(

        <main className="py-16 px-8 bg-white min-h-[70vh]">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Moje konto</h1>
            {error && <p className="text-red-600">{error}</p>}
            <pre className="text-sm bg-gray-50 p-4 rounded">
                {JSON.stringify(dane, null, 2)}
            </pre>
        </main>

    );
}
