-- CreateTable
CREATE TABLE "ocurrences" (
    "ocurrence_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "date" TEXT NOT NULL,
    "time" TEXT NOT NULL,
    "main_reason" TEXT NOT NULL,
    "victim_situation" TEXT NOT NULL,
    "ocurrence_score" INTEGER NOT NULL,

    CONSTRAINT "ocurrences_pkey" PRIMARY KEY ("ocurrence_id")
);
