import { FastifyRequest, FastifyReply } from "fastify";
import {
  createVariationSchema,
  updateVariationSchema,
  createAddonSchema,
  updateAddonSchema,
  createComboSchema,
  updateComboSchema,
  comboItemSchema,
  catalogListQuerySchema,
} from "./catalogSchema";
import { CatalogUseCases } from "./catalogUseCases";
import { AppError } from "@/shared/errors/AppError";

export class CatalogController {
  private useCases = new CatalogUseCases();

  private resolveBarbershopId(user: { role: string; barbershopId?: string }, barbershopId?: string) {
    if (user.role === "MASTER_ADMIN") return barbershopId;
    return user.barbershopId ?? barbershopId;
  }

  // ─── Variations ─────────────────────────────────────────────────

  async listVariations(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = catalogListQuerySchema.parse(request.query);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.listVariations(resolved, query);
    reply.send({ success: true, data });
  }

  async createVariation(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createVariationSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.createVariation(resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async updateVariation(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateVariationSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.updateVariation(id, resolved, body);
    reply.send({ success: true, data });
  }

  async deleteVariation(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    await this.useCases.deleteVariation(id, resolved);
    reply.send({ success: true, message: "Variação removida" });
  }

  // ─── Addons ─────────────────────────────────────────────────────

  async listAddons(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = catalogListQuerySchema.parse(request.query);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.listAddons(resolved, query);
    reply.send({ success: true, data });
  }

  async createAddon(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createAddonSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.createAddon(resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async updateAddon(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateAddonSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.updateAddon(id, resolved, body);
    reply.send({ success: true, data });
  }

  async deleteAddon(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    await this.useCases.deleteAddon(id, resolved);
    reply.send({ success: true, message: "Addon removido" });
  }

  // ─── Combos ─────────────────────────────────────────────────────

  async listCombos(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const query = (request.query ?? {}) as { isActive?: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const isActive = query.isActive !== undefined ? query.isActive === "true" : undefined;
    const data = await this.useCases.listCombos(resolved, isActive);
    reply.send({ success: true, data });
  }

  async createCombo(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId } = request.params as { barbershopId: string };
    const body = createComboSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.createCombo(resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async updateCombo(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };
    const body = updateComboSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.updateCombo(id, resolved, body);
    reply.send({ success: true, data });
  }

  async deleteCombo(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, id } = request.params as { barbershopId: string; id: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    await this.useCases.deleteCombo(id, resolved);
    reply.send({ success: true, message: "Combo removido" });
  }

  async addComboItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, comboId } = request.params as { barbershopId: string; comboId: string };
    const body = comboItemSchema.parse(request.body);

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    const data = await this.useCases.addComboItem(comboId, resolved, body);
    reply.status(201).send({ success: true, data });
  }

  async removeComboItem(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const user = request.user!;
    const { barbershopId, itemId } = request.params as { barbershopId: string; itemId: string };

    const resolved = this.resolveBarbershopId(user, barbershopId);
    if (!resolved) throw new AppError("barbershopId is required", 400);

    await this.useCases.removeComboItem(itemId, resolved);
    reply.send({ success: true, message: "Item removido do combo" });
  }
}
