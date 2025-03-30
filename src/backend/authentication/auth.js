import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import supabase from "../db/supabase";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const { email, password } = credentials;

                // Verificando se o usuário existe no Supabase
                const { data: users, error } = await supabase
                    .from("users")
                    .select("*")
                    .eq("email", email)
                    .single();

                if (error || !users) {
                    throw new Error("Usuário não encontrado");
                }

                // Verificando a senha com bcrypt
                const isPasswordValid = await bcrypt.compare(
                    password,
                    users.password
                );

                if (!isPasswordValid) {
                    throw new Error("Senha incorreta");
                }

                return { id: users.id, email: users.email };
            },
        }),
    ],
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        async session({ session, token }) {
            session.user.id = token.id;
            return session;
        },
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
    },
};

export default NextAuth(authOptions);