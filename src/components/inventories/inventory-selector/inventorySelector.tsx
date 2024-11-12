import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Option } from "@/types/form";

type InventorySelectorProps = {
  inventoryOptions: Option[];
  selectedInventory: string;
  onSelect: (inventoryId: string) => void;
};
export function InventorySelector({
  inventoryOptions,
  selectedInventory,
  onSelect,
}: InventorySelectorProps) {
  return (
    <div className="flex items-center gap-2">
      <label>Viewing</label>
      <div className="w-fit">
        <Select value={selectedInventory} onValueChange={onSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Select an inventory" />
          </SelectTrigger>
          <SelectContent>
            {inventoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
