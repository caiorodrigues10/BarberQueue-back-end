ALTER TABLE "resource_bookings"
  ALTER COLUMN "startAt" TYPE TIMESTAMPTZ
  USING "startAt"::timestamptz;
