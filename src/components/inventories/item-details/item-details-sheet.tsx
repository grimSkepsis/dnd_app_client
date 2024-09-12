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

type ItemDetailsSheetProps = {
  data?: ItemDetailsQuery;
  traitOptions: Option[];
  isLoading: boolean;
} & DialogProps;

export default function ItemDetailsSheet({
  onOpenChange: handleOpenChange,
  data: rawData,
  traitOptions,
  ...dialogProps
}: ItemDetailsSheetProps) {
  const [isEditing, setIsEditing] = useState(false);
  const data = useFragment(
    ItemDetailsFragmentDocument,
    rawData?.items?.getItem,
  );

  const dialogRef = useRef<HTMLDivElement>();

  function onOpenChange(isOpen: boolean) {
    handleOpenChange?.(isOpen);
    setIsEditing(false);
  }

  function onSubmit(values: any) {
    console.log("submitting!", values);
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
              <SheetTitle>
                {data.name}{" "}
                {!isEditing && (
                  <button
                    onClick={(e) => {
                      setIsEditing(true);
                    }}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                )}
              </SheetTitle>
              <SheetDescription>{data.description}</SheetDescription>
              {isEditing && (
                <ItemDetailsForm
                  data={data}
                  traitOptions={traitOptions}
                  parentRef={dialogRef}
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
