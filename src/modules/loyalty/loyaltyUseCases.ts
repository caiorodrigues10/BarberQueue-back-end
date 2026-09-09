import { prisma } from "@/libs/prismaClient";
import { AppError } from "@/shared/errors/AppError";
import { LoyaltyRepository } from "./loyaltyRepository";

export class LoyaltyUseCases {
  private repo = new LoyaltyRepository();

  async configureProgram(barbershopId: string, data: { type: string; config: Record<string, unknown> }) {
    const existing = await this.repo.findProgram(barbershopId);
    if (existing) {
      return this.repo.updateProgram(barbershopId, data.config);
    }
    return this.repo.createProgram(barbershopId, data.type, data.config);
  }

  async getProgram(barbershopId: string) {
    return this.repo.findProgram(barbershopId);
  }

  async getAccount(barbershopId: string, clientId: string) {
    const account = await this.repo.findOrCreateAccount(barbershopId, clientId);
    const entries = await this.repo.getAccountEntries(account.id);
    return { account, entries };
  }

  async recordVisit(barbershopId: string, clientId: string, idempotencyKey?: string | null) {
    const program = await this.repo.findProgram(barbershopId);
    if (!program || !program.isActive) {
      throw new AppError("Loyalty program not configured or inactive", 400);
    }

    const account = await this.repo.incrementVisits(barbershopId, clientId);

    const entry = await this.repo.createLedgerEntry({
      barbershopId,
      accountId: account.id,
      type: "VISIT_EARNED",
      description: "Visita registrada",
      idempotencyKey,
    });

    const config = program.config as any;
    const visitsRequired = config?.visitsRequired ?? 10;
    const rewardCount = Math.floor(account.totalVisits / visitsRequired);

    return { account, entry, rewardCount };
  }

  async redeemReward(barbershopId: string, clientId: string, description?: string, idempotencyKey?: string | null) {
    const program = await this.repo.findProgram(barbershopId);
    if (!program || !program.isActive) {
      throw new AppError("Loyalty program not configured or inactive", 400);
    }

    const account = await this.repo.findOrCreateAccount(barbershopId, clientId);
    const config = program.config as any;
    const visitsRequired = config?.visitsRequired ?? 10;

    if (account.totalVisits < visitsRequired) {
      throw new AppError("Not enough visits to redeem reward", 400);
    }

    const updatedAccount = await this.repo.incrementRewards(barbershopId, clientId);

    const entry = await this.repo.createLedgerEntry({
      barbershopId,
      accountId: account.id,
      type: "REWARD_REDEEMED",
      description: description ?? config?.rewardDescription ?? "Recompensa resgatada",
      idempotencyKey,
    });

    return { account: updatedAccount, entry };
  }

  async adjustManual(barbershopId: string, clientId: string, delta: number, description: string, idempotencyKey?: string | null) {
    const account = await this.repo.findOrCreateAccount(barbershopId, clientId);

    const updatedAccount = await prisma.loyaltyAccount.update({
      where: { id: account.id },
      data: { totalVisits: { increment: delta } },
    });

    const entry = await this.repo.createLedgerEntry({
      barbershopId,
      accountId: account.id,
      type: "MANUAL_ADJUSTMENT",
      description,
      metadata: { delta },
      idempotencyKey,
    });

    return { account: updatedAccount, entry };
  }
}
