import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { HiExternalLink, HiCode } from "react-icons/hi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchProjects } from "@/services/projectService";

const fallbackProjects = [
  {
    _id: "1",
    title: "A Human Resource Management App",
    description:
      "A fully responsive and secure HR management platform built with React and Vite. It enables employee management, workflow tracking, and user administration with Firebase authentication and REST API integration.",
    technologies: [
      "React",
      "Firebase",
      "Framer Motion",
      "Stripe gateway",
      "Node.js",
      "MongoDB",
      "Tailwind CSS",
    ],
    image: "https://i.ibb.co.com/pBPcdcjn/Screenshot-2026-06-02-155005.png",
    liveUrl: "https://staff-sphere-hr-management-app.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/staff-sphere-hr-management-app",
    featured: true,
  },
  {
    _id: "2",
    title: "Smart Plant Care Management System",
    description:
      "PlantaCare is a modern Smart Plant Care Management System that helps users track plants, manage care schedules, monitor plant health, and connect with plant experts through an intuitive and responsive interface.",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Firebase",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: "https://i.ibb.co.com/vC93gQRq/Screenshot-2026-06-02-155053.png",
    liveUrl: "https://plant-tracker-web-app-c73a3.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/plantacare-app-client-side",
    featured: true,
  },
  {
    _id: "3",
    title: "HappenHub – Event Explorer & Ticket Management System",
    description:
      "HappenHub is a modern Event Discovery and Ticket Management System that allows users to explore upcoming local and virtual events, view event details and schedules, and securely book tickets through a seamless digital experience.",
    technologies: [
      "React",
      "React Router",
      "Tailwind CSS",
      "Firebase",
      "Framer Motion",
      "Node.js",
      "Express",
      "MongoDB",
    ],
    image: "https://i.ibb.co.com/5Wbdw9Mc/Screenshot-2026-06-02-155115.png",
    liveUrl: "https://event-explorer-36aac.web.app/",
    repoUrl: "https://github.com/nazmul09ipe/Assignment-9-event-explorer",
    featured: true,
  },
];

export function Projects() {
  const [projects, setProjects] = useState(fallbackProjects);
  const [loading, setLoading] = useState(true);
  const ref = useScrollAnimation({ children: true, stagger: 0.12 });

  useEffect(() => {
    fetchProjects(true)
      .then((data) => {
        if (data?.length) setProjects(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="projects" className="section-padding section-alt">
      <div className="container-custom">
        <SectionHeading subtitle="Portfolio" title="Featured Projects" />

        {loading && (
          <p className="text-center text-slate-500 mb-8">Loading projects...</p>
        )}

        <div
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {projects.map((project, i) => (
            <GlassCard
              key={project._id || i}
              className="flex flex-col h-full group"
            >
              <div className="aspect-video overflow-hidden rounded-xl border border-white/[0.06] mb-6">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <h3 className="font-display text-xl font-bold mb-3 tracking-tight group-hover:gradient-text transition-all duration-300">
                {project.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed flex-grow mb-5">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {(project.technologies || []).slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-lg bg-slate-200/60 dark:bg-navy-700/60 border border-slate-200/50 dark:border-white/[0.06] font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex gap-4 mt-auto">
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-accent-cyan-400 hover:underline transition-colors duration-300"
                  >
                    <HiExternalLink /> Live
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-accent-cyan-400 transition-colors duration-300"
                  >
                    <HiCode /> Code
                  </a>
                )}
              </div>
            </GlassCard>
          ))}
        </div>
      </div>
    </section>
  );
}
