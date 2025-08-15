-- CreateTable
CREATE TABLE "public"."user" (
    "usr_id" BIGSERIAL NOT NULL,
    "usr_frame" TEXT NOT NULL,
    "usr_name" TEXT NOT NULL,
    "usr_email" TEXT NOT NULL,
    "usr_password" TEXT NOT NULL,
    "usr_role_name" TEXT NOT NULL,
    "usr_phone" TEXT NOT NULL,
    "usr_is_active" TEXT NOT NULL,
    "usr_created_by" TIMESTAMP(3) NOT NULL,
    "usr_update_at" TIMESTAMP(3) NOT NULL,
    "usr_del" BIGINT NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("usr_id")
);

-- CreateTable
CREATE TABLE "public"."location" (
    "loc_id" BIGSERIAL NOT NULL,
    "loc_name" TEXT NOT NULL,
    "loc_lat" TEXT NOT NULL,
    "loc_long" TEXT NOT NULL,
    "loc_address" TEXT NOT NULL,
    "loc_tel_num" TEXT NOT NULL,
    "loc_province" TEXT NOT NULL,
    "loc_created_by" TIMESTAMP(3) NOT NULL,
    "loc_created_at" TIMESTAMP(3) NOT NULL,
    "loc_update_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "location_pkey" PRIMARY KEY ("loc_id")
);

-- CreateTable
CREATE TABLE "public"."branch" (
    "brc_id" BIGSERIAL NOT NULL,
    "brc_name" TEXT NOT NULL,
    "brc_created_by" TIMESTAMP(3) NOT NULL,
    "brc_update_at" TIMESTAMP(3) NOT NULL,
    "brc_sale_id" TEXT NOT NULL,
    "brc_supervisor" TEXT NOT NULL,
    "brc_is_deleted" BIGINT NOT NULL,
    "loc_id" BIGINT NOT NULL,

    CONSTRAINT "branch_pkey" PRIMARY KEY ("brc_id")
);

-- CreateTable
CREATE TABLE "public"."point_of_interest" (
    "poi_id" BIGSERIAL NOT NULL,
    "poi_type_id" BIGINT NOT NULL,
    "poi_name" TEXT NOT NULL,
    "poi_created_at" TIMESTAMP(3) NOT NULL,
    "poi_poi_name" TEXT NOT NULL,

    CONSTRAINT "point_of_interest_pkey" PRIMARY KEY ("poi_id")
);

-- CreateTable
CREATE TABLE "public"."type_poi" (
    "typ_id" BIGSERIAL NOT NULL,
    "poi_id" BIGINT NOT NULL,
    "typ_name" TEXT NOT NULL,
    "typ_color" TEXT NOT NULL,
    "typ_description" TEXT NOT NULL,
    "typ_created_by" TIMESTAMP(3) NOT NULL,
    "typ_update_at" TIMESTAMP(3) NOT NULL,
    "typ_row_text" TEXT NOT NULL,

    CONSTRAINT "type_poi_pkey" PRIMARY KEY ("typ_id")
);

-- CreateTable
CREATE TABLE "public"."sale_record" (
    "sal_id" SERIAL NOT NULL,
    "usr_id" BIGINT NOT NULL,
    "sal_year" TEXT NOT NULL,
    "sal_amount" INTEGER NOT NULL,
    "sal_count" INTEGER NOT NULL,
    "brc_id" BIGINT NOT NULL,
    "loc_id" BIGINT NOT NULL,

    CONSTRAINT "sale_record_pkey" PRIMARY KEY ("sal_id")
);

-- CreateTable
CREATE TABLE "public"."color_indicator" (
    "col_id" SERIAL NOT NULL,
    "col_id_int" INTEGER NOT NULL,
    "col_name" TEXT NOT NULL,
    "col_min" TEXT NOT NULL,
    "col_max" TEXT NOT NULL,
    "col_detail" TEXT NOT NULL,
    "col_created_by" TEXT NOT NULL,

    CONSTRAINT "color_indicator_pkey" PRIMARY KEY ("col_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_usr_email_key" ON "public"."user"("usr_email");

-- AddForeignKey
ALTER TABLE "public"."branch" ADD CONSTRAINT "branch_loc_id_fkey" FOREIGN KEY ("loc_id") REFERENCES "public"."location"("loc_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."type_poi" ADD CONSTRAINT "type_poi_poi_id_fkey" FOREIGN KEY ("poi_id") REFERENCES "public"."point_of_interest"("poi_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale_record" ADD CONSTRAINT "sale_record_usr_id_fkey" FOREIGN KEY ("usr_id") REFERENCES "public"."user"("usr_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."sale_record" ADD CONSTRAINT "sale_record_brc_id_fkey" FOREIGN KEY ("brc_id") REFERENCES "public"."branch"("brc_id") ON DELETE RESTRICT ON UPDATE CASCADE;
