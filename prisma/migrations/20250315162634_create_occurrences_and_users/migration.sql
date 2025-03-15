-- CreateTable
CREATE TABLE "users" (
    "user_id" TEXT NOT NULL,
    "user_name" TEXT NOT NULL,
    "user_login" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "occurrences" (
    "occurrence_id" TEXT NOT NULL,
    "occurrence_description" TEXT NOT NULL,
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
    "anonymous" BOOLEAN NOT NULL,
    "victim_name" TEXT NOT NULL,
    "occurrence_score" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',

    CONSTRAINT "occurrences_pkey" PRIMARY KEY ("occurrence_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_user_login_key" ON "users"("user_login");

-- AddForeignKey
ALTER TABLE "occurrences" ADD CONSTRAINT "occurrences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;
