import { Matcher } from "@/utils";

export interface Reservation {
    id?: number,
    name: string,
    rut: string,
    email: string,
    reservationDate: string,
    reservationTime: string,
    serviceName: string,
}

export const reservationMatcher: Matcher = {
    name: "string",
    rut: "string",
    email: "string",
    reservationDate: "string",
    reservationTime: "string",
    serviceName: "string",
};