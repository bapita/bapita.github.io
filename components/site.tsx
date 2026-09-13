"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowRight,
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

      <section id="home" className="hero-wash relative overflow-hidden pt-[74px]">
        <div className="section-shell grid min-h-[760px] items-center gap-6 py-16 lg:grid-cols-[1.03fr_.97fr] lg:py-12">
          <motion.div initial="hidden" animate="visible" variants={stagger} className="relative z-10 pb-10 lg:pb-0">
            <motion.div variants={fadeUp} className="mb-5 text-[11px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">Project Manager · QA & Automation</motion.div>
            <motion.h1 variants={fadeUp} className="font-display max-w-[690px] text-[36px] leading-[.95] sm:text-[48px] lg:text-[60px]">Bridging Technology, Quality <span className="text-[var(--accent)]">& Project Delivery.</span></motion.h1>
            <motion.p variants={fadeUp} className="mt-7 max-w-[650px] text-[18px] leading-8 text-slate-600">A Project Manager with a background in QA and Automation, bringing a technology-first perspective to software delivery.</motion.p>
            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap gap-3">
              <a href="#journey" className="group inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3.5 text-sm font-semibold text-white shadow-xl shadow-blue-900/10 transition hover:-translate-y-0.5">Explore My Journey <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
              <a href="#projects" className="group inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/35 bg-white/60 px-6 py-3.5 text-sm font-semibold text-[var(--accent)] transition hover:-translate-y-0.5">View My Work <ArrowRight size={17} className="transition-transform group-hover:translate-x-1" /></a>
            </motion.div>
            <motion.div variants={fadeUp} className="mt-10 flex flex-wrap gap-x-7 gap-y-2 text-[10px] font-semibold uppercase tracking-[.25em] text-slate-500"><span>Curious</span><span>Organised</span><span>Quality Focused</span><span>People Driven</span></motion.div>
          </motion.div>

          <motion.div style={{ y: heroY }} className="relative mx-auto h-[610px] w-full max-w-[560px] lg:h-[650px]">
            <div className="portrait-ring" />
            <div className="portrait-glow" />
            <div className="absolute inset-x-[9%] bottom-0 top-[2%] overflow-hidden rounded-[46%_54%_0_0/30%_30%_0_0]">
              <Image src="/images/profile.jpg" alt="Professional portrait of Bapita Roy" fill priority className="hero-image" sizes="(max-width: 1024px) 80vw, 520px" />
            </div>

            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: .7, duration: .7 } }} className="glass-card absolute left-[1%] top-[22%] rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-3"><span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]"><CheckCircle2 size={20}/></span><div><div className="text-sm font-semibold">QA & Automation</div><div className="mt-1 text-xs text-slate-500">Quality First</div></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: .95, duration: .7 } }} className="glass-card absolute bottom-[30%] left-0 rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-3"><span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]"><Code2 size={20}/></span><div><div className="text-sm font-semibold">Technology</div><div className="mt-1 text-xs text-slate-500">Understand · Build · Better</div></div></div>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0, transition: { delay: 1.15, duration: .7 } }} className="glass-card absolute right-0 top-[52%] rounded-2xl p-4 shadow-xl">
              <div className="flex items-start gap-3"><span className="rounded-xl bg-blue-100 p-2 text-[var(--accent)]"><Users size={20}/></span><div><div className="text-sm font-semibold">Delivery</div><div className="mt-1 text-xs text-slate-500">People · Process · Progress</div></div></div>
            </motion.div>
            <div className="hand-note absolute right-[3%] top-[18%] max-w-[125px] -rotate-6 text-2xl leading-tight text-slate-500">Better software happens together ♡</div>
            <div className="glass-card absolute bottom-[4%] right-[2%] max-w-[275px] rounded-2xl p-5 text-[15px] leading-6 text-slate-700 shadow-xl">“Bridging <strong>Quality, Technology and Delivery.</strong>”<div className="mt-3 h-1 w-10 rounded-full bg-[var(--accent)]"/></div>
          </motion.div>
        </div>

        <div className="section-shell relative z-20 pb-5">
          <div className="grid overflow-hidden rounded-3xl border border-slate-200/80 bg-white/80 shadow-[0_18px_60px_rgba(33,53,80,.07)] backdrop-blur md:grid-cols-4">
            {/* {[
              [BriefcaseBusiness, "7+", "Years in QA & Automation"],
              [Layers3, "PM", "Project Management & Delivery"],
              [Layers3, "Multiple", "Web & Mobile Products Delivered"],
              [Users, "Cross-functional", "Teams & Client Collaboration"]
            ].map(([Icon, big, small], i) => {
              const I = Icon as typeof BriefcaseBusiness;
              return <div key={String(big)} className={`flex items-center gap-4 p-6 ${i ? "border-t border-slate-200 md:border-l md:border-t-0" : ""}`}><I className="shrink-0 text-[var(--accent)]" size={28}/><div><div className="font-display text-2xl font-bold">{big}</div><div className="mt-1 text-xs text-slate-500">{small}</div></div></div>;
            })} */}
            {(
  [
    [BriefcaseBusiness, "7+", "Years in QA & Automation"],
    [Layers3, "PM", "Project Management & Delivery"],
    [Layers3, "Multiple", "Web & Mobile Products Delivered"],
    [Users, "Cross-functional", "Teams & Client Collaboration"],
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
        size={28}
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
          <div className="mb-14"><div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">Three Perspectives</div><h2 className="font-display mt-4 text-5xl md:text-6xl">Where I work best.</h2></div>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: .2 }} variants={stagger} className="grid gap-4 md:grid-cols-3">
            {[
              ["01", "QUALITY", "What could go wrong?", "QA taught me to think about edge cases, reliability, user experience and product quality."],
              ["02", "TECHNOLOGY", "How should we build it?", "I understand the technical conversations behind the products I manage — APIs, databases, integrations, architecture and cloud."],
              ["03", "DELIVERY", "How do we make it happen?", "Project management brings planning, people, priorities, stakeholders, risks and delivery together."]
            ].map(([num, title, question, copy]) => <motion.article variants={fadeUp} key={num} className="group rounded-3xl border border-slate-200 bg-white p-8 transition duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-slate-300/30"><div className="text-xs font-bold text-[var(--accent)]">{num}</div><h3 className="mt-14 text-sm font-bold tracking-[.28em]">{title}</h3><div className="mt-4 font-display text-3xl">{question}</div><p className="mt-5 leading-7 text-slate-600">{copy}</p></motion.article>)}
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: .97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: .8 }} className="mt-10 rounded-3xl border border-slate-300/70 bg-white/65 p-9 text-center backdrop-blur"><div className="text-xs font-bold uppercase tracking-[.35em] text-slate-500">My approach</div><div className="font-display mt-3 text-4xl md:text-5xl">Quality <span className="text-[var(--accent)]">×</span> Technology <span className="text-[var(--accent)]">×</span> Delivery</div></motion.div>
        </div>
      </section>

      <section id="journey" className="section-shell py-28">
        <div className="grid gap-16 lg:grid-cols-[.7fr_1.3fr]">
          <div><div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">My Journey</div><h2 className="font-display mt-4 text-5xl leading-tight md:text-6xl">From quality to delivery.</h2><p className="mt-6 max-w-md leading-7 text-slate-600">A career that evolved from testing software to leading its delivery.</p></div>
          <div className="relative">
            <div className="absolute left-[10px] top-2 bottom-2 w-px bg-slate-200" />
            {[['QA', "Learning to understand software from the user's perspective."],['Automation','Turning repetitive validation into efficient, reliable automation.'],['QA Leadership','Taking ownership of quality, people and delivery outcomes.'],['Project Management','Expanding the perspective to scope, people, timelines, risks, clients and delivery.'],['Today','Bringing technology, quality, people and business together.']].map(([title,copy],i) => (
              <motion.div key={title} initial="hidden" whileInView="visible" viewport={{ once: true, amount: .35 }} variants={fadeUp} className="relative mb-10 pl-12 last:mb-0"><div className="absolute left-0 top-1 flex h-[21px] w-[21px] items-center justify-center rounded-full border-4 border-[var(--paper)] bg-[var(--accent)]"/><div className="text-xs font-bold uppercase tracking-[.22em] text-[var(--accent)]">0{i+1}</div><h3 className="mt-2 font-display text-3xl">{title}</h3><p className="mt-2 max-w-xl leading-7 text-slate-600">{copy}</p></motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="projects" className="bg-[#15243d] py-28 text-white">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end"><div><div className="text-[10px] font-bold uppercase tracking-[.35em] text-blue-300">Selected Work</div><h2 className="font-display mt-4 text-5xl md:text-6xl">Products, not just projects.</h2></div><p className="max-w-md text-sm leading-6 text-slate-300">Client names and certain implementation details are intentionally omitted to respect confidentiality.</p></div>
          <div className="mt-14 grid gap-4 md:grid-cols-2">
            {projects.map((project, i) => <motion.article key={project.number} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .18 }} transition={{ duration: .55, delay: (i % 2) * .08 }} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[.055] p-7 transition duration-500 hover:-translate-y-1 hover:bg-white/[.09] hover:shadow-2xl hover:shadow-black/20">
              <div className="flex items-start justify-between"><span className="text-xs font-bold tracking-[.25em] text-blue-300">{project.number}</span><ArrowRight className="text-slate-500 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-300" size={19}/></div>
              <div className="mt-9 text-[10px] font-bold uppercase tracking-[.25em] text-slate-400">{project.category}</div>
              <h3 className="font-display mt-3 text-3xl leading-tight">{project.title}</h3>
              <p className="mt-4 max-w-xl leading-7 text-slate-300">{project.summary}</p>
              <div className="mt-6 flex flex-wrap gap-2">{project.areas.map(area => <span key={area} className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] text-slate-300">{area}</span>)}</div>
              <div className="mt-7 border-t border-white/10 pt-5"><div className="text-[9px] font-bold uppercase tracking-[.25em] text-slate-500">My role</div><div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-300">{project.role.map(r => <span key={r}>{r}</span>)}</div></div>
            </motion.article>)}
          </div>
        </div>
      </section>

      <section id="expertise" className="section-shell py-28">
        <div className="mb-14"><div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">Expertise</div><h2 className="font-display mt-4 text-5xl md:text-6xl">What I bring to a project.</h2></div>
        <div className="grid gap-5 lg:grid-cols-3">
          {[
            ['PROJECT MANAGEMENT',['Planning','Requirements','Agile / Scrum','Stakeholders','Risk Management','Release Management']],
            ['QUALITY ENGINEERING',['Manual QA','Test Automation','API Testing','Regression','Integration Testing','Quality Strategy']],
            ['TECHNOLOGY',['Web Applications','REST APIs','Node.js / NestJS','React / Next.js','TypeScript','PostgreSQL / MySQL','AWS','CI/CD']]
          ].map(([title, items]) => <motion.div key={String(title)} whileHover={{ y: -5 }} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm"><h3 className="text-xs font-bold tracking-[.25em] text-[var(--accent)]">{title}</h3><div className="mt-7 flex flex-wrap gap-2">{(items as string[]).map(item => <span key={item} className="rounded-full bg-slate-100 px-3.5 py-2 text-xs font-medium text-slate-700">{item}</span>)}</div></motion.div>)}
        </div>
        <div className="mt-9 border-l-2 border-[var(--accent)] pl-5 text-lg italic leading-8 text-slate-600">I don't need to write every line of code to understand the technology behind the product I'm managing.</div>
      </section>

      <section className="bg-[#edf2f6] py-24 md:py-28">
  <div className="section-shell">

    {/* Section heading */}
    <div className="mb-12 max-w-4xl">
      <div className="text-[10px] font-bold uppercase tracking-[.35em] text-[var(--accent)]">
        How I Work
      </div>

      <h2 className="font-display mt-4 text-5xl leading-[1.05] md:text-6xl">
        From understanding the problem
        <br className="hidden md:block" />
        to delivering the solution.
      </h2>

      <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600">
        A simple approach that keeps the product, people, quality and
        delivery moving in the same direction.
      </p>
    </div>

    {/* Process */}
    <div className="grid overflow-hidden rounded-[2rem] border border-slate-200 bg-white md:grid-cols-2 lg:grid-cols-3">

      {[
        [
          "01",
          "Understand",
          "What problem are we solving?",
          "Start with the business goal, user need and requirements."
        ],
        [
          "02",
          "Plan",
          "What needs to happen?",
          "Break the work into priorities, milestones and ownership."
        ],
        [
          "03",
          "Collaborate",
          "Who needs to be aligned?",
          "Keep clients, stakeholders, designers, developers and QA connected."
        ],
        [
          "04",
          "Validate",
          "Does what we built actually work?",
          "Challenge assumptions, identify risks and protect product quality."
        ],
        [
          "05",
          "Automate",
          "What can we make repeatable?",
          "Use automation where it improves consistency, feedback and efficiency."
        ],
        [
          "06",
          "Deliver",
          "Can we release it confidently?",
          "Drive execution, remove blockers and keep the focus on the outcome."
        ],
      ].map(([number, title, question, copy], index) => (
        <motion.article
          key={number}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{
            duration: 0.55,
            delay: index * 0.05,
          }}
          className={`
            group relative p-7 md:p-8
            transition-all duration-300
            hover:bg-[#f8fafc]
            ${index % 3 !== 2 ? "lg:border-r border-slate-200" : ""}
            ${index < 3 ? "lg:border-b border-slate-200" : ""}
            ${index < 4 ? "md:border-b border-slate-200 lg:border-b-0" : ""}
          `}
        >
          {/* Number */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-[var(--accent)]">
              {number}
            </span>

            <ArrowRight
              size={17}
              className="text-slate-300 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--accent)]"
            />
          </div>

          {/* Content */}
          <div className="mt-14">
            <h3 className="font-display text-3xl text-[var(--ink)]">
              {title}
            </h3>

            <p className="mt-3 text-sm font-semibold leading-6 text-slate-700">
              {question}
            </p>

            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-500">
              {copy}
            </p>
          </div>

          {/* Hover line */}
          <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-[var(--accent)] transition-all duration-500 group-hover:w-full" />
        </motion.article>
      ))}

    </div>

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
