import { z } from "zod";

const ActivationActionCostEnum = z.enum([
  "n/a",
  "1 action",
  "2 actions",
  "3 actions",
  "free action",
  "reaction",
]);
export type ActivationActionCost = z.infer<typeof ActivationActionCostEnum>;

export const ACTIVATION_ACTION_COST_OPTIONS: Record<
  ActivationActionCost,
  string
> = {
  "n/a": "Not activatable",
  "1 action": "One Action",
  "2 actions": "Two Actions",
  "3 actions": "Three Actions",
  "free action": "Free Action",
  reaction: "Reaction",
};

export const ItemFormSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(500),
  value: z.coerce
    .number()
    .transform((val) => Number(val) * 100)
    .refine((val) => val >= 0),
  activationCost: ActivationActionCostEnum,
  usageRequirements: z.string().min(0).max(500),
  effect: z.string().min(0).max(500),
  bulk: z.coerce.number().min(0),
  level: z.coerce.number().min(0),
  traits: z.array(z.string()),
});

export type ItemFormProperties = z.infer<typeof ItemFormSchema>;
