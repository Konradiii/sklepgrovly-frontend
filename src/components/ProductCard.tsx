import { Produkt } from "@/types/produkt";
import Image from "next/image";

type Props = {
    produkt: Produkt;
};

export default function ProductCard ({produkt}: Props){

    return(

        
        <div className="border rounded-lg p-8 pt-4 shadow-sm hover:shadow-md transition overflow-hidden">


            <Image
                src="/placeholder.png"
                alt={produkt.nazwa}
                width={300}
                height={200}
                className="w-full h-48 object-cover"
            />

            <h2 className="font-semibold text-lg">{produkt.nazwa}</h2>

            <div className="flex items-center gap-2 mt-2">
                <p>{produkt.cena} zł</p>

                {produkt.znizka > 0 && (
                    <span className="text-sm text-red-600 font-medium">
                        -{produkt.znizka}%
                    </span>
                )}
            </div>
                
                <button className="w-full mt-6 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition">
                    Zobacz
                </button>
                
        </div>

    );
}