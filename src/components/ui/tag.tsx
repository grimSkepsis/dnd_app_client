import isNil from "lodash/isNil";
import { X } from "lucide-react";
import { MouseEvent } from "react";

type TagProps = {
  label: string;
  onRemove?: (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
    label: string,
  ) => void;
};

export function Tag({ label, onRemove }: TagProps) {
  return (
    <span className="rounded-lg bg-primary px-2 py-1 text-xs text-primary-foreground flex w-fit">
      {label}
      {!isNil(onRemove) && (
        <button
          onClick={(e) => onRemove(e, label)}
          className="rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </span>
  );
}
