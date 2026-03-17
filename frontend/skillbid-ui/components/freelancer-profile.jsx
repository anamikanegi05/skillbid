"use client"

import { MapPin, Star, Briefcase, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function FreelancerProfile({ profile }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6">
      <div className="flex flex-col items-center text-center">
        <Avatar className="size-20 border-2 border-primary">
          <AvatarImage src="https://avatar.vercel.sh/alex" alt={profile.name} />
          <AvatarFallback className="text-xl">{profile.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <h2 className="mt-4 text-xl font-semibold text-foreground">{profile.name}</h2>
        <p className="text-sm text-muted-foreground">{profile.title}</p>
        <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
          <MapPin className="size-4" />
          {profile.location}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1">
            <Star className="size-4 fill-primary text-primary" />
            <span className="text-sm font-medium text-foreground">{profile.rating}</span>
          </div>
          <div className="flex items-center gap-1">
            <Briefcase className="size-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{profile.completedProjects} projects</span>
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-primary">
          <TrendingUp className="size-4" />
          <span className="text-sm font-medium">${profile.hourlyRate}/hr</span>
        </div>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-medium text-foreground">About</h3>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{profile.bio}</p>
      </div>
      <div className="mt-6">
        <h3 className="text-sm font-medium text-foreground">Skills</h3>
        <div className="mt-3 flex flex-wrap gap-2">
          {profile.skills.map((skill) => (
            <Badge key={skill} variant="secondary" className="text-xs">
              {skill}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  )
}
