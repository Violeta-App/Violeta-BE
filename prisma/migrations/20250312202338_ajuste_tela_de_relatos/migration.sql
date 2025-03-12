/*
  Warnings:

  - Added the required column `anonymous` to the `ocurrences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ocurrence_description` to the `ocurrences` table without a default value. This is not possible if the table is not empty.
  - Added the required column `victim_name` to the `ocurrences` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ocurrences" 
ADD COLUMN "anonymous" BOOLEAN NOT NULL DEFAULT FALSE,
ADD COLUMN "ocurrence_description" TEXT NOT NULL DEFAULT 'Este relato não possui descrição porque foi retirado da API Fogo Cruzado.',
ADD COLUMN "victim_name" TEXT NOT NULL DEFAULT '';