-- Create appointment_deposits table
CREATE TABLE "appointment_deposits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "appointmentId" UUID NOT NULL,
    "serviceId" UUID,
    "expectedAmount" DECIMAL(12,2) NOT NULL,
    "confirmedAmount" DECIMAL(12,2),
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paymentMethod" VARCHAR(30),
    "confirmationNote" TEXT,
    "confirmedById" UUID,
    "confirmedAt" TIMESTAMPTZ,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "refundRule" TEXT NOT NULL DEFAULT 'FULL_REFUND',
    "idempotencyKey" VARCHAR(100),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "appointment_deposits_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "appointment_deposits_appointmentId_key" ON "appointment_deposits"("appointmentId");
CREATE UNIQUE INDEX "appointment_deposits_idempotencyKey_key" ON "appointment_deposits"("idempotencyKey");
CREATE INDEX "appointment_deposits_barbershopId_status_idx" ON "appointment_deposits"("barbershopId", "status");
CREATE INDEX "appointment_deposits_barbershopId_status_expiresAt_idx" ON "appointment_deposits"("barbershopId", "status", "expiresAt");
ALTER TABLE "appointment_deposits" ADD CONSTRAINT "appointment_deposits_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "appointment_deposits" ADD CONSTRAINT "appointment_deposits_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE CASCADE;
ALTER TABLE "appointment_deposits" ADD CONSTRAINT "appointment_deposits_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL;
ALTER TABLE "appointment_deposits" ADD CONSTRAINT "appointment_deposits_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "users"("id") ON DELETE SET NULL;
