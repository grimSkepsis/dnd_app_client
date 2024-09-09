"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "./input";
import { Option } from "@/types/form";
import { isEmpty } from "lodash";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

type MultiComboBoxProps = {
  options: Option[];
  defaultValues: string[];
  onChange: (values: string[]) => void;
  // onAdd: (value: string) => void;
  // onRemove: (value: string) => void;
  container?: Element;
  placeholder?: string;
};

export function MultiComboBox({
  container,
  defaultValues,
  options,
  placeholder,
}: MultiComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(defaultValues);

  React.useEffect(() => {
    setValues(defaultValues);
  }, [defaultValues]);

  const displayValueMap = React.useMemo(() => {
    const map = new Map<string, string>();
    for (const option of options) {
      map.set(option.value, option.label);
    }
    return map;
  }, [options]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        {/* <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? frameworks.find((framework) => framework.value === value)?.label
            : "Select framework..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button> */}
        {/* <Input /> */}
        <div className="min-h-11 text-sm rounded-md p-2 border border-input bg-background flex flex-wrap gap-1 items-center ">
          {isEmpty(values)
            ? placeholder
            : values.map((v) => (
                <span
                  className="rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground flex"
                  key={v}
                >
                  {displayValueMap.get(v) ?? v}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setValues(values.filter((value) => value !== v));
                    }}
                    className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" container={container}>
        <Command>
          <CommandInput placeholder="Search traits..." />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    setValues((currentValues) =>
                      currentValues.includes(currentValue)
                        ? currentValues.filter(
                            (value) => value !== currentValue,
                          )
                        : [...currentValues, currentValue],
                    );
                    // setValue(currentValue === value ? "" : currentValue);
                    // setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0",
                    )}
                  />
                  {option.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
