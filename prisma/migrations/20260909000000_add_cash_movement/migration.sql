-- CreateTable
CREATE TABLE "cash_movements" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "type" VARCHAR(30) NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" VARCHAR(20) NOT NULL,
    "description" VARCHAR(300),
    "sourceType" VARCHAR(30),
    "sourceId" VARCHAR(100),
    "idempotencyKey" VARCHAR(100),
    "createdBy" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cash_movements_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cash_movements_idempotencyKey_key" ON "cash_movements"("idempotencyKey");

-- CreateIndex
CREATE INDEX "cash_movements_barbershopId_createdAt_idx" ON "cash_movements"("barbershopId", "createdAt");

-- CreateIndex
CREATE INDEX "cash_movements_barbershopId_paymentMethod_idx" ON "cash_movements"("barbershopId", "paymentMethod");

-- CreateIndex
CREATE INDEX "cash_movements_barbershopId_sourceType_sourceId_idx" ON "cash_movements"("barbershopId", "sourceType", "sourceId");

-- AddForeignKey
ALTER TABLE "cash_movements" ADD CONSTRAINT "cash_movements_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
