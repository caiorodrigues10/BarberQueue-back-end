import { z } from "zod";

export const showcaseModeMap = {
  direct_service: "DIRECT_SERVICE",
  whatsapp_evaluation: "WHATSAPP_EVALUATION",
} as const;

export const showcaseStatusMap = {
  draft: "DRAFT",
  published: "PUBLISHED",
  hidden: "HIDDEN",
} as const;

export const imageAuthorizationMap = {
  team_confirmed: "TEAM_CONFIRMED",
  no_identifiable_client: "NO_IDENTIFIABLE_CLIENT",
  pending_review: "PENDING_REVIEW",
} as const;

export const createShowcaseEntrySchema = z.object({
  barbershopId: z.string().uuid(),
  postId: z.string().uuid(),
  title: z.string().min(1).max(200),
  description: z.string().max(5000).optional().nullable(),
  altText: z.string().max(300).optional().nullable(),
  mode: z.enum(["direct_service", "whatsapp_evaluation"]).default("direct_service"),
  serviceId: z.string().uuid().optional().nullable(),
  staffId: z.string().uuid().optional().nullable(),
  imageAuthorization: z.enum(["team_confirmed", "no_identifiable_client", "pending_review"]),
  authorizedById: z.string().uuid().optional().nullable(),
  authorizationNote: z.string().max(300).optional().nullable(),
});

export const updateShowcaseEntrySchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().max(5000).optional().nullable(),
  altText: z.string().max(300).optional().nullable(),
  mode: z.enum(["direct_service", "whatsapp_evaluation"]).optional(),
  serviceId: z.string().uuid().optional().nullable(),
  staffId: z.string().uuid().optional().nullable(),
  imageAuthorization: z.enum(["team_confirmed", "no_identifiable_client", "pending_review"]).optional(),
  authorizedById: z.string().uuid().optional().nullable(),
  authorizationNote: z.string().max(300).optional().nullable(),
});

export const showcaseOrderSchema = z.object({
  entries: z.array(z.object({
    id: z.string().uuid(),
    position: z.number().int().min(0),
  })),
});

export const showcaseListQuerySchema = z.object({
  barbershopId: z.string().uuid().optional(),
  status: z.enum(["draft", "published", "hidden"]).optional(),
});

export const showcaseEventQuerySchema = z.object({
  barbershopId: z.string().uuid().optional(),
  entryId: z.string().uuid().optional(),
  from: z.string().optional(),
  to: z.string().optional(),
});
