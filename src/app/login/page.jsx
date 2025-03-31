"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        if (!res?.error) window.location.href = "/dashboard";
        else alert("Login failed");
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen min-w-4xl bg-gray-100 gap-5">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded shadow-md w-80"
            >
                <h2 className="text-2xl mb-4">Login</h2>
                <input
                    className="border p-2 w-full mb-2"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    className="border p-2 w-full mb-2"
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    className="bg-blue-500 text-white p-2 w-full"
                    type="submit"
                >
                    Login
                </button>
            </form>
            <Link href="/register">
                <p className="text-blue-700">Nao possui login?</p>
            </Link>
        </div>
    );
}
