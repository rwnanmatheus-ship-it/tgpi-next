import Link from "next/link";
import { getJourneyStage, isImmersiveLearningRoute, PLATFORM_JOURNEY } from "@/lib/platform-journey";

export default function JourneyNavigation({ pathname }: { pathname: string }) {
  const current = getJourneyStage(pathname);
  // Marketing and focused access pages retain their own editorial composition.
  if (!current || pathname === "/onboarding" || isImmersiveLearningRoute(pathname)) return null;
  return (
    <div className="tgpi-journey-context">
      <div className="tgpi-container">
        <div className="tgpi-journey-heading">
          <Link href="/profile">Your global journey</Link>
          <span>{current.description}</span>
        </div>
        <nav aria-label="Global journey" className="tgpi-platform-journey">
          <ol>
            {PLATFORM_JOURNEY.map((stage, index) => (
              <li key={stage.id}>
                <Link href={stage.href} prefetch={false} aria-current={stage.id === current.id ? "location" : undefined}>
                  <span className="tgpi-journey-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span>{stage.label}</span>
                </Link>
              </li>
            ))}
          </ol>
        </nav>
      </div>
    </div>
  );
}
