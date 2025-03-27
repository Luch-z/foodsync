"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";

// Criando esquema de validação
const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [establishment, setEstablishment] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validar os dados antes de enviar
    const validation = schema.safeParse({ email, password });
    if (!validation.success) {
      setError(validation.error.issues[0].message);
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao registrar usuário");
      }

      const data = await res.json();
      console.log("Usuário registrado com sucesso:", data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-4 text-center">Cadastro</h2>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Email</label>
          <Input 
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="Digite seu email"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <Input 
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Digite sua senha"
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Estabelecimento</label>
          <Input 
            type="text"
            value={establishment}
            onChange={(e) => setEstablishment(e.target.value)}
            required
            placeholder="Digite o nome do estabelecimento"
          />
        </div>

        {error && <p className="text-red-500 text-sm text-center">{error}</p>}

        <Button 
          type="submit"
          className="w-full mt-4"
          disabled={loading}
        >
          {loading ? "Registrando..." : "Registrar"}
        </Button>
      </form>
    </div>
  );
}
