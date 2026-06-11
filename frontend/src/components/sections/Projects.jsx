import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import { HiExternalLink, HiCode, HiExclamationCircle } from "react-icons/hi";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlassCard } from "@/components/ui/GlassCard";
import { Button } from "@/components/ui/Button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { fetchProjects } from "@/services/projectService";
import { cn } from "@/utils/cn";

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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageErrors, setImageErrors] = useState(new Set());
  const ref = useScrollAnimation({ y: 30, duration: 0.6 });
  const abortRef = useRef(null);

  useEffect(() => {
    let isMounted = true;
    abortRef.current = new AbortController();

    const loadProjects = async () => {
      setError(null);
      try {
        const data = await fetchProjects(true);
        if (isMounted && data?.length) {
          setProjects(data);
        }
      } catch (err) {
        if (isMounted && err.name !== "AbortError") {
          console.error("Projects Fetch Error:", err.message);
          setError(err.message);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadProjects();

    return () => {
      isMounted = false;
      abortRef.current?.abort();
    };
  }, []);

  const handleImageError = (projectId) => {
    setImageErrors((prev) => new Set([...prev, projectId]));
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    abortRef.current = new AbortController();

    fetchProjects(true)
      .then((data) => {
        if (data?.length) setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
        setLoading(false);
      });
  };

  return (
    <section
      id="projects"
      className="section-padding relative overflow-hidden bg-void-950"
    >
      {/* Background cinematic visuals */}
      <div className="absolute top-1/2 left-0 w-full h-full pointer-events-none opacity-20">
        <div className="absolute top-[20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-brand-500/5 blur-[120px]" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading subtitle="Portfolio" title="Featured Projects" />

        {error && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center py-20 text-center"
          >
            <div className="p-4 rounded-full bg-red-500/10 text-red-500 mb-6">
              <HiExclamationCircle className="w-12 h-12" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Service Temporarily Unavailable
            </h3>
            <p className="text-slate-500 max-w-md mb-8">
              {error}. Using cached project data to ensure you still have a
              great experience.
            </p>
            <Button variant="outline" onClick={handleRetry} className="glass">
              Try Again
            </Button>
          </motion.div>
        )}

        {!error && (
          <div
            ref={ref}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {projects.map((project, idx) => {
              const isFeatured = idx === 0;
              return (
                <motion.div
                  key={project._id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5 }}
                >
                  <GlassCard
                    premium
                    className={cn(
                      "flex flex-col h-full group border border-white/[0.03] hover:border-brand-500/30 transition-all duration-500 overflow-hidden",
                      isFeatured ? "lg:col-span-2 md:col-span-2" : "",
                    )}
                  >
                    {/* Image Showcase with error handling */}
                    <div
                      className={cn(
                        "overflow-hidden rounded-2xl mb-6 relative group/img shadow-lg bg-slate-900",
                        isFeatured
                          ? "aspect-video md:aspect-[16/9]"
                          : "aspect-video",
                      )}
                    >
                      {!imageErrors.has(project._id) ? (
                        <>
                          <img
                            loading="lazy"
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={() => handleImageError(project._id)}
                          />
                          {/* Overlay with action buttons */}
                          <div className="absolute inset-0 bg-void-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
                            {project.liveUrl && project.liveUrl !== "#" && (
                              <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href={project.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View live site"
                                className="p-3 rounded-full bg-brand-500 text-white shadow-glow-sm hover:shadow-glow-md transition-shadow"
                              >
                                <HiExternalLink className="w-5 h-5" />
                              </motion.a>
                            )}
                            {project.repoUrl && (
                              <motion.a
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="View repository"
                                className="p-3 rounded-full bg-white/10 text-white backdrop-blur-md border border-white/20 hover:border-white/40 transition-colors"
                              >
                                <HiCode className="w-5 h-5" />
                              </motion.a>
                            )}
                          </div>
                        </>
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-400">
                          <p className="text-sm">Image failed to load</p>
                        </div>
                      )}

                      {/* Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 rounded-lg glass-premium text-[9px] font-black uppercase tracking-widest border border-white/10">
                          {isFeatured ? "Featured" : "Project"}
                        </span>
                      </div>
                    </div>

                    <div className="flex-grow flex flex-col">
                      {/* Technologies */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {(project.technologies || [])
                          .slice(0, isFeatured ? 5 : 3)
                          .map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] uppercase tracking-[0.1em] px-2 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.05] font-semibold text-slate-500 group-hover:text-brand-400 group-hover:border-brand-500/30 transition-all duration-300"
                            >
                              {tech}
                            </span>
                          ))}
                      </div>

                      {/* Title */}
                      <h3
                        className={cn(
                          "font-display font-bold mb-3 tracking-tight group-hover:text-white transition-colors",
                          isFeatured ? "text-2xl md:text-3xl" : "text-lg",
                        )}
                      >
                        {project.title}
                      </h3>

                      {/* Description */}
                      <p
                        className={cn(
                          "text-slate-500 group-hover:text-slate-400 leading-relaxed mb-4 transition-colors",
                          isFeatured ? "text-base" : "text-sm",
                        )}
                      >
                        {project.description}
                      </p>

                      {/* Footer divider */}
                      <div className="mt-auto flex items-center gap-2 pt-4">
                        <div className="h-px w-6 bg-brand-500/50" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-brand-500">
                          View
                        </span>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
