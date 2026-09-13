"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle2,
  Download,
  Menu,
  Users,
  X,
  Code2,
  BriefcaseBusiness,
  Layers3,
  Plane,
  Video,
  Guitar,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useEffect, useState } from "react";
import { projects } from "@/data/projects";

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const stagger = { visible: { transition: { staggerChildren: 0.09 } } };

export function Site() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
const [activeScreenshot, setActiveScreenshot] = useState(0);

const projectDetails = {
  1: {
    title: "Healthcare Digital Identity Platform",
    category: "Healthcare · Digital Identity · Web",
    overview:
      "A digital healthcare platform built around a verifiable patient identity card, connected services and an administrative ecosystem for managing users, applications and operational data.",
    contribution:
      "Project Management · QA & Automation · Product Coordination · Delivery",
    areas: [
      "Digital Identity",
      "Healthcare",
      "Web Application",
      "Admin Platform",
      "API Integration",
      "Quality Assurance",
    ],
    screenshots: [
      {
        src: "/images/projects/cancard/mobile-card.png",
        label: "Digital Card",
      },
      {
        src: "/images/projects/cancard/cards.png",
        label: "Card Management",
      },
      {
        src: "/images/projects/cancard/application.png",
        label: "Application Management",
      },
      {
        src: "/images/projects/cancard/dashboard.png",
        label: "Admin Dashboard",
      },
    ],
  },

  2: {
  title: "Rural Flock — Livestock & Rural Operations Platform",
  category: "AgriTech · Livestock · Enterprise Platform",
  overview:
    "An integrated digital platform designed to support livestock programmes, rural organisations, field operations, service delivery, inventory, analytics and programme administration across distributed teams and geographies.",
  contribution:
    "Project Management · Product Coordination · Requirements · QA · Delivery Management",
  areas: [
    "Livestock Management",
    "FPC / PC Operations",
    "Field Operations",
    "Analytics & Reporting",
    "Inventory",
    "Service Delivery",
    "Enterprise Administration",
  ],
  screenshots: [
    {
      src: "/images/projects/rural-flock/pc-details.png",
      label: "PC Details & Operations",
    },
    {
      src: "/images/projects/rural-flock/analytics.png",
      label: "Analytics & Geographic Distribution",
    },
    {
      src: "/images/projects/rural-flock/admin-dashboard.png",
      label: "Programme Administration Dashboard",
    },
  ],
},
} as const;

const openProject = (projectNumber: number) => {
  setSelectedProject(projectNumber);
  setActiveScreenshot(0);
};

const closeProject = () => {
  setSelectedProject(null);
  setActiveScreenshot(0);
};
useEffect(() => {
  if (selectedProject === null) return;

  const details =
    projectDetails[selectedProject as keyof typeof projectDetails];

  if (!details || details.screenshots.length <= 1) return;

  const timer = window.setInterval(() => {
    setActiveScreenshot((current) =>
      current === details.screenshots.length - 1 ? 0 : current + 1
    );
  }, 3500);

  return () => window.clearInterval(timer);
}, [selectedProject]);

/*Carousal useEffect*/
useEffect(() => {
  if (selectedProject === null) return;

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      closeProject();
    }
  };

  window.addEventListener("keydown", handleKeyDown);

  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [selectedProject]);

  const [contactOpen, setContactOpen] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">("idle");

const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const openContact = () => {
  setFormStatus("idle");
  setContactOpen(true);
};

const closeContact = () => {
  if (!isSending) {
    setContactOpen(false);
  }
};

useEffect(() => {
  const handleEscape = (event: KeyboardEvent) => {
    if (event.key === "Escape" && contactOpen && !isSending) {
      setContactOpen(false);
    }
  };

  document.addEventListener("keydown", handleEscape);

  return () => {
    document.removeEventListener("keydown", handleEscape);
  };
}, [contactOpen, isSending]);

const handleFormChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => {
  const { name, value } = event.target;

  setFormData((previous) => ({
    ...previous,
    [name]: value,
  }));
};

const handleContactSubmit = async (
  event: React.FormEvent<HTMLFormElement>
) => {
  event.preventDefault();

  setIsSending(true);
  setFormStatus("idle");

  try {
    const response = await fetch("https://formspree.io/f/xqpkvqqa", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    setFormStatus("success");

    setFormData({
      name: "",
      email: "",
      message: "",
    });
  } catch {
    setFormStatus("error");
  } finally {
    setIsSending(false);
  }
};
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.22], [0, -70]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <motion.div className="fixed left-0 top-0 z-100 h-1 origin-left bg-(--accent)" style={{ scaleX: scrollYProgress }} />

      <header className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/70 bg-[#fbfaf7]/80 backdrop-blur-xl">
        <div className="section-shell flex h-18.5 items-center justify-between">
          <a href="#home" onClick={closeMenu} className="group flex items-center gap-3" aria-label="Bapita Roy home">
            <div>
              <div className="font-display text-[25px] italic leading-none tracking-tighter">Bapita Roy</div>
              <div className="mt-1 hidden text-[8px] font-semibold uppercase tracking-[.28em] text-slate-500 sm:block">Quality · Technology · Delivery</div>
            </div>
          </a>

          <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
            {[["About", "about"], ["Journey", "journey"], ["Projects", "projects"], ["Expertise", "expertise"], ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} className="text-[15px] text-slate-700 transition-colors hover:text-(--accent)">{label}</a>
            ))}
          </nav>

          <a href="#resume" className="hidden items-center gap-2 rounded-full bg-(--accent) px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition-transform hover:-translate-y-0.5 lg:flex">
            <Download size={17} /> Download Resume
          </a>

          <button className="rounded-full border border-slate-300 p-2 lg:hidden" onClick={() => setMenuOpen(v => !v)} aria-label="Toggle menu" aria-expanded={menuOpen}>
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        <AnimatePresence>
          {menuOpen && (
            <motion.nav initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden border-t border-slate-200 bg-[#fbfaf7] lg:hidden">
              <div className="section-shell flex flex-col py-4">
                {[['About','about'],['Journey','journey'],['Projects','projects'],['Expertise','expertise'],['Contact','contact']].map(([label,id]) => (
                  <a key={id} href={`#${id}`} onClick={closeMenu} className="border-b border-slate-200 py-3 text-sm font-medium">{label}</a>
                ))}
                <a href="#resume" onClick={closeMenu} className="mt-4 flex items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-white"><Download size={16}/> Download Resume</a>
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      <section
  id="home"
  className="hero-wash relative overflow-hidden pt-[74px]"
>
  <div className="section-shell grid min-h-[760px] items-center gap-8 py-14 lg:grid-cols-[1.02fr_.98fr] lg:py-10">

    {/* LEFT — INTRODUCTION */}
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      className="relative z-10 pb-8 lg:pb-0"
    >
      <motion.div
        variants={fadeUp}
        className="mb-6 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[.32em] text-[var(--accent)]"
      >
        <span className="h-px w-8 bg-[var(--accent)]" />
        Project Manager · QA & Automation
      </motion.div>

      <motion.h1
        variants={fadeUp}
        className="font-display max-w-[720px] text-[42px] leading-[.98] tracking-tight text-[var(--ink)] sm:text-[54px] lg:text-[66px]"
      >
        A Project Manager
        <br />

        <span className="text-[var(--accent)]">
          with a QA mindset
        </span>

        <br />

        and a technology-first
        <br className="hidden sm:block" />

        approach.
      </motion.h1>

      <motion.p
        variants={fadeUp}
        className="mt-7 max-w-[620px] text-[17px] leading-8 text-slate-600 sm:text-[18px]"
      >
        I bring together project management, quality engineering and
        technology understanding to help teams deliver better software
        with clarity and confidence.
      </motion.p>

      {/* Core positioning */}
      <motion.div
        variants={fadeUp}
        className="mt-8 flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-700"
      >
        <span>Quality</span>
        <span className="text-[var(--accent)]">×</span>
        <span>Technology</span>
        <span className="text-[var(--accent)]">×</span>
        <span>Delivery</span>
      </motion.div>

      {/* Actions */}
      <motion.div
        variants={fadeUp}
        className="mt-9 flex flex-wrap gap-3"
      >
        <a
          href="#journey"
          className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-900/10 transition hover:-translate-y-0.5"
        >
          Explore My Journey

          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>

        <a
          href="#projects"
          className="group inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white/70 px-6 py-3.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
        >
          View My Work

          <ArrowRight
            size={17}
            className="transition-transform group-hover:translate-x-1"
          />
        </a>
      </motion.div>

      {/* Personality */}
      <motion.div
        variants={fadeUp}
        className="mt-10 flex flex-wrap gap-x-7 gap-y-3 border-t border-slate-200/80 pt-5 text-[10px] font-semibold uppercase tracking-[.24em] text-slate-500"
      >
        <span>Curious</span>
        <span>Organised</span>
        <span>Quality Focused</span>
        <span>People Driven</span>
      </motion.div>
    </motion.div>


    {/* RIGHT — PORTRAIT */}
    <motion.div
      style={{ y: heroY }}
      className="relative mx-auto h-[590px] w-full max-w-[560px] lg:h-[650px]"
    >
      <div className="portrait-ring" />
      <div className="portrait-glow" />

      {/* Portrait */}
      <div className="absolute inset-x-[9%] bottom-0 top-[2%] overflow-hidden rounded-[46%_54%_0_0/30%_30%_0_0]">
        <Image
          src="/images/profile.jpg"
          alt="Professional portrait of Bapita Roy"
          fill
          priority
          className="hero-image"
          sizes="(max-width: 1024px) 80vw, 520px"
        />
      </div>

      {/* QA */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.7, duration: 0.7 },
        }}
        className="glass-card absolute left-[1%] top-[20%] rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]">
            <CheckCircle2 size={20} />
          </span>

          <div>
            <div className="text-sm font-semibold">
              QA & Automation
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Quality mindset
            </div>
          </div>
        </div>
      </motion.div>


      {/* Technology */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 0.95, duration: 0.7 },
        }}
        className="glass-card absolute bottom-[29%] left-0 rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]">
            <Code2 size={20} />
          </span>

          <div>
            <div className="text-sm font-semibold">
              Technology
            </div>

            <div className="mt-1 text-xs text-slate-500">
              Understand · Coordinate · Deliver
            </div>
          </div>
        </div>
      </motion.div>


      {/* Delivery */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{
          opacity: 1,
          x: 0,
          transition: { delay: 1.15, duration: 0.7 },
        }}
        className="glass-card absolute right-0 top-[51%] rounded-2xl p-4 shadow-xl"
      >
        <div className="flex items-start gap-3">
          <span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]">
            <Users size={20} />
          </span>

          <div>
            <div className="text-sm font-semibold">
              Project Delivery
            </div>

            <div className="mt-1 text-xs text-slate-500">
              People · Process · Progress
            </div>
          </div>
        </div>
      </motion.div>


      {/* Handwritten note */}
      <div className="hand-note absolute right-[3%] top-[17%] max-w-[135px] -rotate-6 text-2xl leading-tight text-slate-500">
        Better software
        <br />
        happens together ♡
      </div>


      {/* Positioning statement */}
      <div className="glass-card absolute bottom-[3%] right-[2%] max-w-[285px] rounded-2xl p-5 text-[15px] leading-6 text-slate-700 shadow-xl">
        I don't just manage the project.

        <strong className="block text-[var(--ink)]">
          I understand the product.
        </strong>

        <div className="mt-3 h-1 w-10 rounded-full bg-[var(--accent)]" />
      </div>
    </motion.div>
  </div>


  {/* Bottom summary strip */}
  <div className="section-shell relative z-20 pb-5">
    <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_18px_60px_rgba(33,53,80,.07)] backdrop-blur md:grid-cols-4">

      {(
        [
          [
            BriefcaseBusiness,
            "7+",
            "Years in QA & Automation",
          ],
          [
            Layers3,
            "PM",
            "Project Management & Delivery",
          ],
          [
            Layers3,
            "Multiple",
            "Web & Mobile Products Delivered",
          ],
          [
            Users,
            "Cross-functional",
            "Teams & Client Collaboration",
          ],
        ] as [LucideIcon, string, string][]
      ).map(([Icon, big, small], i) => {
        const I = Icon;

        return (
          <div
            key={big}
            className={`flex items-center gap-4 p-6 ${
              i
                ? "border-t border-slate-200 md:border-l md:border-t-0"
                : ""
            }`}
          >
            <I
              className="shrink-0 text-[var(--accent)]"
              size={27}
            />

            <div>
              <div className="font-display text-2xl font-bold">
                {big}
              </div>

              <div className="mt-1 text-xs text-slate-500">
                {small}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
</section>

      <section id="about" className="section-shell py-28">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .25 }} variants={stagger} className="grid gap-14 lg:grid-cols-[.8fr_1.2fr]">
          <motion.div variants={fadeUp}><div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">My Approach</div><h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">I don't just manage the project.<br/><span className="text-slate-400">I understand the product.</span></h2></motion.div>
          <motion.div variants={fadeUp} className="self-end"><p className="max-w-2xl text-lg leading-8 text-slate-600">My background in QA and Automation taught me to look beyond task completion — understanding edge cases, technical dependencies, quality risks and the experience we're creating for the end user.</p><p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">Project Management expanded that perspective into planning, prioritisation, people, stakeholders, timelines and delivery.</p></motion.div>
        </motion.div>
      </section>

      <section className="bg-[#f0f4f8] py-28">
  <div className="section-shell">
    <div className="mb-14">
      <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
        Three Perspectives
      </div>

      <h2 className="font-display mt-4 text-5xl md:text-6xl">
        Where I work best.
      </h2>

      <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
        Different questions need different perspectives. My experience helps me look at a product from more than one angle.
      </p>
    </div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={stagger}
      className="grid gap-4 md:grid-cols-3"
    >
      {[
        [
          "01",
          "QUALITY",
          "What could go wrong?",
          "QA taught me to think about edge cases, reliability, user experience and product quality.",
        ],
        [
          "02",
          "TECHNOLOGY",
          "How should we build it?",
          "I understand the technical conversations behind the products I manage — APIs, databases, integrations, architecture and cloud.",
        ],
        [
          "03",
          "DELIVERY",
          "How do we make it happen?",
          "Project management brings planning, people, priorities, stakeholders, risks and delivery together.",
        ],
      ].map(([num, title, question, copy]) => (
        <motion.article
          variants={fadeUp}
          key={num}
          className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/30"
        >
          <div className="flex items-start justify-between">
            <div className="text-xs font-bold text-[var(--accent)]">
              {num}
            </div>

            <ArrowRight
              size={18}
              className="text-slate-300 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
            />
          </div>

          <div className="mt-14 inline-block border border-[var(--accent)] px-5 py-2">
            <h3 className="text-[13px] font-bold tracking-[.28em] text-[var(--ink)]">
              {title}
            </h3>
          </div>

          <div className="font-display mt-5 text-3xl leading-tight text-[var(--ink)]">
            {question}
          </div>

          <p className="mt-5 leading-7 text-slate-600">
            {copy}
          </p>

          <div className="mt-8 h-px w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-12" />
        </motion.article>
      ))}
    </motion.div>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      className="mt-10 text-center"
    >
      <p className="font-display text-2xl text-[var(--ink)] md:text-3xl">
        Three perspectives. One goal:{" "}
        <span className="text-[var(--accent)]">
          Better Software Delivery.
        </span>
      </p>
    </motion.div>
  </div>
</section>

      <section id="journey" className="section-shell py-24 md:py-28">
  <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
        Career Journey
      </div>

      <h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
        Every step expanded the way I see a product.
      </h2>
    </motion.div>

    <motion.p
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="max-w-xl text-base leading-8 text-slate-600 md:text-lg"
    >
      My career didn't move away from technology and quality as I moved into
      project management. It built on them — giving me a broader perspective
      of how products are planned, built, tested and delivered.
    </motion.p>
  </div>

  {/* Journey */}
  <div className="relative mt-16">

    {/* Vertical line */}
    <div className="absolute bottom-0 left-[18px] top-0 hidden w-px bg-slate-200 md:block" />

    <div className="space-y-5">

      {/* QA */}
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55 }}
        className="relative grid gap-6 md:grid-cols-[38px_150px_1fr] md:items-start"
      >
        <div className="relative z-10 mt-1 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--accent)] text-[9px] font-bold text-white md:flex">
          01
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-[var(--accent)]">
            Foundation
          </div>

          <div className="mt-2 font-display text-2xl">
            QA
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h3 className="font-display text-3xl">
            Learning to see the product from the user's perspective.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            QA gave me the habit of asking questions others may not think
            about — what could go wrong, how users might behave differently,
            and whether the product actually solves the problem it was built
            for.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Test Planning", "Functional Testing", "Regression", "Defect Analysis"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-medium text-slate-600"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </motion.article>

      {/* Automation */}
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="relative grid gap-6 md:grid-cols-[38px_150px_1fr] md:items-start"
      >
        <div className="relative z-10 mt-1 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--accent)] text-[9px] font-bold text-white md:flex">
          02
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-[var(--accent)]">
            Scale
          </div>

          <div className="mt-2 font-display text-2xl">
            Automation
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h3 className="font-display text-3xl">
            Turning repetitive validation into efficient automation.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Automation strengthened my technical understanding and taught me
            to think about repeatability, maintainability, efficiency and
            reliable feedback throughout the development lifecycle.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {["Selenium", "Cypress", "TestNG", "API Testing", "CI/CD"].map(
              (item) => (
                <span
                  key={item}
                  className="rounded-full bg-blue-50 px-3 py-1.5 text-[10px] font-medium text-blue-700"
                >
                  {item}
                </span>
              )
            )}
          </div>
        </div>
      </motion.article>

      {/* QA Leadership */}
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="relative grid gap-6 md:grid-cols-[38px_150px_1fr] md:items-start"
      >
        <div className="relative z-10 mt-1 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--accent)] text-[9px] font-bold text-white md:flex">
          03
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-[var(--accent)]">
            Leadership
          </div>

          <div className="mt-2 font-display text-2xl">
            QA Leadership
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h3 className="font-display text-3xl">
            Taking ownership of quality, people and outcomes.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Leadership expanded my focus from individual testing to quality
            strategy, team coordination, mentoring, client communication and
            the wider outcome of the product.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Quality Strategy",
              "Team Leadership",
              "Client Communication",
              "Mentoring",
              "Delivery Coordination",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-violet-50 px-3 py-1.5 text-[10px] font-medium text-violet-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Project Management */}
      <motion.article
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, delay: 0.24 }}
        className="relative grid gap-6 md:grid-cols-[38px_150px_1fr] md:items-start"
      >
        <div className="relative z-10 mt-1 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--accent)] text-[9px] font-bold text-white md:flex">
          04
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-[var(--accent)]">
            Expansion
          </div>

          <div className="mt-2 font-display text-2xl">
            Project Management
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <h3 className="font-display text-3xl">
            Expanding the perspective to the whole delivery picture.
          </h3>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
            Project management brought together everything I had learned:
            scope, requirements, people, timelines, risks, dependencies,
            stakeholders, technology, quality and delivery.
          </p>

          <div className="mt-5 flex flex-wrap gap-2">
            {[
              "Planning",
              "Agile / Scrum",
              "Requirements",
              "Risk Management",
              "Stakeholders",
              "Release Management",
            ].map((item) => (
              <span
                key={item}
                className="rounded-full bg-amber-50 px-3 py-1.5 text-[10px] font-medium text-amber-700"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </motion.article>

      {/* Today */}
      <motion.article
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.65, delay: 0.12 }}
        className="relative grid gap-6 md:grid-cols-[38px_150px_1fr] md:items-start"
      >
        <div className="relative z-10 mt-1 hidden h-9 w-9 items-center justify-center rounded-full border-4 border-[#15243d] bg-blue-400 text-[9px] font-bold text-[#15243d] md:flex">
          05
        </div>

        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-blue-500">
            Current
          </div>

          <div className="mt-2 font-display text-2xl">
            Today
          </div>
        </div>

        <div className="relative overflow-hidden rounded-3xl bg-[#15243d] p-8 text-white shadow-xl md:p-10">
          <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-blue-400/10 blur-2xl" />

          <div className="relative">
            <div className="text-[10px] font-bold uppercase tracking-[.28em] text-blue-300">
              Bringing it all together
            </div>

            <h3 className="font-display mt-4 max-w-2xl text-4xl leading-tight md:text-5xl">
              Technology, quality, people and business — working towards one
              outcome.
            </h3>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
              Today, I approach projects with a broader lens. My QA and
              automation background helps me understand product quality and
              technical conversations, while project management gives me the
              perspective to connect teams, priorities, clients and business
              goals.
            </p>

            <div className="mt-7 flex flex-wrap gap-2">
              {[
                "Project Management",
                "Quality",
                "Technology",
                "Client Partnership",
                "AI / GenAI",
              ].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-[10px] font-medium text-slate-300"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </motion.article>

    </div>
  </div>

  {/* Journey takeaway */}
  <motion.div
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="mt-14 border-t border-slate-200 pt-8"
  >
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <p className="font-display text-2xl text-[var(--ink)] md:text-3xl">
        The role changed.
        <span className="text-[var(--accent)]"> The mindset evolved.</span>
      </p>

      <p className="max-w-md text-sm leading-6 text-slate-500 md:text-right">
        My technical foundation remains an important part of how I approach
        project decisions and delivery.
      </p>
    </div>
  </motion.div>
</section>

<section id="projects" className="bg-[#15243d] py-24 text-white md:py-28">
  <div className="section-shell">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-between gap-7 border-b border-white/10 pb-8 md:flex-row md:items-end"
    >
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[.35em] text-blue-300">
          Selected Work
        </div>

        <h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
          Products I've helped deliver.
        </h2>
      </div>

      <p className="max-w-md text-sm leading-7 text-slate-300">
        A selection of products and platforms I've contributed to across
        different domains, teams and delivery environments.
      </p>
    </motion.div>

    {/* Projects */}
    <div className="mt-8">
      {projects.map((project, index) => (
        <motion.article
          key={project.number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: index * 0.04,
          }}
          className="group border-b border-white/10 py-9 first:pt-3 last:border-b-0"
        >
          <div className="grid gap-6 lg:grid-cols-[80px_1fr_220px] lg:items-start lg:gap-10">

            {/* Number */}
            <div className="font-mono text-sm font-bold text-blue-300">
              {String(index + 1).padStart(2, "0")}
            </div>

            {/* Main information */}
            <div>
              <div className="text-[10px] font-bold uppercase tracking-[.25em] text-slate-400">
                {project.category}
              </div>

              <h3 className="font-display mt-3 text-3xl leading-tight transition-colors duration-300 group-hover:text-blue-300 md:text-4xl">
                {project.title}
              </h3>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300 md:text-[15px]">
                {project.summary}
              </p>

              <div className="mt-5 flex flex-wrap gap-2">
                {project.areas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-slate-300 transition-colors duration-300 group-hover:border-blue-300/20"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* Role + Explore */}
            <div className="border-t border-white/10 pt-5 lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">

              <div className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-500">
                My Role
              </div>

              <div className="mt-3 space-y-1.5">
                {project.role.map((role) => (
                  <div
                    key={role}
                    className="text-xs leading-5 text-slate-300"
                  >
                    {role}
                  </div>
                ))}
              </div>

              {/* Explore button */}
              <button
                type="button"
                onClick={() => openProject(Number(project.number))}
                className="group/explore mt-6 inline-flex cursor-pointer items-center gap-2 rounded-full border border-blue-300/20 bg-blue-300/[0.04] px-4 py-2.5 text-xs font-semibold text-blue-300 shadow-[0_0_0_rgba(96,165,250,0)] transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/40 hover:bg-blue-300/10 hover:text-blue-200 hover:shadow-[0_8px_25px_rgba(96,165,250,0.12)]">
                <span>Explore</span>
                <ArrowRight size={15} className="transition-transform duration-300 group-hover/explore:translate-x-1.5"/>
              </button>

            </div>
          </div>
        </motion.article>
      ))}
    </div>

    {/* Closing note */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 border-t border-white/10 pt-7"
    >
      <p className="max-w-3xl text-sm leading-7 text-slate-400">
        Client names and certain implementation details are intentionally
        omitted where confidentiality requires it.
      </p>
    </motion.div>

  </div>
</section>

<AnimatePresence>
  {selectedProject !== null &&
    projectDetails[selectedProject as keyof typeof projectDetails] && (() => {
      const details =
        projectDetails[selectedProject as keyof typeof projectDetails];

      const screenshot = details.screenshots[activeScreenshot];

      return (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-md md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeProject();
            }
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative max-h-[92vh] w-full max-w-6xl overflow-hidden rounded-[28px] border border-white/10 bg-[#101a2c] shadow-2xl"
          >

            {/* Modal Header */}
            <div className="flex items-start justify-between border-b border-white/10 px-6 py-5 md:px-8">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[.3em] text-blue-300">
                  Project {String(selectedProject).padStart(2, "0")}
                </div>

                <h2 className="font-display mt-2 text-2xl md:text-3xl">
                  {details.title}
                </h2>

                <div className="mt-2 text-xs text-slate-400">
                  {details.category}
                </div>
              </div>

              <button
                type="button"
                onClick={closeProject}
                aria-label="Close project details"
                className="rounded-full border border-white/10 p-2.5 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal body */}
            <div className="max-h-[calc(92vh-90px)] overflow-y-auto">

              <div className="grid gap-0 lg:grid-cols-[1.15fr_.85fr]">

                {/* Screenshot area */}
                <div className="border-b border-white/10 bg-[#080d16] p-5 md:p-8 lg:border-b-0 lg:border-r">

                  <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-black">

                    <motion.div
                      key={screenshot.src}
                      initial={{ opacity: 0, scale: 1.015 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.55 }}
                      className="flex min-h-[320px] items-center justify-center p-3 md:min-h-[460px]"
                    >
                      <img
                        src={screenshot.src}
                        alt={`${details.title} — ${screenshot.label}`}
                        className="max-h-[500px] w-full rounded-xl object-contain"
                      />
                    </motion.div>

                    {/* Previous */}
                    <button
                      type="button"
                      aria-label="Previous screenshot"
                      onClick={() =>
                        setActiveScreenshot((current) =>
                          current === 0
                            ? details.screenshots.length - 1
                            : current - 1
                        )
                      }
                      className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    >
                      <ChevronLeft size={19} />
                    </button>

                    {/* Next */}
                    <button
                      type="button"
                      aria-label="Next screenshot"
                      onClick={() =>
                        setActiveScreenshot((current) =>
                          current === details.screenshots.length - 1
                            ? 0
                            : current + 1
                        )
                      }
                      className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/60 text-white backdrop-blur transition hover:bg-black/80"
                    >
                      <ChevronRight size={19} />
                    </button>

                    {/* Screenshot label */}
                    <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/65 px-3 py-1.5 text-[9px] font-semibold uppercase tracking-[.2em] text-slate-200 backdrop-blur">
                      {screenshot.label}
                    </div>

                  </div>

                  {/* Dots */}
                  <div className="mt-5 flex items-center justify-center gap-2">
                    {details.screenshots.map((item, index) => (
                      <button
                        key={item.src}
                        type="button"
                        aria-label={`Show ${item.label}`}
                        onClick={() => setActiveScreenshot(index)}
                        className={`h-1.5 rounded-full transition-all duration-300 ${
                          activeScreenshot === index
                            ? "w-8 bg-blue-300"
                            : "w-1.5 bg-white/25 hover:bg-white/50"
                        }`}
                      />
                    ))}
                  </div>

                  <div className="mt-3 text-center text-[9px] uppercase tracking-[.2em] text-slate-500">
                    {activeScreenshot + 1} / {details.screenshots.length}
                  </div>
                </div>

                {/* Information */}
                <div className="p-6 md:p-8">

                  <div className="text-[9px] font-bold uppercase tracking-[.3em] text-blue-300">
                    About the project
                  </div>

                  <p className="mt-4 text-sm leading-7 text-slate-300">
                    {details.overview}
                  </p>

                  {/* Contribution */}
                  <div className="mt-8 border-t border-white/10 pt-7">
                    <div className="text-[9px] font-bold uppercase tracking-[.3em] text-slate-500">
                      My contribution
                    </div>

                    <p className="mt-3 text-sm leading-7 text-slate-300">
                      {details.contribution}
                    </p>
                  </div>

                  {/* Areas */}
                  <div className="mt-8 border-t border-white/10 pt-7">
                    <div className="text-[9px] font-bold uppercase tracking-[.3em] text-slate-500">
                      Product areas
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {details.areas.map((area) => (
                        <span
                          key={area}
                          className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] text-slate-300"
                        >
                          {area}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Perspective */}
                  <div className="mt-8 rounded-2xl border border-blue-300/10 bg-blue-300/[.05] p-5">
                    <div className="text-[9px] font-bold uppercase tracking-[.3em] text-blue-300">
                      Delivery perspective
                    </div>

                    <p className="mt-3 text-sm leading-6 text-slate-300">
                      This project brought together product requirements,
                      technical coordination, quality assurance and delivery
                      management — the kind of cross-functional environment
                      where my background is particularly useful.
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      );
    })()}
</AnimatePresence>



      <section id="expertise" className="bg-[#f7f9fc] py-24 md:py-28">
  <div className="section-shell">

    {/* Section heading */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mb-14 flex flex-col justify-between gap-6 border-b border-slate-200 pb-8 md:flex-row md:items-end"
    >
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
          Expertise
        </div>

        <h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
          What I bring to a project.
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
          A combination of project management, quality engineering and
          technology understanding — now evolving towards AI-enabled delivery.
        </p>
      </div>

      <p className="max-w-sm text-sm leading-6 text-slate-500">
        I like to work at the intersection of people, process and technology,
        with a growing focus on AI / GenAI in real-world product delivery.
      </p>
    </motion.div>

    {/* AI / GenAI capability map */}
    <div className="relative">

      {/* AI / GenAI */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="mx-auto max-w-md"
      >
        <div className="rounded-2xl border border-blue-200 bg-blue-50/70 px-6 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="text-xs font-bold uppercase tracking-[.28em] text-blue-600">
            AI / GenAI
          </div>

          <div className="mt-2 font-display text-2xl text-[var(--ink)]">
            Exploring possibilities. Solving real problems.
          </div>
        </div>
      </motion.div>

      {/* Connector */}
      <div className="mx-auto flex h-12 w-px flex-col items-center bg-blue-200">
        <span className="mt-auto mb-[-1px] h-0 w-0 border-l-[5px] border-r-[5px] border-t-[7px] border-l-transparent border-r-transparent border-t-blue-400" />
      </div>

      {/* AI Project Management */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="mx-auto max-w-lg"
      >
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/80 px-6 py-5 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
          <div className="text-xs font-bold uppercase tracking-[.28em] text-indigo-600">
            AI Project Management
          </div>

          <div className="mt-2 font-display text-2xl text-[var(--ink)]">
            Turning AI opportunities into successful products.
          </div>
        </div>
      </motion.div>

      {/* Main connector */}
      <div className="relative mx-auto hidden h-14 max-w-5xl md:block">
        <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-300" />
        <div className="absolute left-[16.66%] right-[16.66%] top-1/2 h-px bg-slate-300" />
        <div className="absolute left-[16.66%] top-1/2 h-7 w-px bg-slate-300" />
        <div className="absolute left-1/2 top-1/2 h-7 w-px -translate-x-1/2 bg-slate-300" />
        <div className="absolute right-[16.66%] top-1/2 h-7 w-px bg-slate-300" />

        <span className="absolute left-[16.66%] top-[calc(50%+26px)] h-2 w-2 -translate-x-1/2 rounded-full bg-emerald-500" />
        <span className="absolute left-1/2 top-[calc(50%+26px)] h-2 w-2 -translate-x-1/2 rounded-full bg-rose-500" />
        <span className="absolute right-[16.66%] top-[calc(50%+26px)] h-2 w-2 translate-x-1/2 rounded-full bg-amber-500" />
      </div>

      {/* Mobile connector */}
      <div className="mx-auto h-10 w-px bg-slate-300 md:hidden" />

      {/* Three capability pillars */}
      <div className="grid gap-5 md:grid-cols-3">

        {/* Project Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.12 }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-emerald-200 bg-emerald-50/50 p-7"
        >
          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-600">
              01
            </div>

            <h3 className="font-display mt-2 text-2xl text-[var(--ink)]">
              Project Management
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              From planning to delivery.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Agile",
              "Scrum",
              "Risk Management",
              "Stakeholder Management",
              "Client Communication",
              "Project Coordination",
              "Team Leadership",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Quality Engineering */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.18 }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-rose-200 bg-rose-50/50 p-7"
        >
          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-[.25em] text-rose-500">
              02
            </div>

            <h3 className="font-display mt-2 text-2xl text-[var(--ink)]">
              Quality Engineering
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Building confidence into the product.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "Manual QA",
              "Automation",
              "Selenium",
              "Cypress",
              "TestNG",
              "API Testing",
              "Regression & Release Testing",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Technology */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.24 }}
          whileHover={{ y: -5 }}
          className="rounded-3xl border border-amber-200 bg-amber-50/50 p-7"
        >
          <div className="mb-6">
            <div className="text-[10px] font-bold uppercase tracking-[.25em] text-amber-600">
              03
            </div>

            <h3 className="font-display mt-2 text-2xl text-[var(--ink)]">
              Technology
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Understanding the bigger picture.
            </p>
          </div>

          <div className="space-y-3">
            {[
              "APIs",
              "Web Applications",
              "Software Architecture",
              "Databases (MySQL, PostgreSQL)",
              "Cloud (AWS)",
              "SDLC",
              "Integrations",
              "Product & Delivery",
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 text-sm text-slate-600"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>

    {/* Detailed capability cards */}
    <div className="mt-8 grid gap-5 md:grid-cols-3">

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div className="text-[10px] font-bold uppercase tracking-[.25em] text-emerald-600">
          Project Management
        </div>

        <h3 className="font-display mt-3 text-3xl">
          People. Process. Progress.
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          I plan, coordinate and drive execution across teams, keeping the
          focus on outcomes, communication and value delivery.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Agile",
            "Scrum",
            "Risk Management",
            "Stakeholders",
            "Client Management",
            "Documentation",
            "Team Coordination",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-emerald-50 px-3 py-1.5 text-[11px] font-medium text-emerald-700"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.08 }}
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div className="text-[10px] font-bold uppercase tracking-[.25em] text-rose-500">
          Quality Engineering
        </div>

        <h3 className="font-display mt-3 text-3xl">
          Quality by Design.
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          I bring a quality mindset into every stage of the product lifecycle,
          using both manual and automated testing to improve confidence.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "Manual QA",
            "Automation",
            "Selenium",
            "Cypress",
            "TestNG",
            "API Testing",
            "Test Strategy",
            "Release Management",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-rose-50 px-3 py-1.5 text-[11px] font-medium text-rose-700"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, delay: 0.16 }}
        className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
      >
        <div className="text-[10px] font-bold uppercase tracking-[.25em] text-amber-600">
          Technology
        </div>

        <h3 className="font-display mt-3 text-3xl">
          Understand. Enable. Deliver.
        </h3>

        <p className="mt-4 text-sm leading-7 text-slate-600">
          I understand the technical side of the products I manage, which
          helps me make better decisions and work effectively with technology
          teams.
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          {[
            "APIs",
            "Web Applications",
            "Databases",
            "Cloud (AWS)",
            "Software Architecture",
            "SDLC",
            "Integrations",
            "Delivery",
          ].map((item) => (
            <span
              key={item}
              className="rounded-full bg-amber-50 px-3 py-1.5 text-[11px] font-medium text-amber-700"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Closing statement */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-8 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-indigo-50 px-7 py-8 md:px-10"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[.28em] text-blue-600">
            Three complementary disciplines.
          </div>

          <div className="font-display mt-2 text-3xl text-[var(--ink)] md:text-4xl">
            One delivery mindset.
          </div>
        </div>

        <p className="max-w-xl text-sm leading-7 text-slate-600">
          By combining project management, quality engineering and technology
          understanding, I help teams turn ideas into reliable,
          real-world products.
        </p>
      </div>
    </motion.div>

  </div>
</section>

      <section className="bg-[#edf2f6] py-24 md:py-28">
  <div className="section-shell">

    {/* Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="flex flex-col justify-between gap-7 border-b border-slate-200 pb-8 md:flex-row md:items-end"
    >
      <div>
        <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
          How I Work
        </div>

        <h2 className="font-display mt-4 max-w-3xl text-5xl leading-tight md:text-6xl">
          From understanding the problem to delivering the solution.
        </h2>
      </div>

      <p className="max-w-md text-sm leading-7 text-slate-600">
        A practical approach that keeps people aligned, quality visible and
        delivery moving forward.
      </p>
    </motion.div>

    {/* Process */}
    <div className="mt-12">

      {/* Desktop connecting line */}
      <div className="relative hidden md:block">
        <div className="absolute left-[8%] right-[8%] top-5 h-px bg-slate-300" />

        <div className="grid grid-cols-6 gap-4">
          {[
            ["01", "Understand", "What problem are we solving?"],
            ["02", "Plan", "What needs to happen, and in what order?"],
            ["03", "Collaborate", "Who needs to be aligned?"],
            ["04", "Validate", "Does what we built actually work?"],
            ["05", "Automate", "Where can automation improve confidence and efficiency?"],
            ["06", "Deliver", "Can we release it confidently?"],
          ].map(([number, title, copy], index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.06,
              }}
              className="relative"
            >
              {/* Number node */}
              <div className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#edf2f6] bg-[var(--accent)] text-[10px] font-bold text-white shadow-sm">
                {number}
              </div>

              <div className="mt-7 pr-3">
                <h3 className="font-display text-2xl leading-tight text-[var(--ink)]">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-600">
                  {copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile process */}
      <div className="relative md:hidden">

        <div className="absolute bottom-6 left-5 top-6 w-px bg-slate-300" />

        <div className="space-y-8">
          {[
            ["01", "Understand", "What problem are we solving?"],
            ["02", "Plan", "What needs to happen, and in what order?"],
            ["03", "Collaborate", "Who needs to be aligned?"],
            ["04", "Validate", "Does what we built actually work?"],
            ["05", "Automate", "Where can automation improve confidence and efficiency?"],
            ["06", "Deliver", "Can we release it confidently?"],
          ].map(([number, title, copy], index) => (
            <motion.div
              key={number}
              initial={{ opacity: 0, x: -15 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.5,
                delay: index * 0.05,
              }}
              className="relative flex gap-6"
            >
              <div className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-4 border-[#edf2f6] bg-[var(--accent)] text-[10px] font-bold text-white shadow-sm">
                {number}
              </div>

              <div className="pt-1">
                <h3 className="font-display text-2xl text-[var(--ink)]">
                  {title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-600">
                  {copy}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* Bottom statement */}
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="mt-14 border-t border-slate-200 pt-7"
    >
      <div className="grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <p className="max-w-3xl text-sm leading-7 text-slate-600">
          I don't treat delivery as a straight line. Feedback, risks,
          changing priorities and quality concerns can move the process
          forward or backward — and that's where active project management
          matters.
        </p>

        <div className="text-right">
          <div className="text-[10px] font-bold uppercase tracking-[.25em] text-[var(--accent)]">
            The goal
          </div>

          <div className="font-display mt-2 text-2xl text-[var(--ink)]">
            Deliver with confidence.
          </div>
        </div>
      </div>
    </motion.div>

  </div>
</section>

      <section id="personal" className="section-shell py-28">
        <div className="grid gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-end"><div><div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">Beyond the Projects</div><h2 className="font-display mt-4 text-5xl md:text-6xl">Because there's more to me than Jira tickets.</h2></div><p className="max-w-xl leading-8 text-slate-600">I enjoy the work, but I also love the things that give me new stories, perspectives and creative energy.</p></div>
        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {(
  [
    [
      Guitar,
      "Guitar",
      "A little music",
      "When I’m away from screens and meetings, you’ll often find me with a guitar.",
    ],
    [
      Video,
      "Vlogging",
      "Documenting moments",
      "I enjoy capturing experiences and turning them into stories.",
    ],
    [
      Plane,
      "Travelling",
      "Exploring",
      "New places, new people and new perspectives.",
    ],
  ] as [LucideIcon, string, string, string][]
).map(([Icon, title, sub, copy]) => {
  const I = Icon;

  return (
    <motion.div
      key={title}
      whileHover={{ y: -6 }}
      className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[var(--accent)]">
        <I size={23} />
      </div>

      <h3 className="font-display mt-10 text-3xl">
        {title}
      </h3>

      <div className="mt-1 text-xs font-bold uppercase tracking-[.2em] text-[var(--accent)]">
        {sub}
      </div>

      <p className="mt-5 leading-7 text-slate-600">
        {copy}
      </p>
    </motion.div>
  );
})}
        </div>
      </section>

      <section id="resume" className="bg-[var(--accent)] py-24 text-white">
        <div className="section-shell flex flex-col items-start justify-between gap-8 md:flex-row md:items-center"><div><div className="text-[10px] font-bold uppercase tracking-[.35em] text-blue-100">Professional Profile</div><h2 className="font-display mt-4 text-5xl md:text-6xl">Want the full picture?</h2><p className="mt-5 max-w-xl leading-7 text-blue-50">My website tells the story. My resume gives you the details.</p></div><div className="flex flex-wrap gap-3"><a href="/resume/project-management-resume.pdf" className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--accent)] transition hover:-translate-y-0.5"><Download size={17}/> PM Resume</a><a href="/resume/qa-automation-resume.pdf" className="inline-flex items-center gap-2 rounded-full border border-white/40 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"><Download size={17}/> QA Resume</a></div></div>
      </section>

      <section id="contact" className="section-shell py-28">
  <div className="rounded-[2rem] border border-slate-200 bg-white p-9 md:p-14">
    <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
      Let's Connect
    </div>

    <h2 className="font-display mt-4 max-w-3xl text-6xl leading-tight md:text-7xl">
      Let's build something meaningful.
    </h2>

    <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
      Have an opportunity, a project, an idea - or simply want to connect?
    </p>

    <div className="mt-8 flex flex-wrap gap-3">
      <button
        type="button"
        onClick={openContact}
        className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5"
      >
        Let's Talk
        <ArrowRight
          size={17}
          className="transition-transform group-hover:translate-x-1"
        />
      </button>

      <a
        href="#home"
        className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-6 py-3.5 text-sm font-semibold text-slate-700"
      >
        Back to top
        <ArrowDown size={16} className="rotate-180" />
      </a>
    </div>
  </div>
</section>
<AnimatePresence>
  {contactOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          closeContact();
        }
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 15, scale: 0.98 }}
        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-[2rem] bg-[#fbfaf7] shadow-2xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
      >
        <button
          type="button"
          onClick={closeContact}
          disabled={isSending}
          aria-label="Close contact form"
          className="absolute right-5 top-5 z-10 rounded-full border border-slate-200 bg-white p-2 text-slate-500 transition hover:border-slate-300 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X size={20} />
        </button>

        <div className="grid md:grid-cols-[.8fr_1.2fr]">
          {/* Contact information */}
          <div className="bg-[#15243d] p-8 text-white md:rounded-l-[2rem] md:p-10">
            <div className="text-[10px] font-bold uppercase tracking-[.35em] text-blue-300">
              Get in touch
            </div>

            <h2
              id="contact-modal-title"
              className="font-display mt-5 text-4xl leading-tight"
            >
              Let's talk.
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-300">
              Whether you have a project, an opportunity or simply want to
              connect, I'd be happy to hear from you.
            </p>

            <div className="mt-10 space-y-5">
              <a
                href="mailto:bapitaroy14@gmail.com"
                className="group block border-b border-white/10 pb-5"
              >
                <div className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-400">
                  Email
                </div>
                <div className="mt-2 text-sm text-white transition-colors group-hover:text-blue-300">
                  bapitaroy14@gmail.com
                </div>
              </a>

              <a
                href="tel:+919007734205"
                className="group block border-b border-white/10 pb-5"
              >
                <div className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-400">
                  Phone
                </div>
                <div className="mt-2 text-sm text-white transition-colors group-hover:text-blue-300">
                  +91 9007734205
                </div>
              </a>

              <a
                href="https://www.linkedin.com/in/bapita-roy-b4794980/"
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <div className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-400">
                  LinkedIn
                </div>
                <div className="mt-2 text-sm text-white transition-colors group-hover:text-blue-300">
                  Connect with me on LinkedIn
                </div>
              </a>
            </div>
          </div>

          {/* Contact form */}
          <div className="p-8 md:p-10">
            {formStatus === "success" ? (
              <div className="flex min-h-[430px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[var(--accent)]">
                  <CheckCircle2 size={32} />
                </div>

                <h3 className="font-display mt-6 text-3xl text-[var(--ink)]">
                  Message sent!
                </h3>

                <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
                  Thank you for reaching out. Your message has been sent
                  successfully. I'll get back to you as soon as possible.
                </p>

                <button
                  type="button"
                  onClick={closeContact}
                  className="mt-7 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5"
                >
                  Close
                </button>
              </div>
            ) : (
              <>
                <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
                  Send a message
                </div>

                <h3 className="font-display mt-4 text-3xl text-[var(--ink)]">
                  How can I help?
                </h3>

                <form
                  onSubmit={handleContactSubmit}
                  className="mt-7 space-y-5"
                >
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Name
                    </label>

                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleFormChange}
                      placeholder="Your name"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Email
                    </label>

                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-message"
                      className="mb-2 block text-xs font-semibold text-slate-700"
                    >
                      Message
                    </label>

                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Tell me a little about your project or opportunity..."
                      className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[var(--accent)] focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  {formStatus === "error" && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm leading-5 text-red-700">
                      Something went wrong while sending your message. Please
                      try again or contact me directly by email.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSending}
                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/10 transition hover:-translate-y-0.5 hover:bg-[var(--accent-dark)] disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isSending ? "Sending..." : "Send Message"}

                    {!isSending && (
                      <ArrowRight
                        size={17}
                        className="transition-transform group-hover:translate-x-1"
                      />
                    )}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

      <footer className="border-t border-slate-200 py-10"><div className="section-shell flex flex-col justify-between gap-4 text-xs text-slate-500 sm:flex-row"><div><span className="font-semibold text-slate-700">Bapita Roy</span> · Project Manager · QA & Automation · Technology & Software Delivery</div><div>© {new Date().getFullYear()} Bapita Roy</div></div></footer>
    </main>
  );
}
