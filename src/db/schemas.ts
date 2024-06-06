import { date, text, pgTable, serial, varchar, time } from "drizzle-orm/pg-core";
import { $schema } from ".";

export const reservationModel = $schema.table("reservation", {
    id: serial("id").primaryKey(),
    name: varchar("name").notNull(),
    rut: varchar("rut").notNull(),
    email: varchar("email").notNull(),
    reservationDate: date("reservation_date").notNull(),
    reservationTime: time("reservation_time").notNull(),
    serviceName: varchar("service_name").notNull()
});