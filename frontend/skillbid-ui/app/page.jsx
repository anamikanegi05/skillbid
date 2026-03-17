"use client";

import { useEffect, useState } from "react";

import { DashboardHeader } from "@/components/dashboard-header";
import { FreelancerProfile } from "@/components/freelancer-profile";
import { ProjectsFeed } from "@/components/projects-feed";
import { StatsCards } from "@/components/stats-cards";

const freelancerProfile = {
  name: "Alex Chen",
  title: "Full Stack Developer",
  location: "San Francisco, CA",
  rating: 4.9,
  completedProjects: 47,
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "PostgreSQL",
    "Tailwind CSS",
    "Python",
    "AWS",
  ],
  hourlyRate: 85,
  bio: "Passionate full-stack developer with 5+ years of experience building scalable web applications. I specialize in React/Next.js ecosystems and love turning complex problems into elegant solutions.",
};

export default function Dashboard() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // backend API url
  const API_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://skillbid-backend.onrender.com";

  useEffect(() => {
    async function loadProjects() {
      try {
        const res = await fetch(`${API_URL}/api/projects`);
        const data = await res.json();

        const formatted = await Promise.all(
          data.map(async (p) => {
            try {
              const recRes = await fetch(
                `${API_URL}/api/recommend-freelancers/${p.id}`,
              );

              const freelancers = await recRes.json();

              const matchScore =
                freelancers.length > 0 ? freelancers[0].match_score : 0;

              return {
                id: p.id,
                title: p.title,
                description: p.description,
                budget: {
                  min: p.budget_min,
                  max: p.budget_max,
                },
                duration: "2-4 weeks",
                skills: p.required_skills
                  ? p.required_skills.split(",").map((s) => s.trim())
                  : [],
                matchScore,
                postedAt: "Recently",
                proposals: 0,
                clientName: "Client",
              };
            } catch (error) {
              console.error("Recommendation API error:", error);

              return {
                id: p.id,
                title: p.title,
                description: p.description,
                budget: {
                  min: p.budget_min,
                  max: p.budget_max,
                },
                duration: "2-4 weeks",
                skills: [],
                matchScore: 0,
                postedAt: "Recently",
                proposals: 0,
                clientName: "Client",
              };
            }
          }),
        );

        setProjects(formatted);
        setLoading(false);
      } catch (error) {
        console.error("Projects API error:", error);
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-gray-400 text-lg">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto px-4 py-8 max-w-7xl">
        <StatsCards />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <aside className="lg:col-span-3 order-2 lg:order-1">
            <div className="sticky top-24">
              <FreelancerProfile profile={freelancerProfile} />
            </div>
          </aside>

          <div className="lg:col-span-9 order-1 lg:order-2">
            <ProjectsFeed
              projects={projects}
              freelancerProfile={freelancerProfile}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
