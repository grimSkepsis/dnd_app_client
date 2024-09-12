import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ItemDetailsFragment, ItemDetailsQuery } from "@/gql/graphql";
import { Option } from "@/types/form";
import { useEffect } from "react";
import { MultiComboBox } from "@/components/ui/multi-combobox";

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

type ItemDetailsFormProps = {
  data?: ItemDetailsFragment | null;
  traitOptions: Option[];
  parentRef?: React.RefObject<HTMLDivElement>;
};

export function ItemDetailsForm({
  data,
  traitOptions,
  parentRef,
}: ItemDetailsFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="No name set" {...field} />
              </FormControl>
              <FormDescription>The display name for the item</FormDescription>
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
                <Input placeholder="No value set" type="number" {...field} />
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
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="No cost selected" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent container={parentRef?.current}>
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
                <Textarea placeholder="Write the effect here..." {...field} />
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
                <Input placeholder="No bulk set" type="number" {...field} />
              </FormControl>
              <FormDescription>
                <>The Bulk value of the item (neglible = 0, light = 0.1)</>
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
                <Input placeholder="No level set" type="number" {...field} />
              </FormControl>
              <FormDescription>The level of the item</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="traits"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Traits</FormLabel>
              <FormControl>
                <div>
                  <MultiComboBox
                    placeholder="No traits set"
                    container={parentRef?.current}
                    onChange={field.onChange}
                    defaultValues={field.value}
                    options={traitOptions}
                  />
                </div>
              </FormControl>
              <FormDescription>The traits that the item has</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
