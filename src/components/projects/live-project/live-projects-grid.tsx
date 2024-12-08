"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Calendar,
  Users,
  Building,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { ProjectActions } from "@/components/shared/project-actions-menu";
import { Project } from "../../../../db/schema";
import { keyframes } from "@emotion/react";
import { Tooltip, TooltipContent,  TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { LiveProjectModal } from "./live-project-modal";

interface LiveProjectsGridProps {
  projects: Project[];
  userRole?: string;
}

// Add glowing animation keyframes
const glowingAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

export function LiveProjectsGrid({
  projects,
  userRole,
}: LiveProjectsGridProps) {
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, type: "spring" },
    }));
  }, [controls]);

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setExpandedProject(expandedProject === project.id ? null : project.id);
    setActiveProject(activeProject === project.id ? null : project.id);
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-hidden">
        <AnimatePresence>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              custom={index}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              exit={{ opacity: 0, y: -50 }}
              whileHover={{ scale: 1.02, zIndex: 1 }}
              onClick={() => handleProjectClick(project)}
            >
              <div className="relative">
                {/* Glowing border effect */}
                {activeProject === project.id && (
                  <motion.div
                    className="absolute -inset-0.5 rounded-xl opacity-75"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    style={{
                      background: 'linear-gradient(90deg, #4f46e5, #06b6d4, #3b82f6, #4f46e5)',
                      backgroundSize: '300% 300%',
                      animation: `${glowingAnimation} 3s ease infinite`,
                      filter: 'blur(8px)',
                    }}
                  />
                )}
                <Card 
                  className={`
                    relative h-full transition-all duration-300 overflow-hidden cursor-pointer
                    ${activeProject === project.id ? 
                      'shadow-xl transform scale-[1.02] z-10 bg-gradient-to-br from-blue-100/90 to-purple-100/90 dark:from-blue-800/90 dark:to-purple-800/90 backdrop-blur-sm' : 
                      'hover:shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900 dark:to-purple-900'
                    }
                  `}
                >
                  {/* Spotlight effect */}
                  {activeProject === project.id && (
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{
                        background: 'radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(255,255,255,0.15) 0%, transparent 50%)',
                      }}
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = ((e.clientX - rect.left) / rect.width) * 100;
                        const y = ((e.clientY - rect.top) / rect.height) * 100;
                        e.currentTarget.style.setProperty('--mouse-x', `${x}%`);
                        e.currentTarget.style.setProperty('--mouse-y', `${y}%`);
                      }}
                    />
                  )}

                  {/* Top border line */}
                  <motion.div 
                    className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                    animate={{
                      opacity: activeProject === project.id ? 1 : 0.6,
                      height: activeProject === project.id ? "2px" : "1px",
                    }}
                  />

                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <motion.span
                        className="text-xl font-bold"
                        initial={{ x: -20 }}
                        animate={{ 
                          x: 0,
                          scale: activeProject === project.id ? 1.05 : 1,
                        }}
                        transition={{ type: "spring", stiffness: 100 }}
                      >
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger>
                              <span className="truncate block max-w-[300px]">
                                {project.projectName}
                          </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {project.projectName}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      </motion.span>
                      <div className="flex items-center gap-2">
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            y: activeProject === project.id ? -2 : 0,
                          }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            delay: 0.2,
                          }}
                        >
                          <Badge
                            variant="default"
                            className={`
                              ${activeProject === project.id ? 
                                'bg-green-500 text-white' : 
                                'bg-green-500/10 text-green-500'
                              } 
                              animate-pulse
                            `}
                          >
                            Live
                          </Badge>
                        </motion.div>
                        <ProjectActions project={project} userRole={userRole} />
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <motion.div
                      initial={false}
                      animate={{
                        height: expandedProject === project.id ? "auto" : "100px",
                      }}
                      className="overflow-hidden"
                    >
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Building className="h-4 w-4" />
                          <span>{project.department}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Users className="h-4 w-4" />
                          <span>{project.bidManager}</span>
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Calendar className="h-4 w-4" />
                          <span>
                            {project.bidsDeadline
                              ? new Date(project.bidsDeadline).toLocaleDateString()
                              : "No deadline"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-4">
                          {project.notes}
                        </p>
                      </motion.div>
                    </motion.div>
                    <motion.div
                      initial={false}
                      animate={{ rotate: expandedProject === project.id ? 180 : 0 }}
                      className="flex justify-center mt-2"
                    >
                      {expandedProject === project.id ? (
                        <ChevronUp className="h-6 w-6 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-6 w-6 text-muted-foreground" />
                      )}
                    </motion.div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {projects.length === 0 && (
          <motion.div
            className="col-span-full text-center py-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <p className="text-muted-foreground text-xl">
              No live projects at the moment. Time to create some excitement!
            </p>
          </motion.div>
        )}
      </div>

      <LiveProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
