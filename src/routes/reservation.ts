import { ErrorBody } from '@/types/ErrorBody';
import { CommonResponseBody } from '@/types/CommonResponseBody';
import express from 'express';
import { Reservation } from '../types/Reservation';
import { db } from '@/db';
import { reservationModel } from '@/db/schemas';
import { eq, inArray } from 'drizzle-orm';
const router = express.Router();

//* Index
router.get(
    "/",
    async (req, res) => {
        const reservations: Reservation[] = await db
            .select()
            .from(reservationModel);
        
        if (Array.isArray(reservations)) {
            res.status(200).send(reservations);
        } else {
            const CODE = 500;
            const error: ErrorBody = {
                private: "La lista de reservas no pasa el typecheck de array en Index",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            res.status(CODE).send(error.public);
        }
    }
);

//* Show
router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const reservation: Reservation = (await db
            .select()
            .from(reservationModel)
            .where(eq(reservationModel.id, +id)))[0];
        
        console.log(reservation)
        console.log(id)
        res.status(200).send(reservation);
    }
);

//* ShowList
router.get(
    "/list/:ids",
    async (req, res) => {
        const { ids } = req.body;

        const reservations: Reservation[] = await db
            .select()
            .from(reservationModel)
            .where(inArray(reservationModel.id, ids.split(",")));
            
        res.status(200).send(reservations);
    }
);

//* Store
router.post(
    "/",
    async (req, res) => {

        const reservation = req.body;
        console.table(reservation);

        const insertedReservation = (await db.insert(reservationModel).values(reservation).returning())[0];


        if (!insertedReservation) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Inserción no retorna fila insertada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(insertedReservation);
    }
)

//* Update
router.put(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const reservation = req.body;
        console.table(reservation);

        const updatedReservation = (await db
            .update(reservationModel)
            .set(reservation)
            .where(eq(reservationModel.id, +id))
            .returning())[0];

        if (!updatedReservation) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Actualización no retorna fila actualizada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(updatedReservation);
    }
)

//* Delete
router.delete(
    "/:id",
    async (req, res) => {
        const { id } = req.params;

        const reservation = (await db
            .delete(reservationModel)
            .where(eq(reservationModel.id, +id))
            .returning())[0];

        if (!reservation) {
            const CODE = 500;

            const error: ErrorBody = {
                private: "Eliminación no retorna fila eliminada",
                public: new CommonResponseBody(
                    false,
                    CODE,
                    {
                        message: "¡Ha ocurrido un problema inesperado!"
                    }
                )
            }
            console.log(error.private);
            console.error(error.errorObject)
            res.status(CODE).send(error.public);
            return;
        }

        res.status(200).send(reservation);
    }
)

export default router;