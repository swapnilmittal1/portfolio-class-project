import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// scroll to element
export function scrollTo(element: Element | null) {
  if (!element) return;

  // Get actual navbar height dynamically
  const navbar = document.querySelector('.nav');
  const navbarHeight = navbar ? navbar.getBoundingClientRect().height : 80;
  
  // Calculate the target position with proper offset
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.pageYOffset;
  const targetPosition = elementTop - navbarHeight - 20; // 20px buffer

  // Debug logging (remove after testing)
  console.log('Navbar height:', navbarHeight);
  console.log('Element top:', elementTop);
  console.log('Target position:', targetPosition);

  window.scrollTo({
    top: targetPosition,
    behavior: "smooth"
  });
}
