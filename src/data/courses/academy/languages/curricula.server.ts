import 'server-only';
import { languageProfiles } from './profiles';
import { languageTopics } from './topics';
import { languageWorkload } from './catalog';
import { languageVocabulary, vocabularyMeanings } from './vocabulary';
import type { AcademyCourse, AcademyLesson, AcademyPrivateQuestion, AcademySection } from '@/lib/learning/academy/types';

const methods = [
  ['Reconhecer intenção, escrita e primeiro contato', 'Identificar o que duas expressões fazem antes de tentar memorizá-las.',
    'Leia primeiro a situação, sem consultar as traduções. Separe intenção comunicativa de forma literal. Uma solicitação não é uma confirmação; uma pergunta não é uma afirmação. Nas duas expressões abaixo, identifique o que a pessoa já sabe e qual informação tenta obter. Depois revele o sentido, marque a diferença e reconstrua a relação situação → intenção → expressão.',
    'Escreva dois cartões com a situação de um lado e a expressão do outro. Feche o material e recupere cada expressão três vezes, alternando a ordem. Confira todos os sinais gráficos. Se errar, registre a forma correta e explique qual função havia confundido.'],
  ['Perguntas, necessidades e estrutura da frase', 'Relacionar duas novas expressões ao contexto e observar sua construção.',
    'Uma frase pronta é um ponto de partida, não uma regra universal. Compare as duas novas expressões com as da aula anterior: o verbo muda, aparece uma partícula, ou a ordem se altera? Use o guia gramatical desta língua para identificar uma propriedade que está realmente visível no exemplo. Não substitua substantivos ou terminações sem verificar concordância, caso, classificador ou registro.',
    'Crie quatro gatilhos em português: dois em que a primeira expressão resolve a necessidade e dois em que a segunda resolve. Para cada gatilho, escreva a resposta no idioma estudado, depois confira sem corrigir silenciosamente o erro. Registre tentativa, correção e motivo.'],
  ['Precisão de sentido e conclusão da interação', 'Usar as duas expressões finais sem confundir pedido, resposta e resultado.',
    'Observe o que cada expressão afirma e o que deixa em aberto. A tradução é funcional, não uma equivalência palavra por palavra. Um verbo de possibilidade não cria obrigação; agradecimento não prova que um serviço foi executado. Relacione cada expressão a uma necessidade concreta e identifique uma interpretação excessiva que os termos não sustentam.',
    'Produza seis cartões de intenção, um para cada expressão específica do curso. Embaralhe-os. Escolha a expressão antes de consultar o modelo e acrescente uma nota em português sobre seu limite. Faça uma segunda rodada sem as traduções.'],
  ['Leitura comparativa e interpretação contextual', 'Ler mensagens curtas e recuperar intenção sem depender da ordem do material.',
    'Leia as expressões como mensagens recebidas. Não tente adivinhar uma informação que não está presente. Registre, para cada mensagem: quem poderia dizê-la, qual é a intenção, qual resposta seria necessária e qual fato permanece desconhecido. Releia apenas o trecho que sustenta sua interpretação. O objetivo é discriminar sentido, não reconhecer a posição de uma alternativa.',
    'Escreva seis situações novas em português e associe uma expressão a cada uma. Troque duas situações de lugar, espere cinco minutos e refaça a associação sem ver as respostas. Explique um erro de interpretação plausível para cada par de expressões.'],
  ['Escrita funcional e revisão de mensagens', 'Produzir uma mensagem curta adequada a destinatário e finalidade.',
    'Planeje antes de escrever: destinatário, relação, necessidade e resultado esperado. Selecione as expressões estudadas que realmente servem à intenção. Copie inicialmente com precisão; depois escreva de memória e compare sinal por sinal. Uma mensagem curta correta é mais útil que uma mensagem longa com vocabulário inventado. Não simule uma resposta do interlocutor como se tivesse sido recebida.',
    'Escreva duas versões: uma para primeiro contato e outra para continuidade. Use de duas a quatro expressões do curso e explique o que mudou. Se o texto precisar de ligação que ainda não conhece, marque a lacuna em português. Revise escrita, tratamento e alcance do pedido em três passagens separadas.'],
  ['Escuta, ritmo e reparo de comunicação', 'Treinar percepção e preparar um pedido de repetição ou fala mais lenta.',
    'Se houver voz compatível no dispositivo, escute uma expressão sem olhar o texto. Anote o que reconheceu; depois confira escrita e sentido. Ouça novamente e repita por blocos, preservando comprimento, tom ou acento quando pertinente. Se não houver voz, mantenha a prática de leitura e consulte a fonte de pronúncia; não use áudio de outro idioma como substituto. A ferramenta não avalia sua pronúncia.',
    'Faça três rodadas de seis expressões: primeira com leitura, segunda apenas escuta e terceira recuperação a partir de situação. Se não houver áudio disponível, substitua por leitura oculta e registre essa limitação. Para cada falha de compreensão, pratique um dos dois pedidos de reparo abaixo. Não diga que entendeu antes de conseguir explicar o sentido.'],
  ['Simulação integrada com evidências', 'Executar uma interação guiada e uma variante com restrição nova.',
    'Use a situação do curso como um roteiro com pontos de decisão. Em cada ponto, escreva primeiro a intenção, escolha a expressão e marque a resposta que ainda precisa obter. Na primeira rodada, o texto pode ficar visível. Na segunda, use apenas cartões de intenção. Na terceira, acrescente uma mudança de contexto e identifique qual parte do repertório ainda não resolve a interação.',
    'Execute três rodadas de cinco minutos. Depois de cada rodada, reserve cinco minutos para registrar um acerto, uma dificuldade e uma correção. Em pelo menos uma rodada, inclua incompreensão e use o pedido de reparo. Não gere uma fala desconhecida para preencher a lacuna: registre a necessidade de aprender uma nova forma.'],
  ['Transferência, recuperação e plano de continuidade', 'Demonstrar retenção e definir o próximo objetivo sem ampliar indevidamente a competência comprovada.',
    'Feche as notas por cinco minutos e retome a tarefa com outra pessoa, canal ou restrição. Compare a nova versão com a primeira: a intenção ficou explícita? O tratamento continua adequado? O pedido foi confundido com confirmação? Liste o que consegue fazer com o repertório atual e uma situação que exige vocabulário ou estrutura adicional. O certificado desta trilha registra conclusão do laboratório, não um nível completo de proficiência.',
    'Refaça os oito cartões de expressão sem consulta. Marque recuperado, parcialmente recuperado ou não recuperado; a marcação é sua autoavaliação e não substitui a prova. Faça duas novas simulações e escreva um plano de revisão para amanhã e para sete dias. A plataforma exige revisão espaçada após a prova final.'],
] as const;

const sourceByLanguage: Record<string,string> = {
  en:'https://learnenglish.britishcouncil.org/', es:'https://temporalweb.asale.org/diccionario-estudiante/usted',
  fr:'https://apprendre.tv5monde.com/fr/exercices/a1-debutant/les-presentations',de:'https://www.goethe.de/en/spr/ueb.html',
  ja:'https://www.irodori.jpf.go.jp/en/about.html',ko:'https://www.iksi.or.kr/lms/crse/crseApply.do?crseNo=119352',zh:'https://ocw.mit.edu/courses/21g-101-chinese-i-regular-fall-2014/',
  it:'https://www.raiscuola.rai.it/percorsi/corsoditalianoperstranieri',pt:'https://linguadagente.coerll.utexas.edu/about/',
  ar:'https://www.langmedia.fivecolleges.edu/languages/arabic',hi:'https://hindi.la.utexas.edu/resources/',
  sw:'https://files.eric.ed.gov/fulltext/ED402760.pdf',id:'https://uhpress.hawaii.edu/title/lets-speak-indonesian-ayo-berbahasa-indonesia-volume-1/',
  tr:'https://turkce.yee.org.tr/en/cevrim-ici-kurslara-basvur-en.html',ru:'https://russian.cornell.edu/grammar/subject.htm',
  nl:'https://www.rug.nl/language-centre/develop-yourself/dutch-mooc?lang=en',
  sv:'https://www.informationsverige.se/en/jag-har-flytt-fran-kriget-i-ukraina/lar-dig-svenska/trana-pa-uttal.html',
  pl:'https://popolskupopolsce.edu.pl/',vi:'https://seasite.niu.edu/vietnamese/Guide_to_Pronunciation/pronunciation.htm',th:'https://mooc.chula.ac.th/course-detail/8',
};

export function languageAcademy(version:string): Array<{course:AcademyCourse;questions:AcademyPrivateQuestion[]}> {
  return languageProfiles.flatMap(profile => languageTopics.map((topic,topicIndex) => {
    const id=`idiomas-${profile.code}-${topic.id}`;
    const phrases=[...profile.phrases[topicIndex],...profile.repair];
    const meanings=[...topic.meanings,'Pode falar mais devagar, por favor?','Pode repetir, por favor?'];
    const intents=[...topic.intents,'pedir fala mais lenta','pedir repetição'];
    const vocabulary=languageVocabulary(profile.code,topicIndex);
    const questions:AcademyPrivateQuestion[]=[];
    const native=(title:string,text:string):AcademySection=>({title,body:text,preserveBody:true,textLanguage:profile.speech,direction:profile.direction});
    const indices=[[0,1],[2,3],[4,5],[0,2,4],[1,3,5],[6,7],[0,1,2,3,4,5],[0,1,2,3,4,5,6,7]];
    const lessons:AcademyLesson[]=methods.map(([title,objective,method,practice],index) => {
      const lessonId=`${id}-l${index+1}`;
      const selected=indices[index];
      const sections:AcademySection[]=[
        {title:'Situação de comunicação',body:`${topic.scenario} Objetivo desta aula: ${objective}`},
        {title:'Como praticar',body:method},
        ...selected.flatMap(phraseIndex=>[
          native(`Expressão ${phraseIndex+1}`,phrases[phraseIndex]),
          {title:`Sentido e função ${phraseIndex+1}`,body:`Sentido funcional: ${meanings[phraseIndex]} Intenção: ${intents[phraseIndex]}. Antes de repetir, descreva uma situação em que esta forma é pertinente e outra em que seria insuficiente. Não use a posição no material como pista de resposta.`},
        ]),
        {title:index===0?'Sistema de escrita':index===5?'Pronúncia e percepção':'Estrutura e uso da língua',body:index===0?profile.script:index===5?profile.pronunciation:profile.grammar},
        {title:'Registro e destinatário',body:profile.register},
        native('Vocabulário temático — formas de referência',vocabulary.map((term,i)=>`${i+1}. ${term.text}`).join('\n')),
        {title:'Sentidos do vocabulário e limite da substituição',body:`${vocabulary.map((term,i)=>`${i+1}. ${term.meaning}`).join('\n')}\nAs entradas são formas de referência no contexto deste tema. Gênero, caso, número, artigo, classificador ou sufixo podem mudar dentro de uma frase. Não substitua uma palavra mecanicamente por outra. Relacione cada entrada a uma expressão já estudada e marque quando a forma muda.`},
        {title:'Distinção que muda a decisão',body:topic.distinction},
        {title:'Exemplo resolvido de escolha',body:`Situação: a pessoa precisa ${intents[selected[0]]}. Ela seleciona “${phrases[selected[0]]}”. O sentido é “${meanings[selected[0]]}”. A escolha atende à intenção indicada, mas não resolve por si só todas as etapas da interação. Para auditar a resposta, confira primeiro a função, depois a forma e finalmente o contexto. Se a necessidade mudar para ${intents[(selected[0]+1)%8]}, a expressão a selecionar será “${phrases[(selected[0]+1)%8]}”.`,workedExample:true},
        {title:'Plano de 30 minutos',body:'5 min para situação e método; 5 min para expressões e escrita; 10 min para tentativas de recuperação; 5 min para a tarefa independente; 5 min para conferir, corrigir e salvar evidência. Tempo estimado de prática autônoma, ajustável ao ritmo do aluno.'},
      ];
      // All options in each item have the same answer language; keys never enter the public course DTO.
      for(let q=0;q<3;q++) {
        if(q===1){
          const word=(index+topicIndex)%6;
          questions.push({id:`${lessonId}-q${q+1}`,lessonId,language:'pt-BR',essential:false,
            prompt:`No vocabulário deste tema, “${vocabulary[word].text}” corresponde a qual sentido?`,
            options:[word,(word+2)%6,(word+4)%6].map((n,i)=>({id:`answer-${i}`,label:vocabularyMeanings[topicIndex][n],language:'pt-BR'})),
            correctOptionId:'answer-0',explanation:`Neste tema, “${vocabulary[word].text}” corresponde a “${vocabulary[word].meaning}”. A forma usada em uma frase pode mudar por flexão ou contexto; o vocabulário não autoriza substituição mecânica.`});
          continue;
        }
        const correct=q===0?[0,2,4,1,3,6,5,7][index]:selected[(index+1)%selected.length];
        const choices=[correct,(correct+1+index%3)%8,(correct+4)%8];
        const unique=[...new Set(choices)];
        while(unique.length<3){ const n=(unique[unique.length-1]+1)%8; if(!unique.includes(n))unique.push(n); }
        const nativeOptions=q===0;
        questions.push({id:`${lessonId}-q${q+1}`,lessonId,language:'pt-BR',essential:q===0,
          prompt:nativeOptions?`Nesta situação, você precisa ${intents[correct]}. Qual expressão em ${profile.name} corresponde à intenção?`:`Leia “${phrases[correct]}”. Qual é sua função nesta situação?`,
          options:unique.map((n,i)=>({id:`answer-${i}`,label:nativeOptions?phrases[n]:intents[n],language:nativeOptions?profile.speech:'pt-BR'})),
          correctOptionId:'answer-0',explanation:`“${phrases[correct]}” tem o sentido funcional de “${meanings[correct]}” e serve para ${intents[correct]}. ${topic.distinction}`});
      }
      return {id:lessonId,title,objective,sections,language:'pt-BR',foundation:index<3,practiceLab:index>=3&&index!==6,project:index===6,
        minutes:languageWorkload.lessonMinutes,references:[sourceByLanguage[profile.code]],
        practice:[practice,topic.task,index>=6?topic.transfer:`Troque o destinatário ou o canal de comunicação. Explique em português quais formas de tratamento precisam de adaptação. Use o guia: ${profile.register}`,`Critério de aceite: ${topic.acceptance}`],
        deliverable:'Salve a primeira tentativa, uma versão corrigida, a justificativa de uma escolha e uma informação que ainda precisa verificar. Inclua trechos no idioma estudado, sem dados pessoais reais.'};
    });
    const course:AcademyCourse={
      id,version,title:`${profile.name}: ${topic.title}`,
      description:`${topic.outcome} Laboratório temático introdutório de seis horas estimadas, com instruções em português e expressões em ${profile.name}.`,
      outcomes:[topic.outcome,'Relacionar forma, função e contexto em oito expressões, incluindo duas estratégias de reparo, e seis entradas de vocabulário.','Construir e revisar mensagens e simulações com recuperação sem consulta.'],
      lessons,minutes:languageWorkload.minutes,portfolioMinutes:languageWorkload.portfolioMinutes,assessmentMinutes:languageWorkload.assessmentMinutes,
      language:'pt-BR',image:`/images/courses/language-covers-2026/${id}.webp`,
      targetLanguage:{code:profile.code,name:profile.name,native:profile.native,speech:profile.speech,direction:profile.direction},
      languagePractice:[...phrases.map((text,i)=>({text,meaning:meanings[i]})),...vocabulary],
      prerequisite:profile.code==='pt'?'Compreensão prévia de instruções simples em português. Esta trilha consolida repertório funcional; não se destina ao primeiro contato absoluto com o idioma.':topicIndex===0?'Compreensão de português e disposição para estudar a escrita e os sons da língua. Não exige conhecimento prévio do idioma-alvo.':`Faça primeiro “${profile.name}: Primeiras conversas e apresentação pessoal” ou já reconheça o sistema de escrita e as formas de tratamento usadas nesta trilha.`,
      projectBrief:`${topic.task} ${topic.transfer} Reserve 90 minutos: 20 para planejar e escrever a primeira versão; 25 para praticar duas variantes sem consulta; 25 para comparar com o repertório e corrigir; 20 para montar evidências e plano de revisão. ${topic.acceptance}`,
      scopeNotice:'Laboratório temático de comunicação inicial, com repertório delimitado. As 6h são estimativa de estudo e prática autônoma, não duração de vídeo. Não constitui curso completo de uma língua, certificação de nível CEFR ou exame oficial. A avaliação automática verifica compreensão de expressões e decisões; escrita e fala são praticadas por autoavaliação, sem correção fonética ou revisão humana. Voz sintetizada depende do dispositivo. As imagens são cenas ilustrativas geradas, sem representação de campus TGPI real.',
    };
    return {course,questions};
  }));
}
