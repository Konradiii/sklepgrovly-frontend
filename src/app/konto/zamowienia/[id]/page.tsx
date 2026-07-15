"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { authFetch } from "@/app/lib/authFetch";
import OrderDetailsCard from "@/components/OrderDetailsCard";
import { OrderDetail } from "@/types/OrderDetail";

export default function OrderDetailPage() {
    const { id } = useParams<{ id: string }>();

    const [order, setOrder] = useState<OrderDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadOrder = async () => {
            try {
                const res = await authFetch(`http://localhost:5219/api/Order/${id}`);

                if (!res.ok) {
                    setError("Nie udało się pobrać zamówienia.");
                    return;
                }

                const data: OrderDetail = await res.json();
                setOrder(data);
            } catch {
                setError("Błąd połączenia z serwerem.");
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadOrder();
        }
    }, [id]);

    if (loading) {
        return (
            <main className="p-8 flex justify-center">
                <p>Ładowanie...</p>
            </main>
        );
    }

    if (error) {
        return (
            <main className="p-8 flex justify-center">
                <p className="text-red-500">{error}</p>
            </main>
        );
    }

    if (!order) {
        return (
            <main className="p-8 flex justify-center">
                <p>Nie znaleziono zamówienia.</p>
            </main>
        );
    }

    return (
        <main className="p-8 flex justify-center">
            <OrderDetailsCard order={order} />
        </main>
    );
}