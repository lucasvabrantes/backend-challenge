-- CreateTable
CREATE TABLE "resellers" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "resellers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "store_owners" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "store_owners_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "transactions" (
    "id" SERIAL NOT NULL,
    "sender" TEXT NOT NULL,
    "receiver" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "resellers_cpf_key" ON "resellers"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "resellers_email_key" ON "resellers"("email");

-- CreateIndex
CREATE UNIQUE INDEX "store_owners_cpf_key" ON "store_owners"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "store_owners_email_key" ON "store_owners"("email");
