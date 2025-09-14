import React, { useCallback, useEffect, useRef, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type Project = {
  title: string;
  description: string;
  image: string;
  href: string;
  tagline?: string;
  badges?: string[];
  highlights?: string[]; // short bullet points
  ctaText?: string;
};


type Props = {
  projects: Project[];
  className?: string;
};

export default function ProjectCarousel({ projects, className }: Props) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: false,
    containScroll: "trimSnaps",
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);
  const autoplayTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressTimer = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [progress, setProgress] = useState(0); // 0-100

  const onSelect = useCallback((api: any) => {
    if (!api) return;
    setSelectedIndex(api.selectedScrollSnap());
  }, []);

  // Basic autoplay: advance every 4s, pause on hover or when not in view
  const startAutoplay = useCallback(() => {
    if (autoplayTimer.current || !emblaApi) return;
    autoplayTimer.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5000);

    if (!progressTimer.current) {
      let t = 0;
      progressTimer.current = setInterval(() => {
        t += 50; // every 50ms
        setProgress(Math.min(100, (t / 5000) * 100));
        if (t >= 5000) t = 0;
      }, 50);
    }
  }, [emblaApi]);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimer.current) {
      clearInterval(autoplayTimer.current);
      autoplayTimer.current = null;
    }
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
      progressTimer.current = null;
    }
  }, []);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", () => {
      onSelect(emblaApi);
      setProgress(0);
    });
    onSelect(emblaApi);
  }, [emblaApi, onSelect]);

  useEffect(() => {
    startAutoplay();
    const node = containerRef.current;
    if (node) {
      node.addEventListener("mouseenter", stopAutoplay);
      node.addEventListener("mouseleave", startAutoplay);
    }
    return () => {
      stopAutoplay();
      if (node) {
        node.removeEventListener("mouseenter", stopAutoplay);
        node.removeEventListener("mouseleave", startAutoplay);
      }
    };
  }, [startAutoplay, stopAutoplay]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="-ml-4 flex cursor-grab active:cursor-grabbing">
          {projects.map((project) => (
            <div
              key={project.title}
              className="min-w-0 shrink-0 grow-0 basis-full pl-4 md:basis-1/2 xl:basis-1/2"
            >
              <Link href={project.href} target="_blank" passHref>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  whileHover={{ scale: 1.02, rotate: 0.5 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-[1px] backdrop-blur-xl shadow-xl hover:shadow-2xl hover:shadow-primary/20"
                >
                  <motion.div
                    animate={{ y: [ -3, 3, -3 ] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="relative rounded-xl bg-background/50 h-96"
                  >
                    {/* Image */}
                    <div className="relative h-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 50vw"
                        className="rounded-xl object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                        style={{ objectPosition: 'center top' }}
                      />
                      <div className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/10" />
                    </div>

                    {/* Hover Overlay Content */}
                    <div className="absolute inset-0 bg-background/95 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl">
                      <div className="flex h-full flex-col justify-between p-6">
                        <div className="space-y-3">
                          <div>
                            <h3 className="clash-grotesk text-xl font-bold text-gradient leading-tight">{project.title}</h3>
                            {project.tagline && (
                              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{project.tagline}</p>
                            )}
                          </div>
                          
                          <p className="text-foreground leading-relaxed text-sm line-clamp-2">{project.description}</p>

                          {project.highlights && project.highlights.length > 0 && (
                            <ul className="space-y-1 text-xs text-muted-foreground">
                              {project.highlights.slice(0, 2).map((h) => (
                                <li key={h} className="leading-relaxed">• {h}</li>
                              ))}
                            </ul>
                          )}

                          {project.badges && project.badges.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {project.badges.slice(0, 3).map((b) => (
                                <span key={b} className="rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
                                  {b}
                                </span>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="mt-4">
                          <span className="inline-flex items-center rounded-md bg-primary/20 px-3 py-1.5 text-xs font-medium text-primary ring-1 ring-primary/30 transition hover:bg-primary/30">
                            {project.ctaText ?? "View on GitHub"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-md border-border hover:bg-background hover:scale-110 transition-all duration-300 sm:flex"
        onClick={() => emblaApi?.scrollPrev()}
        aria-label="Previous"
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-md border-border hover:bg-background hover:scale-110 transition-all duration-300 sm:flex"
        onClick={() => emblaApi?.scrollNext()}
        aria-label="Next"
      >
        <ArrowRight className="h-4 w-4" />
      </Button>

      {/* Dots */}
      <div className="mt-4 flex items-center justify-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => emblaApi?.scrollTo(index)}
            className={cn(
              "h-2.5 w-2.5 rounded-full transition",
              selectedIndex === index
                ? "bg-primary"
                : "bg-muted hover:bg-muted-foreground",
            )}
          />
        ))}
      </div>
    </div>
  );
}


