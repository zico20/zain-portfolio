"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Github, Linkedin, Mail, Loader2, Send, MapPin } from "lucide-react";

import { contactSchema, type ContactInput } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site";
import { Section, SectionHeading, fadeUp, stagger } from "@/components/section";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const directLinks = [
  {
    label: "Email",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
    icon: Mail,
  },
  {
    label: "GitHub",
    value: "github.com/zico20",
    href: siteConfig.links.github,
    icon: Github,
  },
  {
    label: "LinkedIn",
    value: "Connect with me",
    href: siteConfig.links.linkedin,
    icon: Linkedin,
  },
];

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    mode: "onTouched",
  });

  const onSubmit = async (values: ContactInput) => {
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        throw new Error(`Request failed with status ${res.status}`);
      }

      toast.success("Message sent!", {
        description: "Thanks for reaching out — I'll get back to you soon.",
      });
      reset();
    } catch {
      toast.error("Something went wrong.", {
        description: `Please try again, or email me directly at ${siteConfig.email}.`,
      });
    }
  };

  return (
    <Section id="contact">
      <SectionHeading
        id="contact"
        eyebrow="05. Contact"
        title="Let's build something"
        description="Have a project in mind, a role to discuss, or just want to say hi? My inbox is always open."
      />

      <div className="mx-auto grid max-w-5xl gap-10 lg:grid-cols-[1fr_1.4fr] lg:gap-14">
        {/* Left: direct links */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="flex flex-col gap-4"
        >
          <motion.p
            variants={fadeUp}
            className="text-pretty leading-relaxed text-muted-foreground"
          >
            Prefer to reach out directly? Use any of these — I usually reply
            within a day.
          </motion.p>

          <motion.div variants={fadeUp} className="flex flex-col gap-3">
            {directLinks.map(({ label, value, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={
                  href.startsWith("http") ? "noopener noreferrer" : undefined
                }
                className="group flex items-center gap-4 rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/50"
              >
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                    {label}
                  </span>
                  <span className="text-sm font-medium text-foreground">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          <motion.p
            variants={fadeUp}
            className="mt-2 flex items-center gap-2 text-sm text-muted-foreground"
          >
            <MapPin className="h-4 w-4 text-primary" />
            Based in {siteConfig.location} · Open to remote
          </motion.p>
        </motion.div>

        {/* Right: form */}
        <motion.form
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-5 rounded-xl border border-border bg-card p-6 sm:p-8"
        >
          {/* Honeypot — hidden from users, catches bots. */}
          <div className="absolute left-[-9999px]" aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input
              id="company"
              type="text"
              tabIndex={-1}
              autoComplete="off"
              {...register("company")}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Field
              id="name"
              label="Name"
              error={errors.name?.message}
            >
              <Input
                id="name"
                placeholder="Ada Lovelace"
                autoComplete="name"
                aria-invalid={!!errors.name}
                {...register("name")}
              />
            </Field>

            <Field id="email" label="Email" error={errors.email?.message}>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.email}
                {...register("email")}
              />
            </Field>
          </div>

          <Field id="message" label="Message" error={errors.message?.message}>
            <Textarea
              id="message"
              rows={5}
              placeholder="Tell me about your project or just say hello…"
              aria-invalid={!!errors.message}
              {...register("message")}
            />
          </Field>

          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto sm:self-start"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" />
                Sending…
              </>
            ) : (
              <>
                <Send />
                Send Message
              </>
            )}
          </Button>
        </motion.form>
      </div>
    </Section>
  );
}

/** Labeled field wrapper with an accessible, animated error message. */
function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error ? (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          id={`${id}-error`}
          role="alert"
          className="text-xs font-medium text-[#FF7B72]"
        >
          {error}
        </motion.p>
      ) : null}
    </div>
  );
}
