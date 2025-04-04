import { NextResponse } from "next/server";
import supabase from "@/backend/db/supabase";
import slugify from "slugify";

export async function POST(req) {
    try {
        const { email, password, establishment } = await req.json();

        if (!email || !password || !establishment) {
            return NextResponse.json(
                { message: "Todos os campos são obrigatórios" },
                { status: 400 }
            );
        }

        const slug = slugify(establishment, { lower: true, strict: true});

        // Verifica se o slug já existe
        const { data: existing, error: findError } = await supabase
            .from("establishments")
            .select("slug")
            .eq("slug", slug)
            .maybeSingle();

        if (existing) {
            return NextResponse.json(
                { message: "Nome já está em uso, tente outro." },
                { status: 400 }
            );
        }

        // Salvar no banco
        const { data, error } = await supabase.from("establishments").insert([
            {
                email,
                password,
                name: establishment,
                slug,
            },
        ]);

        if (error) {
            throw error;
        }

        return NextResponse.json({ slug }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao registrar" },
            { status: 500 }
        );
    }
}
