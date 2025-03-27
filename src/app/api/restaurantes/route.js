export async function GET() {
    return Response.json([
        {id:1, nome: "Pizzaria 1"},
        {id:2, nome: "Pizzaria 2"}
    ])
}