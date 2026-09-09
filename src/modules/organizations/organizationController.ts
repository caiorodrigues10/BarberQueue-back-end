import { FastifyRequest, FastifyReply } from "fastify";
import {
  createOrganizationSchema,
  updateOrganizationSchema,
  inviteMemberSchema,
  updateMemberRoleSchema,
} from "./organizationSchema";
import { OrganizationUseCases } from "./organizationUseCases";

export class OrganizationController {
  private useCases = new OrganizationUseCases();

  async create(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const body = createOrganizationSchema.parse(request.body);
    const org = await this.useCases.create(user.id, body);
    reply.status(201).send({ success: true, data: org });
  }

  async listMy(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const orgs = await this.useCases.listMy(user.id);
    reply.send({ success: true, data: orgs });
  }

  async getById(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id } = request.params as { id: string };
    const org = await this.useCases.getById(id, user.id);
    reply.send({ success: true, data: org });
  }

  async update(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id } = request.params as { id: string };
    const body = updateOrganizationSchema.parse(request.body);
    const org = await this.useCases.update(id, user.id, body);
    reply.send({ success: true, data: org });
  }

  async delete(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id } = request.params as { id: string };
    await this.useCases.delete(id, user.id);
    reply.send({ success: true, message: "Organização excluída" });
  }

  async inviteMember(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id } = request.params as { id: string };
    const body = inviteMemberSchema.parse(request.body);
    const member = await this.useCases.inviteMember(id, user.id, body);
    reply.status(201).send({ success: true, data: member });
  }

  async listMembers(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id } = request.params as { id: string };
    const members = await this.useCases.listMembers(id, user.id);
    reply.send({ success: true, data: members });
  }

  async updateMemberRole(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id, memberId } = request.params as { id: string; memberId: string };
    const body = updateMemberRoleSchema.parse(request.body);
    const member = await this.useCases.updateMemberRole(id, memberId, user.id, body);
    reply.send({ success: true, data: member });
  }

  async removeMember(request: FastifyRequest, reply: FastifyReply) {
    const user = request.user!;
    const { id, memberId } = request.params as { id: string; memberId: string };
    await this.useCases.removeMember(id, memberId, user.id);
    reply.send({ success: true, message: "Membro removido" });
  }
}
