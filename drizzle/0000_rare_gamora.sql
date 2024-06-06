CREATE TABLE IF NOT EXISTS "ar"."reservation" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar NOT NULL,
	"rut" varchar NOT NULL,
	"email" varchar NOT NULL,
	"reservation_date" date NOT NULL,
	"reservation_time" time NOT NULL,
	"service_name" varchar NOT NULL
);
