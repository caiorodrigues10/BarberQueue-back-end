import { AppError } from "@/shared/errors/AppError";
import {
  MembershipRepository,
  CreatePlanData,
  UpdatePlanData,
  CreateMembershipData,
  RecordPaymentData,
} from "./membershipRepository";

export class MembershipUseCases {
  private repo = new MembershipRepository();

  async createPlan(barbershopId: string, data: CreatePlanData) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    return this.repo.createPlan({ ...data, barbershopId });
  }

  async updatePlan(barbershopId: string, planId: string, data: UpdatePlanData) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!planId) throw new AppError("planId is required", 400);

    const plan = await this.repo.getPlan(planId);
    if (!plan) throw new AppError("Plan not found", 404);
    if (plan.barbershopId !== barbershopId) throw new AppError("Access denied", 403);

    return this.repo.updatePlan(planId, data);
  }

  async listPlans(barbershopId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    return this.repo.listPlans(barbershopId);
  }

  async createMembership(barbershopId: string, data: CreateMembershipData) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!data.planId) throw new AppError("planId is required", 400);
    if (!data.clientId) throw new AppError("clientId is required", 400);

    const plan = await this.repo.getPlan(data.planId);
    if (!plan) throw new AppError("Plan not found", 404);
    if (plan.barbershopId !== barbershopId) throw new AppError("Access denied", 403);

    return this.repo.createMembership({ ...data, barbershopId });
  }

  async activateMembership(barbershopId: string, membershipId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);
    if (membership.status !== "PENDING") {
      throw new AppError(`Cannot activate membership in status ${membership.status}`, 400);
    }

    return this.repo.activateMembership(membershipId);
  }

  async pauseMembership(barbershopId: string, membershipId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);
    if (membership.status !== "ACTIVE") {
      throw new AppError(`Cannot pause membership in status ${membership.status}`, 400);
    }

    return this.repo.pauseMembership(membershipId);
  }

  async resumeMembership(barbershopId: string, membershipId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);
    if (membership.status !== "PAUSED") {
      throw new AppError(`Cannot resume membership in status ${membership.status}`, 400);
    }

    return this.repo.resumeMembership(membershipId);
  }

  async cancelMembership(barbershopId: string, membershipId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);
    if (membership.status === "CANCELLED") {
      throw new AppError("Membership is already cancelled", 400);
    }

    return this.repo.cancelMembership(membershipId);
  }

  async recordPayment(barbershopId: string, membershipId: string, cycleId: string, data: RecordPaymentData) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);
    if (!cycleId) throw new AppError("cycleId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);

    const cycles = await this.repo.listCycles(membershipId);
    const cycle = cycles.find((c: { id: string }) => c.id === cycleId);
    if (!cycle) throw new AppError("Cycle not found", 404);
    if (cycle.status === "PAID") {
      throw new AppError("Cycle is already paid", 400);
    }

    const paidCycle = await this.repo.payCycle(cycleId, data);

    if (membership.status === "PENDING") {
      await this.repo.activateMembership(membershipId);
    }

    return paidCycle;
  }

  async useBenefit(barbershopId: string, membershipId: string, benefitId: string, appointmentId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);
    if (!benefitId) throw new AppError("benefitId is required", 400);
    if (!appointmentId) throw new AppError("appointmentId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);
    if (membership.status !== "ACTIVE") {
      throw new AppError(`Cannot use benefit with membership in status ${membership.status}`, 400);
    }

    const hasPaidCycle = membership.cycles?.some((c: { status: string }) => c.status === "PAID");
    if (!hasPaidCycle) {
      throw new AppError("No paid cycle found. Record payment before using benefits.", 400);
    }

    const usage = await this.repo.getBenefitUsage(membershipId, benefitId);
    if (usage.remaining !== null && usage.remaining <= 0) {
      throw new AppError("Benefit usage limit reached for this cycle", 400);
    }

    return this.repo.useBenefit(membershipId, benefitId, appointmentId);
  }

  async reverseBenefit(barbershopId: string, usageId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!usageId) throw new AppError("usageId is required", 400);

    return this.repo.reverseBenefit(usageId);
  }

  async getMembershipDetails(barbershopId: string, membershipId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!membershipId) throw new AppError("membershipId is required", 400);

    const membership = await this.repo.getMembership(membershipId);
    if (!membership) throw new AppError("Membership not found", 404);
    if (membership.barbershopId !== barbershopId) throw new AppError("Access denied", 403);

    return membership;
  }

  async listMemberMemberships(barbershopId: string, clientId: string) {
    if (!barbershopId) throw new AppError("barbershopId is required", 400);
    if (!clientId) throw new AppError("clientId is required", 400);

    return this.repo.listMemberships(barbershopId, { clientId });
  }
}
