"use client";

import { ComponentPropsWithoutRef, PropsWithoutRef } from "react";
import styles from "./PrimaryButton.module.css";

import { cn } from "~/lib/util";

type PrimaryButtonProps = {
  onClick?: () => void;
  color: "blue" | "white";
  size: "medium" | "large";
} & ComponentPropsWithoutRef<"button">;

export default function PrimaryButton({
  onClick,
  color,
  size,
  children,
  className,
  ...rest
}: PrimaryButtonProps) {
  return (
    <button
      {...rest}
      className={cn(
        className,
        color === "blue" ? (styles.blue as string) : (styles.white as string),
        size === "medium"
          ? (styles.medium as string)
          : (styles.large as string),
        "montserrat-bold",
      )}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
