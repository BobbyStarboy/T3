/*
  Warnings:

  - You are about to drop the column `sal_amount` on the `sale_record` table. All the data in the column will be lost.
  - You are about to drop the column `sal_count` on the `sale_record` table. All the data in the column will be lost.
  - You are about to drop the column `sal_year` on the `sale_record` table. All the data in the column will be lost.
  - You are about to drop the `branch` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."branch" DROP CONSTRAINT "branch_loc_id_fkey";

-- DropForeignKey
ALTER TABLE "public"."sale_record" DROP CONSTRAINT "sale_record_brc_id_fkey";

-- AlterTable
ALTER TABLE "public"."location" ALTER COLUMN "loc_created_by" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "loc_created_at" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "public"."sale_record" DROP COLUMN "sal_amount",
DROP COLUMN "sal_count",
DROP COLUMN "sal_year";

-- AlterTable
ALTER TABLE "public"."user" ALTER COLUMN "usr_created_by" SET DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "usr_del" SET DEFAULT 0;

-- DropTable
DROP TABLE "public"."branch";

-- CreateTable
CREATE TABLE "public"."Branch" (
    "brc_id" BIGSERIAL NOT NULL,
    "brc_name" TEXT NOT NULL,
    "brc_created_by" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "brc_update_at" TIMESTAMP(3) NOT NULL,
    "brc_sale_id" TEXT NOT NULL,
    "brc_supervisor" TEXT NOT NULL,
    "brc_is_deleted" BOOLEAN NOT NULL DEFAULT false,
    "loc_id" BIGINT NOT NULL,

    CONSTRAINT "Branch_pkey" PRIMARY KEY ("brc_id")
);

-- CreateIndex
CREATE INDEX "sale_record_usr_id_idx" ON "public"."sale_record"("usr_id");

-- CreateIndex
CREATE INDEX "sale_record_brc_id_idx" ON "public"."sale_record"("brc_id");

-- CreateIndex
CREATE INDEX "sale_record_loc_id_idx" ON "public"."sale_record"("loc_id");

-- AddForeignKey
ALTER TABLE "public"."Branch" ADD CONSTRAINT "Branch_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "public"."location"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale_record" ADD CONSTRAINT "sale_record_brc_id_fkey" FOREIGN KEY ("brc_id") REFERENCES "public"."Branch"("brc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
