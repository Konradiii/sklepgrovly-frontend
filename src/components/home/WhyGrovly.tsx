import { Brain, ShieldCheck, GraduationCap } from "lucide-react";

const filary = [
    {
        icon: Brain,
        tytul: "Wszechstronny rozwój",
        opis: "Wspierają rozwój poznawczy, sensoryczny i motoryczny.",
    },
    {
        icon: ShieldCheck,
        tytul: "Bezpieczne materiały",
        opis: "Sprawdzone tworzywa, odpowiednie dla dzieci i ich wieku.",
    },
    {
        icon: GraduationCap,
        tytul: "Rozwój oparty na badaniach",
        opis: "Rozwój oparty na badaniach, widoczny w codziennych aktywnościach.",
    },
];

export default function WhyGrovly() {
    return (
        <section className="py-20 px-8 bg-white">
                <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
                    Dlaczego rodzice wybierają Grovly?
                </h2>
            <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
                {filary.map((filar) => {
                    const Icon = filar.icon;
                    return (
                        <div key={filar.tytul} className="flex flex-col items-center text-center">
                            <Icon className="w-16 h-16 text-gray-800 mb-6" strokeWidth={1.5} />
                            <h3 className="font-bold text-lg mb-3 text-gray-900">{filar.tytul}</h3>
                            <p className="text-gray-600">{filar.opis}</p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}