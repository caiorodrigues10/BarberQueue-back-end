-- CreateEnum
CREATE TYPE "ShowcaseMode" AS ENUM ('DIRECT_SERVICE', 'WHATSAPP_EVALUATION');

-- CreateEnum
CREATE TYPE "ShowcaseStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'HIDDEN');

-- CreateEnum
CREATE TYPE "ImageAuthorization" AS ENUM ('TEAM_CONFIRMED', 'NO_IDENTIFIABLE_CLIENT', 'PENDING_REVIEW');

-- CreateEnum
CREATE TYPE "ShowcaseEventType" AS ENUM ('VIEW', 'CLICK_BOOK', 'CLICK_WHATSAPP', 'BOOKING_CREATED', 'APPOINTMENT_COMPLETED');

-- Create showcase_entries table
CREATE TABLE "showcase_entries" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "barbershopId" UUID NOT NULL,
    "postId" UUID NOT NULL,
    "title" VARCHAR(200) NOT NULL,
    "description" TEXT,
    "altText" VARCHAR(300),
    "mode" "ShowcaseMode" NOT NULL DEFAULT 'DIRECT_SERVICE',
    "serviceId" UUID,
    "staffId" UUID,
    "position" INTEGER NOT NULL DEFAULT 0,
    "status" "ShowcaseStatus" NOT NULL DEFAULT 'DRAFT',
    "imageAuthorization" "ImageAuthorization" NOT NULL,
    "authorizedById" UUID,
    "authorizedAt" TIMESTAMPTZ,
    "authorizationNote" VARCHAR(300),
    "publishedAt" TIMESTAMPTZ,
    "hiddenAt" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "showcase_entries_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "showcase_entries_postId_key" ON "showcase_entries"("postId");
CREATE INDEX "showcase_entries_barbershopId_status_position_idx" ON "showcase_entries"("barbershopId", "status", "position");
ALTER TABLE "showcase_entries" ADD CONSTRAINT "showcase_entries_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
ALTER TABLE "showcase_entries" ADD CONSTRAINT "showcase_entries_postId_fkey" FOREIGN KEY ("postId") REFERENCES "feed_posts"("id") ON DELETE CASCADE;
ALTER TABLE "showcase_entries" ADD CONSTRAINT "showcase_entries_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "services"("id") ON DELETE SET NULL;
ALTER TABLE "showcase_entries" ADD CONSTRAINT "showcase_entries_staffId_fkey" FOREIGN KEY ("staffId") REFERENCES "users"("id") ON DELETE SET NULL;
ALTER TABLE "showcase_entries" ADD CONSTRAINT "showcase_entries_authorizedById_fkey" FOREIGN KEY ("authorizedById") REFERENCES "users"("id") ON DELETE SET NULL;

-- Create showcase_events table
CREATE TABLE "showcase_events" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "entryId" UUID NOT NULL,
    "barbershopId" UUID NOT NULL,
    "eventType" "ShowcaseEventType" NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),

    CONSTRAINT "showcase_events_pkey" PRIMARY KEY ("id")
);
CREATE INDEX "showcase_events_entryId_createdAt_idx" ON "showcase_events"("entryId", "createdAt");
CREATE INDEX "showcase_events_barbershopId_createdAt_idx" ON "showcase_events"("barbershopId", "createdAt");
ALTER TABLE "showcase_events" ADD CONSTRAINT "showcase_events_entryId_fkey" FOREIGN KEY ("entryId") REFERENCES "showcase_entries"("id") ON DELETE CASCADE;
ALTER TABLE "showcase_events" ADD CONSTRAINT "showcase_events_barbershopId_fkey" FOREIGN KEY ("barbershopId") REFERENCES "barbershops"("id") ON DELETE CASCADE;
