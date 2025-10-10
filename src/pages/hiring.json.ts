import { openToWork, statement } from "~/consts/hiring"

export function GET() {
  return new Response(
    JSON.stringify({
      $schema: "https://tchojnacki.dev/static/hiring.schema.json",
      openToWork,
      statement,
    }),
    { headers: { "Content-Type": "application/json" } },
  )
}
