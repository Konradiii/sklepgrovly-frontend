"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function rejestracjaPage(){

    const router = useRouter();



    const [Imie, setImie] = useState("");
    const [Nazwisko, setNazwisko] = useState("");
    const [Email, setEmail] = useState("");
    const [Haslo, setHaslo] = useState("");
    const [PotwierdzHaslo, setpotwierdzHaslo] = useState("");
    const [NrTelefonu, setNrTel] = useState("");

    const [blad, setBlad] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();



        if (Haslo !== PotwierdzHaslo) {
            setBlad("Hasła się nie zgadzają");
            return;
}

        try{
            const res = await fetch("http://localhost:5219/api/Auth/register",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({Imie, Nazwisko, Email, Haslo, PotwierdzHaslo, NrTelefonu})
            });

            if (!res.ok) {
            setBlad("Nie udało się zarejestrować. Spróbuj ponownie.");
            return;
}


            
            router.push("/logowanie");
            
            
        }
        catch (err) {
            console.error("Coś poszło nie tak:", err);
        }
    }


    return(


        <main className="py-16 px-8 bg-white min-h-[70vh] flex items-center justify-center">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-900 text-center mb-8">
                    Zarejestruj się
                </h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Imie:
                        </label>
                        <input
                            type="text"
                            value={Imie}
                            onChange={(e) => setImie(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nazwisko
                        </label>
                        <input
                            type="text"
                            value={Nazwisko}
                            onChange={(e) => setNazwisko(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>



                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            value={Email}
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
                            value={Haslo}
                            onChange={(e) => setHaslo(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>


                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Potwierdź hasło:
                        </label>
                        <input
                            type="password"
                            value={PotwierdzHaslo}
                            onChange={(e) => setpotwierdzHaslo(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Numer Telefonu
                        </label>
                        <input
                            type="text"
                            value={NrTelefonu}
                            onChange={(e) => setNrTel(e.target.value)}
                            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-grovly"
                            required
                        />
                    </div>

                    {blad && <p className="text-red-600 text-sm">{blad}</p>}
                    <button
                        type="submit"
                        className="mt-2 bg-grovly text-white py-2.5 rounded-lg font-semibold hover:bg-grovly-dark transition cursor-pointer"
                    >
                        Zarejestruj
                    </button>
                </form>

            </div>
        </main>
    );

}




