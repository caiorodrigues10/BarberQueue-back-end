-- CreateTable
CREATE TABLE "activation_metrics" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "event" VARCHAR(100) NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "activation_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "activation_metrics_barbershopId_idx" ON "activation_metrics"("barbershopId");

-- CreateIndex
CREATE INDEX "activation_metrics_barbershopId_event_idx" ON "activation_metrics"("barbershopId", "event");

-- AddForeignKey
ALTER TABLE "activation_metrics" ADD CONSTRAINT "activation_metrics_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;
