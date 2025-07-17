import { z } from "zod";

export type CurrencyData = { pp: number; gp: number; sp: number; cp: number };
export const CurrencyFormSchema = z.object({
  pp: z.number(),
  gp: z.number(),
  sp: z.number(),
  cp: z.number(),
});

export type CurrencyFormProperties = z.infer<typeof CurrencyFormSchema>;
