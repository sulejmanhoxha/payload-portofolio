import { cn } from "@/lib/utils";

export function Badge(props: React.HTMLProps<HTMLSpanElement>) {
  return (
    <span
      {...props}
      className={cn(
        "inline-flex items-center rounded-md bg-secondary px-4 py-1 text-xs font-semibold",
        props.className,
      )}
    >
      {props.children}
    </span>
  );
}
