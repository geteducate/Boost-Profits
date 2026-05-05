import { ReactNode } from "react";
import { SiteFooter } from "./SiteFooter";

export function LegalLayout({ title, intro, lastUpdated, children }: { title: string; intro?: string; lastUpdated?: string; children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <main className="container-page max-w-3xl py-16">
        <header className="mb-10 border-b border-border pb-6">
          <h1 className="text-3xl font-extrabold tracking-tight">{title}</h1>
          {intro ? <p className="mt-2 text-sm text-muted-foreground">{intro}</p> : null}
          <p className="mt-2 text-xs text-muted-foreground">Last updated {lastUpdated ?? new Date().toLocaleDateString(undefined, { year: "numeric", month: "long" })}</p>
        </header>
        <article className="prose prose-sm max-w-none space-y-6 text-sm leading-relaxed text-foreground [&_h2]:mt-8 [&_h2]:text-base [&_h2]:font-bold [&_h2]:tracking-tight [&_p]:text-muted-foreground [&_li]:text-muted-foreground [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          {children}
        </article>
      </main>
      <SiteFooter />
    </div>
  );
}
