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

import { useEffect, useRef } from "react";

import { MultiComboBox } from "@/components/ui/multi-combobox";
import { Option } from "@/types/form";
import { ItemDetailsForm } from "./item-details-form";

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
  const data = useFragment(
    ItemDetailsFragmentDocument,
    rawData?.items?.getItem,
  );

  const dialogRef = useRef<HTMLDivElement>(undefined);

  function onOpenChange(isOpen: boolean) {
    handleOpenChange?.(isOpen);
  }

  function onAddTrait() {
    // Add a new trait to the item
  }

  function onRemoveTrait() {
    // Remove a trait from the item
  }

  return (
    <Sheet {...dialogProps} onOpenChange={onOpenChange}>
      <SheetContent ref={dialogRef}>
        <SheetHeader>
          {isNil(data) ? (
            <SheetTitle>Loading item details...</SheetTitle>
          ) : (
            <>
              <SheetTitle>{data.name}</SheetTitle>
              <SheetDescription>{data.description}</SheetDescription>
              <ItemDetailsForm
                data={data}
                traitOptions={traitOptions}
                parentRef={dialogRef}
              />

              <SheetClose />
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
