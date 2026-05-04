import { motion } from "framer-motion";

export function Section({
  eyebrow,
  title,
  description,
  children,
  className = "",
  tone = "default",
  align = "left",
}: {
  eyebrow?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
  tone?: "default" | "muted" | "dark";
  align?: "left" | "center";
}) {
  const bg =
    tone === "muted" ? "surface-mute" : tone === "dark" ? "bg-primary text-primary-foreground" : "";
  return (
    <motion.section
      className={`py-20 md:py-28 ${bg} ${className}`}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-page">
        {(eyebrow || title || description) && (
          <motion.div
            className={`mb-12 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          >
            {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
            {title && <h2 className="text-h2">{title}</h2>}
            {description && (
              <p className={`mt-4 text-lg ${tone === "dark" ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                {description}
              </p>
            )}
          </motion.div>
        )}
        {children}
      </div>
    </motion.section>
  );
}
