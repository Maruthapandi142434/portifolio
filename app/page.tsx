import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { TechExpertise } from '@/components/TechExpertise';
import { Experience } from '@/components/Experience';
import { Projects } from '@/components/Projects';
import { TechMarquee } from '@/components/TechMarquee';
import { Footer } from '@/components/Footer';
import { CustomCursor } from '@/components/CustomCursor';
import { LenisScroll } from '@/components/LenisScroll';

export default function Home() {
  return (
    <LenisScroll>
      <CustomCursor />
      <main className="w-full overflow-x-hidden bg-black">
        <Hero />
        <TechMarquee />
        <About />
        <TechExpertise />
        <Experience />
        <Projects />
        <Footer />
      </main>
    </LenisScroll>
  );
}
