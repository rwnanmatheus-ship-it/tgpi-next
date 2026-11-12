export type MediaLanguage = 'en' | 'pt-BR';
export type AccessibleMediaAsset = {
  source: string;
  poster: string;
  language: 'en';
  audioDescription: 'integrated';
  captions: Record<MediaLanguage, string>;
  transcript: readonly { seconds: number; en: string; 'pt-BR': string }[];
};

export const asynchronousHandover: AccessibleMediaAsset = {
  source: '/media/study/async-handover.mp4',
  poster: '/media/study/async-handover.webp',
  language: 'en',
  audioDescription: 'integrated',
  captions: {
    en: '/media/study/async-handover-en.vtt',
    'pt-BR': '/media/study/async-handover-pt.vtt',
  },
  transcript: [
    { seconds: 0, en: 'The first card shows a vague request: “Can you check this soon?”', 'pt-BR': 'O primeiro cartão mostra um pedido vago: “Você pode conferir isto logo?”' },
    { seconds: 4.64, en: 'The second card names the owner, action and deadline: “Lina, check the draft by 16:00 UTC.”', 'pt-BR': 'O segundo cartão identifica responsável, ação e prazo: “Lina, revise o rascunho até as 16h UTC.”' },
    { seconds: 12.08, en: 'The last card adds a next step: “Record the outcome in the project log.” Your team can pick up the work later.', 'pt-BR': 'O último cartão acrescenta o próximo passo: “Registre o resultado no diário do projeto.” A equipe pode retomar o trabalho depois.' },
  ],
};
