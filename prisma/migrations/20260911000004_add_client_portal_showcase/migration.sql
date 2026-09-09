-- CreateEnum
CREATE TYPE "OtpStatus" AS ENUM ('PENDING', 'VERIFIED', 'EXPIRED', 'FAILED');

-- CreateEnum
CREATE TYPE "SalonLinkStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED', 'REVOKED');

-- CreateTable: client_identities
CREATE TABLE "client_identities" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" VARCHAR(200) NOT NULL,
    "phone" VARCHAR(20) NOT NULL,
    "normalizedPhone" VARCHAR(15) NOT NULL,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "client_identities_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "client_identities_phone_key" ON "client_identities"("phone");
CREATE UNIQUE INDEX "client_identities_normalizedPhone_key" ON "client_identities"("normalizedPhone");
CREATE INDEX "client_identities_normalizedPhone_idx" ON "client_identities"("normalizedPhone");

-- CreateTable: client_sessions
CREATE TABLE "client_sessions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identityId" UUID NOT NULL,
    "accessTokenHash" VARCHAR(200) NOT NULL,
    "refreshTokenHash" VARCHAR(200) NOT NULL,
    "ipAddress" VARCHAR(45),
    "userAgent" VARCHAR(500),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "revokedAt" TIMESTAMPTZ,

    CONSTRAINT "client_sessions_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "client_sessions_identityId_idx" ON "client_sessions"("identityId");
ALTER TABLE "client_sessions" ADD CONSTRAINT "client_sessions_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "client_identities"("id") ON DELETE CASCADE;

-- CreateTable: client_otp_challenges
CREATE TABLE "client_otp_challenges" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identityId" UUID,
    "phone" VARCHAR(20) NOT NULL,
    "normalizedPhone" VARCHAR(15) NOT NULL,
    "codeHash" VARCHAR(200) NOT NULL,
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "maxAttempts" INTEGER NOT NULL DEFAULT 5,
    "status" "OtpStatus" NOT NULL DEFAULT 'PENDING',
    "ipAddress" VARCHAR(45),
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "expiresAt" TIMESTAMPTZ NOT NULL,
    "verifiedAt" TIMESTAMPTZ,

    CONSTRAINT "client_otp_challenges_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "client_otp_challenges_normalizedPhone_idx" ON "client_otp_challenges"("normalizedPhone");
CREATE INDEX "client_otp_challenges_identityId_idx" ON "client_otp_challenges"("identityId");
ALTER TABLE "client_otp_challenges" ADD CONSTRAINT "client_otp_challenges_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "client_identities"("id") ON DELETE SET NULL;

-- CreateTable: client_salon_links
CREATE TABLE "client_salon_links" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "identityId" UUID NOT NULL,
    "barbershopId" UUID NOT NULL,
    "salonClientId" UUID,
    "status" "SalonLinkStatus" NOT NULL DEFAULT 'PENDING',
    "requestedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "confirmedAt" TIMESTAMPTZ,
    "confirmedById" UUID,
    "rejectedAt" TIMESTAMPTZ,
    "rejectedById" UUID,
    "rejectReason" VARCHAR(300),
    "revocationAt" TIMESTAMPTZ,
    "marketingOptIn" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "client_salon_links_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "client_salon_links_identityId_barbershopId_key" ON "client_salon_links"("identityId", "barbershopId");
CREATE INDEX "client_salon_links_barbershopId_idx" ON "client_salon_links"("barbershopId");
CREATE INDEX "client_salon_links_identityId_idx" ON "client_salon_links"("identityId");
ALTER TABLE "client_salon_links" ADD CONSTRAINT "client_salon_links_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "client_identities"("id") ON DELETE CASCADE;
ALTER TABLE "client_salon_links" ADD CONSTRAINT "client_salon_links_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "client_salon_links" ADD CONSTRAINT "client_salon_links_salonClientId_fkey" FOREIGN KEY ("salonClientId") REFERENCES "salon_clients"("id") ON DELETE SET NULL;
ALTER TABLE "client_salon_links" ADD CONSTRAINT "client_salon_links_confirmedById_fkey" FOREIGN KEY ("confirmedById") REFERENCES "users"("id") ON DELETE SET NULL;
ALTER TABLE "client_salon_links" ADD CONSTRAINT "client_salon_links_rejectedById_fkey" FOREIGN KEY ("rejectedById") REFERENCES "users"("id") ON DELETE SET NULL;

-- CreateTable: care_instruction_templates
CREATE TABLE "care_instruction_templates" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "serviceId" UUID,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "care_instruction_templates_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "care_instruction_templates_barbershopId_isActive_idx" ON "care_instruction_templates"("barbershopId", "isActive");
ALTER TABLE "care_instruction_templates" ADD CONSTRAINT "care_instruction_templates_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "care_instruction_templates" ADD CONSTRAINT "care_instruction_templates_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL;

-- CreateTable: client_care_instructions
CREATE TABLE "client_care_instructions" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "identityId" UUID NOT NULL,
    "appointmentId" UUID,
    "templateId" UUID,
    "title" VARCHAR(200) NOT NULL,
    "content" TEXT NOT NULL,
    "templateVersion" INTEGER NOT NULL,
    "sentAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "sentById" UUID,
    "readAt" TIMESTAMPTZ,

    CONSTRAINT "client_care_instructions_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "client_care_instructions_identityId_barbershopId_idx" ON "client_care_instructions"("identityId", "barbershopId");
CREATE INDEX "client_care_instructions_barbershopId_sentAt_idx" ON "client_care_instructions"("barbershopId", "sentAt");
ALTER TABLE "client_care_instructions" ADD CONSTRAINT "client_care_instructions_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "client_care_instructions" ADD CONSTRAINT "client_care_instructions_identityId_fkey" FOREIGN KEY ("identityId") REFERENCES "client_identities"("id") ON DELETE CASCADE;
ALTER TABLE "client_care_instructions" ADD CONSTRAINT "client_care_instructions_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL;
ALTER TABLE "client_care_instructions" ADD CONSTRAINT "client_care_instructions_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "care_instruction_templates"("id") ON DELETE SET NULL;
ALTER TABLE "client_care_instructions" ADD CONSTRAINT "client_care_instructions_sentById_fkey" FOREIGN KEY ("sentById") REFERENCES "users"("id") ON DELETE SET NULL;

-- AlterTable: appointments — add visitId
ALTER TABLE "appointments" ADD COLUMN "visitId" UUID;
CREATE INDEX "appointments_visitId_idx" ON "appointments"("visitId");
ALTER TABLE "appointments" ADD CONSTRAINT "appointments_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visits"("id") ON DELETE SET NULL;

-- AlterTable: salon_clients — add clientIdentityId
ALTER TABLE "salon_clients" ADD COLUMN "clientIdentityId" UUID;
ALTER TABLE "salon_clients" ADD CONSTRAINT "salon_clients_clientIdentityId_fkey" FOREIGN KEY ("clientIdentityId") REFERENCES "client_identities"("id") ON DELETE SET NULL;

-- AlterTable: visits — add FK for clientIdentityId (column exists but no FK)
ALTER TABLE "visits" ADD CONSTRAINT "visits_clientIdentityId_fkey" FOREIGN KEY ("clientIdentityId") REFERENCES "client_identities"("id") ON DELETE SET NULL;

-- AlterTable: tab_items — add UNIQUE on appointmentId
CREATE UNIQUE INDEX "tab_items_appointmentId_key" ON "tab_items"("appointmentId");

-- AlterTable: services — add careInstructionTemplates relation (no column, just Prisma meta)
-- (handled by Prisma — no SQL needed)

-- AlterTable: barbershop — add clientLinks, careInstructionTemplates, clientCareInstructions (no columns, just Prisma meta)
-- (handled by Prisma — no SQL needed)
