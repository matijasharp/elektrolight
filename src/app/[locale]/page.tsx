import Navigation from "@/components/Navigation";
import EnergyPath from "@/components/EnergyPath";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Services from "@/components/Services";
import Process from "@/components/Process";
import Projects from "@/components/Projects";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main style={{ position: "relative", minHeight: "100vh" }}>
            <Navigation />
            <EnergyPath />

            <div style={{ position: "relative", zIndex: 10 }}>
                <Hero />
                <TrustStrip />
                <Services />
                <Process />
                <Projects />
                <Testimonials />
                <FAQ />
                <Contact />
            </div>

            <Footer />
        </main>
    );
}
