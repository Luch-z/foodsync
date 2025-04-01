"use client";

import { SessionProvider } from "next-auth/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    <SessionProvider>
        <DashboardContent></DashboardContent>
    </SessionProvider>
}

function DashboardContent() {
    const { data: session, status } = useSession();
    const router = useRouter();

    if (status === "loading") {
        return <p>Carregando...</p>;
    }

    if (status === "unauthenticated") {
        router.push("/login");
        return null; // Evita renderizar o dashboard enquanto redireciona
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <h1 className="text-2xl font-bold">
                Bem-vindo ao Dashboard, {session.user?.name}
            </h1>
        </div>
    );
}
