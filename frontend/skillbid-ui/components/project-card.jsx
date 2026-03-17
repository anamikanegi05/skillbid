"use client"

import { Clock, DollarSign, Sparkles, Users } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function ProjectCard({ project, userSkills, onMagicPitch }) {
  const matchingSkills = project.skills.filter((skill) =>
    userSkills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
  )

  return (
    <div className="group relative rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-semibold text-foreground truncate">{project.title}</h3>
            <Badge 
              variant="outline" 
              className="shrink-0 border-primary/50 text-primary bg-primary/10"
            >
              {project.matchScore}% Match
            </Badge>
          </div>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {project.description}
          </p>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <DollarSign className="size-4 text-primary" />
          <span>${project.budget.min} - ${project.budget.max}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="size-4" />
          <span>{project.duration}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Users className="size-4" />
          <span>{project.proposals} proposals</span>
        </div>
      </div>

      <div className="mt-4">
        <div className="flex flex-wrap gap-2">
          {project.skills.map((skill) => {
            const isMatching = matchingSkills.includes(skill)
            return (
              <Badge
                key={skill}
                variant={isMatching ? "default" : "secondary"}
                className={isMatching ? "bg-primary/20 text-primary border border-primary/30" : ""}
              >
                {skill}
              </Badge>
            )
          })}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">
          Posted {project.postedAt} by {project.clientName}
        </span>
        <Button
          onClick={() => onMagicPitch(project)}
          className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground"
        >
          <Sparkles className="size-4" />
          Magic Pitch
        </Button>
      </div>
    </div>
  )
}
