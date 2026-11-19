import { openToWork, statement } from "~/consts/hiring"

export function GET() {
  return Response.json({
    $schema: "https://tchojnacki.dev/static/hiring.schema.json",
    openToWork,
    statement,
  })
}
