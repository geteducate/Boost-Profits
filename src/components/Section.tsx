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
    <section className={`py-24 md:py-32 lg:py-36 ${bg} ${className}`}>
      <div className="container-page">
        {(eyebrow || title || description) && (
          <div className={`mb-14 md:mb-16 max-w-3xl ${align === "center" ? "mx-auto text-center" : ""}`}>
            {eyebrow && <p className="text-eyebrow mb-4">{eyebrow}</p>}
            {title && <h2 className="text-h2">{title}</h2>}
            {description && (
              <p className={`mt-4 text-lg ${tone === "dark" ? "text-primary-foreground/75" : "text-muted-foreground"}`}>
                {description}
              </p>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
