import { z } from "zod";

const decimalString = z.string().regex(/^\d+(\.\d{1,2})?$/, "Must be a valid decimal string");

export const createCloseoutSchema = z.object({
  barbershopId: z.string().uuid().optional(),
  date: z.coerce.date({ required_error: "Date is required" }),
  balanceOpen: z.coerce.number().min(0).default(0),
  cashReceived: z.coerce.number().min(0).default(0),
  pixReceived: z.coerce.number().min(0).default(0),
  cardReceived: z.coerce.number().min(0).default(0),
  fiadoCreated: z.coerce.number().min(0).default(0),
  fiadoPaid: z.coerce.number().min(0).default(0),
  expenses: z.coerce.number().min(0).default(0),
  commissions: z.coerce.number().min(0).default(0),
  productSales: z.coerce.number().min(0).default(0),
  discrepancy: z.coerce.number().optional().nullable(),
  notes: z.string().max(1000).optional().nullable(),
});

export const closeoutQuerySchema = z.object({
  date: z.coerce.date({ required_error: "Date query param is required" }),
});

export const closeoutRangeQuerySchema = z.object({
  startDate: z.coerce.date({ required_error: "startDate is required" }),
  endDate: z.coerce.date({ required_error: "endDate is required" }),
});

export type CreateCloseoutInput = z.infer<typeof createCloseoutSchema>;
export type CloseoutQueryInput = z.infer<typeof closeoutQuerySchema>;
export type CloseoutRangeQueryInput = z.infer<typeof closeoutRangeQuerySchema>;
