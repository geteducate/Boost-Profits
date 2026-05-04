import { createFileRoute } from "@tanstack/react-router";
import { AuthShell } from "./login";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Boost Profits" }, { name: "description", content: "Create your free Boost Profits account." }] }),
  component: () => <AuthShell mode="signup" />,
});
