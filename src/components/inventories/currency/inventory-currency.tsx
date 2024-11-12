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
  //TODO fix overflow issue
  const form = useForm<CurrencyFormProperties>({
    resolver: zodResolver(CurrencyFormSchema),
    defaultValues: {
      pp: 0,
      gp: 0,
      sp: 0,
      cp: 0,
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
    <div className="flex gap-3">
      <form
        {...form}
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex gap-3"
      >
        <div className="flex gap-3 flex-col">
          <p>Platinum: {pp}</p>
          {isEditing && (
            <FormField
              control={form.control}
              name="pp"
              render={({ field }) => (
                <Input className="w-20" type="number" {...field} />
              )}
            />
          )}
        </div>
        <div className="flex gap-3 flex-col">
          <p>Gold: {gp}</p>
          {isEditing && (
            <FormField
              control={form.control}
              name="gp"
              render={({ field }) => (
                <Input className="w-20" type="number" {...field} />
              )}
            />
          )}
        </div>
        <div className="flex gap-3 flex-col">
          <p>Silver: {sp}</p>
          {isEditing && (
            <FormField
              control={form.control}
              name="sp"
              render={({ field }) => (
                <Input className="w-20" type="number" {...field} />
              )}
            />
          )}
        </div>
        <div className="flex gap-3 flex-col">
          <p>Copper: {cp}</p>
          {isEditing && (
            <FormField
              control={form.control}
              name="cp"
              render={({ field }) => (
                <Input className="w-20" type="number" {...field} />
              )}
            />
          )}
        </div>
        {isEditing && (
          <Button type="submit" size="sm">
            Save
          </Button>
        )}
      </form>
      <button
        onClick={onToggleEdit}
        className="rounded-sm h-fit opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
      >
        {isEditing ? <X className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
      </button>
    </div>
  );
}
