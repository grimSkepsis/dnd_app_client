import { CurrencyData } from "./types";

type InventoryCurrencyProps = {
  data: CurrencyData;
};
export function InventoryCurrency({
  data: { pp = 0, gp = 0, sp = 0, cp = 0 },
}: InventoryCurrencyProps) {
  return (
    <div className="flex gap-3">
      <p>Platinum: {pp}</p>
      <p>Gold: {gp}</p>
      <p>Silver: {sp}</p>
      <p>Copper: {cp}</p>
    </div>
  );
}
