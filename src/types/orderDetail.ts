import { OrderItem } from "./orderItem";

export type OrderDetail = {
    id_Klient: number;
    id_Zamowienie: number;
    dataZamowienia: string;
    status: string;

    imieOdbiorcy: string;
    nazwiskoOdbiorcy: string;
    ulica: string;
    nrDomu: string;
    kodPocztowy: string;
    miejscowosc: string;
    telefonOdbiorcy: string;

    pozycje: OrderItem[];

    sumaCalkowita: number;

    statusPlatnosci: string | null;
    metodaPlatnosci: string | null;
};