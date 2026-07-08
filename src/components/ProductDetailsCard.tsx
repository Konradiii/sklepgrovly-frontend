import { ProduktDetail } from "@/types/produktDetails";

type Props = {
    produktDetail: ProduktDetail
};


export default function ProductDetailsCard({produktDetail}: Props){


    return(


        <div className="border rounded-lg p-10 pb-24 w-2/3">
            <h1 className="text-3xl font-bold text-center p-5 mb-8">{produktDetail.nazwa}</h1>
            <div className="flex items-center gap-2 mt-2">
                <p className="text-center">{produktDetail.cena} zł</p>
                {produktDetail.znizka > 0 && (
                    <span className="text-sm text-red-600 font-medium">
                        -{produktDetail.znizka}%
                    </span>
                )}


            
            </div>
        

        </div>


    );
}