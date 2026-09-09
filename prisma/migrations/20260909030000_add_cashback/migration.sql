-- AlterEnum: Add CASHBACK_EARNED and CASHBACK_REDEEMED to LoyaltyLedgerEntry.type
-- (Prisma handles this via @@map, but since we use String not enum, just ensure the app code handles these values)
-- No schema change needed - the ledger already supports any string type.
-- Just need to update the config structure in LoyaltyProgram.config to include cashback settings.
SELECT 1;