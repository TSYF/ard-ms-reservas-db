import express from 'express';
const morgan = require("morgan");
import reservationRouter  from '@/routes/reservation';
import { envs } from './config/env';
const app = express();

app.use(morgan("combined"))
app.use(express.json());
const { PORT, DEFAULT_API_PREFIX } = envs;

app.use(`${DEFAULT_API_PREFIX}`, reservationRouter);
app.listen(PORT, () => console.log("MS-RESERVAS-DB STARTED"));