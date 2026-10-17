# TGPI learning series — October 2026

Ten short courses, each with three original applied lessons, formative checkpoints and self-reviewed outputs. No professional certificate is issued for these courses.

## Cover production

Generated with the built-in image generation tool. Originals: 1536 × 1024 px. Production assets: WebP quality 88, retaining native dimensions; served responsively with next/image. HTML supplies accessible titles, series names and chapter labels.

Shared prompt: Use case: ads-marketing. Exclusive landscape photographic TGPI practical-education cover. High-resolution cinematic editorial photography; natural anatomy and tactile materials; wide 3:2 composition safe for central 16:10 crop. Institutional navy #0B1F3A, restrained academic gold #B58A2A and cream highlights. No titles, lettering, logos, watermarks or UI mockups.

### arrival-playbook

Series: First 30 Days

Asset: `public/images/courses/arrival-playbook.webp`

Scene prompt: A lone traveller with a simple navy suitcase seen from behind at a grand modern international train terminal at blue hour, golden departure lights, expansive architectural perspective. A hopeful opening scene of a prestige travel documentary.

### housing-abroad

Series: First 30 Days

Asset: `public/images/courses/housing-abroad.webp`

Scene prompt: A woman viewing a bright real European apartment with an agent, keys on a walnut table in the foreground, city rooftops beyond large windows, cinematic natural golden light, authentic candid documentary photography.

### cross-cultural-confidence

Series: First 30 Days

Asset: `public/images/courses/cross-cultural-confidence.webp`

Scene prompt: A diverse small group of international neighbours sharing a meal at a refined communal table beside a window at dusk, warm faces, understated modern apartment, cinematic storytelling about belonging and listening.

### digital-safety-abroad

Series: First 30 Days

Asset: `public/images/courses/digital-safety-abroad.webp`

Scene prompt: Close shot of a traveller carefully checking their phone beside a closed passport and navy backpack in a realistic airport lounge, reflections of the terminal in glass, thoughtful mood, cinematic thriller-style navy shadows and warm amber lighting, no hacker clichés.

### career-networking

Series: Career Without Borders

Asset: `public/images/courses/career-networking.webp`

Scene prompt: Two international professionals making an authentic introduction at a modern rooftop professional event at blue hour, city skyline softly blurred, candid confident body language, realistic faces, premium documentary cinematography.

### remote-work-systems

Series: Career Without Borders

Asset: `public/images/courses/remote-work-systems.webp`

Scene prompt: A focused professional at an elegant minimal desk in a sunlit contemporary home workspace, laptop with unreadable abstract screen, clock and paper planning notebook, distant urban skyline, cinematic sense of calm concentration, navy and gold details.

### evidence-literacy

Series: The Intelligence Toolkit

Asset: `public/images/courses/evidence-literacy.webp`

Scene prompt: A thoughtful researcher comparing printed reports at an oak desk in a majestic modern library, pools of warm reading light against deep navy shadows, subtle glass magnifier in foreground, premium investigative documentary still.

### ai-workflow-foundations

Series: The Intelligence Toolkit

Asset: `public/images/courses/ai-workflow-foundations.webp`

Scene prompt: A human creative professional reviewing a complex abstract digital workflow on a wide monitor in a sophisticated real studio, notebook and physical work samples nearby, soft navy light and warm gold practical lighting, cinematic realistic photography, no robot.

### cost-of-living-lab

Series: The Global Money Series

Asset: `public/images/courses/cost-of-living-lab.webp`

Scene prompt: A realistic still life of a small grocery bag, apartment keys, transit card without text and a budget notebook on a city apartment kitchen counter, panoramic international neighbourhood outside, cinematic side lighting, rich tactile realism.

### study-abroad-planning

Series: First 30 Days

Asset: `public/images/courses/study-abroad-planning.webp`

Scene prompt: An international student walking towards a contemporary university library on a beautiful campus at dawn, backpack and notebook, expansive cinematic architectural framing, refined academic atmosphere, navy shadows and warm golden sunlight.

## Progress compatibility

Course progress now supports a bounded 64-course record. Persistence uses compact seven-field tuples in the order version, lesson count, start time, update time, last lesson, completion time, completed lesson IDs. Reads accept both previous object records and compact tuples. API responses retain the named-field format. The existing 6000-byte application storage guard remains active.

Regression coverage completes all 14 courses through the actual server mutation parser/reducer and performs a storage round-trip after every lesson. No existing account is reset or bulk rewritten.
