"use client"
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/types/cartItem";    
import { Produkt } from "@/types/produkt";

type CartContextType = {

    items: CartItem[];
    addToCart: (produkt: Produkt) => void;
    removeFromCart: (id:number) => void;
    updateQuantity: (id:number, ilosc: number) => void;
    clearCart: () => void;
    total: number;
    count: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({children}:{children:ReactNode}){

    const [items, setItems] = useState<CartItem[]>([]);


    useEffect(() => {
        const zapisany = localStorage.getItem("cart");
        if (zapisany) {
            setItems(JSON.parse(zapisany));
        }
    }, []);


    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(items));
    }, [items]);




    const addToCart = (produkt: Produkt) => {


        setItems((p)=>{
            const istniejaca = p.find((item)=> item.id_Produkt === produkt.id_Produkt);

            if(istniejaca) {
                return p.map((item)=> 
                item.id_Produkt === produkt.id_Produkt ? {...item, ilosc: item.ilosc +1} : item
                );
            } else {
                return [
                    ...p,{
                        id_Produkt: produkt.id_Produkt,
                        nazwa: produkt.nazwa,
                        cena: produkt.cena,
                        ilosc: 1,
                    },
                ];
            }

        });

    };

    const removeFromCart = (id:number) =>{

        setItems(items.filter((item) => item.id_Produkt !== id));

    };

    const updateQuantity = (id:number, ilosc: number) =>{

        setItems(items.map((item)=>
        item.id_Produkt === id ? {...item, ilosc:ilosc} : item
        ));
    };

    const clearCart = () => {
        setItems([]);
    };

    const total = items.reduce((suma, item) => suma + item.cena * item.ilosc, 0);
    const count = items.reduce((suma, item) => suma + item.ilosc, 0);

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, total, count }}>
            {children}
        </CartContext.Provider>
    );

}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart musi być użyty wewnątrz CartProvider");
    }
    return context;
}