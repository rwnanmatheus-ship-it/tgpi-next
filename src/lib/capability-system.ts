export type CapabilityAreaId =
  | "learning"
  | "documents"
  | "credentials"
  | "global-key";

export type CapabilityArea = {
  action: string;
  description: string;
  href: string;
  id: CapabilityAreaId;
  label: string;
  number: string;
  phase: string;
};

export const TGPI_CAPABILITY_AREAS: readonly CapabilityArea[] = [
  {
    action: "Build capability",
    description: "Practice skills through applied lessons and performance gates.",
    href: "/courses",
    id: "learning",
    label: "Learning",
    number: "01",
    phase: "Learn",
  },
  {
    action: "Prepare evidence",
    description: "Organize country-aware research without storing sensitive files.",
    href: "/passport",
    id: "documents",
    label: "Documents OS",
    number: "02",
    phase: "Prepare",
  },
  {
    action: "Prove mastery",
    description: "Turn assessed performance into a live, verifiable record.",
    href: "/certificates",
    id: "credentials",
    label: "Certificates",
    number: "03",
    phase: "Prove",
  },
  {
    action: "Anchor identity",
    description: "Bind progress to a private identity and integrity chain.",
    href: "/global-key",
    id: "global-key",
    label: "Global Key",
    number: "04",
    phase: "Anchor",
  },
] as const;

export function getCapabilityArea(id: CapabilityAreaId) {
  return TGPI_CAPABILITY_AREAS.find((area) => area.id === id)!;
}

export function getNextCapabilityArea(id: CapabilityAreaId) {
  const currentIndex = TGPI_CAPABILITY_AREAS.findIndex((area) => area.id === id);
  return TGPI_CAPABILITY_AREAS[
    (currentIndex + 1) % TGPI_CAPABILITY_AREAS.length
  ];
}
