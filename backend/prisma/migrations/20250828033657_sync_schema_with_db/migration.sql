-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "fuzzystrmatch";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis_raster";

-- CreateExtension
CREATE EXTENSION IF NOT EXISTS "postgis_topology";

-- CreateEnum
CREATE TYPE "public"."UserRoleEnum" AS ENUM ('CEO', 'SALES', 'SALES_SUPERVISOR', 'ADMIN');

-- CreateTable
CREATE TABLE "public"."User" (
    "usr_id" SERIAL NOT NULL,
    "usr_google_id" TEXT NOT NULL,
    "usr_avatar" TEXT NOT NULL,
    "usr_firstname" TEXT NOT NULL,
    "usr_lastname" TEXT NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_role_name" "public"."UserRoleEnum" NOT NULL DEFAULT 'SALES',
    "usr_phone" TEXT NOT NULL DEFAULT '',
    "usr_is_active" BOOLEAN NOT NULL DEFAULT true,
    "usr_created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usr_update_at" TIMESTAMP(3) NOT NULL,
    "usr_del" BIGINT NOT NULL DEFAULT 0,

    CONSTRAINT "User_pkey" PRIMARY KEY ("usr_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_usr_google_id_key" ON "public"."User"("usr_google_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_usr_email_key" ON "public"."User"("usr_email");
