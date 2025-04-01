import supabase from "@/backend/db/supabase";

// Função para gerar parâmetros estáticos
export async function generateStaticParams() {
    const { data: establishments, error } = await supabase
        .from('establishments')
        .select('slug');

    if (error) {
        console.error("Erro ao buscar estabelecimentos:", error);
        return [];
    }

    return establishments.map((establishment) => ({
        slug: establishment.slug,
    }));
}

// Página do estabelecimento
export default async function EstablishmentPage({ params }) {
    const { slug } = params;

    // Buscar dados do estabelecimento
    const { data: establishment, error } = await supabase
        .from('establishments')
        .select('*') // colunas
        .eq('slug', slug) // Filtro
        .single(); // único registro

    if (error || !establishment) {
        return <h1>Estabelecimento não encontrado</h1>;
    }

    return (
        <div>
            <h1>{establishment.name}</h1>
            <p>Bem-vindo ao {establishment.name}!</p>
        </div>
    );
}
