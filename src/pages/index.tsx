import Container from "@/components/Container";
import { useEffect, useRef, Suspense, useState } from "react";
import styles from "@/styles/Home.module.css";
import { Button } from "@/components/ui/button";
import PDFModal from "@/components/PDFModal";
import ContactForm from "@/components/ContactForm";
import ProfessionalDocuments from "@/components/ProfessionalDocuments";

import {
  ChevronRight,
  Code2,
  Frame,
  SearchCheck,
  Eye,
  MonitorSmartphone,
  Mail,
  Linkedin,
  MapPin,
  Calendar,
  FileText,
  Download,
} from "lucide-react";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import dynamic from "next/dynamic";
import Link from "next/link";
import { cn, scrollTo } from "@/lib/utils";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import ProjectCarousel from "@/components/ProjectCarousel";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import VanillaTilt from "vanilla-tilt";
import { motion } from "framer-motion";

// Load Spline client-side to avoid SSR issues
const SimpleSpline = dynamic(() => import("@/components/SimpleSpline"), {
  ssr: false,
});

const projects = [
  {
    title: "Reverse-Proxy API Debugger",
    tagline: "Envoy-WASM sidecar for debugging APIs at scale",
    description:
      "AI-powered root-cause insights with a React/Grafana dashboard for high-signal API debugging.",
    image: "/assets/reverse-proxy-debugger.png",
    href: "https://github.com/swapnilmittal1/reverese_proxy_api_debugger",
    badges: ["C++20", "Envoy", "ClickHouse", "React", "Postgres"],
    highlights: [
      "⚡ Handles 15k req/s with <200ms p99 overhead",
      "📊 Cuts MTTR from 3h → 12m with AI insights",
      "🖥️ Grafana dashboard for rapid triage",
    ],
    ctaText: "View on GitHub",
  },
  {
    title: "AI Social Commerce Platform",
    tagline: "End-to-end AI-driven platform integrating Meta APIs",
    description:
      "Unified GraphQL gateway for Messenger, Shops, and Meta Graph with real-time streaming analytics.",
    image: "/assets/ai-social-commerce.png",
    href: "https://github.com/swapnilmittal1/META-AI-Social-Commerce-Platform",
    badges: ["Python", "Go", "GraphQL", "PyTorch", "Pinecone", "AWS Fargate"],
    highlights: [
      "🌐 Unified GraphQL gateway across Meta surfaces",
      "⚡ Fine-tuned LLaMA with LangChain; 47% lower reply latency",
      "📈 Kafka→Flink→Druid pipeline boosted ROAS by 25%",
    ],
    ctaText: "View on GitHub",
  },
  {
    title: "Prompt+ (HackGT Winner 🏆)",
    tagline: "Real-time prompt optimization for LLMs",
    description:
      "Collaborative prompt editor with dynamic analysis and token savings.",
    image: "/assets/prompt-plus.png",
    href: "https://github.com/promptplusGT/promptplus",
    badges: ["React", "Tailwind", "Socket.IO", "LangChain"],
    highlights: [
      "⚡ Reduced LLM token usage by 47% with contextual analysis",
      "🤝 Real-time collaboration via Socket.IO",
      "🎨 Dynamic UI in React + Tailwind",
    ],
    ctaText: "View on GitHub",
  },
  {
    title: 'Thread-Safe Cache Library',
    tagline: 'High-performance thread-safe caching',
    description: 'A robust, thread-safe cache library designed for high-concurrency applications with configurable eviction policies and memory management.',
    image: '/assets/cache-project.png',
    href: 'https://github.com/swapnilmittal1/cache',
    badges: ['C++', 'Threading', 'Memory Management'],
    highlights: [
      '🚀 10x faster than std::unordered_map',
      '🔒 Lock-free operations with atomic primitives',
      '📊 Configurable LRU/LFU eviction policies'
    ],
    ctaText: 'View on GitHub'
  },
  {
    title: 'LiDAR Locomotive',
    tagline: 'ROS-based robotics simulation framework',
    description: 'Advanced robotics simulation framework using ROS for autonomous vehicle navigation with LiDAR sensor integration and real-time path planning.',
    image: '/assets/lidar-locomotive.png',
    href: 'https://lab-idar.gatech.edu/vip/',
    badges: ['ROS', 'Python', 'LiDAR', 'Gazebo'],
    highlights: [
      '🤖 Real-time SLAM implementation',
      '🎯 95% accuracy in obstacle detection',
      '⚡ Optimized for 30fps simulation'
    ],
    ctaText: 'View Project'
  },
  {
    title: 'Transformer for RUL prediction',
    tagline: 'PyTorch-based predictive maintenance',
    description: 'Custom Transformer architecture for Remaining Useful Life (RUL) prediction in industrial machinery using time-series sensor data.',
    image: '/assets/transformer-rul.png',
    href: 'https://github.com/swapnilmittal1/transformer_RUL_prediction',
    badges: ['PyTorch', 'Transformers', 'Time Series', 'ML'],
    highlights: [
      '📊 15% improvement over LSTM baselines',
      '⚡ Real-time inference <50ms',
      '🎯 92% accuracy on test dataset'
    ],
    ctaText: 'View on GitHub'
  },
];

const services = [
  {
    service: "Intelligent Document Processing",
    description:
      "Fine-tuned RoBERTa-Legal and built OCR pipelines handling 100K+ legal docs with 92% F1 — enabling scalable clause extraction and analysis.",
    icon: Code2,
  },
  {
    service: "Cloud-Native Systems Engineering",
    description:
      "Built and deployed LLM microservices on Azure AKS with Helm, Docker, and CI/CD — scaling to 500+ RPS at 99.999% uptime.",
    icon: Frame,
  },
  {
    service: "Scalable Data Infrastructure",
    description:
      "Engineered 2 TB/day ETL pipelines with real-time anomaly detection using Azure Data Factory, Terraform, and Synapse — ensuring 99.99% fidelity.",
    icon: SearchCheck,
  },
  {
    service: "Applied ML & RAG Systems",
    description:
      "Developed LangChain-based RAG assistants with Cohere embeddings, cutting legal query time by 40% and boosting accuracy with LLaMA-based NER.",
    icon: MonitorSmartphone,
  },
  {
    service: "Observability & Automation",
    description:
      "Reduced MTTR from 3 hours to 12 minutes via OpenTelemetry-based observability layers and automation-first DevOps practices (Grafana, GitHub Actions).",
    icon: Eye,
  },
  {
    service: "Full-Stack & Research-Driven Prototyping",
    description:
      "Built real-time UIs, REST APIs, and ROS-powered LiDAR systems for robotics and prompt optimization — driving innovation from lab to production.",
    icon: Code2,
  },
  {
    service: "Teaching & Mentorship",
    description:
      "Guided 200+ students as a Georgia Tech TA — leading workshops on APIs, CI/CD, and containers, while driving 95% on-time project completion.",
    icon: Frame,
  },
  {
    service: "Hackathons & Open Source",
    description:
      "HackGT 11 Overall Winner — built Prompt+, a real-time LLM prompt optimizer reducing token usage by 47% with collaborative React UI.",
    icon: SearchCheck,
  },
];

export default function Home() {
  const refScrollContainer = useRef(null);
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [carouselApi, setCarouselApi] = useState<CarouselApi | null>(null);
  const [current, setCurrent] = useState<number>(0);
  const [count, setCount] = useState<number>(0);
  const [isPDFModalOpen, setIsPDFModalOpen] = useState<boolean>(false);

  // handle scroll
  useEffect(() => {
    // Preload Spline file for better reliability
    if (typeof window !== 'undefined') {
      console.log('Preloading Spline file...');
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = '/assets/robot_follow_cursor_for_landing_page.spline';
      link.as = 'fetch';
      link.crossOrigin = 'anonymous';
      link.onload = () => console.log('Spline file preloaded successfully');
      link.onerror = () => console.error('Failed to preload Spline file');
      document.head.appendChild(link);
    }

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll(".nav-link");

    async function getLocomotive() {
      const Locomotive = (await import("locomotive-scroll")).default;
      const locomotive = new Locomotive({
        el: refScrollContainer.current ?? new HTMLElement(),
        smooth: true,
      });
      
      // Store locomotive instance globally for scrollTo function
      if (typeof window !== 'undefined') {
        (window as any).locomotiveScroll = locomotive;
      }
    }

    function handleScroll() {
      let current = "";
      setIsScrolled(window.scrollY > 0);

      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 250) {
          current = section.getAttribute("id") ?? "";
        }
      });

      navLinks.forEach((li) => {
        li.classList.remove("nav-active");

        if (li.getAttribute("href") === `#${current}`) {
          li.classList.add("nav-active");
          console.log(li.getAttribute("href"));
        }
      });
    }

    void getLocomotive();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) return;

    setCount(carouselApi.scrollSnapList().length);
    setCurrent(carouselApi.selectedScrollSnap() + 1);

    carouselApi.on("select", () => {
      setCurrent(carouselApi.selectedScrollSnap() + 1);
    });
  }, [carouselApi]);

  // card hover effect
  useEffect(() => {
    const tilt: HTMLElement[] = Array.from(document.querySelectorAll("#tilt"));
    VanillaTilt.init(tilt, {
      speed: 300,
      glare: true,
      "max-glare": 0.1,
      gyroscope: true,
      perspective: 900,
      scale: 0.9,
    });
  }, []);

  return (
    <Container>
      <div ref={refScrollContainer}>
        <Gradient />

        {/* Intro */}
        <section
          id="home"
          data-scroll-section
          className="mt-40 flex w-full flex-col items-center xl:mt-0 xl:min-h-screen xl:flex-row xl:justify-between"
        >
          <div className={styles.intro}>
            <div
              data-scroll
              data-scroll-direction="horizontal"
              data-scroll-speed=".09"
              className="flex flex-row items-center space-x-1.5"
            >
              
            </div>
            <div>
              <h1
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                data-scroll-direction="horizontal"
              >
                <span className="text-6xl tracking-tighter text-foreground 2xl:text-8xl">
                  Hello, I&apos;m
                  <br />
                </span>
                <span className="clash-grotesk text-gradient text-6xl 2xl:text-8xl">
                  Swapnil.
                </span>
              </h1>
              <p
                data-scroll
                data-scroll-enable-touch-speed
                data-scroll-speed=".06"
                className="mt-1 max-w-lg tracking-tight text-muted-foreground 2xl:text-xl"
              >
                ML @ Orbex Labs | CS + ML @ GeorgiaTech
              </p>
            </div>
            <span
              data-scroll
              data-scroll-enable-touch-speed
              data-scroll-speed=".06"
              className="flex flex-row items-center space-x-1.5 pt-6"
            >
              <Button onClick={() => scrollTo(document.getElementById('contact'))}>
                Get in touch <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setIsPDFModalOpen(true)}
              >
                Resume 
              </Button>

            </span>

            <div
              className={cn(
                styles.scroll,
                isScrolled && styles["scroll--hidden"],
              )}
            >
              Scroll to discover{" "}
              <TriangleDownIcon className="mt-1 animate-bounce" />
            </div>
          </div>
          <div
            data-scroll
            data-scroll-speed="-.01"
            id={styles["canvas-container"]}
            className="mt-full h-96 w-96 xl:mt-0"
          >
            <SimpleSpline
              scene="/assets/robot_follow_cursor_for_landing_page.spline"
              className="h-full w-full"
            />
          </div>
</section>

        {/* About */}
        <section id="about" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="mt-28 mb-8 flex max-w-6xl flex-col justify-start space-y-10"
          >
            <div className="py-16 pb-2 space-y-8">
              {/* Intro Statement */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">👋</span>
                  <p className="text-lg font-light leading-relaxed tracking-tight text-foreground xl:text-xl">
                    I&apos;m Swapnil — a CS + ML student at Georgia Tech, building AI-driven systems that deliver real-world impact.
                  </p>
                </div>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 my-8"></div>

              {/* First Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🧠</span>
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground xl:text-[40px]">
                    AI that works. Systems that scale.
                  </h2>
                </div>
                <ul className="text-lg font-light leading-relaxed tracking-tight text-foreground xl:text-xl space-y-2 ml-6">
                  <li>• ⚡ Cut query times by 40%</li>
                  <li>• 🌐 Scaled microservices to 500+ RPS at 99.999% uptime</li>
                  <li>• 🎯 Boosted model accuracy from 65% → 95%+</li>
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 my-8"></div>

              {/* Second Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">⚙️</span>
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground xl:text-[40px]">
                    From research to production.
                  </h2>
                </div>
                <ul className="text-lg font-light leading-relaxed tracking-tight text-foreground xl:text-xl space-y-2 ml-6">
                  <li>• Fine-tuned transformers & built RAG pipelines</li>
                  <li>• Deployed cloud-native ML on AWS/Azure with Docker + Kubernetes</li>
                  <li>• Constructed 2TB/day ETL pipelines & shipped human-in-the-loop annotation tools</li>
                </ul>
              </div>

              {/* Divider */}
              <div className="border-t border-border/20 my-8"></div>

              {/* Third Section */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">🚀</span>
                  <h2 className="text-3xl font-bold tracking-tighter text-foreground xl:text-[40px]">
                    Impact through engineering and collaboration.
            </h2>
                </div>
                <ul className="text-lg font-light leading-relaxed tracking-tight text-foreground xl:text-xl space-y-2 ml-6">
                  <li>• Mentored 200+ students as a TA, driving 95% on-time project delivery</li>
                  <li>• Built hackathon-winning tools that slashed LLM token usage by 47%</li>
                  <li>• Applied AI across robotics, legal tech, and large-scale enterprise systems</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" data-scroll-section className="my-32">
          <div className="max-w-6xl mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-center mb-16"
            >
              <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
                📄 Resume & CV
              </span>
              <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
                Professional Experience
              </h2>
              <p className="mt-6 text-lg text-muted-foreground max-w-3xl mx-auto">
                Download my complete resume to learn more about my academic achievements, professional experience, and technical skills.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="rounded-xl bg-gradient-to-br from-white/5 to-white/10 p-[1px] backdrop-blur-xl shadow-xl">
                <div className="rounded-xl bg-background/95 backdrop-blur-sm p-8 max-w-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 flex items-center justify-center">
                      <FileText className="h-10 w-10 text-primary" />
                    </div>
                    <h3 className="text-2xl font-semibold text-gradient clash-grotesk mb-4">
                      Swapnil Mittal - Resume
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      Computer Science + Machine Learning student at Georgia Tech with experience in AI, backend systems, and full-stack development.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button
                        onClick={() => setIsPDFModalOpen(true)}
                        size="lg"
                        className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70"
                      >
                        <FileText className="mr-2 h-5 w-5" />
                        View Resume
                      </Button>
                      <Button
                        variant="outline"
                        size="lg"
                        onClick={() => window.open('/assets/resume.pdf', '_blank')}
                      >
                        <Download className="mr-2 h-5 w-5" />
                        Download PDF
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Projects */}
        <section id="projects" data-scroll-section>
          {/* Gradient */}
          <div className="relative isolate -z-10">
            <div
              className="absolute inset-x-0 -top-40 transform-gpu overflow-hidden blur-[100px] sm:-top-80 lg:-top-60"
              aria-hidden="true"
            >
              <div
                className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary via-primary to-secondary opacity-10 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
              />
            </div>
          </div>
          <div data-scroll data-scroll-speed=".4" className="my-64">
            <span className="text-gradient clash-grotesk text-sm font-semibold tracking-tighter">
              ✨ Projects
            </span>
            <h2 className="mt-3 text-4xl font-semibold tracking-tight tracking-tighter xl:text-6xl">
              ML and Full-stack projects
            </h2>
            <p className="mt-1.5 text-base tracking-tight text-muted-foreground xl:text-lg">
              A mix of deployed systems, research pipelines, and hackathon wins — a sample is here, the full set lives on my {" "}
              <Link
                href="https://github.com/swapnilmittal1"
                target="_blank"
                className="underline"
              >
                GitHub
              </Link>.
            </p>

            {/* Carousel */}
            <div className="mt-14 relative">
              {/* Subtle grid background */}
              <div className="absolute inset-0 bg-grid-slate-800/30 pointer-events-none" />
              <ProjectCarousel projects={projects} />
            </div>
          </div>
        </section>

        {/* Professional Documents */}
        <ProfessionalDocuments />

        {/* Services */}
        <section id="services" data-scroll-section>
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="my-24 flex flex-col justify-start space-y-10"
          >
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{
                duration: 1,
                staggerChildren: 0.5,
              }}
              viewport={{ once: true }}
              className="grid items-center gap-1.5 md:grid-cols-2 xl:grid-cols-3"
            >
              <div className="flex flex-col py-6 xl:p-6">
                <h2 className="text-4xl font-medium tracking-tight">
                  Need more info?
                  <br />
                  <span className="text-gradient clash-grotesk tracking-normal">
                    I got you.
                  </span>
                </h2>
                <p className="mt-2 tracking-tighter text-secondary-foreground">
                  I am currently looking for an internship for Summer 2026, feel free to reach out.
                </p>
              </div>
              {services.map((service) => (
                <div
                  key={service.service}
                  className="flex flex-col items-start rounded-md bg-white/5 p-14 shadow-md backdrop-blur transition duration-300 hover:-translate-y-1 hover:bg-white/10 hover:shadow-lg h-full"
                >
                  <service.icon className="my-6 text-primary" size={20} />
                  <span className="text-lg tracking-tight text-foreground">
                    {service.service}
                  </span>
                  <span className="mt-2 tracking-tighter text-muted-foreground flex-1">
                    {service.description}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" data-scroll-section className="my-64">
          <div
            data-scroll
            data-scroll-speed=".4"
            data-scroll-position="top"
            className="flex flex-col items-center justify-center rounded-lg bg-gradient-to-br from-primary/[6.5%] to-white/5 px-8 py-24 text-center xl:py-32"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-4xl"
            >
              <div className="flex items-center justify-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src="/assets/memoji.jpg"
                    alt="Swapnil Mittal"
                    width={64}
                    height={64}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-5xl font-medium tracking-tighter xl:text-7xl">
                  Let&apos;s work{" "}
                  <span className="text-gradient clash-grotesk">together.</span>
                </h2>
              </div>
              
              <p className="text-xl tracking-tight text-muted-foreground mb-12 xl:text-2xl">
                Ready to build something impactful? I&apos;m always excited to collaborate on innovative projects.
              </p>
              
              {/* Contact Form */}
              <div className="mb-12">
                <ContactForm />
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                <Link href="mailto:swapnil.mittal1@gmail.com" passHref>
                  <Button size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                    <Mail className="mr-2 h-5 w-5" />
                    Get in touch
                  </Button>
                </Link>
                <Link href="https://www.linkedin.com/in/mittalswapnil/" passHref>
                  <Button variant="outline" size="lg" className="w-full sm:w-auto px-8 py-3 text-lg">
                    <Linkedin className="mr-2 h-5 w-5" />
                    Connect on LinkedIn
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto px-8 py-3 text-lg"
                  onClick={() => setIsPDFModalOpen(true)}
                >
                  <FileText className="mr-2 h-5 w-5" />
                  View Resume
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>swapnil.mittal1@gmail.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4" />
                  <span>Atlanta, GA</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Available for Summer 2026</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
      
      {/* PDF Modal */}
      <PDFModal
        isOpen={isPDFModalOpen}
        onClose={() => setIsPDFModalOpen(false)}
        pdfUrl="/assets/resume.pdf"
        title="Swapnil Mittal - Resume"
      />
    </Container>
  );
}

function Gradient() {
  return (
    <>
      {/* Upper gradient */}
      <div className="absolute -top-40 right-0 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <svg
          className="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7980fe" />
              <stop offset={1} stopColor="#f0fff7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* Lower gradient */}
      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <svg
          className="relative left-[calc(50%+3rem)] h-[21.1875rem] max-w-none -translate-x-1/2 sm:left-[calc(50%+36rem)] sm:h-[42.375rem]"
          viewBox="0 0 1155 678"
        >
          <path
            fill="url(#ecb5b0c9-546c-4772-8c71-4d3f06d544bc)"
            fillOpacity=".1"
            d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z"
          />
          <defs>
            <linearGradient
              id="ecb5b0c9-546c-4772-8c71-4d3f06d544bc"
              x1="1155.49"
              x2="-78.208"
              y1=".177"
              y2="474.645"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#9A70FF" />
              <stop offset={1} stopColor="#838aff" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </>
  );
}
