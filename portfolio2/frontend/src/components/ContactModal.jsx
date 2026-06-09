import { useState } from "react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { api } from "@/lib/api";
import { PixelStar } from "@/components/PixelSparkle";

const PROJECT_TYPES = ["Web Design", "Mobile App", "Branding", "Design System", "Motion", "Other"];
const BUDGETS = ["< $5k", "$5k – $15k", "$15k – $40k", "$40k+", "Let's discuss"];

const initial = { name: "", email: "", company: "", budget: "", project_type: "", message: "" };

export default function ContactModal({ open, onOpenChange }) {
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);

  const update = (k) => (e) => setForm({ ...form, [k]: e?.target ? e.target.value : e });

  const submit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Name, email and message are required.");
      return;
    }
    setSubmitting(true);
    try {
      await api.post("/contact", {
        ...form,
        company: form.company || null,
        budget: form.budget || null,
        project_type: form.project_type || null,
      });
      toast.success("Brief received. I'll reply within 48h ✦");
      setForm(initial);
      onOpenChange(false);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      toast.error(typeof detail === "string" ? detail : "Something went wrong. Try again?");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent data-testid="contact-modal" className="max-w-2xl border-[3px] border-[var(--ink)] shadow-[6px_6px_0_0_rgba(10,10,10,1)] rounded-2xl p-0 overflow-hidden bg-white">
        <div className="bg-[var(--primary)] text-white px-6 py-5 border-b-[3px] border-[var(--ink)] flex items-center justify-between">
          <div>
            <DialogHeader>
              <DialogTitle className="font-display font-black text-3xl tracking-tight">Start a project</DialogTitle>
              <DialogDescription className="font-pixel uppercase text-sm text-white/90 mt-1">✦ Tell me what you&apos;re building</DialogDescription>
            </DialogHeader>
          </div>
          <PixelStar size={36} color="#FFCC00" />
        </div>

        <form onSubmit={submit} className="p-6 space-y-5" data-testid="contact-form">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-pixel uppercase text-xs">Name *</Label>
              <Input value={form.name} onChange={update("name")} required data-testid="contact-input-name" className="border-2 border-[var(--ink)] rounded-xl mt-1" placeholder="Jane Designer" />
            </div>
            <div>
              <Label className="font-pixel uppercase text-xs">Email *</Label>
              <Input type="email" value={form.email} onChange={update("email")} required data-testid="contact-input-email" className="border-2 border-[var(--ink)] rounded-xl mt-1" placeholder="jane@studio.com" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label className="font-pixel uppercase text-xs">Company</Label>
              <Input value={form.company} onChange={update("company")} data-testid="contact-input-company" className="border-2 border-[var(--ink)] rounded-xl mt-1" placeholder="Studio name" />
            </div>
            <div>
              <Label className="font-pixel uppercase text-xs">Budget</Label>
              <Select value={form.budget} onValueChange={update("budget")}>
                <SelectTrigger data-testid="contact-select-budget" className="border-2 border-[var(--ink)] rounded-xl mt-1">
                  <SelectValue placeholder="Pick a range" />
                </SelectTrigger>
                <SelectContent>
                  {BUDGETS.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label className="font-pixel uppercase text-xs">Project type</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {PROJECT_TYPES.map((t) => {
                const active = form.project_type === t;
                return (
                  <button type="button" key={t} onClick={() => setForm({ ...form, project_type: t })}
                    data-testid={`contact-type-${t.toLowerCase().replace(/\s+/g, "-")}`}
                    className={`border-2 border-[var(--ink)] rounded-full px-3 py-1 font-pixel uppercase text-xs transition ${active ? "bg-[var(--ink)] text-white" : "bg-white"}`}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <Label className="font-pixel uppercase text-xs">Tell me more *</Label>
            <Textarea value={form.message} onChange={update("message")} required rows={5} data-testid="contact-input-message" className="border-2 border-[var(--ink)] rounded-xl mt-1" placeholder="What are you building? Timeline? Anything weird?" />
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="font-pixel uppercase text-xs text-[var(--text-muted)]">✦ I reply within 48h</p>
            <button type="submit" disabled={submitting} data-testid="contact-submit-btn" className="brutal brutal-lift rounded-full px-6 py-3 bg-[var(--ink)] text-white font-display font-bold uppercase disabled:opacity-60">
              {submitting ? "Sending…" : "Send brief →"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
