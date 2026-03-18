import { HeroSection } from '../components/sections/HeroSection';
import { AboutSection } from '../components/sections/AboutSection';
import { SkillsGrid } from '../components/sections/SkillsGrid';
import { ProjectsSection } from '../components/sections/ProjectsSection';
import { ContactSection } from '../components/sections/ContactSection';

export function Home() {
  return (
    <div className="home-page">
      <HeroSection />
      <AboutSection />
      <SkillsGrid />
      <ProjectsSection />
      <ContactSection />
    </div>
  );
}
