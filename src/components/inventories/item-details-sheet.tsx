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
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEffect, useRef } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { MultiComboBox } from "../ui/multi-combobox";
import { Option } from "@/types/form";

const ActivationActionCostEnum = z.enum([
  "n/a",
  "1 action",
  "2 actions",
  "3 actions",
  "free action",
  "reaction",
]);
type ActivationActionCost = z.infer<typeof ActivationActionCostEnum>;

const ACTIVATION_ACTION_COST_OPTIONS: Record<ActivationActionCost, string> = {
  "n/a": "Not activatable",
  "1 action": "One Action",
  "2 actions": "Two Actions",
  "3 actions": "Three Actions",
  "free action": "Free Action",
  reaction: "Reaction",
};

const formSchema = z.object({
  name: z.string().min(2).max(50),
  description: z.string().min(0).max(500),
  value: z.number().min(0),
  activationCost: ActivationActionCostEnum,
  usageRequirements: z.string().min(0).max(500),
  effect: z.string().min(0).max(500),
  bulk: z.number().min(0),
  level: z.number().min(0),
  traits: z.array(z.string()),
});

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

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    // defaultValues: {},
  });

  useEffect(() => {
    form.reset({
      name: data?.name ?? "",
      description: data?.description ?? "",
      value: (data?.value ?? 0) / 1000 ?? 0,
      activationCost: (data?.activationCost as ActivationActionCost) ?? "n/a",
      usageRequirements: data?.usageRequirements ?? "",
      effect: data?.effect ?? "",
      bulk: data?.bulk ?? 0,
      level: data?.level ?? 0,
      traits: data?.traits ?? [],
    });
  }, [data]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

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

              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-8"
                >
                  <FormField
                    control={form.control}
                    name="traits"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Traits</FormLabel>
                        {/* <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >

                          <SelectContent container={dialogRef?.current}>
                            {Object.entries(ACTIVATION_ACTION_COST_OPTIONS).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select> */}
                        <FormControl>
                          <div>
                            <MultiComboBox
                              placeholder="No traits set"
                              container={dialogRef?.current}
                              onChange={field.onChange}
                              defaultValues={field.value}
                              options={traitOptions}
                            />
                          </div>
                        </FormControl>
                        <FormDescription>
                          The traits that the item has
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="No name set" {...field} />
                        </FormControl>
                        <FormDescription>
                          The display name for the item
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write your description here..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The flavor text/mechanical description for the item
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="value"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Value</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="No value set"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          The value of the item in gold pieces
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="activationCost"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Activation cost</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="No cost selected" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent container={dialogRef?.current}>
                            {Object.entries(ACTIVATION_ACTION_COST_OPTIONS).map(
                              ([key, value]) => (
                                <SelectItem key={key} value={key}>
                                  {value}
                                </SelectItem>
                              ),
                            )}
                          </SelectContent>
                        </Select>
                        <FormDescription>
                          The action cost to activate the item
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="usageRequirements"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Usage requirements</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write the requirements here..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Requirements to use the item, if any
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="effect"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Effect</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Write the effect here..."
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>Item effects, if any</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="bulk"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bulk</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="No bulk set"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          <>
                            The Bulk value of the item (neglible = 0, light =
                            0.1)
                          </>
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="level"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Level</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="No level set"
                            type="number"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>The level of the item</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit">Submit</Button>
                </form>
              </Form>
              <SheetClose />
            </>
          )}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
