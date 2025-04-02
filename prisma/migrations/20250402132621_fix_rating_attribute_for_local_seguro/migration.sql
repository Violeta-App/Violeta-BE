/*
  Warnings:

  - The `rating` column on the `locais_seguros` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "locais_seguros" DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL DEFAULT 0;
