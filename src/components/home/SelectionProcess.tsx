const kroki = [
    {
        numer: "01",
        tytul: "Analiza wiedzy",
        opis: "Analizujemy badania i rekomendacje dotyczące rozwoju dziecka, aby wybierać zabawki, realnie wspierają naukę i rozwój.",
    },
    {
        numer: "02",
        tytul: "Dopasowanie do wieku",
        opis: "Każdy produkt dopasowujemy do konkretnego etapu rozwoju, tak aby był bezpieczny, zrozumiały i wspierający dziecko w odpowiednim momencie.",
    },
    {
        numer: "03",
        tytul: "Testowanie w codziennej zabawie",
        opis: "Sprawdzamy, czy zabawka sprawdza się w zwykłej, codziennej zabawie - bez scenariuszy i sztucznych warunków.",
    },
    {
        numer: "04",
        tytul: "Wybór najlepszych",
        opis: "Do Grovly trafiają tylko te produkty, które spełniają wszystkie nasze kryteria jakości, bezpieczeństwa i wartości rozwojowej.",
    },
];

export default function SelectionProcess() {
    return (
        <section className="py-20 px-8 bg-white">
            <div className="text-center mb-16">
                <h2 className="text-4xl font-bold text-gray-900">
                    Jak wybieramy produkty w Grovly
                </h2>
                <p className="mt-3 text-gray-500">
                    Każda zabawka w Grovly przechodzi ten sam, proces selekcji.
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
                {kroki.map((krok) => (
                    <div key={krok.numer} className="text-center">
                        <span className="block text-4xl font-bold text-gray-300 mb-4">
                            {krok.numer}
                        </span>
                        <h3 className="font-bold text-lg text-gray-900 mb-3">
                            {krok.tytul}
                        </h3>
                        <p className="text-gray-600 text-sm">{krok.opis}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}