import { z } from "zod";

export type CurrencyData = { pp: number; gp: number; sp: number; cp: number };
export const CurrencyFormSchema = z.object({
  pp: z.coerce.number(),
  gp: z.coerce.number(),
  sp: z.coerce.number(),
  cp: z.coerce.number(),
});

export type CurrencyFormProperties = z.infer<typeof CurrencyFormSchema>;
