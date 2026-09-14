# TGPI Spatial Surface System V1

## Purpose

The spatial surface system gives TGPI one reusable language for premium grids,
cards, command centers and evidence panels. It expresses depth through light,
material and hierarchy while preserving the product's editorial clarity and
performance budgets.

This is interface depth, not decorative 3D. CSS gradients, borders and shadows
remain resolution-independent and avoid a WebGL or large-raster dependency.

## Brand material

- `paper`: warm editorial surface for research, learning and evidence.
- `white`: high-clarity surface for operational controls and summaries.
- `navy`: strategic command surface for identity, premium and decision work.
- `gold`: authority surface for gates, trust and credential milestones.
- `glass`: restrained translucent layer used only over navy environments.

Core brand tokens remain in `src/app/globals.css`; spatial depth, materials and
motion live in the independently versioned `src/app/spatial-surfaces.css`.
Product components must not create a new shadow, highlight or depth scale when
the system already supplies one.

## Depth scale

- `subtle`: controls, metric tiles and nested cards.
- `raised`: standard content and navigation cards.
- `floating`: featured cards and decision modules.
- `hero`: one dominant surface per page or workspace.

Depth communicates product priority. It must never imply that unsupported data
is more authoritative.

## Components

- `Surface3D`: semantic surface with tone, depth and optional interaction.
- `Grid3D`: perspective-aware grid with compact, comfortable or generous gap.
- `EditorialCard`: automatically inherits the raised spatial material.
- `TGPICard` and `PremiumCard`: legacy-compatible wrappers on the same system.

## Interaction and accessibility gates

- Interactive lift is enabled only for precise pointing devices.
- Focus-within receives the same hierarchy as hover.
- `prefers-reduced-motion` removes transforms and animated transitions.
- Touch layouts stay stable and retain 44px minimum interactive targets.
- Content order, labels, contrast and keyboard behavior remain semantic.

## Performance gates

- No WebGL runtime or pointer-tracking JavaScript for standard cards.
- No additional raster asset is required for the material system.
- Existing responsive `next/image` assets remain the source of photographic
  detail; cards provide vector light and depth at every pixel density.
- LCP, INP and CLS remain release gates before production publication.

## Adoption map

V1 covers the shared design-system primitives and the highest-value surfaces:
Home, Country Intelligence, TGPI Learning, Credential Intelligence, Workspace
Intelligence and the Premium command center. New product surfaces should use
these primitives instead of creating isolated visual treatments.
