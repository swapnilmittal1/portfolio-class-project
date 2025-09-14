import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return;

  // Check if Locomotive Scroll is available
  if (typeof window !== 'undefined' && (window as any).locomotiveScroll) {
    (window as any).locomotiveScroll.scrollTo(element, {
      duration: 1000,
      easing: [0.25, 0.0, 0.35, 1.0],
    });
  } else {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
      inline: "nearest",
    });
  }
}
