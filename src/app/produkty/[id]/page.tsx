import { ProduktDetail } from "@/types/produktDetails";
import ProductDetailsCard from "@/components/ProductDetailsCard"


type Props = {
    params: Promise<{
        id:string;
    }>;
};



export default async function produktDetailPage({ params } : Props) {

    const {id} = await params

    const res = await fetch(`http://localhost:5219/api/Product/${id}`,{cache:"no-store"});
    const produktDetail: ProduktDetail = await res.json();

    return(


        <div className="grid-cols-1">

            <ProductDetailsCard produktDetail={produktDetail}/>

        </div>

    );
    
}