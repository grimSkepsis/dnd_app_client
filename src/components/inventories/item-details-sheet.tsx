import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { ItemDetailsQuery } from "@/gql/graphql";
import { ItemDetailsFragmentDocument } from "@/hooks/inventories/graphql";
import { useFragment } from "@/gql";
import isNil from "lodash/isNil";
import { DialogProps } from "@radix-ui/react-dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type ItemDetailsSheetProps = {
  data?: ItemDetailsQuery;
  isLoading: boolean;
} & DialogProps;

export default function ItemDetailsSheet({
  onOpenChange: handleOpenChange,
  data: rawData,
  ...dialogProps
}: ItemDetailsSheetProps) {
  const data = useFragment(
    ItemDetailsFragmentDocument,
    rawData?.items?.getItem,
  );
  function onOpenChange(isOpen: boolean) {
    handleOpenChange?.(isOpen);
  }
  return (
    <Sheet {...dialogProps} onOpenChange={onOpenChange}>
      <SheetContent>
        <SheetHeader>
          {isNil(data) ? (
            <SheetTitle>Loading item details...</SheetTitle>
          ) : (
            <>
              <SheetTitle>{data.name}</SheetTitle>
              <SheetDescription>{data.description}</SheetDescription>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input id="name" value={data.name} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="description" className="text-right">
                    Description
                  </Label>
                  <Input
                    id="description"
                    value={data.description ?? ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="value" className="text-right">
                    Value (gp)
                  </Label>
                  <Input
                    id="value"
                    value={(data.value ?? 0) / 1000 ?? ""}
                    type="number"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="activationCost" className="text-right">
                    Activation Cost
                  </Label>
                  <Input
                    id="activationCost"
                    value={data.activationCost ?? ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="usageRequirements" className="text-right">
                    Usage Requirements
                  </Label>
                  <Input
                    id="usageRequirements"
                    value={data.usageRequirements ?? ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="effect" className="text-right">
                    Effect
                  </Label>
                  <Input
                    id="effect"
                    value={data.effect ?? ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="traits" className="text-right">
                    Traits
                  </Label>
                  <Input
                    id="traits"
                    value={(data.traits ?? []).join(", ")}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="bulk" className="text-right">
                    Bulk
                  </Label>
                  <Input
                    id="bulk"
                    value={data.displayBulk ?? ""}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="level" className="text-right">
                    Level
                  </Label>
                  <Input
                    id="level"
                    value={data.level ?? ""}
                    type="number"
                    className="col-span-3"
                  />
                </div>
              </div>
              <SheetClose />
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
