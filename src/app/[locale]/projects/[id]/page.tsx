import { setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/routing";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import ProjectDetailsClient from "./ProjectDetailsClient";

export function generateStaticParams() {
    return [
        { locale: "hr", id: "0" },
        { locale: "hr", id: "1" },
        { locale: "hr", id: "2" },
        { locale: "hr", id: "3" },
        { locale: "hr", id: "4" },
        { locale: "hr", id: "5" },
        { locale: "en", id: "0" },
        { locale: "en", id: "1" },
        { locale: "en", id: "2" },
        { locale: "en", id: "3" },
        { locale: "en", id: "4" },
        { locale: "en", id: "5" },
        { locale: "de", id: "0" },
        { locale: "de", id: "1" },
        { locale: "de", id: "2" },
        { locale: "de", id: "3" },
        { locale: "de", id: "4" },
        { locale: "de", id: "5" }
    ];
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; id: string }> }) {
    const resolvedParams = await params;
    setRequestLocale(resolvedParams.locale);
    
    // Ensure id is valid
    const projectId = parseInt(resolvedParams.id, 10);

    if (isNaN(projectId) || projectId < 0 || projectId >= 6) {
        return (
            <main style={{ position: "relative", minHeight: "100vh", display: 'flex', flexDirection: 'column' }}>
                <Navigation />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', zIndex: 10, textAlign: 'center', color: 'var(--text)', fontFamily: 'var(--font-space)' }}>
                    <h2>Project not found</h2>
                    <br />
                    <Link href="/#projects" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Return Home</Link>
                </div>
                <Footer />
            </main>
        );
    }

    return <ProjectDetailsClient projectId={projectId} />;
}
