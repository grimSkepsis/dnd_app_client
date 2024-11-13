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
import isEmpty from "lodash/isEmpty";
import { Tag } from "./tag";

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
  container?: Element;
  placeholder?: string;
  onCreateOption?: (value: string) => Promise<Option>;
};

const DEAULT_CREATE_OPTION = async (label: string) => ({
  label,
  value: label,
});

export function MultiComboBox({
  container,
  defaultValues,
  options: defaultOptions,
  placeholder,
  onCreateOption = DEAULT_CREATE_OPTION,
  onChange,
}: MultiComboBoxProps) {
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState(defaultValues);
  const [newItem, setNewItem] = React.useState("");
  const [options, setOptions] = React.useState<Option[]>(defaultOptions);

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

  function onValueChange(values: string[]) {
    setValues(values);
    onChange(values);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="min-h-11 text-sm rounded-md p-2 border border-input bg-background flex flex-wrap gap-1 items-center ">
          {isEmpty(values)
            ? placeholder
            : values.map((v) => (
                <Tag
                  label={displayValueMap.get(v) ?? v}
                  key={v}
                  onRemove={(e) => {
                    e.stopPropagation();
                    onValueChange(values.filter((value) => value !== v));
                  }}
                />
              ))}
        </div>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" container={container}>
        <Command>
          <CommandInput
            placeholder="Search traits..."
            onValueChange={setNewItem}
            value={newItem}
          />
          <CommandList>
            <CommandEmpty>
              <div
                onClick={() => {
                  onCreateOption(newItem).then((newOption) => {
                    setOptions((currentOptions) =>
                      [...currentOptions, newOption].sort((a, b) =>
                        a.label.localeCompare(b.label)
                      )
                    );
                    onValueChange([...values, newOption.value]);

                    setNewItem("");
                  });
                }}
              >
                <p className="text-sm text-primary cursor-pointer hover:">
                  Create new trait: <strong>{newItem}</strong>
                </p>
              </div>
            </CommandEmpty>

            <CommandGroup>
              {options.map((option) => (
                <CommandItem
                  key={option.value}
                  value={option.value}
                  onSelect={(currentValue) => {
                    onValueChange(
                      values.includes(currentValue)
                        ? values.filter((value) => value !== currentValue)
                        : [...values, currentValue]
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      values?.includes(option.value)
                        ? "opacity-100"
                        : "opacity-0"
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
