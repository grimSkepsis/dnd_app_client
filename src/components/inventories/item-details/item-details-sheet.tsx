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

import { useRef, useState } from "react";
import { Option } from "@/types/form";
import { ItemDetailsForm } from "./item-details-form";
import { Pencil } from "lucide-react";
import { Tag } from "@/components/ui/tag";
import { ItemFormProperties } from "./types";

type ItemDetailsSheetProps = {
  data?: ItemDetailsQuery;
  traitOptions: Option[];
  isLoading: boolean;
  onSubmitUpdate: (id: string, data: ItemFormProperties) => Promise<void>;
} & DialogProps;

export default function ItemDetailsSheet({
  onOpenChange: handleOpenChange,
  data: rawData,
  traitOptions,
  onSubmitUpdate,
  ...dialogProps
}: ItemDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const data = useFragment(
    ItemDetailsFragmentDocument,
    rawData?.items?.getItem,
  );

  const dialogRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement | undefined>(undefined);

  function onOpenChange(isOpen: boolean) {
    handleOpenChange?.(isOpen);
    setIsEditing(false);
  }

  async function onSubmit(values: ItemFormProperties) {
    if (isNil(data)) return;
    await onSubmitUpdate(data?.uuid, values);
    setIsEditing(false);
  }

  return (
    <Sheet {...dialogProps} onOpenChange={onOpenChange}>
      <SheetContent ref={dialogRef}>
        <SheetHeader>
          {isNil(data) ? (
            <SheetTitle>Loading item details...</SheetTitle>
          ) : (
            <>
              {!isEditing && (
                <SheetTitle>
                  {data.name}{" "}
                  <button
                    onClick={(e) => {
                      setIsEditing(true);
                    }}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                </SheetTitle>
              )}
              {!isEditing && (
                <div className="flex gap-5 flex-col">
                  <div className="flex gap-2 flex-col">
                    <SheetDescription>
                      Price: {data.displayValue}, Bulk: {data.displayBulk}, Item
                      Level: {data.level}
                    </SheetDescription>

                    <div className="flex flex-wrap gap-2">
                      {data?.traits?.map((t) => <Tag key={t} label={t} />)}
                    </div>
                  </div>
                  <SheetDescription>
                    {!isNil(data.usageRequirements) && (
                      <>
                        Usage: {data.usageRequirements}, {data.activationCost}
                      </>
                    )}
                  </SheetDescription>
                  <SheetDescription>{data.description}</SheetDescription>
                  <div>
                    <p>{data.effect}</p>
                  </div>
                </div>
              )}

              {isEditing && (
                <ItemDetailsForm
                  data={data}
                  traitOptions={traitOptions}
                  parentRef={formRef}
                  onCancel={() => setIsEditing(false)}
                  onSubmit={onSubmit}
                />
              )}
              <SheetClose />
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
