import { notFound } from "next/navigation";
import ServiceDetailsClient from "./ServiceDetailsClient";

export async function generateStaticParams() {
    // We have 6 services in our items array
    return Array.from({ length: 6 }).map((_, i) => ({
        id: i.toString(),
    }));
}

export default async function ServiceDetailsPage({
    params,
}: {
    params: Promise<{ id: string; locale: string }>;
}) {
    const { id } = await params;
    const serviceId = parseInt(id, 10);

    // Validate ID
    if (isNaN(serviceId) || serviceId < 0 || serviceId > 5) {
        notFound();
    }

    return <ServiceDetailsClient serviceId={serviceId} />;
}
