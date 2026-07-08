import { Kategoria } from "@/types/kategoria";
import Link from "next/link";


type Props = {
    kategoria: Kategoria;
};

export default function KategoryCard({kategoria}: Props){
    return(


        <div className="border rounded-lg p-5 pt-10 w-1/2">
            
            <h2 className="font-semibold text-lg text-center">{kategoria.nazwa}</h2>

            <div className="flex justify-center">
                <Link
                    href={`/produkty/kategoria/${kategoria.id_Kategoria}`}
                    className="w-1/2 mt-12 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 hover:scale-105 transition text-center"
                >
                    Wyświetl produkty
                </Link>
            </div>

        </div>

    );
}