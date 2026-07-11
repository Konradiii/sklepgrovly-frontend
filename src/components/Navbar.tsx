"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
    const { isLoggedIn, logout } = useAuth();
    const { count } = useCart(); 
    const router = useRouter();
    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className="bg-white border-b border-gray-100 px-8 py-4 flex items-center justify-between sticky top-0 z-50">
            <Link href="/">
                <Image
                    src="/logo.png"
                    alt="Grovly"
                    width={120}
                    height={40}
                    className="h-10 w-auto object-contain"
                />
            </Link>

            <div className="flex gap-8 items-center">
                <Link href="/produkty" className="text-gray-700 hover:text-grovly transition font-medium">
                    Produkty
                </Link>
                <Link href="/kategorie" className="text-gray-700 hover:text-grovly transition font-medium">
                    Kategorie
                </Link>
                <Link href="/koszyk" className="text-gray-700 hover:text-grovly transition font-medium">
                    Koszyk {count > 0 && `(${count})`}
                </Link>

                {isLoggedIn ? (
                    <>
                        <Link href="/konto" className="text-gray-700 hover:text-grovly transition font-medium">
                            Konto
                        </Link>
                        <button
                            onClick={handleLogout}
                            className="bg-grovly text-white px-5 py-2 rounded-full font-medium hover:bg-grovly-dark transition"
                        >
                            Wyloguj
                        </button>
                    </>
                ) : (
                    <Link
                        href="/logowanie"
                        className="bg-grovly text-white px-5 py-2 rounded-full font-medium hover:bg-grovly-dark transition"
                    >
                        Zaloguj
                    </Link>
                )}
            </div>
        </nav>
    );
}