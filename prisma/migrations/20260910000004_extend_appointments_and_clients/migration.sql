-- Extend appointments with deposit and no-show fields
ALTER TABLE "appointments" ADD COLUMN "depositStatus" TEXT;
ALTER TABLE "appointments" ADD COLUMN "depositExpiry" TIMESTAMPTZ;
ALTER TABLE "appointments" ADD COLUMN "noShowMarkedAt" TIMESTAMPTZ;
ALTER TABLE "appointments" ADD COLUMN "noShowMarkedById" UUID;

-- Extend salon_clients with risk and attendance fields
ALTER TABLE "salon_clients" ADD COLUMN "totalAppointments" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "salon_clients" ADD COLUMN "totalCancellations" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "salon_clients" ADD COLUMN "totalLateCancellations" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "salon_clients" ADD COLUMN "totalNoShows" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "salon_clients" ADD COLUMN "totalDepositsExpired" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "salon_clients" ADD COLUMN "attendanceRate" REAL;
ALTER TABLE "salon_clients" ADD COLUMN "riskLevel" TEXT NOT NULL DEFAULT 'NONE';
ALTER TABLE "salon_clients" ADD COLUMN "riskRestrictionUntil" TIMESTAMPTZ;
