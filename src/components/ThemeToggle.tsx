import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

function applyTheme(t: Theme) {
  const root = document.documentElement;
  root.classList.toggle("light", t === "light");
  root.style.colorScheme = t;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>("dark");

  useEffect(() => {
    const stored = (localStorage.getItem("bp-theme") as Theme | null) ?? "dark";
    setTheme(stored);
    applyTheme(stored);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
    localStorage.setItem("bp-theme", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
      className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-primary/50 ${className}`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
