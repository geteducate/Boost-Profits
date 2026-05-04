import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { LegalDialog } from "./LegalDialog";

export function SiteFooter() {
  return (
    <footer className="border-t border-border surface-mute">
      <div className="container-page grid gap-10 py-16 md:grid-cols-5">
        <div className="md:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Invoice collection and milestone payment automation for agencies, studios, and service businesses.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1">
              <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" /> All systems operational
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1">
              SOC-2 in progress
            </span>
          </div>
        </div>
        <FooterCol title="Product" links={[
          { to: "/service", label: "Overview" },
          { to: "/pricing", label: "Pricing" },
          { to: "/faq", label: "FAQ" },
          { to: "/app", label: "Live demo" },
        ]} />
        <FooterCol title="Company" links={[
          { to: "/contact", label: "Contact" },
          { to: "/service", label: "Customers" },
          { to: "/faq", label: "Security" },
        ]} />
        <div>
          <h4 className="text-eyebrow mb-4">Legal</h4>
          <ul className="space-y-2.5 text-sm">
            <li><LegalDialog kind="legal"><button className="text-muted-foreground transition-colors hover:text-foreground">Legal</button></LegalDialog></li>
            <li><LegalDialog kind="privacy"><button className="text-muted-foreground transition-colors hover:text-foreground">Privacy</button></LegalDialog></li>
            <li><LegalDialog kind="terms"><button className="text-muted-foreground transition-colors hover:text-foreground">Terms</button></LegalDialog></li>
            <li><LegalDialog kind="dpa"><button className="text-muted-foreground transition-colors hover:text-foreground">DPA</button></LegalDialog></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-muted-foreground sm:flex-row">
          <p>© {new Date().getFullYear()} Boost Profits, Inc. All rights reserved.</p>
          <p>Built for agencies that want to get paid on time.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h4 className="text-eyebrow mb-4">{title}</h4>
      <ul className="space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link to={l.to} className="text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
