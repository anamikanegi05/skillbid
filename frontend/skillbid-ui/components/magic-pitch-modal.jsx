"use client"

import { useState, useEffect } from "react"
import { Copy, Check, Sparkles, RefreshCw, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

function generatePitch(project, profile) {
  const matchingSkills = project.skills.filter((skill) =>
    profile.skills.some((userSkill) => userSkill.toLowerCase() === skill.toLowerCase())
  )

  const pitchTemplates = [
    `Hi there,

I'm excited to apply for your "${project.title}" project. With ${profile.completedProjects}+ successfully completed projects and expertise in ${matchingSkills.slice(0, 3).join(", ")}, I'm confident I can deliver exceptional results.

${profile.bio}

What makes me the right fit:
• Direct experience with ${matchingSkills[0] || project.skills[0]} development
• Proven track record of on-time delivery
• Clear communication throughout the project lifecycle

I'd love to discuss your requirements in detail. I can start immediately and am flexible with the timeline to ensure your project's success.

Looking forward to working with you!

Best regards,
${profile.name}`,

    `Hello,

Your project "${project.title}" caught my attention because it aligns perfectly with my expertise in ${matchingSkills.slice(0, 2).join(" and ")}.

As a ${profile.title}, I've completed ${profile.completedProjects}+ projects with excellent client satisfaction. Here's what I bring to the table:

✓ ${matchingSkills.length} of ${project.skills.length} required skills already in my toolkit
✓ Competitive rate of $${profile.hourlyRate}/hr for quality work
✓ Commitment to clear milestones and regular updates

I understand you're looking for someone who can ${project.description.slice(0, 100).toLowerCase()}... and that's exactly what I specialize in.

Let's schedule a quick call to discuss how I can bring your vision to life.

Best,
${profile.name}`,

    `Dear Client,

I'm ${profile.name}, a ${profile.title} with a passion for ${matchingSkills[0] || project.skills[0]}. Your project "${project.title}" is exactly the kind of work I excel at.

Why choose me?
→ ${profile.completedProjects}+ successful projects
→ Expertise in ${matchingSkills.join(", ")}
→ Transparent communication & timely delivery

Budget consideration: Your range of $${project.budget.min}-$${project.budget.max} works perfectly. I focus on delivering value, not just completing tasks.

I've read through your requirements carefully and have some ideas that could elevate the final result. Would love to share them with you!

Ready to get started,
${profile.name}`
  ]

  return pitchTemplates[Math.floor(Math.random() * pitchTemplates.length)]
}

export function MagicPitchModal({
  isOpen,
  onClose,
  project,
  freelancerProfile,
}) {
  const [pitch, setPitch] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (isOpen && project) {
      generateNewPitch()
    }
  }, [isOpen, project])

  const generateNewPitch = async () => {
    if (!project) return
    setIsGenerating(true)
    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setPitch(generatePitch(project, freelancerProfile))
    setIsGenerating(false)
  }

  const handleCopy = async () => {
    await navigator.clipboard.writeText(pitch)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!project) return null

  const matchingSkills = project.skills.filter((skill) =>
    freelancerProfile.skills.some(
      (userSkill) => userSkill.toLowerCase() === skill.toLowerCase()
    )
  )

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10">
              <Sparkles className="size-5 text-primary" />
            </div>
            <div>
              <DialogTitle className="text-xl">Magic Pitch Generator</DialogTitle>
              <DialogDescription>
                AI-generated proposal tailored for this project
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* Project Summary */}
          <div className="rounded-lg border border-border bg-secondary/30 p-4">
            <h4 className="font-medium text-foreground">{project.title}</h4>
            <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
              {project.description}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.skills.map((skill) => {
                const isMatching = matchingSkills.includes(skill)
                return (
                  <Badge
                    key={skill}
                    variant={isMatching ? "default" : "secondary"}
                    className={
                      isMatching
                        ? "bg-primary/20 text-primary border border-primary/30"
                        : ""
                    }
                  >
                    {isMatching && <Check className="mr-1 size-3" />}
                    {skill}
                  </Badge>
                )
              })}
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              <span className="text-primary font-medium">
                {matchingSkills.length} of {project.skills.length}
              </span>{" "}
              skills match your profile
            </p>
          </div>

          {/* Generated Pitch */}
          <div className="relative">
            <div className="rounded-lg border border-border bg-card p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium text-foreground">
                  Your Personalized Pitch
                </h4>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={generateNewPitch}
                    disabled={isGenerating}
                    className="gap-1.5"
                  >
                    <RefreshCw
                      className={`size-3.5 ${isGenerating ? "animate-spin" : ""}`}
                    />
                    Regenerate
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleCopy}
                    disabled={isGenerating}
                    className="gap-1.5"
                  >
                    {copied ? (
                      <>
                        <Check className="size-3.5" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="size-3.5" />
                        Copy
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {isGenerating ? (
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="relative">
                    <div className="size-12 rounded-full border-2 border-primary/30" />
                    <div className="absolute inset-0 size-12 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground">
                    Crafting your perfect pitch...
                  </p>
                </div>
              ) : (
                <div className="rounded-md bg-secondary/50 p-4">
                  <pre className="whitespace-pre-wrap font-sans text-sm text-foreground leading-relaxed">
                    {pitch}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Tips Section */}
          <div className="rounded-lg border border-border bg-primary/5 p-4">
            <h4 className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sparkles className="size-4 text-primary" />
              Pro Tips for Beginners
            </h4>
            <ul className="mt-2 space-y-1.5 text-sm text-muted-foreground">
              <li>• Personalize the pitch further with specific examples from your portfolio</li>
              <li>• Mention any relevant certifications or courses you have completed</li>
              <li>• Ask a clarifying question to show genuine interest</li>
              <li>• Keep your final pitch concise - clients prefer reading shorter proposals</li>
            </ul>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="gap-2" onClick={handleCopy}>
            <Send className="size-4" />
            Copy & Submit Proposal
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
