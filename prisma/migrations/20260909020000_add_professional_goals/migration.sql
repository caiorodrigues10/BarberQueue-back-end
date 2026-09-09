-- CreateTable
CREATE TABLE "professional_goals" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "professionalId" UUID NOT NULL,
    "metric" VARCHAR(30) NOT NULL,
    "target" DECIMAL(12,2) NOT NULL,
    "period" VARCHAR(20) NOT NULL DEFAULT 'MONTHLY',
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "professional_goals_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "professional_goals_barbershopId_professionalId_metric_startDate_key" ON "professional_goals"("barbershopId", "professionalId", "metric", "startDate");

-- AddForeignKey
ALTER TABLE "professional_goals" ADD CONSTRAINT "professional_goals_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "professional_goals" ADD CONSTRAINT "professional_goals_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
