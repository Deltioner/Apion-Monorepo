import { Button } from "@repo/ui/components/button";

export default function Home() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 px-6 text-center">
      <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
        Apion
      </h1>
      <p className="text-muted-foreground max-w-md text-balance">
        The website. Replace this placeholder with your marketing content.
      </p>
      <div className="flex gap-3">
        <Button>Get started</Button>
        <Button variant="outline">Learn more</Button>
      </div>
    </main>
  );
}
