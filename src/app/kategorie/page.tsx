import { Kategoria } from "@/types/kategoria"
import KategoriaCard from "@/components/KategoryCard";


export default async function KategoriePage() {
    
    const res = await fetch("http://localhost:5219/api/Category",{cache: "no-store"})
    const kategorie: Kategoria[] = await res.json();


    return (
        <main className="p-8">
            <h1 className="text-5xl font-bold text-center p-5 mb-8">Kategorie</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {kategorie.map((p) => (
                    <KategoriaCard key={p.id_Kategoria} kategoria={p} />
                ))}
            </div>
        </main>
    );
    
}