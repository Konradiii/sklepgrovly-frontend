import { ProduktDetail } from "@/types/produktDetails";

type Props = {
    produktDetail: ProduktDetail;
};

export default function ProductDetailsCard({ produktDetail }: Props) {
    const cenaPoZnizce =
        produktDetail.znizka > 0
            ? produktDetail.cena * (1 - produktDetail.znizka / 100)
            : produktDetail.cena;

    const dostepny = produktDetail.iloscNaStanie > 0;

    return (
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl shadow-lg overflow-hidden md:flex">
            {/* Lewa strona — miejsce na zdjęcie */}
            <div className="md:w-1/2 bg-gray-100 flex items-center justify-center p-8">
                <div className="w-full aspect-square bg-gray-200 rounded-xl flex items-center justify-center text-gray-400">
                    {/* tu docelowo zdjęcie produktu */}
                    <span className="text-sm">Zdjęcie produktu</span>
                </div>
            </div>

            {/* Prawa strona — informacje */}
            <div className="md:w-1/2 p-8 flex flex-col">
                {/* Kategoria */}
                <span className="text-sm text-blue-600 font-medium uppercase tracking-wide">
                    {produktDetail.nazwaKategorii}
                </span>

                {/* Nazwa */}
                <h1 className="text-3xl font-bold text-gray-900 mt-2">
                    {produktDetail.nazwa}
                </h1>

                {/* Cena */}
                <div className="mt-6 flex items-baseline gap-3">
                    <span className="text-4xl font-bold text-gray-900">
                        {cenaPoZnizce.toFixed(2)} zł
                    </span>
                    {produktDetail.znizka > 0 && (
                        <>
                            <span className="text-lg text-gray-400 line-through">
                                {produktDetail.cena.toFixed(2)} zł
                            </span>
                            <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">
                                -{produktDetail.znizka}%
                            </span>
                        </>
                    )}
                </div>

                {/* Dostępność */}
                <div className="mt-4">
                    {dostepny ? (
                        <span className="inline-flex items-center gap-2 text-green-600 text-sm font-medium">
                            <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                            Dostępny ({produktDetail.iloscNaStanie} szt.)
                        </span>
                    ) : (
                        <span className="inline-flex items-center gap-2 text-red-600 text-sm font-medium">
                            <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                            Niedostępny
                        </span>
                    )}
                </div>

                {/* Przycisk */}
                <button
                    disabled={!dostepny}
                    className="mt-auto w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                    {dostepny ? "Dodaj do koszyka" : "Brak w magazynie"}
                </button>
            </div>
        </div>
    );
}