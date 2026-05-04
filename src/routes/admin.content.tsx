import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/content")({
  head: () => ({ meta: [{ title: "Content — Admin" }] }),
  component: ContentAdmin,
});

function ContentAdmin() {
  return (
    <AdminShell title="Content management" subtitle="Edit the hero, pricing copy and FAQs.">
      <form
        className="card-premium p-6 grid gap-5 max-w-3xl"
        onSubmit={(e) => { e.preventDefault(); toast.success("Content updated"); }}
      >
        <div>
          <Label>Hero headline</Label>
          <Input className="mt-1.5" defaultValue="Start collecting invoices today." />
        </div>
        <div>
          <Label>Hero subheadline</Label>
          <Textarea rows={3} className="mt-1.5" defaultValue="Automate milestone billing, invoice collection, reminders and payment tracking for agencies and service businesses." />
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          <div><Label>Primary CTA</Label><Input className="mt-1.5" defaultValue="Free sign up" /></div>
          <div><Label>Secondary CTA</Label><Input className="mt-1.5" defaultValue="View demo" /></div>
        </div>
        <div className="flex justify-end"><Button type="submit" className="bg-cta text-primary-foreground">Save changes</Button></div>
      </form>
    </AdminShell>
  );
}
