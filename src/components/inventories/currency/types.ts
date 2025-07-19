import { z } from "zod";

export type CurrencyData = { pp: number; gp: number; sp: number; cp: number };

const numberOrNumericString = z.union([
  z.number(),
  z
    .string()
    .refine((val) => !isNaN(Number(val)), { message: "Must be a number" }),
]);

export const CurrencyFormSchema = z.object({
  pp: numberOrNumericString,
  gp: numberOrNumericString,
  sp: numberOrNumericString,
  cp: numberOrNumericString,
});

export type CurrencyFormProperties = z.infer<typeof CurrencyFormSchema>;

export function convertCurrencyFormToData(
  form: CurrencyFormProperties
): CurrencyData {
  return {
    pp: Number(form.pp),
    gp: Number(form.gp),
    sp: Number(form.sp),
    cp: Number(form.cp),
  };
}
