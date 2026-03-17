"use client";

import { useState } from "react";
import { Filter, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProjectCard } from "./project-card";
import { MagicPitchModal } from "./magic-pitch-modal";

export function ProjectsFeed({ projects, freelancerProfile }) {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "high-match", label: "High Match (80%+)" },
    { id: "quick", label: "Quick Jobs" },
    { id: "high-budget", label: "High Budget" },
  ];

  const filteredProjects = projects.filter((project) => {
    switch (activeFilter) {
      case "high-match":
        return project.matchScore >= 80;
      case "quick":
        return (
          project.duration.includes("1-2") || project.duration.includes("Less")
        );
      case "high-budget":
        return project.budget.max >= 3000;
      default:
        return true;
    }
  });

  const handleMagicPitch = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Recommended Projects
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Projects matched to your skills and experience
          </p>
        </div>
        <Button variant="outline" className="gap-2">
          <SlidersHorizontal className="size-4" />
          Preferences
        </Button>
      </div>

      <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-2">
        <Filter className="size-4 text-muted-foreground shrink-0" />
        {filters.map((filter) => (
          <Badge
            key={filter.id}
            variant={activeFilter === filter.id ? "default" : "outline"}
            className={`cursor-pointer transition-colors shrink-0 ${
              activeFilter === filter.id
                ? "bg-primary text-primary-foreground"
                : "hover:bg-secondary"
            }`}
            onClick={() => setActiveFilter(filter.id)}
          >
            {filter.label}
          </Badge>
        ))}
      </div>

      <div className="space-y-4">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            userSkills={freelancerProfile.skills}
            onMagicPitch={handleMagicPitch}
          />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No projects match your current filter.
          </p>
          <Button
            variant="link"
            onClick={() => setActiveFilter("all")}
            className="mt-2 text-primary"
          >
            View all projects
          </Button>
        </div>
      )}

      <MagicPitchModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        project={selectedProject}
        freelancerProfile={freelancerProfile}
      />
    </div>
  );
}
