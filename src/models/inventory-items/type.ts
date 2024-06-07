export type InventoryItem = {
  uuid: string;
  name: string;
  level: number;
  traits: string[];
  activation_cost: string;
  bulk: number;
  description: string;
  usage_requirements: string;
  value: bigint;
  effect: string;
  quantity: number;
};
