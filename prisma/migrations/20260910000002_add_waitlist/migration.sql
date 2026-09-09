-- Create appointment_waitlist_entries table
CREATE TABLE "appointment_waitlist_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "clientId" UUID,
    "customerName" VARCHAR(200) NOT NULL,
    "whatsapp" VARCHAR(20) NOT NULL,
    "serviceId" UUID,
    "preferredStaffId" UUID,
    "dateFrom" DATE NOT NULL,
    "dateTo" DATE NOT NULL,
    "preferredPeriods" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "flexibilityMinutes" INTEGER NOT NULL DEFAULT 30,
    "priority" INTEGER NOT NULL DEFAULT 0,
    "origin" TEXT NOT NULL DEFAULT 'PUBLIC',
    "status" TEXT NOT NULL DEFAULT 'WAITING',
    "validUntil" TIMESTAMPTZ NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "appointment_waitlist_entries_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "appointment_waitlist_entries_barbershopId_status_idx" ON "appointment_waitlist_entries"("barbershopId", "status");
CREATE INDEX "appointment_waitlist_entries_barbershopId_status_serviceId_idx" ON "appointment_waitlist_entries"("barbershopId", "status", "serviceId");
ALTER TABLE "appointment_waitlist_entries" ADD CONSTRAINT "appointment_waitlist_entries_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "appointment_waitlist_entries" ADD CONSTRAINT "appointment_waitlist_entries_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "salon_clients"("id") ON DELETE SET NULL;
ALTER TABLE "appointment_waitlist_entries" ADD CONSTRAINT "appointment_waitlist_entries_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL;
ALTER TABLE "appointment_waitlist_entries" ADD CONSTRAINT "appointment_waitlist_entries_preferredStaffId_fkey" FOREIGN KEY ("preferredStaffId") REFERENCES "users"("id") ON DELETE SET NULL;

-- Create appointment_waitlist_offers table
CREATE TABLE "appointment_waitlist_offers" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entryId" UUID NOT NULL,
    "barbershopId" UUID NOT NULL,
    "offeredDate" DATE NOT NULL,
    "offeredTime" VARCHAR(5) NOT NULL,
    "staffId" UUID,
    "token" VARCHAR(100) NOT NULL,
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "respondedAt" TIMESTAMPTZ,
    "response" TEXT,
    "appointmentId" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "appointment_waitlist_offers_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "appointment_waitlist_offers_token_key" ON "appointment_waitlist_offers"("token");
CREATE INDEX "appointment_waitlist_offers_barbershopId_expiresAt_idx" ON "appointment_waitlist_offers"("barbershopId", "expiresAt");
ALTER TABLE "appointment_waitlist_offers" ADD CONSTRAINT "appointment_waitlist_offers_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "appointment_waitlist_entries"("id") ON DELETE CASCADE;
ALTER TABLE "appointment_waitlist_offers" ADD CONSTRAINT "appointment_waitlist_offers_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "appointment_waitlist_offers" ADD CONSTRAINT "appointment_waitlist_offers_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "users"("id") ON DELETE SET NULL;
