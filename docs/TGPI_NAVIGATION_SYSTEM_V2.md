# TGPI Navigation System V2

## Product contract

TGPI Navigation V2 is the shared navigation and responsive sizing foundation for the public product, authenticated workspace and capability system.

The experience is intentionally split into two presentation modes over one route registry:

- Compact mode: 320–1023 px, covering phones, foldables and tablets.
- Desktop mode: 1024 px and above, with progressive label reduction between 1024–1220 px.

This removes the former 768–1023 px gap where tablet users received neither the dedicated compact experience nor the complete desktop hierarchy.

## Connected journey

The primary journey remains stable across devices:

1. Countries — explore evidence.
2. Country Fit — connect evidence to personal priorities.
3. Compare — expose trade-offs.
4. Documents — prepare requirements and evidence.
5. Learning — build and verify capability.
6. My TGPI — retain context through the Global Key and workspace.

All additional modules remain available through the shared Super App launcher.

## Architecture

- `src/lib/navigation-system.ts`: typed destinations, route ownership, compact boundary and vector icon mapping.
- `src/components/navigation/NavigationIcon.tsx`: dependency-free SVG icon system.
- `src/components/Navbar.tsx`: desktop navigation and authenticated actions.
- `src/components/mobile/MobileNavigation.tsx`: compact header, global search and persistent journey dock.
- `src/components/super-app/SuperAppLauncher.tsx`: device-independent launcher for every TGPI module.
- `src/app/navigation-system.css`: shared sizing, safe areas, breakpoints, touch targets and navigation surfaces.

## Responsive contract

- Minimum supported viewport: 320 px.
- Fluid global gutter: 16–40 px.
- Global content maximum: 85 rem.
- Minimum interactive target: 44 px.
- Mobile input font floor: 16 px to prevent automatic browser zoom.
- Compact dock respects virtual keyboard and safe-area insets.
- Dialogs use dynamic viewport height and contain their own scrolling.
- Horizontal page overflow is clipped at the application frame while intentional rails remain scrollable.
- Reduced-motion preferences disable navigation transitions and animations.

## Search contract

Compact search combines two real data sources without duplicating the country catalog in the client bundle:

- Super App modules are searched from the shared module registry.
- Country intelligence is requested on demand from `/api/mobile/countries` and validated before use.

No recommendation, eligibility or approval is fabricated by the navigation layer.

## Extension rule

New primary destinations must be registered in `PRIMARY_NAVIGATION`. Compact dock changes must be made in `COMPACT_NAVIGATION`. New Super App modules require a vector icon mapping in `MODULE_ICONS`. Components must not define independent route arrays.
