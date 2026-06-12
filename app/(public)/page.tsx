import { Metadata } from 'next';
import Hero from '@/components/sections/Hero';
import FeaturedCaseStudy from '@/components/sections/FeaturedCaseStudy';
import ProofOfPerformance from '@/components/sections/ProofOfPerformance';
import About from '@/components/sections/About';
import Services from '@/components/sections/Services';
import Projects from '@/components/sections/Projects';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import Contact from '@/components/sections/Contact';
import { createServerSupabaseClient } from '@/lib/supabase-server';
import { normalizeSupabaseImageUrl } from '@/lib/utils';
import type { Project } from '@/types/database';

export const metadata: Metadata = {
  title: 'Anshu — Automation & Web Developer',
  description: 'I build Google Sheets automation, Apps Script workflows, and professional websites for businesses in Gujarat and across India.',
};

export const revalidate = 3600; // revalidate every hour

export default async function HomePage() {
  // Try fetching featured projects from DB; fall back gracefully if not configured
  let featuredProject: Project | null = null;
  let projects: Project[] | null = null;

  try {
    const supabase = createServerSupabaseClient();
    const { data } = await supabase
      .from('projects')
      .select('*')
      .eq('featured', true)
      .order('order_index');

    const featuredProjects = data as Project[] | null;

    if (featuredProjects && featuredProjects.length > 0) {
      featuredProject = {
        ...featuredProjects[0],
        image_url: normalizeSupabaseImageUrl(featuredProjects[0].image_url),
      };
      projects = featuredProjects.map((project) => ({
        ...project,
        image_url: normalizeSupabaseImageUrl(project.image_url),
      }));
    }
  } catch {
    // DB not configured yet — static fallback in component
  }

  return (
    <>
      <Hero />
      <ProofOfPerformance />
      {featuredProject && <FeaturedCaseStudy project={featuredProject} />}
      <About />
      <Services />
      <Projects featuredProjectId={featuredProject?.id} projects={projects ?? undefined} />
      <Process />
      <Testimonials />
      <Contact />
    </>
  );
}
