# Direção visual e prompts — TGPI Home V4

Sete imagens originais geradas nesta sessão pelo recurso integrado `image_gen`, sem banco de imagens e sem alegação de exclusividade jurídica. Maior saída útil entregue pelo recurso: 1536×1024 px, sem ampliação. Os originais gerados permanecem disponíveis como imagens da conversa. Assets finais: `public/images/home/editorial-v4/`.

Otimização: WebP, qualidade 82 desktop / 80 mobile, esforço 6, metadados removidos. Desktop 1536×1024; mobile 720×450, exceto hero 720×900. Hero mobile usa recorte da região central-direita (820×1024, origem x=540,y=0), preservando pessoa, notebook e laptop. Os demais recortes centrais mantêm o objeto principal. A aplicação usa `picture` e `next/image`, `sizes`, proporção reservada e lazy loading abaixo da dobra. Hero usa `loading=eager` e prioridade de busca alta para evitar pré-carregar o recorte errado em mobile.

| Arquivo base | Uso | Desktop bytes | Mobile bytes |
| --- | --- | ---: | ---: |
| hero | Primeira tela | 69.304 | 39.020 |
| decision | Exploração e avaliação de opções | 269.100 | 53.958 |
| learning | Aprendizagem intercultural | 138.732 | 44.188 |
| preparation | Organização pessoal | 132.668 | 32.430 |
| english | Capa Global English | 125.146 | 40.106 |
| country | Capa Country Fit e visual de comparação | 167.750 | 44.686 |
| budget | Capa Relocation Budget | 190.918 | 48.650 |

## Prompts finais

### Hero

Use case: photorealistic-natural. Create a high resolution wide 3:2 editorial photograph commissioned for TGPI website hero, no words logos watermarks or UI anywhere. One adult woman in her early thirties, natural believable face and hands, thoughtfully planning international life at a contemporary apartment desk with a dark blue notebook, neutral study materials, a real laptop seen from behind (screen not visible), ceramic cup. Plausible ordinary urban architecture outside a tall window, no famous landmarks. Quiet uncluttered left third and the woman at center right. Controlled cinematic natural morning window light, deep navy #071827, ivory #F6F3EC, warm muted brass accents #C7A45B, tactile oak, subtle film grain, realistic 50mm lens, premium understated editorial photography, no sci-fi, no holograms, no travel cliches. Composition must support both wide and vertical crops with the person and desk in center-right. No legible writing on materials. Output largest useful resolution.

### Base comum de decision, learning e preparation

High resolution wide 3:2 photorealistic editorial photograph commissioned for TGPI, sophisticated natural cinematic morning window lighting, deep navy #071827, ivory #F6F3EC, muted brass #C7A45B, realistic materials, tactile detail, restrained film grain, plausible objects and perspective. No words, logos, watermarks, UI, readable writing, holograms, sci-fi, passports, visas or official documents. Keep central subject suitable for vertical mobile crops.

A cada prompt foi acrescentada uma das cenas abaixo:

**Decision:** Overhead close editorial scene of a well organized personal planning desk with a folded abstract geographic map with physically plausible continent shapes but no labels, two plain notebooks, three blank paper cards, pencil, dark blue fabric folder. Communicate evaluating destinations and trade-offs. Calm balanced composition, no people.

**Learning:** Three naturally diverse adults in their late twenties learning and communicating around a real wooden table in a contemporary coworking space, a woman explaining a practical idea while two people listen, relaxed natural expressions, realistic anatomy and hands, notebooks with no writing visible. Candid eye-level 50mm photograph, no staged corporate handshakes.

**Preparation:** Editorial close view of an organized personal preparation desk: plain navy document folder, neutral blank checklist paper with empty small checkboxes and no text, unmarked notebook, simple pencil and a small ceramic tray. Beautiful soft window shadows, practical calm organization, overhead three-quarter view, no people.

### Base comum das capas

Use case photorealistic-natural. Create high resolution 3:2 photographic course cover for TGPI website. Same coherent visual series: deep navy blue #071827, warm ivory, muted brass detail, believable cinematic natural window light, tactile wood and fabric, quiet editorial realism, no glow or futuristic objects. No words, logos, watermarks, interfaces, readable text, official documents or passports. Centered composition supports 16:10 crop.

A cada prompt foi acrescentada uma das cenas abaixo:

**English:** Course content: Global English for living, working and belonging abroad. A natural candid moment of two adult neighbors conversing at the entrance of a contemporary shared work cafe in a plausible city, friendly but subtle natural expressions, no exaggerated smiles, half-body framing with hands relaxed, authentic intercultural communication.

**Country:** Course content: evidence-based country choice. Close still life of a navy desk with a small unlabelled realistic world globe, two folded plain maps with no writing, pencil and two neutral notebooks. Communicate deliberate comparison, practical planning, no travel advertising. Side-angle eye-level scene.

**Budget:** Course content: building financial runway for relocation. Beautiful overhead realistic still life of a simple real calculator with blank non-illuminated display, blank unlined notebook, plain navy folder, subtle apartment keys on ceramic tray, pencil. Communicate careful household planning, no money, currencies, fake documents, readable writing or numeric overlays.

## Revisão visual

Foram inspecionados os sete resultados e os recortes aplicados. Não há interfaces rasterizadas, brasões inventados, documentos governamentais ou combinação de monumentos. A tipografia, os dados e as interações são HTML. As cenas são ilustrativas geradas; não representam alunos, funcionários, depoimentos ou fotografias documentais da TGPI.
