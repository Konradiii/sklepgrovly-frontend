"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function LogowaniePage(){

    const router = useRouter();
    const { login } = useAuth();  
    const [email, setEmail] = useState("");
    const [haslo, setHaslo] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5219/api/Auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, haslo }),
            });

            if (!res.ok) {
                console.error("Błąd logowania:", res.status);
                return;
            }

            const data = await res.json();
            login(data.accessToken, data.refreshToken);   // ← Context: zapisz tokeny + ustaw stan
            router.push("/");
        } catch (err) {
            console.error("Coś poszło nie tak:", err);
        }
    };

    return(


        <main className="py-16 px-8 bg-white min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Zaloguj się
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Hasło:
                        </label>
                        <input
                            type="password"
                            value={haslo}
                            onChange={(e) => setHaslo(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="mt-2 bg-grovly text-white py-2.5 rounded-lg font-semibold hover:bg-grovly-dark transition"
                    >
                        Zaloguj się
                    </button>
                </form>

            </div>
        </main>
    );

}
