import { writeFileSync, mkdirSync } from 'node:fs';
const languages = [
['en','English','Boston'],['es','Spanish','Madrid'],['fr','French','Montréal'],['de','German','Hamburg'],['ja','Japanese','Kyoto'],['ko','Korean','Seoul'],['zh','Mandarin Chinese','Taipei'],['it','Italian','Bologna'],['pt','Brazilian Portuguese','São Paulo'],['ar','Modern Standard Arabic','Amman'],['hi','Hindi','Jaipur'],['sw','Swahili','Dar es Salaam'],['id','Indonesian','Yogyakarta'],['tr','Turkish','Istanbul'],['ru','Russian','Almaty'],['nl','Dutch','Utrecht'],['sv','Swedish','Stockholm'],['pl','Polish','Kraków'],['vi','Vietnamese','Hanoi'],['th','Thai','Chiang Mai'],
];
const topics = [
['primeiras-conversas','introductions and first conversations','two adult learners meeting at a contemporary university welcome lounge, open notebook on the table'],
['agenda-e-compromissos','schedules and appointments','an adult student and a coordinator confirming an appointment at an airy academic reception, calendar in soft background'],
['cidade-e-transporte','city navigation and transport','an adult visitor asking a station worker for directions beside a modern tram platform, candid documentary perspective'],
['alimentacao-e-compras','food and everyday shopping','an adult customer discussing a food order with a market vendor, fresh local ingredients in the foreground'],
['moradia-e-servicos','housing and everyday services','an adult tenant and property coordinator discussing a room inspection beside a bright apartment window'],
['trabalho-e-equipe','work and team communication','three diverse adult professionals reviewing a small project together in a real contemporary design studio'],
['estudo-e-universidade','study and university communication','an adult international student asking a librarian about a research resource in an elegant working university library'],
['saude-e-ajuda','asking for help and healthcare communication','an adult visitor speaking with a healthcare receptionist in a calm welcoming clinic lobby, no medical procedures'],
['atendimento-e-viagens','hospitality and travel service communication','a hotel concierge assisting an adult international guest, refined locally inspired hotel lobby, candid interaction'],
['comunicacao-digital','digital messages and remote communication','an adult professional composing a thoughtful message during a remote collaboration session at a desk with realistic laptop'],
];
const lights=['soft morning window light','late-afternoon golden light','overcast diffuse daylight','subtle blue-hour practical lighting','warm side light with gentle shadows'];
const shots=['environmental wide shot, 35mm lens','candid medium shot, 50mm lens','over-the-shoulder composition, 50mm lens','off-center documentary framing, 35mm lens'];
const jobs=languages.flatMap(([code,name,city],li)=>topics.map(([topic,subject,scene],ti)=>({id:`idiomas-${code}-${topic}`,code,language:name,topic,city,prompt:`Use case: photorealistic-natural. Asset type: a distinct high-resolution landscape 16:9 cover for a premium TGPI language course. Course: ${name} — ${subject}. Scene: ${scene}, in ${city}, with authentic local contemporary architecture and everyday materials. ${shots[(li+ti)%shots.length]}. ${lights[(li*3+ti)%lights.length]}. Cinematic editorial photography commissioned for an international education institute; natural skin texture, believable posture and anatomically correct hands, restrained color grading, fine surface details, realistic perspective and lighting. Make this a unique composition specific to this course and city, not a generic tourism postcard or repeated classroom portrait. No visible lettering, no captions, no flags, no logos, no watermark, no plastic skin, no invented university branding, no overprocessed HDR. This is an illustrative fictional scene, not evidence of a real TGPI campus.`})));
mkdirSync('docs/languages-2026',{recursive:true});
writeFileSync('docs/languages-2026/artwork-jobs.json',JSON.stringify(jobs,null,2)+'\n');
writeFileSync('docs/languages-2026/language-index.json',JSON.stringify({languages,topics},null,2)+'\n');
console.log(`${jobs.length} distinct cover briefs prepared`);
