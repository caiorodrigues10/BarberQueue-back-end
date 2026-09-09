import { prisma } from "@/libs/prismaClient";

export class ClientPortalRepository {
  // ─── Identity ────────────────────────────────────────────────
  async findIdentityByPhone(normalizedPhone: string) {
    return prisma.clientIdentity.findUnique({ where: { normalizedPhone } });
  }

  async createIdentity(data: {
    name: string;
    phone: string;
    normalizedPhone: string;
  }) {
    return prisma.clientIdentity.create({ data });
  }

  async markPhoneVerified(identityId: string) {
    return prisma.clientIdentity.update({
      where: { id: identityId },
      data: { phoneVerified: true },
    });
  }

  // ─── OTP ─────────────────────────────────────────────────────
  async createOtpChallenge(data: {
    phone: string;
    normalizedPhone: string;
    codeHash: string;
    identityId?: string;
    ipAddress?: string;
    expiresAt: Date;
  }) {
    return prisma.clientOtpChallenge.create({ data });
  }

  async findLatestPendingOtp(normalizedPhone: string) {
    return prisma.clientOtpChallenge.findFirst({
      where: {
        normalizedPhone,
        status: "PENDING",
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async incrementOtpAttempts(challengeId: string, attempts: number) {
    return prisma.clientOtpChallenge.update({
      where: { id: challengeId },
      data: { attempts },
    });
  }

  async markOtpVerified(challengeId: string, identityId: string) {
    return prisma.clientOtpChallenge.update({
      where: { id: challengeId },
      data: {
        status: "VERIFIED",
        verifiedAt: new Date(),
        identityId,
      },
    });
  }

  async markOtpFailed(challengeId: string) {
    return prisma.clientOtpChallenge.update({
      where: { id: challengeId },
      data: { status: "FAILED" },
    });
  }

  async markOtpExpired(challengeId: string) {
    return prisma.clientOtpChallenge.update({
      where: { id: challengeId },
      data: { status: "EXPIRED" },
    });
  }

  // ─── Sessions ────────────────────────────────────────────────
  async createSession(data: {
    identityId: string;
    accessTokenHash: string;
    refreshTokenHash: string;
    ipAddress?: string;
    userAgent?: string;
    expiresAt: Date;
  }) {
    return prisma.clientSession.create({ data });
  }

  async findSession(id: string) {
    return prisma.clientSession.findUnique({ where: { id } });
  }

  async revokeSession(id: string) {
    return prisma.clientSession.update({
      where: { id },
      data: { revokedAt: new Date() },
    });
  }

  // ─── Salon Links ─────────────────────────────────────────────
  async findLinkByIdentityAndSalon(identityId: string, barbershopId: string) {
    return prisma.clientSalonLink.findUnique({
      where: { identityId_barbershopId: { identityId, barbershopId } },
    });
  }

  async createSalonLink(data: {
    identityId: string;
    barbershopId: string;
    salonClientId?: string;
  }) {
    return prisma.clientSalonLink.create({
      data: {
        ...data,
        status: "PENDING",
        requestedAt: new Date(),
      },
    });
  }

  async confirmSalonLink(
    linkId: string,
    confirmedById?: string,
    salonClientId?: string
  ) {
    return prisma.clientSalonLink.update({
      where: { id: linkId },
      data: {
        status: "CONFIRMED",
        confirmedAt: new Date(),
        confirmedById,
        salonClientId,
      },
    });
  }

  async rejectSalonLink(
    linkId: string,
    rejectedById?: string,
    reason?: string
  ) {
    return prisma.clientSalonLink.update({
      where: { id: linkId },
      data: {
        status: "REJECTED",
        rejectedAt: new Date(),
        rejectedById,
        rejectReason: reason,
      },
    });
  }

  async revokeSalonLink(linkId: string) {
    return prisma.clientSalonLink.update({
      where: { id: linkId },
      data: {
        status: "REVOKED",
        revocationAt: new Date(),
      },
    });
  }

  async listLinksByBarbershop(barbershopId: string, status?: string) {
    const where: any = { barbershopId };
    if (status) where.status = status;
    return prisma.clientSalonLink.findMany({
      where,
      include: { identity: true, salonClient: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async listLinksByIdentity(identityId: string) {
    return prisma.clientSalonLink.findMany({
      where: { identityId },
      include: { barbershop: true },
      orderBy: { createdAt: "desc" },
    });
  }

  // ─── Care Instruction Templates ──────────────────────────────
  async createCareTemplate(data: {
    barbershopId: string;
    serviceId?: string;
    title: string;
    content: string;
  }) {
    return prisma.careInstructionTemplate.create({ data });
  }

  async updateCareTemplate(
    id: string,
    barbershopId: string,
    data: { title?: string; content?: string; serviceId?: string; isActive?: boolean }
  ) {
    return prisma.careInstructionTemplate.updateMany({
      where: { id, barbershopId },
      data,
    });
  }

  async listCareTemplates(barbershopId: string) {
    return prisma.careInstructionTemplate.findMany({
      where: { barbershopId },
      orderBy: { createdAt: "desc" },
    });
  }

  async findCareTemplate(id: string) {
    return prisma.careInstructionTemplate.findUnique({ where: { id } });
  }

  async deleteCareTemplate(id: string, barbershopId: string) {
    return prisma.careInstructionTemplate.deleteMany({
      where: { id, barbershopId },
    });
  }

  // ─── Care Instructions ───────────────────────────────────────
  async createCareInstruction(data: {
    barbershopId: string;
    identityId: string;
    appointmentId?: string;
    templateId?: string;
    title: string;
    content: string;
    templateVersion: number;
    sentById?: string;
  }) {
    return prisma.clientCareInstruction.create({ data });
  }

  async listCareInstructions(barbershopId: string, identityId?: string) {
    const where: any = { barbershopId };
    if (identityId) where.identityId = identityId;
    return prisma.clientCareInstruction.findMany({
      where,
      include: { template: true, identity: true },
      orderBy: { sentAt: "desc" },
    });
  }

  async markCareInstructionRead(id: string) {
    return prisma.clientCareInstruction.update({
      where: { id },
      data: { readAt: new Date() },
    });
  }

  async listCareInstructionsByIdentity(identityId: string, barbershopId?: string) {
    const where: any = { identityId };
    if (barbershopId) where.barbershopId = barbershopId;
    return prisma.clientCareInstruction.findMany({
      where,
      include: { barbershop: true },
      orderBy: { sentAt: "desc" },
    });
  }

  // ─── Client Portal Dashboard ─────────────────────────────────
  async getPortalDashboard(barbershopId: string, identityId: string) {
    const [identity, links, careInstructions] = await Promise.all([
      prisma.clientIdentity.findUnique({ where: { id: identityId } }),
      prisma.clientSalonLink.findMany({
        where: { barbershopId, identityId },
        include: { salonClient: true },
      }),
      prisma.clientCareInstruction.findMany({
        where: { barbershopId, identityId },
        orderBy: { sentAt: "desc" },
        take: 10,
      }),
    ]);

    const salonClientId = links[0]?.salonClientId;
    const recentAppointments = salonClientId
      ? await prisma.appointment.findMany({
          where: { barbershopId, clientId: salonClientId },
          orderBy: { date: "desc" },
          take: 10,
          include: { service: true, staff: true },
        })
      : [];

    return { identity, links, careInstructions, recentAppointments };
  }
}
