import { cn } from "@repo/ui/lib/utils";

export function Section({
  className,
  ...props
}: React.ComponentProps<"section">) {
  return (
    <section
      className={cn(
        "mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8",
        className,
      )}
      {...props}
    />
  );
}

export function SectionEyebrow({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "text-primary mb-3 text-sm font-medium tracking-wide uppercase",
        className,
      )}
      {...props}
    />
  );
}

export function SectionTitle({
  className,
  ...props
}: React.ComponentProps<"h2">) {
  return (
    <h2
      className={cn(
        "text-3xl font-semibold tracking-tight text-balance sm:text-4xl",
        className,
      )}
      {...props}
    />
  );
}

export function SectionSubtitle({
  className,
  ...props
}: React.ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "text-muted-foreground mt-4 max-w-2xl text-base text-balance sm:text-lg",
        className,
      )}
      {...props}
    />
  );
}
