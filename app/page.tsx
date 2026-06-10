import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import MarqueeStrip from "@/components/MarqueeStrip";
import HowItWorks from "@/components/HowItWorks";
import AttachDetachDemo from "@/components/AttachDetachDemo";
import Features from "@/components/Features";
import Gallery from "@/components/Gallery";
import Specs from "@/components/Specs";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ClosingCTA from "@/components/ClosingCTA";
import Footer from "@/components/Footer";

/**
 * Single-page landing experience for PEEL — detachable car window tint.
 *
 * Global behaviours (preloader, smooth scroll, custom cursor) wrap the page;
 * each marketing section is its own self-contained component, composed in
 * narrative order. All interactive/animation logic lives in the client
 * components — this page just orchestrates layout.
 */
export default function Home() {
  return (
    <>
      {/* Animated page-load intro (curtain + counter) */}
      <Preloader />

      {/* Bespoke cursor — auto-disables on touch / reduced-motion */}
      <CustomCursor />

      {/* Lenis buttery smooth scrolling for the whole document */}
      <SmoothScroll>
        <Navbar />

        <main id="main">
          <Hero />
          <MarqueeStrip />
          <HowItWorks />
          <AttachDetachDemo />
          <Features />
          <Gallery />
          <Specs />
          <Testimonials />
          <FAQ />
          <ClosingCTA />
        </main>

        <Footer />
      </SmoothScroll>
    </>
  );
}
