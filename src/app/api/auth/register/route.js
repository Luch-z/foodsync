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

        const slug = slugify(establishment, { lower: true });

        // Salvar no banco
        const newEstablishment = await supabase.establishments.create({
            data: {
                email,
                password,
                name: establishment,
                slug,
            },
        });

        return NextResponse.json({ slug }, { status: 201 });
    } catch (error) {
        return NextResponse.json(
            { message: "Erro ao registrar" },
            { status: 500 }
        );
    }
}
