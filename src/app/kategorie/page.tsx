import { Kategoria } from "@/types/kategoria"
import KategoriaCard from "@/components/KategoryCard";


export default async function KategoriePage() {
    
    const res = await fetch("http://localhost:5219/api/Category",{cache: "no-store"})
    const kategorie: Kategoria[] = await res.json();

    return(

        <main className="p-8">
            <h1 className="text-5xl font-bold text-center p-5 mb-8">Kategorie</h1>
            <div className="flex flex-col items-center">
                {kategorie.map((p)=> (

                    <KategoriaCard key = {p.id_Kategoria} kategoria={p}/>

                ))}

            </div>
    
        </main>



    );
    
}