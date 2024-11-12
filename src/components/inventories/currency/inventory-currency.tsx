import { Button } from "@/components/ui/button";
import {
  CurrencyData,
  CurrencyFormProperties,
  CurrencyFormSchema,
} from "./types";
import { Pencil, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormField } from "@/components/ui/form";
import { toast } from "sonner";

type InventoryCurrencyProps = {
  data: CurrencyData;
  onUpdate: (currency: CurrencyData) => void;
};
export function InventoryCurrency({
  data: { pp = 0, gp = 0, sp = 0, cp = 0 },
  onUpdate,
}: InventoryCurrencyProps) {
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<CurrencyFormProperties>({
    resolver: zodResolver(CurrencyFormSchema),
    defaultValues: {
      pp,
      gp,
      sp,
      cp,
    },
  });

  function onToggleEdit() {
    setIsEditing(!isEditing);
  }

  async function onSubmit(data: CurrencyFormProperties) {
    try {
      await onUpdate(data);
      setIsEditing(false);
      toast.success("Currency updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update currency");
    }
  }

  return (
    <div>
      <div className="flex gap-3">
        <p>Platinum: {pp}</p>
        <p>Gold: {gp}</p>
        <p>Silver: {sp}</p>
        <p>Copper: {cp}</p>
        <button
          onClick={onToggleEdit}
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          {isEditing ? (
            <X className="h-4 w-4" />
          ) : (
            <Pencil className="h-4 w-4" />
          )}
        </button>
      </div>
      {isEditing && (
        <form {...form} onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex gap-3 max-w-xs">
            <FormField
              control={form.control}
              name="pp"
              render={({ field }) => <Input type="number" {...field} />}
            />
            <FormField
              control={form.control}
              name="gp"
              render={({ field }) => <Input type="number" {...field} />}
            />
            <FormField
              control={form.control}
              name="sp"
              render={({ field }) => <Input type="number" {...field} />}
            />
            <FormField
              control={form.control}
              name="cp"
              render={({ field }) => <Input type="number" {...field} />}
            />
            <Button variant="outline" size="sm">
              Save
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
