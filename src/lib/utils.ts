import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return;

  // Get actual navbar height dynamically with minimal buffer
  const navbar = document.querySelector('.nav');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height + 5 : 80; // Reduced buffer to 5px
  
  const elementPosition = element.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth"
  });
}
