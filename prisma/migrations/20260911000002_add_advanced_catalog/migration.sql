-- Create service_variations table
CREATE TABLE "service_variations" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serviceId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" REAL NOT NULL,
    "avgTimeMinutes" INTEGER NOT NULL,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "service_variations_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "service_variations_serviceId_isPublic_idx" ON "service_variations"("serviceId", "isPublic");
ALTER TABLE "service_variations" ADD CONSTRAINT "service_variations_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE;

-- Create service_addons table
CREATE TABLE "service_addons" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "serviceId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "price" REAL NOT NULL,
    "avgTimeMinutes" INTEGER NOT NULL DEFAULT 0,
    "isPublic" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "service_addons_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "service_addons_serviceId_isPublic_idx" ON "service_addons"("serviceId", "isPublic");
ALTER TABLE "service_addons" ADD CONSTRAINT "service_addons_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE;

-- Create service_combos table
CREATE TABLE "service_combos" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "name" VARCHAR(100) NOT NULL,
    "description" TEXT,
    "comboPrice" REAL NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "service_combos_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "service_combos_barbershopId_isActive_idx" ON "service_combos"("barbershopId", "isActive");
ALTER TABLE "service_combos" ADD CONSTRAINT "service_combos_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;

-- Create combo_items table
CREATE TABLE "combo_items" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "comboId" UUID NOT NULL,
    "serviceId" UUID NOT NULL,
    "variationId" UUID,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "originalPrice" REAL NOT NULL,
    "discountedPrice" REAL NOT NULL,

    CONSTRAINT "combo_items_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "combo_items_comboId_serviceId_key" ON "combo_items"("comboId", "serviceId");
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_comboId_fkey" FOREIGN KEY ("comboId") REFERENCES "service_combos"("id") ON DELETE CASCADE;
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE CASCADE;
ALTER TABLE "combo_items" ADD CONSTRAINT "combo_items_variationId_fkey" FOREIGN KEY ("variationId") REFERENCES "service_variations"("id") ON DELETE SET NULL;
