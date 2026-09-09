-- CreateTable
CREATE TABLE "daily_closeouts" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "date" DATE NOT NULL,
    "balanceOpen" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "cashReceived" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "pixReceived" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "cardReceived" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fiadoCreated" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "fiadoPaid" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "expenses" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "commissions" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "productSales" DECIMAL(10,2) NOT NULL DEFAULT 0,
    "discrepancy" DECIMAL(10,2),
    "notes" TEXT,
    "closedBy" UUID,
    "closedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "daily_closeouts_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "daily_closeouts_barbershopId_date_key" ON "daily_closeouts"("barbershopId", "date");

-- CreateIndex
CREATE INDEX "daily_closeouts_barbershopId_idx" ON "daily_closeouts"("barbershopId");

-- AddForeignKey
ALTER TABLE "daily_closeouts" ADD CONSTRAINT "daily_closeouts_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
