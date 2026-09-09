import { prisma } from "@/libs/prismaClient";

export class OrganizationRepository {
  async create(ownerId: string, data: { name: string; slug: string; logoUrl?: string }) {
    return prisma.$transaction(async (tx: any) => {
      const org = await tx.organization.create({
        data: { ...data, ownerId },
      });
      await tx.organizationMember.create({
        data: {
          organizationId: org.id,
          userId: ownerId,
          role: "OWNER",
          acceptedAt: new Date(),
        },
      });
      return org;
    });
  }

  async findBySlug(slug: string) {
    return prisma.organization.findUnique({ where: { slug } });
  }

  async findById(id: string) {
    return prisma.organization.findUnique({
      where: { id },
      include: {
        members: { include: { user: true } },
        barbershops: true,
        owner: true,
      },
    });
  }

  async listByUser(userId: string) {
    return prisma.organization.findMany({
      where: {
        OR: [
          { ownerId: userId },
          { members: { some: { userId } },
          },
        ],
      },
      include: { barbershops: true },
      orderBy: { createdAt: "desc" },
    });
  }

  async update(id: string, data: { name?: string; slug?: string; logoUrl?: string | null }) {
    return prisma.organization.update({ where: { id }, data });
  }

  async delete(id: string) {
    return prisma.organization.delete({ where: { id } });
  }

  async getMember(organizationId: string, userId: string) {
    return prisma.organizationMember.findUnique({
      where: { organizationId_userId: { organizationId, userId } },
    });
  }

  async listMembers(organizationId: string) {
    return prisma.organizationMember.findMany({
      where: { organizationId },
      include: { user: true },
      orderBy: { createdAt: "asc" },
    });
  }

  async addMember(organizationId: string, userId: string, role: string) {
    return prisma.organizationMember.create({
      data: { organizationId, userId, role: role as any },
    });
  }

  async updateMemberRole(memberId: string, role: string) {
    return prisma.organizationMember.update({
      where: { id: memberId },
      data: { role: role as any },
    });
  }

  async removeMember(memberId: string) {
    return prisma.organizationMember.delete({ where: { id: memberId } });
  }
}
