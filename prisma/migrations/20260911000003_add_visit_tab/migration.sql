-- CreateEnum
CREATE TYPE "VisitStatus" AS ENUM ('PLANNED', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TabStatus" AS ENUM ('OPEN', 'CLOSED', 'CANCELED');

-- CreateEnum
CREATE TYPE "TabItemType" AS ENUM ('SERVICE', 'ADDON', 'PRODUCT', 'COMBO', 'CREDIT', 'DEPOSIT');

-- CreateEnum
CREATE TYPE "TabItemStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELED');

-- Create visits table
CREATE TABLE "visits" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "clientId" UUID,
    "clientIdentityId" UUID,
    "status" "VisitStatus" NOT NULL DEFAULT 'PLANNED',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "visits_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "visits_barbershopId_status_idx" ON "visits"("barbershopId", "status");
ALTER TABLE "visits" ADD CONSTRAINT "visits_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "visits" ADD CONSTRAINT "visits_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "salon_clients"("id") ON DELETE SET NULL;

-- Create visit_tabs table
CREATE TABLE "visit_tabs" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "visitId" UUID NOT NULL,
    "barbershopId" UUID NOT NULL,
    "status" "TabStatus" NOT NULL DEFAULT 'OPEN',
    "subtotal" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "creditsApplied" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "depositApplied" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalReceived" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "totalPending" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "closedAt" TIMESTAMPTZ,
    "closedById" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "visit_tabs_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "visit_tabs_visitId_key" ON "visit_tabs"("visitId");
CREATE INDEX "visit_tabs_barbershopId_status_idx" ON "visit_tabs"("barbershopId", "status");
ALTER TABLE "visit_tabs" ADD CONSTRAINT "visit_tabs_visitId_fkey" FOREIGN KEY ("visitId") REFERENCES "visits"("id") ON DELETE CASCADE;
ALTER TABLE "visit_tabs" ADD CONSTRAINT "visit_tabs_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "visit_tabs" ADD CONSTRAINT "visit_tabs_closedById_fkey" FOREIGN KEY ("closedById") REFERENCES "users"("id") ON DELETE SET NULL;

-- Create tab_items table
CREATE TABLE "tab_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tabId" UUID NOT NULL,
    "type" "TabItemType" NOT NULL DEFAULT 'SERVICE',
    "serviceId" UUID,
    "variationId" UUID,
    "addonId" UUID,
    "productId" UUID,
    "comboId" UUID,
    "appointmentId" UUID,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "unitPrice" DECIMAL(12,2) NOT NULL,
    "discountPercent" REAL NOT NULL DEFAULT 0,
    "discountAmount" DECIMAL(12,2) NOT NULL DEFAULT 0,
    "total" DECIMAL(12,2) NOT NULL,
    "staffId" UUID,
    "status" "TabItemStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "tab_items_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "tab_items_tabId_idx" ON "tab_items"("tabId");
ALTER TABLE "tab_items" ADD CONSTRAINT "tab_items_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "visit_tabs"("id") ON DELETE CASCADE;
ALTER TABLE "tab_items" ADD CONSTRAINT "tab_items_appointmentId_fkey" FOREIGN KEY ("appointmentId") REFERENCES "appointments"("id") ON DELETE SET NULL;

-- Create tab_payments table
CREATE TABLE "tab_payments" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "tabId" UUID NOT NULL,
    "amount" DECIMAL(12,2) NOT NULL,
    "paymentMethod" VARCHAR(30) NOT NULL,
    "reference" VARCHAR(200),
    "recordedById" UUID,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "tab_payments_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "tab_payments_tabId_idx" ON "tab_payments"("tabId");
ALTER TABLE "tab_payments" ADD CONSTRAINT "tab_payments_tabId_fkey" FOREIGN KEY ("tabId") REFERENCES "visit_tabs"("id") ON DELETE CASCADE;
