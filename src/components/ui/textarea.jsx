import { cn } from "../../lib/utils";

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground flex field-sizing-content min-h-16 w-full rounded-md bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none border disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
