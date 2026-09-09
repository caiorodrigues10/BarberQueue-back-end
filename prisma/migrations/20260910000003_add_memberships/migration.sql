-- Create salon_membership_plans table
CREATE TABLE "salon_membership_plans" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "price" DECIMAL(12,2) NOT NULL,
    "billingCycle" TEXT NOT NULL DEFAULT 'MONTHLY',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "maxMembers" INTEGER,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "salon_membership_plans_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "salon_membership_plans_barbershopId_isActive_idx" ON "salon_membership_plans"("barbershopId", "isActive");
ALTER TABLE "salon_membership_plans" ADD CONSTRAINT "salon_membership_plans_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;

-- Create membership_benefits table
CREATE TABLE "membership_benefits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "planId" UUID NOT NULL,
    "serviceId" UUID,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "discountPercent" REAL,
    "discountAmount" DECIMAL(12,2),
    "description" VARCHAR(200) NOT NULL,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "membership_benefits_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "membership_benefits_planId_idx" ON "membership_benefits"("planId");
ALTER TABLE "membership_benefits" ADD CONSTRAINT "membership_benefits_planId_fkey" FOREIGN KEY ("planId") REFERENCES "salon_membership_plans"("id") ON DELETE CASCADE;
ALTER TABLE "membership_benefits" ADD CONSTRAINT "membership_benefits_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL;

-- Create client_memberships table
CREATE TABLE "client_memberships" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "planId" UUID NOT NULL,
    "clientId" UUID NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "startDate" DATE NOT NULL,
    "currentPeriodEnd" DATE NOT NULL,
    "cancelDate" TIMESTAMPTZ,
    "pauseDate" TIMESTAMPTZ,
    "resumeDate" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "client_memberships_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "client_memberships_barbershopId_clientId_planId_key" ON "client_memberships"("barbershopId", "clientId", "planId");
CREATE INDEX "client_memberships_barbershopId_status_idx" ON "client_memberships"("barbershopId", "status");
CREATE INDEX "client_memberships_clientId_idx" ON "client_memberships"("clientId");
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_planId_fkey" FOREIGN KEY ("planId") REFERENCES "salon_membership_plans"("id") ON DELETE RESTRICT;
ALTER TABLE "client_memberships" ADD CONSTRAINT "client_memberships_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "salon_clients"("id") ON DELETE CASCADE;

-- Create membership_cycles table
CREATE TABLE "membership_cycles" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "membershipId" UUID NOT NULL,
    "periodStart" DATE NOT NULL,
    "periodEnd" DATE NOT NULL,
    "dueDate" DATE NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "paidAt" TIMESTAMPTZ,
    "paymentMethod" VARCHAR(30),
    "idempotencyKey" VARCHAR(100),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "membership_cycles_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "membership_cycles_idempotencyKey_key" ON "membership_cycles"("idempotencyKey");
CREATE INDEX "membership_cycles_membershipId_dueDate_idx" ON "membership_cycles"("membershipId", "dueDate");
CREATE INDEX "membership_cycles_status_dueDate_idx" ON "membership_cycles"("status", "dueDate");
ALTER TABLE "membership_cycles" ADD CONSTRAINT "membership_cycles_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "client_memberships"("id") ON DELETE CASCADE;

-- Create membership_usages table
CREATE TABLE "membership_usages" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "membershipId" UUID NOT NULL,
    "benefitId" UUID NOT NULL,
    "appointmentId" UUID,
    "usedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "idempotencyKey" VARCHAR(100),

    CONSTRAINT "membership_usages_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "membership_usages_idempotencyKey_key" ON "membership_usages"("idempotencyKey");
CREATE INDEX "membership_usages_membershipId_benefitId_idx" ON "membership_usages"("membershipId", "benefitId");
ALTER TABLE "membership_usages" ADD CONSTRAINT "membership_usages_membershipId_fkey" FOREIGN KEY ("membershipId") REFERENCES "client_memberships"("id") ON DELETE CASCADE;
ALTER TABLE "membership_usages" ADD CONSTRAINT "membership_usages_benefitId_fkey" FOREIGN KEY ("benefitId") REFERENCES "membership_benefits"("id") ON DELETE RESTRICT;
ALTER TABLE "membership_usages" ADD CONSTRAINT "membership_usages_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL;
