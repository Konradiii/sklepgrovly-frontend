import { Kategoria } from "@/types/kategoria";
import Link from "next/link";

type Props = {
    kategoria: Kategoria;
};

export default function KategoryCard({ kategoria }: Props) {
    return (
        <Link
            href={`/produkty/kategoria/${kategoria.id_Kategoria}`}
            className="group block border border-gray-200 rounded-xl p-6 bg-white shadow-sm hover:shadow-md hover:border-blue-400 transition text-center"
        >
            <h2 className="font-semibold text-lg text-gray-900 group-hover:text-blue-600 transition">
                {kategoria.nazwa}
            </h2>
            <span className="inline-block mt-3 text-sm text-blue-600 font-medium">
                Wyświetl produkty →
            </span>
        </Link>
    );
}