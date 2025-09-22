import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return;

  // Use native smooth scrolling for better reliability
  element.scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest",
  });
}
