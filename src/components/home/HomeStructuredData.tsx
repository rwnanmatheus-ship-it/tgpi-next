import JsonLd from "@/seo/json-ld";
import { buildHomeSchema } from "@/seo/schemas/home";

export default function HomeStructuredData() {
  return <JsonLd data={buildHomeSchema()} />;
}
