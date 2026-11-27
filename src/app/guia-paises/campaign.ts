export const guideCampaign = "guia_paises";
export const enemGuidePath = "/guides/enem-portugal-espanha";
export const worksheetPath = "/guias/ficha-comparar-paises.pdf";
export const exampleComparison = "/compare?country=portugal&country=spain&goal=study";
const channels = ["instagram", "campinas", "whatsapp", "parcerias", "guias"] as const;
export type GuideChannel = (typeof channels)[number] | "direto";

export function guideChannel(value: unknown): GuideChannel {
  return channels.find((channel) => channel === value) ?? "direto";
}

export type GuideSignupState = "idle" | "saved" | "invalid" | "unavailable";
