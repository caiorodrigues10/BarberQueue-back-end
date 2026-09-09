-- Extend appointment_policies with deposit and protection fields
ALTER TABLE "appointment_policies" ADD COLUMN "depositRequired" TEXT NOT NULL DEFAULT 'OFF';
ALTER TABLE "appointment_policies" ADD COLUMN "depositDefaultPercent" REAL NOT NULL DEFAULT 30;
ALTER TABLE "appointment_policies" ADD COLUMN "depositDefaultAmount" DECIMAL(12,2);
ALTER TABLE "appointment_policies" ADD COLUMN "depositConfirmHours" INTEGER NOT NULL DEFAULT 2;
ALTER TABLE "appointment_policies" ADD COLUMN "depositInstructions" TEXT;
ALTER TABLE "appointment_policies" ADD COLUMN "depositPixKey" VARCHAR(100);
ALTER TABLE "appointment_policies" ADD COLUMN "depositRefundRule" TEXT NOT NULL DEFAULT 'FULL_REFUND';
ALTER TABLE "appointment_policies" ADD COLUMN "noShowDepositRule" TEXT NOT NULL DEFAULT 'NO_REFUND';
ALTER TABLE "appointment_policies" ADD COLUMN "maxReschedules" INTEGER NOT NULL DEFAULT 2;
ALTER TABLE "appointment_policies" ADD COLUMN "rescheduleTransferDeposit" BOOLEAN NOT NULL DEFAULT true;
ALTER TABLE "appointment_policies" ADD COLUMN "lateToleranceMinutes" INTEGER NOT NULL DEFAULT 15;
ALTER TABLE "appointment_policies" ADD COLUMN "riskThresholdNoShows" INTEGER NOT NULL DEFAULT 3;
ALTER TABLE "appointment_policies" ADD COLUMN "riskBlockDurationDays" INTEGER NOT NULL DEFAULT 30;
ALTER TABLE "appointment_policies" ADD COLUMN "riskReinforcedDeposit" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "appointment_policies" ADD COLUMN "riskManualApproval" BOOLEAN NOT NULL DEFAULT false;
