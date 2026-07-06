import Navbar        from "@/components/layout/Navbar";
import Footer        from "@/components/layout/Footer";
import SideLinks     from "@/components/layout/SideLinks";
import AmbientGlow   from "@/components/ui/AmbientGlow";
import Hero          from "@/components/sections/Hero/index";
import About         from "@/components/sections/About";
import Experience    from "@/components/sections/Experience";
import Education     from "@/components/sections/Education";
import Skills        from "@/components/sections/Skills";
import Projects      from "@/components/sections/Projects";
import Certifications from "@/components/sections/Certifications";
import Leadership    from "@/components/sections/Leadership";
import Contact       from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200]
                   focus:px-4 focus:py-2 focus:bg-blue-600 focus:text-white focus:rounded-lg
                   focus:font-semibold focus:text-sm focus:shadow-lg"
      >
        Skip to main content
      </a>
      <AmbientGlow />
      <Navbar />
      <SideLinks />

      <main id="main-content" tabIndex={-1}>
        <Hero />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <About />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Experience />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Skills />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Projects />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Education />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Certifications />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Leadership />

        <div aria-hidden="true" className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <Contact />
      </main>

      <Footer />
    </>
  );
}
