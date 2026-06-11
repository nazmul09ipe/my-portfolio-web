import { Outlet } from "react-router-dom";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { AnimatedBackground } from "@/components/layout/AnimatedBackground";
import { FloatingParticles } from "@/components/layout/FloatingParticles";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/components/layout/ScrollToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { MouseGlow } from "@/components/ui/MouseGlow";

export function MainLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const prefersReducedMotion = useMediaQuery(
    "(prefers-reduced-motion: reduce)",
  );

  return (
    <>
      {!isMobile && !prefersReducedMotion && <CustomCursor />}
      {!isMobile && <MouseGlow />}
      <div className="noise-overlay" aria-hidden="true" />
      <AnimatedBackground />
      {!isMobile && <FloatingParticles />}
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
    </>
  );
}
