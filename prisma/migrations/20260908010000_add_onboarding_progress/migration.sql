-- AlterTable
ALTER TABLE "barbershops" ADD COLUMN "onboardingCompletedSteps" TEXT[] DEFAULT '{}';
ALTER TABLE "barbershops" ADD COLUMN "onboardingCurrentStep" TEXT;
ALTER TABLE "barbershops" ADD COLUMN "onboardingStartedAt" TIMESTAMP(3);
ALTER TABLE "barbershops" ADD COLUMN "onboardingCompletedAt" TIMESTAMP(3);
