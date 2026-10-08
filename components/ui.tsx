import type { ComponentProps, ReactNode } from "react";

export function Button({
  variant = "primary",
  className = "",
  ...p
}: ComponentProps<"button"> & { variant?: "primary" | "ghost" | "danger" }) {
  return (
    <button
      className={`btn ${variant === "primary" ? "" : variant} ${className}`}
      {...p}
    />
  );
}
export const Card = ({ children }: { children: ReactNode }) => (
  <div className="card">{children}</div>
);

export function Field({
  label,
  ...p
}: ComponentProps<"input"> & { label: string }) {
  return (
    <label className="field">
      <span>{label}</span>
      <input {...p} />
    </label>
  );
}
