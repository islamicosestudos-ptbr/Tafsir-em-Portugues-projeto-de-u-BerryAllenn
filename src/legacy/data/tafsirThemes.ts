// FP-20261029-TAFSIR-7867495988FE · wz:19df5f8e · WAZLA / u/BerryAllenn
import { ALL_SURAHS } from "./quranSurahs";
import { QuranPassageReference, QuranTheme, QuranThemeCategory } from "../types/quran";

/**
 * Biblioteca temática expandida: 24 categorias e 159 temas editoriais
 * organizados de forma assimétrica com variações quantitativas ricas e passagens canônicas.
 */
export const QURAN_THEME_CATEGORIES: QuranThemeCategory[] = [
  {
    "id": "allah-atributos",
    "title": "Allah e os atributos divinos",
    "description": "A unicidade, os nomes, a misericórdia e o poder do Criador.",
    "iconName": "Sun"
  },
  {
    "id": "fe-vida-espiritual",
    "title": "Fé e vida espiritual",
    "description": "As qualidades da fé e a formação da consciência espiritual.",
    "iconName": "Heart"
  },
  {
    "id": "alcorao-revelacao",
    "title": "O Alcorão e a revelação",
    "description": "Orientação, reflexão, conhecimento e sabedoria revelada.",
    "iconName": "BookOpen"
  },
  {
    "id": "adoracao-praticas",
    "title": "Adoração e práticas religiosas",
    "description": "A oração, o jejum, a caridade, a peregrinação e a devoção.",
    "iconName": "Moon"
  },
  {
    "id": "etica-carater",
    "title": "Ética e caráter",
    "description": "Princípios de conduta, justiça pessoal e aperfeiçoamento do caráter.",
    "iconName": "Scale"
  },
  {
    "id": "sociedade-direitos",
    "title": "Sociedade, direitos e justiça",
    "description": "Dignidade, proteção, solidariedade e responsabilidade coletiva.",
    "iconName": "Users"
  },
  {
    "id": "familia-relacoes",
    "title": "Família e relações humanas",
    "description": "Vínculos familiares, casamento, cuidado e parentesco.",
    "iconName": "Home"
  },
  {
    "id": "provacoes-interior",
    "title": "Provações e vida interior",
    "description": "Paciência, esperança, lembrança de Allah e firmeza interior.",
    "iconName": "ShieldCheck"
  },
  {
    "id": "arrependimento-transformacao",
    "title": "Arrependimento e transformação",
    "description": "Retorno a Allah, perdão e mudança consciente de conduta.",
    "iconName": "RefreshCw"
  },
  {
    "id": "riqueza-trabalho",
    "title": "Riqueza, trabalho e sustento",
    "description": "Provisão, ética econômica, riqueza e responsabilidade material.",
    "iconName": "Wallet"
  },
  {
    "id": "profetas-mensageiros",
    "title": "Profetas e mensageiros",
    "description": "As missões proféticas e as lições de suas histórias.",
    "iconName": "UserRound"
  },
  {
    "id": "criacao-natureza",
    "title": "Criação e sinais da natureza",
    "description": "O universo, a vida e a diversidade como sinais para reflexão.",
    "iconName": "Leaf"
  },
  {
    "id": "historia-povos",
    "title": "História e povos anteriores",
    "description": "Narrativas corânicas e consequências das escolhas coletivas.",
    "iconName": "Landmark"
  },
  {
    "id": "conflito-paz",
    "title": "Conflito, paz e convivência",
    "description": "Paz, justiça, defesa e limites nas relações entre comunidades.",
    "iconName": "Handshake"
  },
  {
    "id": "morte-juizo",
    "title": "Morte, ressurreição e Juízo Final",
    "description": "A finitude, o retorno à vida e a prestação de contas.",
    "iconName": "Clock3"
  },
  {
    "id": "paraiso-inferno-futuro",
    "title": "Paraíso, Inferno e vida futura",
    "description": "As realidades da Outra Vida e o destino das ações humanas.",
    "iconName": "Flame"
  },
  {
    "id": "sabedoria-conhecimento",
    "title": "Sabedoria, Razão e Reflexão (Hikmah)",
    "description": "O valor do intelecto, da busca prudente pelo saber e da reflexão ponderada.",
    "iconName": "Lightbulb"
  },
  {
    "id": "pactos-aliancas",
    "title": "Pactos, Lealdade e Compromisso (Al-'Ahd)",
    "description": "A fidelidade à palavra empenhada, os tratados solenes e o pacto primordial.",
    "iconName": "ShieldCheck"
  },
  {
    "id": "lideranca-consulta",
    "title": "Liderança, Consulta e Governança (Shura)",
    "description": "O princípio da deliberação conjunta, a moderação e o serviço desinteressado.",
    "iconName": "Compass"
  },
  {
    "id": "saude-purificacao-alma",
    "title": "Purificação da Alma e Equilíbrio (Tazkiyah)",
    "description": "O cuidado espiritual do coração, o autocontrole e a cura das inquietações.",
    "iconName": "Heart"
  },
  {
    "id": "tempo-eras-destino",
    "title": "O Tempo, Eras e Propósito Humano (Al-'Asr)",
    "description": "A brevidade dos instantes, a sucessão dos ciclos e o resgate da vida com propósito.",
    "iconName": "Clock3"
  },
  {
    "id": "pluralidade-dialogo",
    "title": "Pluralidade, Diálogo e Convivência Humana",
    "description": "A diversidade dos povos, o respeito mútuo e a convivência fraterna.",
    "iconName": "Handshake"
  },
  {
    "id": "meio-ambiente-mordomia",
    "title": "Preservação da Criação e Responsabilidade Ecológica",
    "description": "A Terra como santuário sagrado e o papel do ser humano como zelador responsável.",
    "iconName": "Leaf"
  },
  {
    "id": "gratidao-esperanca",
    "title": "Gratidão, Esperança e Otimismo Diário (Shukr)",
    "description": "O reconhecimento contínuo das bênçãos e a certeza do alívio após a adversidade.",
    "iconName": "Sun"
  }
];

interface ThemeSeed extends Omit<QuranTheme, "addedOrder"> {
  passageIds: string[];
}

const THEME_SEEDS: ThemeSeed[] = [
  {
    "id": "tawhid-atributos",
    "categoryId": "allah-atributos",
    "title": "A unicidade de Allah (Tawhid)",
    "description": "A afirmação de que Allah é Único, sem associado, semelhante ou dependente.",
    "introduction": "Estude as passagens que afirmam a unicidade divina e a soberania exclusiva de Allah. Leia cada trecho em seu contexto, observando como o Alcorão rejeita a associação de parceiros a Ele.",
    "keywords": [
      "tawhid",
      "unicidade",
      "monoteísmo",
      "shirk",
      "Allah",
      "divindade"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "112:1-4",
      "2:163",
      "6:102-103",
      "21:22",
      "59:22-24",
      "2:255"
    ],
    "reflectionQuestion": "Que implicações práticas a unicidade de Allah traz para a adoração e para as decisões cotidianas?"
  },
  {
    "id": "nomes-mais-belos",
    "categoryId": "allah-atributos",
    "title": "Os Nomes Mais Belos de Allah",
    "description": "A contemplação dos Nomes divinos e de seus significados no Alcorão.",
    "introduction": "As passagens selecionadas apresentam os Nomes e atributos de Allah em diferentes contextos. A leitura deve respeitar o texto revelado, sem atribuir aos Nomes significados que não estejam fundamentados nas fontes utilizadas pelo aplicativo.",
    "keywords": [
      "Asma ul Husna",
      "nomes",
      "atributos",
      "Al-Rahman",
      "Al-Rahim"
    ],
    "passageIds": [
      "7:180",
      "17:110",
      "20:8",
      "59:22-24",
      "1:1-4",
      "6:102-103"
    ]
  },
  {
    "id": "misericordia-divina",
    "categoryId": "allah-atributos",
    "title": "A misericórdia divina",
    "description": "A amplitude da misericórdia de Allah e seus efeitos sobre a criação.",
    "introduction": "Reúna as passagens que tratam da misericórdia como atributo divino, promessa e fundamento da esperança. A advertência e a promessa devem ser lidas em conjunto, sem transformar a misericórdia em licença para ignorar a responsabilidade moral.",
    "keywords": [
      "misericórdia",
      "rahma",
      "perdão",
      "esperança",
      "compaixão"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "7:156",
      "39:53",
      "21:107",
      "40:7",
      "6:12",
      "12:87",
      "42:28"
    ],
    "reflectionQuestion": "Como a esperança na misericórdia pode coexistir com a responsabilidade por corrigir os próprios atos?"
  },
  {
    "id": "conhecimento-e-poder-divinos",
    "categoryId": "allah-atributos",
    "title": "O conhecimento e o poder de Allah",
    "description": "A ciência abrangente de Allah e seu domínio sobre toda a criação.",
    "introduction": "As referências abordam o conhecimento divino, a criação e o domínio de Allah sobre aquilo que é manifesto e oculto. Observe os diferentes argumentos e imagens empregados nos trechos.",
    "keywords": [
      "conhecimento",
      "poder",
      "onisciência",
      "criação",
      "soberania"
    ],
    "passageIds": [
      "2:255",
      "57:4",
      "6:59",
      "65:12",
      "31:34",
      "59:22-24",
      "3:190-191"
    ]
  },
  {
    "id": "sinais-dos-crentes",
    "categoryId": "fe-vida-espiritual",
    "title": "Os sinais dos verdadeiros crentes",
    "description": "Características da fé manifestadas na consciência, na adoração e na conduta.",
    "introduction": "Estas passagens descrevem qualidades associadas aos crentes. Elas permitem comparar a afirmação verbal da fé com seus sinais concretos, sem reduzir a vida espiritual a uma lista mecânica de comportamentos.",
    "keywords": [
      "iman",
      "crentes",
      "fé",
      "oração",
      "conduta"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "8:2-4",
      "23:1-11",
      "49:15",
      "9:71",
      "70:22-35",
      "2:177",
      "103:1-3"
    ]
  },
  {
    "id": "taqwa-consciencia-de-allah",
    "categoryId": "fe-vida-espiritual",
    "title": "A consciência de Allah (Taqwa)",
    "description": "A consciência de Allah como orientação para escolhas e responsabilidades.",
    "introduction": "O taqwa aparece ligado à preparação espiritual, à dignidade diante de Allah e à observância de limites. A leitura comparada ajuda a distinguir consciência de Allah de uma simples aparência externa de religiosidade.",
    "keywords": [
      "taqwa",
      "temor reverente",
      "consciência",
      "piedade",
      "retidão"
    ],
    "passageIds": [
      "2:197",
      "49:13",
      "3:102",
      "59:18",
      "65:2-3",
      "8:29",
      "2:177"
    ],
    "reflectionQuestion": "Que decisão concreta poderia ser diferente quando tomada com consciência de Allah?"
  },
  {
    "id": "sinceridade-na-adoracao",
    "categoryId": "fe-vida-espiritual",
    "title": "A sinceridade na adoração",
    "description": "A orientação para dedicar a religião e os atos de culto exclusivamente a Allah.",
    "introduction": "As passagens tratam da intenção, da dedicação religiosa e da rejeição de associações na adoração. Leia-as distinguindo o princípio corânico da sinceridade de comentários posteriores sobre suas aplicações.",
    "keywords": [
      "ikhlas",
      "sinceridade",
      "intenção",
      "adoração",
      "exclusividade"
    ],
    "passageIds": [
      "98:5",
      "6:162-163",
      "39:2-3",
      "18:110",
      "76:8-9"
    ]
  },
  {
    "id": "confianca-em-allah-tawakkul",
    "categoryId": "fe-vida-espiritual",
    "title": "A confiança em Allah (Tawakkul)",
    "description": "A confiança em Allah associada à decisão, à ação e à perseverança.",
    "introduction": "O tawakkul é apresentado em contextos de decisão, dificuldade e incerteza. As passagens permitem estudar a confiança em Allah sem separá-la da responsabilidade humana e da ação adequada.",
    "keywords": [
      "tawakkul",
      "confiança",
      "dependência",
      "decisão",
      "provisão"
    ],
    "passageIds": [
      "3:159",
      "65:3",
      "8:2",
      "14:11-12",
      "9:51"
    ]
  },
  {
    "id": "alcorao-como-orientacao",
    "categoryId": "alcorao-revelacao",
    "title": "O Alcorão como orientação",
    "description": "A função do Alcorão como orientação, esclarecimento e misericórdia.",
    "introduction": "As referências apresentam diferentes dimensões da orientação corânica. Leia a passagem completa no leitor para observar a quem o trecho se dirige e quais consequências práticas associa à orientação.",
    "keywords": [
      "Alcorão",
      "huda",
      "orientação",
      "revelação",
      "guia"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:2-5",
      "17:9",
      "10:57",
      "6:155",
      "41:44",
      "38:29"
    ]
  },
  {
    "id": "reflexao-sobre-versiculos",
    "categoryId": "alcorao-revelacao",
    "title": "A reflexão sobre os versículos",
    "description": "O convite à leitura atenta, à reflexão e à consideração do significado revelado.",
    "introduction": "Estas passagens questionam a leitura superficial e convidam à reflexão. O estudo pode observar os verbos, as perguntas e os argumentos empregados, sem substituir a análise linguística e o tafsir por impressões pessoais.",
    "keywords": [
      "tadabbur",
      "reflexão",
      "versículos",
      "compreensão",
      "leitura"
    ],
    "passageIds": [
      "4:82",
      "47:24",
      "38:29",
      "23:68",
      "3:190-191",
      "2:164",
      "12:111"
    ],
    "reflectionQuestion": "Que elementos do próprio contexto ajudam a evitar uma interpretação isolada do versículo?"
  },
  {
    "id": "busca-pelo-conhecimento",
    "categoryId": "alcorao-revelacao",
    "title": "A busca pelo conhecimento",
    "description": "O valor do conhecimento, do aprendizado e da investigação responsável.",
    "introduction": "As passagens abordam conhecimento, aprendizagem e distinção entre saber e não saber. Considere os contextos em que o conhecimento é elogiado e as responsabilidades que o acompanham.",
    "keywords": [
      "ilm",
      "conhecimento",
      "aprendizagem",
      "estudo",
      "ciência"
    ],
    "passageIds": [
      "20:114",
      "39:9",
      "96:1-5",
      "58:11",
      "35:28",
      "3:190-191",
      "17:36"
    ]
  },
  {
    "id": "sabedoria-e-boa-instrucao",
    "categoryId": "alcorao-revelacao",
    "title": "A sabedoria e a boa instrução",
    "description": "A sabedoria na orientação, no diálogo e na transmissão do conhecimento.",
    "introduction": "Os trechos associam sabedoria a discernimento e a formas adequadas de instrução. A leitura deve considerar o público, o assunto e o contexto de cada orientação.",
    "keywords": [
      "hikmah",
      "sabedoria",
      "instrução",
      "diálogo",
      "discernimento"
    ],
    "passageIds": [
      "16:125",
      "2:269",
      "17:36",
      "29:43",
      "12:111",
      "3:159"
    ]
  },
  {
    "id": "oracao-salat",
    "categoryId": "adoracao-praticas",
    "title": "A oração (Salat)",
    "description": "A oração como prática de adoração, lembrança de Allah e disciplina espiritual.",
    "introduction": "As referências contemplam a ordem da oração, seus efeitos e sua relação com a vida diária. O leitor deve consultar o texto integral e o tafsir para estudar as condições e os sentidos de cada passagem.",
    "keywords": [
      "salat",
      "oração",
      "salah",
      "adoração",
      "purificação"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:43",
      "29:45",
      "11:114",
      "17:78",
      "23:1-2",
      "2:177"
    ]
  },
  {
    "id": "jejum-e-ramada",
    "categoryId": "adoracao-praticas",
    "title": "O jejum e o Ramadã",
    "description": "A prescrição do jejum, o mês de Ramadã e suas orientações.",
    "introduction": "O núcleo do estudo está nas passagens de Al-Baqarah que prescrevem e esclarecem o jejum. Os demais trechos ampliam o contexto espiritual da adoração e devem ser lidos sem confundir recomendações gerais com regras jurídicas específicas.",
    "keywords": [
      "sawm",
      "jejum",
      "Ramadã",
      "Ramadan",
      "abstinência"
    ],
    "passageIds": [
      "2:183-187",
      "2:185",
      "2:186",
      "33:35",
      "97:1-5"
    ]
  },
  {
    "id": "caridade-e-zakat",
    "categoryId": "adoracao-praticas",
    "title": "A caridade e o Zakat",
    "description": "A purificação da riqueza, a generosidade e os destinatários da caridade obrigatória.",
    "introduction": "As passagens abrangem a multiplicação da recompensa pela caridade, a qualidade daquilo que é doado e os destinatários do Zakat. A distinção entre caridade voluntária e obrigação jurídica deve ser mantida no estudo.",
    "keywords": [
      "zakat",
      "sadaqah",
      "caridade",
      "esmola",
      "doação"
    ],
    "passageIds": [
      "2:261-274",
      "9:60",
      "2:267",
      "9:103",
      "57:7",
      "76:8-9"
    ]
  },
  {
    "id": "hajj-e-casa-sagrada",
    "categoryId": "adoracao-praticas",
    "title": "O Hajj e a Casa Sagrada",
    "description": "A peregrinação, seus ritos e a centralidade da Casa Sagrada.",
    "introduction": "As referências apresentam instruções e marcos da peregrinação. A leitura integral ajuda a distinguir os ritos mencionados pelo Alcorão de detalhes jurídicos desenvolvidos nas fontes de fiqh.",
    "keywords": [
      "Hajj",
      "peregrinação",
      "Kaaba",
      "Casa Sagrada",
      "Umrah"
    ],
    "passageIds": [
      "2:196-203",
      "22:27-29",
      "3:97",
      "2:158",
      "22:32"
    ]
  },
  {
    "id": "etica-fraternidade",
    "categoryId": "etica-carater",
    "title": "A justiça e a equidade",
    "description": "A obrigação de agir com justiça, mesmo quando isso contraria interesses pessoais.",
    "introduction": "As passagens estabelecem a justiça como princípio que não deve ser subordinado a preferências, relações pessoais ou hostilidade. Compare as situações e os deveres apresentados em cada contexto.",
    "keywords": [
      "justiça",
      "equidade",
      "adl",
      "testemunho",
      "imparcialidade"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "4:135",
      "5:8",
      "16:90",
      "17:35",
      "42:15",
      "2:177"
    ],
    "reflectionQuestion": "Em que situação a justiça exige contrariar o próprio interesse ou o interesse de pessoas próximas?"
  },
  {
    "id": "honestidade-e-compromissos",
    "categoryId": "etica-carater",
    "title": "A honestidade e o cumprimento dos compromissos",
    "description": "A veracidade, a confiança e o respeito aos acordos e às medidas justas.",
    "introduction": "Os trechos relacionam a integridade pessoal ao cumprimento de compromissos e à honestidade nas transações. A leitura pode ser aplicada a relações privadas, profissionais e comerciais, respeitando o alcance de cada passagem.",
    "keywords": [
      "honestidade",
      "promessas",
      "pactos",
      "medidas",
      "confiança"
    ],
    "passageIds": [
      "17:34-35",
      "83:1-3",
      "5:1",
      "8:27",
      "23:8",
      "2:177"
    ]
  },
  {
    "id": "controle-da-ira-e-perdao",
    "categoryId": "etica-carater",
    "title": "O controle da ira e o perdão",
    "description": "O domínio da reação, a contenção da ira e a disposição para perdoar.",
    "introduction": "Estas passagens tratam de contenção, perdão e resposta ao mal. A leitura comparada permite distinguir perdão, reconciliação e justiça, conceitos relacionados, mas não idênticos.",
    "keywords": [
      "ira",
      "raiva",
      "perdão",
      "paciência",
      "autocontrole"
    ],
    "passageIds": [
      "3:134",
      "42:37",
      "24:22",
      "41:34",
      "42:40"
    ]
  },
  {
    "id": "humildade-e-rejeicao-da-arrogancia",
    "categoryId": "etica-carater",
    "title": "A humildade e a rejeição da arrogância",
    "description": "A moderação na conduta e a rejeição da superioridade arrogante.",
    "introduction": "As passagens oferecem orientações sobre postura, linguagem e relações com outras pessoas. Observe como a humildade é traduzida em atitudes concretas, e não apenas em uma declaração interior.",
    "keywords": [
      "humildade",
      "arrogância",
      "modéstia",
      "orgulho",
      "conduta"
    ],
    "passageIds": [
      "31:18-19",
      "25:63",
      "17:37",
      "4:36",
      "49:11-12"
    ]
  },
  {
    "id": "dignidade-humana",
    "categoryId": "sociedade-direitos",
    "title": "A dignidade humana",
    "description": "A honra concedida aos seres humanos e a rejeição de hierarquias injustas.",
    "introduction": "Os trechos tratam da dignidade humana, da origem comum e da diversidade entre povos. Leia as referências em seu contexto para identificar o fundamento e o alcance de cada afirmação.",
    "keywords": [
      "dignidade",
      "humanidade",
      "origem",
      "diversidade",
      "direitos"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "17:70",
      "49:13",
      "95:4",
      "4:1",
      "5:32"
    ]
  },
  {
    "id": "reconciliacao-entre-pessoas",
    "categoryId": "sociedade-direitos",
    "title": "A reconciliação entre pessoas",
    "description": "A resolução de conflitos, a conciliação e a preservação dos vínculos comunitários.",
    "introduction": "As passagens orientam a mediação de conflitos e a restauração de relações. A reconciliação não elimina a exigência de justiça: os textos devem ser lidos em conjunto para compreender os limites e os deveres envolvidos.",
    "keywords": [
      "reconciliação",
      "conciliação",
      "conflito",
      "comunidade",
      "mediação"
    ],
    "passageIds": [
      "49:9-10",
      "4:114",
      "8:1",
      "3:103",
      "42:40"
    ]
  },
  {
    "id": "cooperacao-no-bem",
    "categoryId": "sociedade-direitos",
    "title": "A cooperação no bem",
    "description": "A colaboração para a retidão e a responsabilidade compartilhada.",
    "introduction": "Os trechos relacionam a vida comunitária à cooperação, à solidariedade e à responsabilidade coletiva. A seleção distingue colaboração no bem de apoio indiscriminado a qualquer objetivo de um grupo.",
    "keywords": [
      "cooperação",
      "solidariedade",
      "bem",
      "comunidade",
      "responsabilidade"
    ],
    "passageIds": [
      "5:2",
      "3:104",
      "9:71",
      "103:1-3",
      "2:177"
    ]
  },
  {
    "id": "protecao-orfaos-vulneraveis",
    "categoryId": "sociedade-direitos",
    "title": "A proteção dos órfãos e vulneráveis",
    "description": "A proteção patrimonial, social e moral de pessoas em situação de vulnerabilidade.",
    "introduction": "As passagens proíbem abusos e chamam atenção para a responsabilidade diante de pessoas vulneráveis. O estudo deve observar tanto as normas específicas sobre órfãos quanto a crítica à negligência social.",
    "keywords": [
      "órfãos",
      "vulneráveis",
      "proteção",
      "pobreza",
      "amparo"
    ],
    "passageIds": [
      "4:2",
      "4:10",
      "93:9",
      "107:1-3",
      "2:220",
      "2:177",
      "76:8-9"
    ]
  },
  {
    "id": "bondade-para-com-os-pais",
    "categoryId": "familia-relacoes",
    "title": "A bondade para com os pais",
    "description": "O dever de tratar os pais com respeito e bondade, dentro dos limites da obediência a Allah.",
    "introduction": "As passagens articulam gratidão, cuidado e respeito aos pais. A referência a limites da obediência deve ser preservada: a bondade filial não significa obedecer a uma ordem que contrarie a orientação divina.",
    "keywords": [
      "pais",
      "mãe",
      "pai",
      "bondade filial",
      "família"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "17:23-24",
      "31:14-15",
      "46:15",
      "29:8",
      "4:36"
    ]
  },
  {
    "id": "casamento-e-tranquilidade",
    "categoryId": "familia-relacoes",
    "title": "O casamento e a tranquilidade",
    "description": "O casamento, a afeição e a misericórdia nas relações conjugais.",
    "introduction": "As referências abordam a origem dos vínculos conjugais, a intimidade e a busca por tranquilidade. As passagens devem ser lidas em seu contexto, sem transformar uma síntese temática em parecer jurídico sobre casos específicos.",
    "keywords": [
      "casamento",
      "matrimônio",
      "tranquilidade",
      "afeição",
      "misericórdia"
    ],
    "passageIds": [
      "30:21",
      "25:74",
      "2:187",
      "4:1",
      "24:32"
    ]
  },
  {
    "id": "responsabilidade-familiar-e-filhos",
    "categoryId": "familia-relacoes",
    "title": "A responsabilidade familiar e a educação dos filhos",
    "description": "O cuidado, a orientação e a responsabilidade dos membros da família.",
    "introduction": "Os textos selecionados tratam da proteção da família, da educação e das responsabilidades de cuidado. A orientação religiosa deve ser acompanhada de justiça e de atenção às necessidades concretas dos dependentes.",
    "keywords": [
      "filhos",
      "educação",
      "responsabilidade",
      "criação",
      "família"
    ],
    "passageIds": [
      "66:6",
      "31:13-19",
      "20:132",
      "2:233",
      "17:31",
      "25:74"
    ]
  },
  {
    "id": "lacos-de-parentesco",
    "categoryId": "familia-relacoes",
    "title": "Os laços de parentesco",
    "description": "A preservação dos vínculos familiares e os deveres decorrentes do parentesco.",
    "introduction": "As referências relacionam os laços de parentesco à origem humana, à justiça e à responsabilidade. Compare os mandamentos e advertências para compreender a relevância social desses vínculos.",
    "keywords": [
      "parentesco",
      "família extensa",
      "laços",
      "parentes",
      "relação"
    ],
    "passageIds": [
      "4:1",
      "47:22-23",
      "16:90",
      "8:75",
      "13:21",
      "17:23-24",
      "4:36"
    ]
  },
  {
    "id": "paciencia-consolo",
    "categoryId": "provacoes-interior",
    "title": "A paciência (Sabr)",
    "description": "A perseverança diante das provações e a busca de auxílio por meio da paciência.",
    "introduction": "As passagens descrevem paciência em circunstâncias distintas. A leitura permite estudar a perseverança como postura ativa de fé, sem confundi-la com passividade diante de injustiças ou problemas que exigem ação.",
    "keywords": [
      "sabr",
      "paciência",
      "perseverança",
      "provação",
      "firmeza"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:153-157",
      "3:200",
      "16:127",
      "39:10",
      "11:115"
    ],
    "reflectionQuestion": "Qual é a diferença entre perseverar com firmeza e aceitar passivamente uma situação que pode ser corrigida?"
  },
  {
    "id": "dificuldade-e-alivio",
    "categoryId": "provacoes-interior",
    "title": "A dificuldade e o alívio",
    "description": "As passagens que relacionam a adversidade à capacidade e ao auxílio concedido por Allah.",
    "introduction": "Os trechos abordam a dificuldade sob diferentes ângulos: promessa de alívio, limite da capacidade humana e prova. Evite tratar uma passagem isolada como garantia de que toda adversidade terminará imediatamente.",
    "keywords": [
      "dificuldade",
      "alívio",
      "adversidade",
      "provação",
      "facilidade"
    ],
    "passageIds": [
      "94:5-6",
      "2:286",
      "65:7",
      "2:214",
      "2:155-157"
    ]
  },
  {
    "id": "lembranca-de-allah-tranquilidade",
    "categoryId": "provacoes-interior",
    "title": "A lembrança de Allah e a tranquilidade",
    "description": "A lembrança de Allah como elemento central da vida espiritual.",
    "introduction": "As referências ligam a lembrança de Allah à firmeza, à gratidão e à prática religiosa. O estudo pode considerar as diferentes formas de dhikr apresentadas pelo texto e seus contextos.",
    "keywords": [
      "dhikr",
      "lembrança",
      "recordação",
      "tranquilidade",
      "coração"
    ],
    "passageIds": [
      "13:28",
      "2:152",
      "33:41-42",
      "8:45",
      "29:45"
    ]
  },
  {
    "id": "esperanca-na-misericordia",
    "categoryId": "provacoes-interior",
    "title": "A esperança na misericórdia divina",
    "description": "A esperança diante do sofrimento, do erro e da incerteza.",
    "introduction": "As passagens apresentam a esperança como resposta à aflição e ao erro. Leia também as advertências presentes nos contextos para manter unidos esperança, responsabilidade e confiança em Allah.",
    "keywords": [
      "esperança",
      "misericórdia",
      "desespero",
      "aflição",
      "socorro"
    ],
    "passageIds": [
      "12:87",
      "39:53",
      "15:56",
      "41:49",
      "42:28",
      "7:156",
      "6:12"
    ]
  },
  {
    "id": "arrependimento-sincero",
    "categoryId": "arrependimento-transformacao",
    "title": "O arrependimento sincero",
    "description": "O retorno consciente a Allah e o compromisso de abandonar o erro.",
    "introduction": "As referências tratam do arrependimento e de suas condições espirituais e morais. O estudo deve diferenciar o arrependimento sincero de uma simples declaração sem mudança de direção.",
    "keywords": [
      "tawbah",
      "arrependimento",
      "retorno",
      "pecado",
      "reforma"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "66:8",
      "4:17-18",
      "3:135",
      "2:222",
      "25:68-71",
      "39:53"
    ]
  },
  {
    "id": "perdao-e-transformacao-moral",
    "categoryId": "arrependimento-transformacao",
    "title": "O perdão e a transformação moral",
    "description": "A relação entre perdão, correção dos atos e reconstrução da conduta.",
    "introduction": "Os textos selecionados relacionam o perdão divino à transformação e à prática de boas ações. Leia as condições e os exemplos apresentados, sem atribuir ao perdão um sentido separado da responsabilidade.",
    "keywords": [
      "perdão",
      "reforma",
      "transformação",
      "boas ações",
      "retidão"
    ],
    "passageIds": [
      "25:68-71",
      "42:25",
      "39:53",
      "8:29",
      "11:114",
      "3:135"
    ]
  },
  {
    "id": "mudanca-interior",
    "categoryId": "arrependimento-transformacao",
    "title": "A mudança interior",
    "description": "A transformação pessoal e coletiva ligada às escolhas e disposições humanas.",
    "introduction": "As passagens abordam mudança, autoconhecimento e responsabilidade. Observe quais condições são explicitamente mencionadas e evite transformar os textos em fórmulas simplistas de sucesso individual.",
    "keywords": [
      "mudança",
      "transformação",
      "autoconhecimento",
      "reforma",
      "intenção"
    ],
    "passageIds": [
      "13:11",
      "91:7-10",
      "59:18",
      "53:39",
      "76:3",
      "3:135"
    ]
  },
  {
    "id": "proibicao-do-desespero",
    "categoryId": "arrependimento-transformacao",
    "title": "A proibição de desesperar da misericórdia de Allah",
    "description": "A advertência contra o desespero e o chamado ao retorno a Allah.",
    "introduction": "Estas referências destacam a esperança na misericórdia divina mesmo diante de erros graves. A leitura deve considerar o contexto de cada advertência e a necessidade de arrependimento e correção.",
    "keywords": [
      "desespero",
      "misericórdia",
      "perdão",
      "esperança",
      "retorno"
    ],
    "passageIds": [
      "39:53",
      "12:87",
      "15:56",
      "29:23",
      "42:28"
    ]
  },
  {
    "id": "sustento-concedido-por-allah",
    "categoryId": "riqueza-trabalho",
    "title": "O sustento concedido por Allah",
    "description": "A provisão, o trabalho e a confiança em Allah diante das necessidades materiais.",
    "introduction": "As passagens apresentam a provisão como parte da ordem criada por Allah e orientam a ação humana. O estudo deve evitar leituras que prometam riqueza automática ou dispensem esforço e responsabilidade.",
    "keywords": [
      "rizq",
      "sustento",
      "provisão",
      "trabalho",
      "confiança"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "11:6",
      "29:60",
      "67:15",
      "62:10",
      "2:172",
      "16:10-11",
      "39:21"
    ]
  },
  {
    "id": "etica-medidas-transacoes",
    "categoryId": "riqueza-trabalho",
    "title": "A ética nas medidas e transações",
    "description": "A honestidade comercial e a proibição de fraude nas medidas e nos pesos.",
    "introduction": "Os textos condenam a fraude e exigem integridade nas transações. A aplicação a contratos e práticas econômicas atuais exige análise adicional de contexto e jurisprudência, não apenas analogia superficial.",
    "keywords": [
      "comércio",
      "medidas",
      "pesos",
      "fraude",
      "transações"
    ],
    "passageIds": [
      "83:1-3",
      "6:152",
      "17:35",
      "55:9",
      "7:85"
    ]
  },
  {
    "id": "proibicao-da-usura-riba",
    "categoryId": "riqueza-trabalho",
    "title": "A proibição da usura (Riba)",
    "description": "As advertências corânicas sobre riba e as orientações relativas às transações.",
    "introduction": "O núcleo do estudo está nas passagens que tratam diretamente de riba. Os demais trechos devem ser lidos como contexto complementar; a classificação de produtos financeiros contemporâneos requer estudo jurídico especializado.",
    "keywords": [
      "riba",
      "usura",
      "juros",
      "finanças",
      "economia islâmica"
    ],
    "passageIds": [
      "2:275-279",
      "3:130",
      "30:39",
      "4:161",
      "2:276"
    ]
  },
  {
    "id": "riqueza-como-prova",
    "categoryId": "riqueza-trabalho",
    "title": "A riqueza como prova",
    "description": "A riqueza e os bens como responsabilidade, teste e fonte de prestação de contas.",
    "introduction": "As referências apresentam bens e riqueza como elementos de prova, não como medida automática de mérito. A leitura pode relacionar posse, generosidade, prioridades e responsabilidade perante Allah.",
    "keywords": [
      "riqueza",
      "bens",
      "prova",
      "dinheiro",
      "responsabilidade"
    ],
    "passageIds": [
      "8:28",
      "64:15",
      "3:186",
      "18:46",
      "9:34-35",
      "2:261-274",
      "57:7"
    ]
  },
  {
    "id": "ibrahim-submissao-allah",
    "categoryId": "profetas-mensageiros",
    "title": "Ibrahim e a submissão a Allah",
    "description": "A fé, as provas e a submissão de Ibrahim a Allah.",
    "introduction": "As passagens mostram momentos distintos da vida de Ibrahim: sua busca, suas provas e sua disposição de obedecer a Allah. A leitura em sequência ajuda a acompanhar a construção da narrativa.",
    "keywords": [
      "Ibrahim",
      "Abraão",
      "submissão",
      "monoteísmo",
      "profeta"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:124-132",
      "6:74-79",
      "21:51-73",
      "37:99-111",
      "60:4"
    ]
  },
  {
    "id": "musa-confronto-farao",
    "categoryId": "profetas-mensageiros",
    "title": "Musa e o confronto com Faraó",
    "description": "A missão de Musa diante da tirania de Faraó e a libertação dos oprimidos.",
    "introduction": "As referências acompanham a missão de Musa, o confronto com Faraó e os sinais apresentados ao seu povo. Observe as diferenças entre os relatos e o papel desempenhado por cada episódio.",
    "keywords": [
      "Musa",
      "Moisés",
      "Faraó",
      "tirania",
      "Êxodo"
    ],
    "passageIds": [
      "20:9-79",
      "28:3-6",
      "7:103-137",
      "26:10-68",
      "79:15-26"
    ]
  },
  {
    "id": "yusuf-adversidade-perdao",
    "categoryId": "profetas-mensageiros",
    "title": "Yusuf, a adversidade e o perdão",
    "description": "A narrativa de Yusuf: provação, integridade, paciência e reconciliação.",
    "introduction": "A Surata Yusuf apresenta uma narrativa contínua sobre perda, injustiça, tentação, poder e perdão. As passagens foram divididas em etapas de leitura para facilitar o estudo sem retirar os episódios de seu encadeamento.",
    "keywords": [
      "Yusuf",
      "José",
      "adversidade",
      "perdão",
      "sonho"
    ],
    "passageIds": [
      "12:4-18",
      "12:23-35",
      "12:50-57",
      "12:86-101",
      "12:90-92",
      "12:111"
    ]
  },
  {
    "id": "muhammad-como-mensageiro",
    "categoryId": "profetas-mensageiros",
    "title": "Muhammad como mensageiro",
    "description": "A missão profética de Muhammad e as características de sua comunidade.",
    "introduction": "Os trechos apresentam a condição de mensageiro, a missão de misericórdia e a descrição dos que o acompanham. Para aprofundamento biográfico, a leitura deve ser complementada pelas fontes de Sirah disponíveis.",
    "keywords": [
      "Muhammad",
      "Maomé",
      "mensageiro",
      "profeta",
      "Sirah"
    ],
    "passageIds": [
      "33:40",
      "48:29",
      "21:107",
      "9:128",
      "68:4"
    ]
  },
  {
    "id": "criacao-ceus-e-terra",
    "categoryId": "criacao-natureza",
    "title": "A criação dos céus e da Terra",
    "description": "A criação e a ordem do universo como sinais para quem reflete.",
    "introduction": "As passagens convocam à observação dos céus, da Terra e da ordem da criação. O objetivo do estudo é identificar o argumento corânico em seu contexto, sem atribuir ao texto afirmações científicas que ele não faz.",
    "keywords": [
      "criação",
      "céus",
      "Terra",
      "universo",
      "sinais"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "3:190-191",
      "2:164",
      "41:53",
      "67:3-4",
      "45:3-5",
      "30:22"
    ]
  },
  {
    "id": "agua-e-vida",
    "categoryId": "criacao-natureza",
    "title": "A água e a vida",
    "description": "A água como elemento essencial à vida e sinal da criação.",
    "introduction": "Os trechos relacionam água, chuva, vegetação e vida. Leia as referências por inteiro e considere a função da água em cada argumento, sem forçar equivalências com teorias científicas modernas.",
    "keywords": [
      "água",
      "chuva",
      "vida",
      "vegetação",
      "criação"
    ],
    "passageIds": [
      "21:30",
      "24:45",
      "25:48-49",
      "16:10-11",
      "39:21"
    ]
  },
  {
    "id": "animais-como-sinais",
    "categoryId": "criacao-natureza",
    "title": "Os animais como sinais",
    "description": "Os animais, seus modos de vida e sua utilidade como sinais da criação.",
    "introduction": "As passagens mencionam animais em contextos de reflexão sobre a criação, a subsistência e a organização da vida. O estudo pode observar a diversidade de exemplos apresentados no texto.",
    "keywords": [
      "animais",
      "fauna",
      "criação",
      "sinais",
      "natureza"
    ],
    "passageIds": [
      "16:5-8",
      "24:41",
      "6:38",
      "16:68-69",
      "40:79-80"
    ]
  },
  {
    "id": "diversidade-da-criacao",
    "categoryId": "criacao-natureza",
    "title": "A diversidade da criação",
    "description": "A diversidade de línguas, cores, povos e formas de vida.",
    "introduction": "Os trechos apontam a diversidade como parte dos sinais da criação. A leitura aproxima diferenças humanas e naturais sem convertê-las em hierarquias de valor não sustentadas pelo texto.",
    "keywords": [
      "diversidade",
      "línguas",
      "cores",
      "povos",
      "natureza"
    ],
    "passageIds": [
      "30:22",
      "49:13",
      "35:27-28",
      "16:72",
      "42:8"
    ]
  },
  {
    "id": "povo-de-nuh",
    "categoryId": "historia-povos",
    "title": "O povo de Nuh (Noé)",
    "description": "A missão de Nuh, a rejeição de seu povo e o desfecho da narrativa.",
    "introduction": "As referências apresentam episódios da missão de Nuh em diferentes suratas. Compare os relatos para compreender os elementos recorrentes e os detalhes próprios de cada passagem.",
    "keywords": [
      "Nuh",
      "Noé",
      "dilúvio",
      "povo",
      "profeta"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "71:1-28",
      "11:25-49",
      "23:23-30",
      "26:105-122",
      "54:9-17"
    ]
  },
  {
    "id": "ad-e-thamud",
    "categoryId": "historia-povos",
    "title": "Os povos de 'Ad e Thamud",
    "description": "As advertências dirigidas a 'Ad e Thamud e as consequências de sua rejeição.",
    "introduction": "As passagens reúnem relatos sobre os dois povos e seus mensageiros. Observe a sequência entre advertência, resposta coletiva e consequência, evitando misturar detalhes de narrativas distintas.",
    "keywords": [
      "Ad",
      "Thamud",
      "Hud",
      "Salih",
      "povos antigos"
    ],
    "passageIds": [
      "7:65-79",
      "11:50-68",
      "26:123-159",
      "41:13-18",
      "69:4-8",
      "14:9"
    ]
  },
  {
    "id": "qarun-e-a-riqueza",
    "categoryId": "historia-povos",
    "title": "Qarun e a riqueza",
    "description": "A riqueza de Qarun, sua arrogância e a advertência dirigida à sociedade.",
    "introduction": "A narrativa de Qarun examina a relação entre riqueza, presunção e responsabilidade. As passagens complementares ajudam a contextualizar a narrativa e a crítica à fascinação pela riqueza.",
    "keywords": [
      "Qarun",
      "riqueza",
      "arrogância",
      "poder",
      "Musa"
    ],
    "passageIds": [
      "28:76-82",
      "29:39",
      "40:23-24",
      "28:83-84",
      "57:20"
    ]
  },
  {
    "id": "licoes-dos-povos-anteriores",
    "categoryId": "historia-povos",
    "title": "As lições dos povos anteriores",
    "description": "O estudo da história como advertência e reflexão sobre escolhas coletivas.",
    "introduction": "As referências convidam a observar os vestígios e os relatos dos povos anteriores. O foco está na reflexão sobre causas e consequências, sem presumir que toda situação histórica atual corresponda diretamente a um episódio antigo.",
    "keywords": [
      "história",
      "povos anteriores",
      "lições",
      "narrativas",
      "advertência"
    ],
    "passageIds": [
      "12:111",
      "30:9",
      "7:176",
      "14:9",
      "22:45-46",
      "54:9-17"
    ]
  },
  {
    "id": "inclinacao-a-paz",
    "categoryId": "conflito-paz",
    "title": "A inclinação à paz",
    "description": "A orientação para aceitar a paz e buscar a resolução de conflitos.",
    "introduction": "As referências tratam de paz, cessação de hostilidades e reconciliação. O contexto de cada passagem é essencial para compreender quando se trata de uma proposta de paz, de uma trégua ou de uma mediação comunitária.",
    "keywords": [
      "paz",
      "trégua",
      "reconciliação",
      "convivência",
      "hostilidade"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "8:61",
      "4:90",
      "60:8-9",
      "49:9-10",
      "8:1",
      "42:40"
    ]
  },
  {
    "id": "justica-diante-da-hostilidade",
    "categoryId": "conflito-paz",
    "title": "A justiça mesmo diante da hostilidade",
    "description": "A exigência de justiça e imparcialidade mesmo diante de adversários.",
    "introduction": "As passagens recusam que a hostilidade seja justificativa para abandonar a justiça. A aplicação a conflitos contemporâneos exige primeiro identificar o contexto e os sujeitos a que cada texto se refere.",
    "keywords": [
      "justiça",
      "hostilidade",
      "adversários",
      "imparcialidade",
      "equidade"
    ],
    "passageIds": [
      "5:8",
      "4:135",
      "60:8",
      "42:40",
      "16:90",
      "49:9-10"
    ]
  },
  {
    "id": "defesa-e-limites-do-combate",
    "categoryId": "conflito-paz",
    "title": "A defesa e os limites do combate",
    "description": "As referências sobre defesa, limites e proteção em situações de conflito.",
    "introduction": "Estas passagens precisam ser estudadas com atenção ao contexto histórico e às condições mencionadas pelo próprio texto. Não constituem autorização genérica para violência individual ou para ações fora dos limites estabelecidos.",
    "keywords": [
      "combate",
      "defesa",
      "limites",
      "guerra",
      "hostilidade"
    ],
    "passageIds": [
      "2:190",
      "22:39-40",
      "2:193",
      "8:61",
      "9:6",
      "4:90"
    ]
  },
  {
    "id": "bondade-com-nao-combatentes",
    "categoryId": "conflito-paz",
    "title": "A bondade com quem não combate",
    "description": "A justiça e a bondade nas relações com pessoas que não participam de hostilidades.",
    "introduction": "Os trechos orientam a conduta diante de pessoas que não combatem os muçulmanos e abordam proteção e segurança. Leia as condições expressas nos versículos; não generalize o texto para situações que ele não descreve.",
    "keywords": [
      "não combatentes",
      "bondade",
      "proteção",
      "convivência",
      "segurança"
    ],
    "passageIds": [
      "60:8-9",
      "4:90",
      "9:6",
      "5:8",
      "2:256"
    ]
  },
  {
    "id": "certeza-da-morte",
    "categoryId": "morte-juizo",
    "title": "A certeza da morte",
    "description": "A inevitabilidade da morte e o retorno de todas as pessoas a Allah.",
    "introduction": "As referências afirmam a inevitabilidade da morte e a impossibilidade de evitá-la por meios humanos. A leitura permite estudar como o Alcorão relaciona finitude e responsabilidade.",
    "keywords": [
      "morte",
      "finitude",
      "retorno",
      "vida",
      "destino"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "3:185",
      "29:57",
      "62:8",
      "21:35",
      "4:78"
    ]
  },
  {
    "id": "ressurreicao",
    "categoryId": "morte-juizo",
    "title": "A ressurreição",
    "description": "A reunião após a morte e a restauração da vida para a prestação de contas.",
    "introduction": "Os trechos apresentam imagens e argumentos corânicos sobre a ressurreição. Leia as passagens integralmente para compreender a progressão do argumento e os questionamentos aos que negam o retorno à vida.",
    "keywords": [
      "ressurreição",
      "retorno à vida",
      "baath",
      "sepulturas",
      "recriação"
    ],
    "passageIds": [
      "36:51-54",
      "75:1-15",
      "22:5-7",
      "17:49-51",
      "50:3-4",
      "99:6-8"
    ]
  },
  {
    "id": "dia-do-juizo",
    "categoryId": "morte-juizo",
    "title": "O Dia do Juízo",
    "description": "A prestação de contas e a exposição das ações no Dia do Juízo.",
    "introduction": "As passagens descrevem cenas do Juízo e a diferença entre os resultados das ações. A leitura deve respeitar as imagens e os termos próprios de cada surata, sem fundir descrições diferentes em uma única narrativa.",
    "keywords": [
      "Juízo Final",
      "Qiyamah",
      "julgamento",
      "prestação de contas",
      "Dia"
    ],
    "passageIds": [
      "99:6-8",
      "101:6-11",
      "82:1-5",
      "84:7-12",
      "17:13-14",
      "21:47"
    ]
  },
  {
    "id": "responsabilidade-pelas-acoes",
    "categoryId": "morte-juizo",
    "title": "A responsabilidade pelas ações",
    "description": "O registro das ações e a responsabilidade individual diante de Allah.",
    "introduction": "Os trechos enfatizam que as ações humanas não são esquecidas e que cada pessoa será confrontada com seu registro. O estudo pode relacionar responsabilidade, intenção e consequências, observando o texto completo.",
    "keywords": [
      "ações",
      "responsabilidade",
      "registro",
      "prestação de contas",
      "individual"
    ],
    "passageIds": [
      "17:13-14",
      "18:49",
      "36:65",
      "75:13-15",
      "99:7-8",
      "101:6-11"
    ]
  },
  {
    "id": "descricao-do-paraiso",
    "categoryId": "paraiso-inferno-futuro",
    "title": "A descrição do Paraíso",
    "description": "As imagens corânicas do Paraíso e as recompensas destinadas aos justos.",
    "introduction": "As passagens apresentam descrições do Paraíso em diferentes suratas e registros. Leia cada trecho no contexto para distinguir imagens de recompensa, qualidades dos habitantes e promessas específicas.",
    "keywords": [
      "Paraíso",
      "Jannah",
      "recompensa",
      "vida futura",
      "jardins"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "47:15",
      "55:46-78",
      "76:11-22",
      "56:10-40",
      "13:23-24",
      "3:14-15"
    ]
  },
  {
    "id": "descricao-do-inferno",
    "categoryId": "paraiso-inferno-futuro",
    "title": "A descrição do Inferno",
    "description": "As advertências corânicas sobre o Inferno e as consequências da rejeição.",
    "introduction": "Os trechos apresentam advertências e descrições do Inferno. A leitura deve manter o contexto das advertências e evitar usar uma passagem isolada para declarar o destino de pessoas específicas.",
    "keywords": [
      "Inferno",
      "Jahannam",
      "Fogo",
      "advertência",
      "castigo"
    ],
    "passageIds": [
      "4:56",
      "67:6-11",
      "14:16-17",
      "44:43-50",
      "101:8-11"
    ]
  },
  {
    "id": "balanca-das-acoes",
    "categoryId": "paraiso-inferno-futuro",
    "title": "A balança das ações",
    "description": "A pesagem das ações e a justiça perfeita no julgamento.",
    "introduction": "As referências tratam da balança, do peso das obras e dos resultados do julgamento. Observe as diferentes formulações antes de concluir que todas descrevem o mesmo aspecto de uma única cena.",
    "keywords": [
      "balança",
      "Mizan",
      "ações",
      "julgamento",
      "justiça"
    ],
    "passageIds": [
      "21:47",
      "7:8-9",
      "23:102-103",
      "99:7-8",
      "101:6-11",
      "18:49"
    ]
  },
  {
    "id": "vida-terrena-e-vida-futura",
    "categoryId": "paraiso-inferno-futuro",
    "title": "A vida terrena e a vida futura",
    "description": "A comparação entre a vida presente e a Outra Vida e a definição de prioridades.",
    "introduction": "Os textos comparam a vida terrena à vida futura e questionam prioridades humanas. A leitura deve evitar a conclusão de que a vida presente não possui responsabilidades: o próprio Alcorão orienta como agir nela.",
    "keywords": [
      "Dunya",
      "Akhirah",
      "vida terrena",
      "Outra Vida",
      "prioridades"
    ],
    "passageIds": [
      "29:64",
      "87:16-17",
      "3:14-15",
      "57:20",
      "42:20",
      "18:46",
      "3:185"
    ]
  },
  {
    "id": "a-majestade-e-o-trono",
    "categoryId": "allah-atributos",
    "title": "A majestade divina e o Trono ('Arsh)",
    "description": "A glória transcendente, o Trono supremo e a soberania irrestrita sobre o cosmos.",
    "introduction": "Estude as passagens que descrevem o Trono de Allah ('Arsh) e Seu domínio sem rival. O texto corânico evoca a transcendência absoluta do Criador que governa todas as galáxias com poder e equidade.",
    "keywords": [
      "trono",
      "arsh",
      "majestade",
      "soberania",
      "grandeza",
      "glória"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:255",
      "7:54",
      "20:5",
      "40:15",
      "69:17",
      "85:15"
    ],
    "reflectionQuestion": "Como a consciência da soberania absoluta do Trono Divino transforma nosso apego às coisas passageiras do mundo?"
  },
  {
    "id": "proximidade-divina",
    "categoryId": "allah-atributos",
    "title": "A proximidade e atenção de Allah (Al-Qarib)",
    "description": "A presença íntima de Allah, mais perto de nós do que a própria veia jugular.",
    "introduction": "Estas passagens confortam os corações mostrando que Allah não é uma divindade distante, mas atenta, acolhedora e que ouve o sussurro mais íntimo de cada oração.",
    "keywords": [
      "proximidade",
      "qarib",
      "presença",
      "súplica",
      "intimidade",
      "escuta"
    ],
    "passageIds": [
      "2:186",
      "50:16",
      "56:85",
      "58:7",
      "11:61"
    ]
  },
  {
    "id": "a-luz-dos-ceus-e-da-terra",
    "categoryId": "allah-atributos",
    "title": "A Luz dos Céus e da Terra (Ayat an-Nur)",
    "description": "A alegoria sublime da Luz divina que ilumina os horizontes e os corações receptivos.",
    "introduction": "A passagem da Luz (Ayat an-Nur) é uma das passagens mais contemplativas do Alcorão. O estudo cuidadoso revela como a revelação e a fé iluminam as trevas existenciais.",
    "keywords": [
      "luz",
      "nur",
      "iluminação",
      "guia",
      "clareza",
      "farol"
    ],
    "passageIds": [
      "24:35",
      "57:28",
      "39:69",
      "64:8",
      "4:174"
    ]
  },
  {
    "id": "amor-a-allah-e-aos-justos",
    "categoryId": "fe-vida-espiritual",
    "title": "O amor a Allah e a Seus servos justos",
    "description": "A devoção baseada no amor recíproco entre o Criador e os crentes sinceros.",
    "introduction": "O Alcorão ensina que a fé autêntica floresce no afeto sincero por Allah e no carinho fraterno por todos os que buscam a retidão. Veja como esse vínculo sustenta a alma.",
    "keywords": [
      "amor",
      "hubb",
      "afeto",
      "devoção",
      "fraternidade",
      "crentes"
    ],
    "passageIds": [
      "2:165",
      "3:31",
      "5:54",
      "19:96",
      "9:24"
    ]
  },
  {
    "id": "firmeza-espiritual-istiqama",
    "categoryId": "fe-vida-espiritual",
    "title": "A firmeza e constância no caminho reto (Istiqama)",
    "description": "A perseverança equilibrada sem desvios, cansaço ou desânimo na caminhada espiritual.",
    "introduction": "Istiqama é a coerência diária de quem professa a fé e alinha suas escolhas ao que é justo. As passagens mostram que a paz dos anjos desce sobre quem se mantém firme.",
    "keywords": [
      "firmeza",
      "istiqama",
      "constância",
      "caminho reto",
      "perseverança"
    ],
    "passageIds": [
      "41:30-32",
      "46:13-14",
      "11:112",
      "1:5-7",
      "16:97"
    ],
    "reflectionQuestion": "Que práticas diárias auxiliam na manutenção da constância espiritual sem cair no comodismo?"
  },
  {
    "id": "preservacao-da-revelacao",
    "categoryId": "alcorao-revelacao",
    "title": "A promessa divina de preservação do Alcorão",
    "description": "A salvaguarda miraculosa do texto corânico contra corrupção, alteração ou perda.",
    "introduction": "O próprio Alcorão declara que Allah é o Guardião de Sua lembrança revelada. Estude os versículos que garantem a autenticidade e inviolabilidade da mensagem através dos séculos.",
    "keywords": [
      "preservação",
      "hifz",
      "autenticidade",
      "guarda",
      "proteção",
      "revelação"
    ],
    "passageIds": [
      "15:9",
      "41:41-42",
      "75:16-19",
      "85:21-22",
      "56:77-80"
    ]
  },
  {
    "id": "parabolas-e-exemplos-coranicos",
    "categoryId": "alcorao-revelacao",
    "title": "As parábolas e metáforas corânicas (Al-Amthal)",
    "description": "O uso magistral de exemplos cotidianos e naturais para esclarecer verdades profundas.",
    "introduction": "O Alcorão ilustra conceitos espirituais com imagens vívidas: árvores férteis, sementes multiplicadas e miragens no deserto. Cada parábola convida a inteligência a ponderar.",
    "keywords": [
      "parábolas",
      "amthal",
      "metáforas",
      "exemplos",
      "reflexão",
      "imagem"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "14:24-27",
      "2:261",
      "24:35",
      "59:21",
      "29:43",
      "39:27"
    ]
  },
  {
    "id": "o-desafio-inimitavel-ijaz",
    "categoryId": "alcorao-revelacao",
    "title": "O desafio inimitável do texto revelado (I'jaz)",
    "description": "O desafio aos céticos de produzir uma única surata comparável em sabedoria e eloquência.",
    "introduction": "Diante da incredulidade, o texto sagrado lançou um repto permanente aos mestres da língua árabe e à humanidade. Pondere sobre a natureza transformadora desta fala.",
    "keywords": [
      "desafio",
      "tahaddi",
      "inimitável",
      "eloquência",
      "milagre",
      "estilo"
    ],
    "passageIds": [
      "2:23-24",
      "11:13",
      "17:88",
      "10:38",
      "52:33-34"
    ]
  },
  {
    "id": "oracao-noturna-tahajjud",
    "categoryId": "adoracao-praticas",
    "title": "A oração na calada da noite (Tahajjud e Qiyam)",
    "description": "O momento íntimo de vigília, silêncio e conexão profunda antes do amanhecer.",
    "introduction": "A vigília noturna é elogiada como escola de força de caráter e pureza. Nestas horas calmas, o crente encontra serenidade e proximidade ímpar com seu Senhor.",
    "keywords": [
      "tahajjud",
      "qiyam",
      "noite",
      "vigília",
      "prece",
      "madrugada"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "17:79",
      "73:1-8",
      "73:20",
      "25:64",
      "32:16-17",
      "51:17-18"
    ]
  },
  {
    "id": "suplicas-e-preces-profeticas",
    "categoryId": "adoracao-praticas",
    "title": "A arte e intimidade da súplica (Du'a)",
    "description": "O diálogo confiante da criatura com o Criador, expondo necessidades e esperanças.",
    "introduction": "O Du'a é a essência da adoração. As passagens ensinam as mais belas súplicas registradas no Alcorão, ensinadas pelos profetas nos momentos de maior vulnerabilidade.",
    "keywords": [
      "dua",
      "súplica",
      "prece",
      "oração íntima",
      "pedido",
      "esperança"
    ],
    "passageIds": [
      "2:186",
      "40:60",
      "7:55-56",
      "21:87-88",
      "3:191-194",
      "25:74"
    ]
  },
  {
    "id": "lembranca-constante-dhikr",
    "categoryId": "adoracao-praticas",
    "title": "A lembrança contínua de Allah (Dhikr)",
    "description": "A evocação frequente que tranquiliza o peito e mantém a mente acordada.",
    "introduction": "O Alcorão enfatiza que é na recordação constante de Allah que os corações encontram sossego verdadeiro. Veja como o Dhikr acompanha o indivíduo deitado, sentado ou em pé.",
    "keywords": [
      "dhikr",
      "lembrança",
      "recordação",
      "tranquilidade",
      "paz interior"
    ],
    "passageIds": [
      "13:28",
      "33:41-42",
      "2:152",
      "63:9",
      "3:191",
      "20:14"
    ]
  },
  {
    "id": "prostracao-e-humildade-sujud",
    "categoryId": "adoracao-praticas",
    "title": "A prostração como ápice da aproximação (Sujud)",
    "description": "A entrega física e espiritual que eleva a alma enquanto a testa toca o solo.",
    "introduction": "No Sujud, a aparente humilhação física torna-se o momento de mais elevada dignidade espiritual. Examine as passagens que coroam a oração com este gesto solene.",
    "keywords": [
      "sujud",
      "prostração",
      "humildade",
      "aproximação",
      "salah"
    ],
    "passageIds": [
      "96:19",
      "48:29",
      "22:77",
      "32:15",
      "76:26"
    ]
  },
  {
    "id": "fala-nobre-e-palavra-gentil",
    "categoryId": "etica-carater",
    "title": "A fala nobre, a discrição e a palavra gentil",
    "description": "O poder das boas palavras e a exigência de evitar a rudeza, o sarcasmo e a agressão verbal.",
    "introduction": "O Alcorão compara a palavra bondosa a uma árvore excelente de raízes firmes e ramos frondosos. Aprenda o código ético corânico para as conversas e redes humanas.",
    "keywords": [
      "fala",
      "palavra nobre",
      "gentileza",
      "respeito",
      "discrição",
      "diálogo"
    ],
    "passageIds": [
      "17:53",
      "2:83",
      "49:11-12",
      "14:24-25",
      "33:70-71"
    ]
  },
  {
    "id": "paciencia-exemplar-sabr-jamil",
    "categoryId": "etica-carater",
    "title": "A nobreza da paciência exemplar (Sabr Jamil)",
    "description": "A resiliência digna que não se entrega a queixas fúteis nem ao rancor.",
    "introduction": "O conceito de Sabr Jamil (bela paciência) surge nas histórias de Jacó e dos profetas. Trata-se de uma força ativa que combina contenção emotiva com ação inteligente e fé inabalável.",
    "keywords": [
      "sabr",
      "paciência",
      "resiliência",
      "perseverança",
      "dignidade"
    ],
    "passageIds": [
      "12:18",
      "12:83",
      "70:5",
      "2:153",
      "2:155-157",
      "39:10"
    ]
  },
  {
    "id": "rejeicao-a-fofoca-e-calunia",
    "categoryId": "etica-carater",
    "title": "A rejeição à murmuração, suspeita e difamação",
    "description": "A condenação estrita do mexerico, da espionagem da vida alheia e do julgamento precipitado.",
    "introduction": "A surata Al-Hujurat estabelece um escudo protetor para a honra alheia, proibindo suposições injustas, espionagem e falar pelas costas. Preserve a integridade das relações comunitárias.",
    "keywords": [
      "fofoca",
      "calúnia",
      "mexerico",
      "suspeita",
      "honra",
      "privacidade"
    ],
    "passageIds": [
      "49:12",
      "104:1",
      "24:15-16",
      "68:10-12",
      "4:112"
    ]
  },
  {
    "id": "protecao-da-vida-e-seguranca",
    "categoryId": "sociedade-direitos",
    "title": "A santidade suprema da vida humana e da segurança",
    "description": "O princípio de que salvar uma vida equivale a salvar toda a humanidade.",
    "introduction": "O Alcorão consagra a vida de cada ser humano como patrimônio divino inegociável. Estude os fundamentos corânicos da inviolabilidade do sangue e da pacificação social.",
    "keywords": [
      "vida",
      "santidade",
      "segurança",
      "paz",
      "justiça social",
      "proteção"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "5:32",
      "6:151",
      "17:33",
      "4:92-93",
      "2:178-179"
    ]
  },
  {
    "id": "zelo-pelo-vizinho-e-viajante",
    "categoryId": "sociedade-direitos",
    "title": "O direito do vizinho, do viajante e do desamparado",
    "description": "A expansão dos círculos de solidariedade para além dos laços consanguíneos.",
    "introduction": "A ordem corânica inclui expressamente o vizinho próximo, o vizinho estranho, o colega de jornada e o forasteiro necessitado. Conheça a rede de amparo fraterno revelada.",
    "keywords": [
      "vizinho",
      "viajante",
      "hospitalidade",
      "solidariedade",
      "cuidado"
    ],
    "passageIds": [
      "4:36",
      "17:26",
      "30:38",
      "59:7",
      "76:8-9"
    ]
  },
  {
    "id": "afeto-e-misericordia-conjugal",
    "categoryId": "familia-relacoes",
    "title": "O afeto mútuo e a misericórdia no matrimônio",
    "description": "O casamento fundamentado em tranquilidade, carinho acolhedor e parceria madura.",
    "introduction": "O versículo 30:21 é uma das mais tocantes definições do matrimônio: laço criado para que encontreis repouso na vossa metade, depositando entre vós afeto e misericórdia.",
    "keywords": [
      "casamento",
      "afeto",
      "mawaddah",
      "misericórdia",
      "harmonia",
      "matrimônio"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "30:21",
      "4:19",
      "2:187",
      "2:228",
      "65:6"
    ]
  },
  {
    "id": "cuidado-e-educacao-dos-filhos",
    "categoryId": "familia-relacoes",
    "title": "A educação virtuosa e a proteção dos filhos",
    "description": "Os conselhos do sábio Luqman e o dever de nutrir a mente e o coração das novas gerações.",
    "introduction": "Luqman dialoga com seu filho com ternura, ensinando respeito, modéstia, retidão e consciência espiritual. As passagens orientam mães e pais na nobre arte de educar com amor.",
    "keywords": [
      "filhos",
      "luqman",
      "educação",
      "cuidado",
      "família",
      "ternura"
    ],
    "passageIds": [
      "31:13-19",
      "66:6",
      "17:31",
      "25:74",
      "46:15"
    ]
  },
  {
    "id": "reconciliacao-e-resolucao-familiar",
    "categoryId": "familia-relacoes",
    "title": "A conciliação e a mediação nas crises familiares",
    "description": "Os mecanismos sábios de mediação e justiça para curar rupturas entre parentes.",
    "introduction": "O Alcorão oferece diretrizes práticas para mediar desavenças e buscar a paz antes de tomar decisões irreversíveis, zelando sempre pela honra dos cônjuges e pelo bem dos filhos.",
    "keywords": [
      "conciliação",
      "mediação",
      "casamento",
      "acordo",
      "paz familiar"
    ],
    "passageIds": [
      "4:35",
      "4:128",
      "2:229-231",
      "33:49",
      "65:1-2"
    ]
  },
  {
    "id": "a-serenidade-do-coracao-sakinah",
    "categoryId": "provacoes-interior",
    "title": "A paz interior e serenidade divina (Sakinah)",
    "description": "A descida da quietude celeste nos momentos de maior tensão e incerteza.",
    "introduction": "Sakinah é a serenidade sobrenatural que Allah deposita no íntimo dos fiéis quando o mundo ao redor parece ruir. Descubra os episódios históricos e espirituais onde ela se manifestou.",
    "keywords": [
      "sakinah",
      "serenidade",
      "paz interior",
      "tranquilidade",
      "alívio"
    ],
    "passageIds": [
      "48:4",
      "48:18",
      "48:26",
      "9:40",
      "13:28"
    ]
  },
  {
    "id": "refugio-contra-o-mal-istiadha",
    "categoryId": "provacoes-interior",
    "title": "O refúgio divino contra o sussurro e a inveja",
    "description": "O escudo das duas últimas suratas (Al-Mu'awwidhatayn) e a proteção permanente.",
    "introduction": "As suratas Al-Falaq e An-Nas ensinam o ser humano a buscar abrigo em Deus contra o mal da escuridão, contra os ardis da inveja e contra os sussurros que tentam enfraquecer a alma.",
    "keywords": [
      "refúgio",
      "istiadha",
      "proteção",
      "falaq",
      "nas",
      "inveja",
      "cura"
    ],
    "passageIds": [
      "113:1-5",
      "114:1-6",
      "7:200-201",
      "41:36",
      "23:97-98"
    ]
  },
  {
    "id": "o-alivio-apos-a-dificuldade",
    "categoryId": "provacoes-interior",
    "title": "A certeza irrevogável do alívio após a adversidade",
    "description": "A promessa de que com a dificuldade caminha entrelaçada a facilidade.",
    "introduction": "A surata Ash-Sharh (A Abertura do Peito) traz uma das declarações mais reconfortantes da revelação: 'Em verdade, com a dificuldade está o alívio'. Renove suas energias nestas passagens.",
    "keywords": [
      "alívio",
      "esperança",
      "facilidade",
      "superação",
      "promessa",
      "ânimo"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "94:5-6",
      "65:7",
      "2:214",
      "12:87",
      "3:139"
    ]
  },
  {
    "id": "combate-ao-desespero-e-tristeza",
    "categoryId": "provacoes-interior",
    "title": "A cura para a angústia da alma e o combate ao pessimismo",
    "description": "A rejeição ao abatimento estéril e o resgate da confiança na providência divina.",
    "introduction": "O Alcorão proíbe perder as esperanças na misericórdia de Allah, pois somente os descrentes se desesperam. Examine como a mensagem sagrada dissipa nuvens de pessimismo.",
    "keywords": [
      "desespero",
      "tristeza",
      "ânimo",
      "otimismo",
      "cura espiritual"
    ],
    "passageIds": [
      "12:87",
      "15:56",
      "39:53",
      "3:139",
      "9:40"
    ]
  },
  {
    "id": "boas-obras-apagam-as-faltas",
    "categoryId": "arrependimento-transformacao",
    "title": "A transformação através de boas obras que anulam os erros",
    "description": "A lei espiritual de que atos de virtude dissipam as manchas das más ações passadas.",
    "introduction": "Allah não apenas perdoa, mas transforma faltas passadas em boas ações para aqueles que se corrigem e realizam o bem com sinceridade. Veja a beleza dessa redenção.",
    "keywords": [
      "boas obras",
      "redenção",
      "transformação",
      "purificação",
      "renovação"
    ],
    "passageIds": [
      "11:114",
      "25:70",
      "3:135-136",
      "4:31",
      "29:7"
    ]
  },
  {
    "id": "a-porta-aberta-do-perdao",
    "categoryId": "arrependimento-transformacao",
    "title": "A amplitude inesgotável do acolhimento divino",
    "description": "O convite generoso a qualquer pessoa para retornar a Deus a qualquer instante da vida.",
    "introduction": "Mesmo quem tenha errado excessivamente contra si mesmo é chamado carinhosamente: 'Não vos desespereis da misericórdia de Allah'. Estude as promessas de reconciliação com o Pai da Criação.",
    "keywords": [
      "perdão",
      "tawbah",
      "acolhimento",
      "retorno",
      "misericórdia"
    ],
    "passageIds": [
      "4:110",
      "39:53",
      "20:82",
      "5:74",
      "42:25"
    ]
  },
  {
    "id": "proibicao-da-usura-e-exploracao",
    "categoryId": "riqueza-trabalho",
    "title": "A severa advertência contra a usura e especulação (Riba)",
    "description": "A proteção dos vulneráveis contra juros escorchantes e finanças predatórias.",
    "introduction": "O Alcorão traça um contraste explícito entre o comércio lícito, que gera valor real, e a usura (Riba), que consome o suor do devedor e concentra a renda de maneira injusta.",
    "keywords": [
      "riba",
      "usura",
      "juros",
      "justiça econômica",
      "exploração",
      "finanças"
    ],
    "passageIds": [
      "2:275-280",
      "3:130",
      "4:161",
      "30:39",
      "2:276"
    ]
  },
  {
    "id": "equilibrio-sem-avareza-nem-desperdicio",
    "categoryId": "riqueza-trabalho",
    "title": "A moderação orçamentária sem avareza nem desperdício",
    "description": "A postura nobre de quem não acumula egoisticamente nem dilapida sem responsabilidade.",
    "introduction": "Os servos do Misericordioso são descritos como aqueles que, quando gastam, não são pródigos nem avaros, mantendo-se em justo equilíbrio. Conheça as lições de finanças conscientes.",
    "keywords": [
      "moderação",
      "orçamento",
      "avareza",
      "desperdício",
      "equilíbrio",
      "consumo"
    ],
    "passageIds": [
      "17:26-27",
      "17:29",
      "25:67",
      "7:31",
      "4:36-37"
    ]
  },
  {
    "id": "dignidade-do-trabalho-e-sustento-licito",
    "categoryId": "riqueza-trabalho",
    "title": "O valor do esforço honrado e do alimento puro (Halal Tayyib)",
    "description": "A busca pelo sustento honesto como forma nobre de adoração e cidadania.",
    "introduction": "O Alcorão convida a percorrer os caminhos da Terra colhendo da provisão de Deus com mãos limpas e trabalho útil, desfrutando de alimentos sadios e transparentes.",
    "keywords": [
      "trabalho",
      "sustento",
      "halal",
      "esforço",
      "dignidade",
      "profissão"
    ],
    "passageIds": [
      "67:15",
      "62:10",
      "2:168",
      "2:172",
      "23:51"
    ]
  },
  {
    "id": "yusuf-e-a-virtude-na-adversidade",
    "categoryId": "profetas-mensageiros",
    "title": "A sabedoria, pureza e vitória de José (Yusuf)",
    "description": "A narrativa mais bela: da cisterna ao governo do Egito com perdão incondicional.",
    "introduction": "A surata de Yusuf ensina como a fidelidade a Deus, o autocontrole contra tentações e a paciência ativa transformam provações amargas em triunfos de beneficência.",
    "keywords": [
      "yusuf",
      "josé",
      "pureza",
      "egito",
      "perdão",
      "sabedoria",
      "sonhos"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "12:21-22",
      "12:33-34",
      "12:87-92",
      "12:100-101",
      "12:53-56",
      "12:18"
    ]
  },
  {
    "id": "nuh-e-a-perseveranca-inabalavel",
    "categoryId": "profetas-mensageiros",
    "title": "A perseverança milenar do Profeta Noé (Nuh)",
    "description": "A pregação paciente e o resgate da arca através do dilúvio purificador.",
    "introduction": "Noé chamou seu povo dia e noite, em público e em segredo, suportando zombarias por séculos com fé irremovível. Estude o exemplo supremo de resiliência ministerial.",
    "keywords": [
      "nuh",
      "noé",
      "arca",
      "perseverança",
      "dilúvio",
      "chamamento"
    ],
    "passageIds": [
      "71:1-12",
      "11:36-48",
      "23:23-30",
      "26:105-122",
      "29:14-15"
    ]
  },
  {
    "id": "ayyub-e-a-paciencia-inabalavel",
    "categoryId": "profetas-mensageiros",
    "title": "A paciência e cura exemplar de Jó (Ayyub)",
    "description": "O modelo imorredouro de quem preservou o louvor a Deus mesmo no auge da enfermidade.",
    "introduction": "Jó perdeu saúde, bens e filhos, mas jamais perdeu a reverência ao Criador. Sua súplica humilde foi atendida com restauração em dobro e bálsamo celestial.",
    "keywords": [
      "ayyub",
      "jó",
      "enfermidade",
      "cura",
      "paciência",
      "provação"
    ],
    "passageIds": [
      "21:83-84",
      "38:41-44",
      "4:163",
      "6:84",
      "21:84"
    ]
  },
  {
    "id": "dawud-wa-sulayman-justica-e-gratidao",
    "categoryId": "profetas-mensageiros",
    "title": "Davi e Salomão: liderança justa, ciência e gratidão",
    "description": "A realeza consagrada à justiça, ao conhecimento dos animais e à gratidão ativa.",
    "introduction": "Davi, com seus Salmos e manufatura de ferro, e Salomão, compreendendo a fala dos pássaros e ventos, ensinam que o poder político e a prosperidade devem servir à humildade.",
    "keywords": [
      "davi",
      "dawud",
      "salomão",
      "sulayman",
      "sabedoria",
      "realeza",
      "justiça"
    ],
    "passageIds": [
      "27:15-19",
      "34:10-13",
      "38:24-26",
      "38:30-40",
      "21:78-82"
    ]
  },
  {
    "id": "unidade-e-fraternidade-dos-profetas",
    "categoryId": "profetas-mensageiros",
    "title": "A fraternidade e mensagem comum de todos os mensageiros",
    "description": "O elo inquebrantável entre Adão, Abraão, Moisés, Jesus e Muhammad.",
    "introduction": "O Alcorão ordena que não façamos distinção arbitrária entre os mensageiros de Deus: todos compartilham o mesmo tronco profético, chamando à justiça e à fé num Único Criador.",
    "keywords": [
      "profetas",
      "mensageiros",
      "fraternidade",
      "continuidade",
      "unidade"
    ],
    "passageIds": [
      "2:285",
      "4:163-165",
      "21:92",
      "23:51-53",
      "42:13"
    ]
  },
  {
    "id": "o-ciclo-das-aguas-e-ventos",
    "categoryId": "criacao-natureza",
    "title": "O milagre hidrológico, chuvas vivificadoras e ventos férteis",
    "description": "A circulação das águas como símbolo palpável da ressuscitação da terra estéril.",
    "introduction": "As passagens sobre o ciclo da chuva e da fertilização pelos ventos antecipam lições de ecologia e mostram aos olhos humanos o milagre contínuo da renovação da vida.",
    "keywords": [
      "água",
      "chuva",
      "ventos",
      "hidrologia",
      "natureza",
      "fertilidade"
    ],
    "passageIds": [
      "15:22",
      "25:48-49",
      "30:48-50",
      "35:9",
      "23:18-19",
      "56:68-70"
    ]
  },
  {
    "id": "o-misterio-do-desenvolvimento-embrionario",
    "categoryId": "criacao-natureza",
    "title": "Os estágios da formação embrionária e o milagre da vida",
    "description": "A gênese humana descrita no ventre materno em três camadas de escuridão.",
    "introduction": "O Alcorão detalha a transição da gota seminal para o coágulo e para o embrião revestido de ossos e carne com precisão que fascina cientistas e teólogos.",
    "keywords": [
      "embriologia",
      "vida",
      "gestação",
      "útero",
      "criação humana",
      "ciência"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "23:12-14",
      "22:5",
      "39:6",
      "75:37-39",
      "96:1-2",
      "32:7-9"
    ]
  },
  {
    "id": "a-ordem-das-orbitas-e-gravidade-celeste",
    "categoryId": "criacao-natureza",
    "title": "O equilíbrio cósmico, as órbitas planetárias e as estrelas",
    "description": "A coreografia sublime do Sol e da Lua, cada qual nadando em sua rota prescrita.",
    "introduction": "O cosmos não é fruto do acaso caótico: o Alcorão celebra a métrica precisa dos corpos celestes, servindo de guia aos navegantes e testemunho da harmonia universal.",
    "keywords": [
      "astronomia",
      "órbitas",
      "sol",
      "lua",
      "estrelas",
      "universo",
      "cosmos"
    ],
    "passageIds": [
      "21:33",
      "36:38-40",
      "55:5-7",
      "67:3-5",
      "86:11-12"
    ]
  },
  {
    "id": "jovens-da-caverna-ashab-al-kahf",
    "categoryId": "historia-povos",
    "title": "A coragem e fé inabalável dos Jovens da Caverna (Ashab al-Kahf)",
    "description": "A juventude que se recusou a idolatrar tiranos e encontrou refúgio milagroso na rocha.",
    "introduction": "A história dos jovens da caverna é lida semanalmente em Al-Kahf para inspirar integridade ética diante de maiorias corruptas, confiando que Deus multiplica Seus milagres no silêncio.",
    "keywords": [
      "ashab al-kahf",
      "caverna",
      "juventude",
      "coragem",
      "milagre",
      "proteção"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "18:9-16",
      "18:17-22",
      "18:25-26",
      "18:13-14",
      "18:10"
    ]
  },
  {
    "id": "dhul-qarnayn-e-o-poder-a-servico-do-bem",
    "categoryId": "historia-povos",
    "title": "Dhul-Qarnayn: liderança justa, tecnologia e proteção aos fracos",
    "description": "O estadista que usou ciência metalúrgica e autoridade para proteger populações vulneráveis.",
    "introduction": "Dhul-Qarnayn percorreu os horizontes do Ocidente ao Oriente construindo defesas para povos oprimidos sem cobrar tributos pessoais. Um modelo magnífico de poder a serviço do bem.",
    "keywords": [
      "dhul-qarnayn",
      "liderança",
      "tecnologia",
      "justiça histórica",
      "proteção"
    ],
    "passageIds": [
      "18:83-88",
      "18:89-98",
      "18:94-98",
      "18:84",
      "18:88"
    ]
  },
  {
    "id": "perdao-e-inclinacao-a-paz",
    "categoryId": "conflito-paz",
    "title": "A resposta justa com benevolência e a prioridade da paz",
    "description": "A obrigação de acolher qualquer inclinação à paz e responder à hostilidade com bondade.",
    "introduction": "O Alcorão ordena: 'Se eles se inclinarem à paz, inclina-te também a ela e confia em Allah'. Descubra como a pacificação e a justiça restaurativa prevalecem sobre a vingança.",
    "keywords": [
      "paz",
      "reconciliação",
      "tratados",
      "tolerância",
      "benevolência",
      "harmonia"
    ],
    "passageIds": [
      "41:34-35",
      "8:61",
      "4:90",
      "60:8-9",
      "42:40-43"
    ]
  },
  {
    "id": "transicao-da-alma-sakarat-al-mawt",
    "categoryId": "morte-juizo",
    "title": "A transição da alma e o momento do desligamento terreno",
    "description": "A realidade da partida terrena, a serenidade dos justos e o acolhimento dos anjos.",
    "introduction": "As passagens tratam da partida final com realismo e esperança: para as almas pacificadas, os anjos descem com perfumes e saudações de paz, acolhendo-as no repouso celestial.",
    "keywords": [
      "morte",
      "alma",
      "transição",
      "anjos",
      "partida",
      "paz"
    ],
    "passageIds": [
      "50:19",
      "75:26-30",
      "56:83-87",
      "6:93",
      "79:1-2"
    ]
  },
  {
    "id": "o-toque-da-trombeta-as-sur",
    "categoryId": "morte-juizo",
    "title": "O toque da trombeta e o despertar cósmico da humanidade",
    "description": "O momento cósmico da cessação do mundo e o ressurgimento para o encontro eterno.",
    "introduction": "As imagens do sopro da trombeta (As-Sur) convocam toda a criação à presença de seu Soberano. Pondere sobre a grandiosidade de cada criatura comparecendo perante o Criador.",
    "keywords": [
      "trombeta",
      "as-sur",
      "ressurreição",
      "despertar",
      "juízo",
      "fim dos tempos"
    ],
    "passageIds": [
      "39:68",
      "69:13-16",
      "78:18-20",
      "20:102-104",
      "18:99"
    ]
  },
  {
    "id": "o-livro-aberto-das-acoes",
    "categoryId": "morte-juizo",
    "title": "A leitura do registro individual sem nada omitido",
    "description": "A transparência total onde o peso de uma partícula de bem ou mal será contemplado.",
    "introduction": "Nenhum ato de compaixão foi em vão e nenhuma injustiça foi esquecida. A entrega do livro das ações em mãos destina aos justos uma alegria eterna sem mácula.",
    "keywords": [
      "registro",
      "livro",
      "ações",
      "justiça perfeita",
      "partícula",
      "mizan"
    ],
    "passageIds": [
      "69:19-26",
      "84:7-12",
      "18:49",
      "17:13-14",
      "99:7-8"
    ]
  },
  {
    "id": "a-felicidade-suprema-visita-a-face-divina",
    "categoryId": "paraiso-inferno-futuro",
    "title": "A contemplação da Face do Senhor e o contentamento perene",
    "description": "A recompensa máxima do Paraíso: a satisfação divina e a visão luminosa.",
    "introduction": "Mais do que rios de leite e mel ou palácios celestes, a maior bênção do Paraíso é a aprovação calorosa de Allah e o privilégio de contemplar Sua Face sem véus.",
    "keywords": [
      "face divina",
      "jannah",
      "recompensa suprema",
      "visão",
      "plenitude"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "75:22-23",
      "10:26",
      "83:22-28",
      "9:72",
      "50:35"
    ]
  },
  {
    "id": "o-dialogo-entre-os-habitantes-do-alem",
    "categoryId": "paraiso-inferno-futuro",
    "title": "As lições morais nos diálogos revelados da Outra Vida",
    "description": "As conversas entre os moradores dos Jardins e os que negligenciaram o dever moral.",
    "introduction": "O Alcorão abre uma janela profética para as conversas francas da eternidade: 'O que vos levou ao fogo? Responderam: Não éramos dos que oravam, nem alimentávamos o indigente'.",
    "keywords": [
      "diálogo",
      "outra vida",
      "jardins",
      "reflexão",
      "responsabilidade",
      "destino"
    ],
    "passageIds": [
      "7:44-51",
      "37:50-61",
      "74:40-47",
      "67:8-11",
      "26:96-102"
    ]
  },
  {
    "id": "o-dom-da-sabedoria-profunda",
    "categoryId": "sabedoria-conhecimento",
    "title": "O valor inestimável da sabedoria concedida (Al-Hikmah)",
    "description": "A compreensão lúcida que harmoniza fé, inteligência prática e discernimento moral.",
    "introduction": "O Alcorão declara que àquele a quem é dada a sabedoria (Hikmah) foi concedido um imenso bem. A sabedoria supera a mera informação: ela guia o comportamento em direção à luz.",
    "keywords": [
      "sabedoria",
      "hikmah",
      "discernimento",
      "lucidez",
      "virtude",
      "entendimento"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "2:269",
      "31:12",
      "17:39",
      "4:113",
      "3:48",
      "62:2"
    ]
  },
  {
    "id": "o-uso-da-razao-e-discernimento",
    "categoryId": "sabedoria-conhecimento",
    "title": "O imperativo do raciocínio lógico e discernimento ('Aql)",
    "description": "As dezenas de admoestações corânicas: 'Acaso não raciocinais? Acaso não ponderais?'.",
    "introduction": "O Alcorão reprova o obscurantismo e a aceitação cega de dogmas sem exame crítico. As faculdades mentais humanas são dádivas que exigem uso diligente e honesto.",
    "keywords": [
      "razão",
      "aql",
      "inteligência",
      "pensamento crítico",
      "lógica",
      "exame"
    ],
    "passageIds": [
      "2:164",
      "2:242",
      "67:10",
      "39:9",
      "8:22",
      "12:108"
    ]
  },
  {
    "id": "o-conhecimento-como-elevacao",
    "categoryId": "sabedoria-conhecimento",
    "title": "A distinção e honra dos que buscam a instrução sincera",
    "description": "A superioridade moral e espiritual dos que estudam e aplicam a verdade com temor.",
    "introduction": "Entre os servos de Deus, os que detêm o conhecimento são os mais tocados pela reverência diante do milagre cósmico. A primeira palavra revelada foi 'Lê!' (Iqra).",
    "keywords": [
      "conhecimento",
      "ciência",
      "instrução",
      "iqra",
      "estudo",
      "educação"
    ],
    "passageIds": [
      "58:11",
      "35:28",
      "20:114",
      "39:9",
      "96:1-5"
    ]
  },
  {
    "id": "a-prudencia-antes-de-julgar",
    "categoryId": "sabedoria-conhecimento",
    "title": "A verificação das notícias e prudência contra boatos",
    "description": "A diretriz de checar as fontes de qualquer relato antes de disseminar falsidades.",
    "introduction": "Em um mundo de boatos e precipitadas condenações públicas, o versículo 49:6 brilha como regra de ouro da higiene informacional: 'Se vos chegar um transgressor com uma notícia, averiguai-a'.",
    "keywords": [
      "prudência",
      "averiguação",
      "notícias",
      "boatos",
      "discrição",
      "verdade"
    ],
    "passageIds": [
      "49:6",
      "17:36",
      "4:83",
      "24:12",
      "6:116"
    ]
  },
  {
    "id": "o-aprendizado-humilde-com-outros",
    "categoryId": "sabedoria-conhecimento",
    "title": "A humildade do discípulo e a jornada com Al-Khidr",
    "description": "As lições de Moisés no encontro misterioso com o servo sábio nas confluências dos mares.",
    "introduction": "Mesmo um profeta do porte de Moisés foi instruído a viajar com paciência para aprender dimensões ocultas da sabedoria com Al-Khidr. Um hino à modéstia intelectiva.",
    "keywords": [
      "khidr",
      "moisés",
      "musa",
      "discípulo",
      "humildade",
      "sabedoria oculta"
    ],
    "passageIds": [
      "18:65-70",
      "18:71-78",
      "18:79-82",
      "16:43",
      "21:7"
    ]
  },
  {
    "id": "os-limites-do-conhecimento-criado",
    "categoryId": "sabedoria-conhecimento",
    "title": "A humildade perante os mistérios insondáveis da existência",
    "description": "A ciência humana como gota d'água perante o oceano infinito do saber divino.",
    "introduction": "O Alcorão nos lembra: 'Do conhecimento não vos foi dado senão uma pequena porção'. Reconhecer os limites humanos previne a vaidade científica e preserva o assombro respeitoso.",
    "keywords": [
      "mistério",
      "limites",
      "humildade",
      "ghayb",
      "onisciência",
      "invisível"
    ],
    "passageIds": [
      "17:85",
      "2:255",
      "31:34",
      "7:187",
      "6:59"
    ]
  },
  {
    "id": "o-pacto-primordial-mithaq",
    "categoryId": "pactos-aliancas",
    "title": "O pacto primordial das almas com o Criador (Al-Mithaq)",
    "description": "O testemunho original da humanidade: 'Não sou Eu o vosso Senhor? Responderam: Sim!'.",
    "introduction": "Na tradição corânica, cada alma humana carrega a memória inata de seu vínculo com o Criador, selado antes do nascimento terreno. O Alcorão desperta este pacto esquecido.",
    "keywords": [
      "mithaq",
      "pacto primordial",
      "fitrah",
      "testemunho",
      "origem",
      "alma"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "7:172-173",
      "2:27",
      "13:20",
      "5:7",
      "33:7-8"
    ]
  },
  {
    "id": "fidelidade-absoluta-a-palavra",
    "categoryId": "pactos-aliancas",
    "title": "A santidade do compromisso e da palavra empenhada",
    "description": "O imperativo sagrado: 'Ó vós que credes, cumpri com lealdade vossos contratos!'.",
    "introduction": "A palavra do crente tem peso de juramento sagrado. O Alcorão proíbe desculpas esfarrapadas para rescindir compromissos assumidos, fazendo da confiabilidade a espinha dorsal da sociedade.",
    "keywords": [
      "contratos",
      "lealdade",
      "palavra",
      "compromisso",
      "fidelidade",
      "honra"
    ],
    "passageIds": [
      "17:34",
      "5:1",
      "16:91-92",
      "23:8",
      "70:32"
    ]
  },
  {
    "id": "a-traicao-e-quebra-de-juramento",
    "categoryId": "pactos-aliancas",
    "title": "As consequências morais e espirituais da perfídia",
    "description": "A aversão divina à quebra leviana de juramentos e à duplicidade de caráter.",
    "introduction": "Romper pactos com desculpas interesseiras corrói a confiança comunitária e atrai a rejeição de Allah. Veja os alertas corânicos contra transformar acordos solenes em peças de conveniência.",
    "keywords": [
      "traição",
      "perfídia",
      "quebra de juramento",
      "hipocrisia",
      "confiança"
    ],
    "passageIds": [
      "16:94",
      "9:4",
      "8:58",
      "4:155",
      "2:100",
      "3:77"
    ]
  },
  {
    "id": "a-lealdade-nas-horas-dificeis",
    "categoryId": "pactos-aliancas",
    "title": "A constância dos leais nos momentos de provação extrema",
    "description": "O louvor àqueles que honraram seu juramento mesmo sob risco de vida.",
    "introduction": "Na Batalha dos Aliados (Al-Ahzab), homens honrados provaram sua lealdade incondicional, cumprindo o que haviam prometido a Deus sem vacilar nem mudar de postura.",
    "keywords": [
      "lealdade",
      "ahzab",
      "fidelidade",
      "honra",
      "coragem",
      "sacrifício"
    ],
    "passageIds": [
      "33:23",
      "48:10",
      "48:18",
      "9:119",
      "2:177"
    ]
  },
  {
    "id": "o-resgate-das-promessas-divinas",
    "categoryId": "pactos-aliancas",
    "title": "A fidelidade inabalável das promessas reveladas por Allah",
    "description": "A certeza inabalável de que a palavra do Senhor jamais falhará aos crentes.",
    "introduction": "Se os seres humanos por vezes vacilam, a palavra de Allah é firme como as montanhas: 'Em verdade, Allah jamais quebra a Sua promessa'. Alimente sua esperança nessa certeza.",
    "keywords": [
      "promessa de deus",
      "fidelidade divina",
      "verdade",
      "cumprimento",
      "esperança"
    ],
    "passageIds": [
      "3:9",
      "30:6",
      "39:20",
      "14:47",
      "18:98"
    ]
  },
  {
    "id": "o-principio-da-consulta-mutua",
    "categoryId": "lideranca-consulta",
    "title": "A deliberação coletiva e a força da consulta fraterna (Shura)",
    "description": "A governança inspirada no diálogo, na escuta ativa e na busca pelo consenso prudente.",
    "introduction": "O Alcorão eleva a Shura (consulta mútua) ao nível da oração e da caridade. Líderes autênticos não impõem vontades solitárias, mas ouvem a sabedoria plural de sua comunidade.",
    "keywords": [
      "shura",
      "consulta",
      "deliberação",
      "consenso",
      "diálogo",
      "governança"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "42:38",
      "3:159",
      "2:233",
      "27:32-33",
      "28:20"
    ]
  },
  {
    "id": "a-justica-incondicional-no-comando",
    "categoryId": "lideranca-consulta",
    "title": "A administração reta e o dever de julgar com equidade",
    "description": "A instrução solene de restituir as confianças e arbitrar sem favoritismos.",
    "introduction": "Quando o líder ou magistrado julga entre as pessoas, a ordem divina é categórica: 'Julgai com equidade estrita'. A lei deve proteger o fraco e cobrar o poderoso com a mesma balança.",
    "keywords": [
      "justiça",
      "equidade",
      "magistratura",
      "imparcialidade",
      "comando",
      "direito"
    ],
    "passageIds": [
      "4:58",
      "38:26",
      "5:42",
      "4:135",
      "16:90",
      "60:8"
    ]
  },
  {
    "id": "lideranca-como-servico-e-mansidao",
    "categoryId": "lideranca-consulta",
    "title": "O líder como pastor zeloso, paciente e misericordioso",
    "description": "A exortação ao Profeta Muhammad: 'Pela misericórdia de Allah, foste brando para com eles'.",
    "introduction": "Se o líder fosse duro de coração e rude nas palavras, os companheiros teriam se dispersado. A verdadeira autoridade moral nasce da generosidade, da escuta e do perdão.",
    "keywords": [
      "mansidão",
      "serviço",
      "liderança compassiva",
      "paciência",
      "cuidado"
    ],
    "passageIds": [
      "3:159",
      "9:128",
      "26:215",
      "18:28",
      "21:73"
    ]
  },
  {
    "id": "combate-a-tirania-e-ao-abuso",
    "categoryId": "lideranca-consulta",
    "title": "A crítica corânica aos tiranos que oprimem seus povos",
    "description": "As advertências históricas contra a soberba faraônica e a divisão manipuladora da sociedade.",
    "introduction": "O Faraó é retratado no Alcorão como o arquétipo do déspota corrupto que dividiu seu povo em castas para esmagar os fragilizados. Examine a desconstrução corânica do autoritarismo.",
    "keywords": [
      "tirania",
      "faraó",
      "opressão",
      "libertação",
      "justiça",
      "resistência"
    ],
    "passageIds": [
      "28:4",
      "79:17-24",
      "44:17-22",
      "89:11-13",
      "11:96-97"
    ]
  },
  {
    "id": "competencia-e-integridade-nos-cargos",
    "categoryId": "lideranca-consulta",
    "title": "A união essencial entre capacidade técnica e integridade moral",
    "description": "A regra de ouro da filha de Shuaib: 'O melhor a quem podes contratar é o forte e confiável'.",
    "introduction": "O Alcorão não separa virtude moral de competência prática: a administração de José no Egito e a liderança de Moisés demonstram que cargos públicos exigem perícia técnica e honestidade absoluta.",
    "keywords": [
      "competência",
      "integridade",
      "capacidade",
      "gestão",
      "meritocracia",
      "ética"
    ],
    "passageIds": [
      "28:26",
      "12:55",
      "2:247",
      "4:58",
      "17:34"
    ]
  },
  {
    "id": "a-prestacao-de-contas-do-governante",
    "categoryId": "lideranca-consulta",
    "title": "A responsabilidade perante Allah pelo bem-estar público",
    "description": "A consciência de que toda autoridade é encargo pesado que será escrutinado no Juízo.",
    "introduction": "Governar no Alcorão não é privilégio hereditário, mas missão de guarda ('Amanah'). Aqueles estabelecidos na terra têm a obrigação de zelar pela oração, pela caridade e pela promoção do bem.",
    "keywords": [
      "prestação de contas",
      "responsabilidade",
      "amanah",
      "bem comum",
      "governo"
    ],
    "passageIds": [
      "22:41",
      "38:26",
      "2:205-206",
      "17:36",
      "102:8"
    ]
  },
  {
    "id": "resolucao-pacifica-de-impasses",
    "categoryId": "lideranca-consulta",
    "title": "A sabedoria para desatar nós e promover a conciliação pública",
    "description": "O método de resolver disputas com moderação, salvando vidas e recompondo a harmonia.",
    "introduction": "Quando facções entram em conflito, o dever dos líderes e da sociedade é intervir com justiça restaurativa para recompor a paz fraterna, sem tomar partido de opressores.",
    "keywords": [
      "mediação",
      "pacificação",
      "conciliação",
      "harmonia",
      "paz pública"
    ],
    "passageIds": [
      "4:114",
      "49:9",
      "8:1",
      "4:128",
      "2:224"
    ]
  },
  {
    "id": "o-sucesso-esta-em-purificar-a-alma",
    "categoryId": "saude-purificacao-alma",
    "title": "A vitória espiritual alcançada pelo cultivo interior (Tazkiyah)",
    "description": "A surata Ash-Shams: 'Triunfa aquele que a purifica, e fracassa aquele que a corrompe'.",
    "introduction": "A alma humana foi plasmada com inclinações ao bem e ao mal. O sucesso verdadeiro não reside em posses materiais, mas no polimento diligente do caráter diante do Criador.",
    "keywords": [
      "tazkiyah",
      "purificação",
      "alma",
      "sucesso espiritual",
      "virtude",
      "shams"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "91:7-10",
      "87:14-15",
      "20:76",
      "2:151",
      "62:2"
    ]
  },
  {
    "id": "as-doencas-sutis-do-coracao",
    "categoryId": "saude-purificacao-alma",
    "title": "A identificação e cura da inveja, rancor e hipocrisia interior",
    "description": "O diagnóstico corânico das enfermidades espirituais e a prece para extirpar a mágoa.",
    "introduction": "O Alcorão ensina os crentes a rezar: 'Senhor nosso, não coloques em nossos corações rancor algum para com aqueles que creram'. Identificar e purificar a inveja é o primeiro passo para a paz.",
    "keywords": [
      "enfermidades do coração",
      "inveja",
      "rancor",
      "mágoa",
      "cura interior",
      "hipocrisia"
    ],
    "passageIds": [
      "2:10",
      "59:10",
      "113:5",
      "4:54",
      "26:88-89",
      "83:14"
    ]
  },
  {
    "id": "o-coracao-sao-e-pacificado",
    "categoryId": "saude-purificacao-alma",
    "title": "A busca pelo coração puro perante Allah (Qalb Salim)",
    "description": "O bem mais precioso no Dia em que nem filhos nem riquezas mundanas de nada valerão.",
    "introduction": "Abraão orou para alcançar o encontro divino munido de um Qalb Salim (coração são e limpo). Conheça as qualidades de um peito desprovido de arrogância e repleto de serenidade.",
    "keywords": [
      "qalb salim",
      "coração são",
      "pureza",
      "abraão",
      "paz interior",
      "salvação"
    ],
    "passageIds": [
      "26:88-89",
      "37:84",
      "50:33",
      "13:28",
      "89:27-30"
    ]
  },
  {
    "id": "o-combate-as-paixoes-cegas",
    "categoryId": "saude-purificacao-alma",
    "title": "O domínio saudável sobre as paixões destrutivas (Hawa)",
    "description": "A advertência contra transformar os próprios desejos momentâneos em ídolos soberanos.",
    "introduction": "Quem doma os impulsos cegos de seu ego e teme a grandeza de seu Senhor terá os Jardins celestes como morada. Aprenda a libertar a razão das amarras da impulsividade tóxica.",
    "keywords": [
      "paixões",
      "hawa",
      "ego",
      "autocontrole",
      "liberdade interior",
      "disciplina"
    ],
    "passageIds": [
      "79:40-41",
      "25:43",
      "45:23",
      "28:50",
      "12:53"
    ]
  },
  {
    "id": "a-mansidao-e-delicadeza-de-espirito",
    "categoryId": "saude-purificacao-alma",
    "title": "A nobreza da brandura e a rejeição ao temperamento rude",
    "description": "O andar sereno dos servos do Misericordioso sobre a Terra sem empáfia.",
    "introduction": "Os servos de Deus caminham sobre o solo com leveza, e quando ignorantes se dirigem a eles com agressividade verbal, respondem com dignidade: 'Paz' (Salam).",
    "keywords": [
      "mansidão",
      "brandura",
      "delicadeza",
      "paz",
      "humildade",
      "postura"
    ],
    "passageIds": [
      "3:159",
      "25:63",
      "26:215",
      "17:37",
      "31:19"
    ]
  },
  {
    "id": "o-silencio-ponderado-e-recato",
    "categoryId": "saude-purificacao-alma",
    "title": "O valor de guardar a língua contra indiscrições e ofensas",
    "description": "A consciência de que nenhuma palavra é proferida sem que haja anjos a registrar.",
    "introduction": "A higiene verbal é reflexo direto da saúde da alma. Evitar conversas frívolas, zombarias e insultos preserva o silêncio interior necessário à oração e à lucidez moral.",
    "keywords": [
      "língua",
      "silêncio",
      "recato",
      "palavras",
      "vigilância",
      "registro"
    ],
    "passageIds": [
      "50:18",
      "4:148",
      "22:30",
      "33:70",
      "23:3"
    ]
  },
  {
    "id": "o-respiro-da-alma-na-reverencia",
    "categoryId": "saude-purificacao-alma",
    "title": "A tranquilidade encontrada na oração devota (Khushu')",
    "description": "A presença de espírito que transforma o culto mecânico em refúgio emocional acolhedor.",
    "introduction": "Khushu' é a postura de reverência calma onde as preocupações do cotidiano se dissolvem perante a imensidão divina. Uma âncora terapêutica indispensável ao homem moderno.",
    "keywords": [
      "khushu",
      "reverência",
      "oração consciente",
      "paz mental",
      "refúgio"
    ],
    "passageIds": [
      "23:1-2",
      "2:45-46",
      "20:130",
      "57:16",
      "21:90"
    ]
  },
  {
    "id": "a-esperanca-que-dissipa-a-amargura",
    "categoryId": "saude-purificacao-alma",
    "title": "O cultivo permanente do bom ânimo e da nobreza interior",
    "description": "As suratas da consolação divina: Ad-Duha e Ash-Sharh para quem se sentiu só.",
    "introduction": "'Teu Senhor não te desamparou nem te desprezou'. Pondere sobre as palavras de consolo infinito reveladas para curar momentos de solidão, trauma ou incompreensão.",
    "keywords": [
      "duha",
      "sharh",
      "consolo",
      "esperança",
      "cura",
      "ânimo"
    ],
    "passageIds": [
      "94:1-8",
      "93:1-8",
      "12:87",
      "39:53",
      "3:139"
    ]
  },
  {
    "id": "a-gravidade-do-tempo-fugaz",
    "categoryId": "tempo-eras-destino",
    "title": "A surata do Tempo e a fórmula para salvar a existência (Al-'Asr)",
    "description": "O juramento solene pelo tempo e as quatro colunas para não desperdiçar a vida.",
    "introduction": "Imam Ash-Shafi'i afirmou que se apenas a surata Al-'Asr tivesse sido revelada, já bastaria para guiar a humanidade. Ela condensa fé, boas obras, defesa da verdade e paciência.",
    "keywords": [
      "asr",
      "tempo",
      "urgência",
      "salvação",
      "paciência",
      "verdade"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "103:1-3",
      "23:112-114",
      "10:45",
      "79:46",
      "30:55"
    ]
  },
  {
    "id": "o-valor-dos-amanheceres-e-anoiteceres",
    "categoryId": "tempo-eras-destino",
    "title": "Os juramentos divinos pelos ciclos das horas e das eras",
    "description": "A manhã que resplandece, a noite que se acalma e as dez noites abençoadas.",
    "introduction": "Quando Allah jura pela madrugada (Al-Fajr), pelo sol radiante (Ad-Duha) ou pela noite que envolve, Ele atrai nosso olhar contemplativo para a santidade de cada instante que vivemos.",
    "keywords": [
      "aurora",
      "fajr",
      "amanhecer",
      "noite",
      "ciclos",
      "tempo sagrado"
    ],
    "passageIds": [
      "93:1-2",
      "92:1-2",
      "89:1-5",
      "74:32-34",
      "81:17-18",
      "91:1-4"
    ]
  },
  {
    "id": "a-brevidade-da-jornada-terrena",
    "categoryId": "tempo-eras-destino",
    "title": "A percepção da vida mundana como uma tarde ou sua manhã",
    "description": "A perspectiva corânica sobre a transitoriedade dos anos e a maturidade das escolhas.",
    "introduction": "Ao fitar a eternidade, os seres humanos olharão para trás e verão seus anos na Terra como quem cochilou por uma tarde. Essa lúcida relatividade liberta a mente de ambições tolas.",
    "keywords": [
      "brevidade",
      "transitoriedade",
      "vida terrena",
      "ilusão",
      "maturidade"
    ],
    "passageIds": [
      "79:46",
      "46:35",
      "10:45",
      "17:52",
      "20:103-104"
    ]
  },
  {
    "id": "a-responsabilidade-pelo-instante-presente",
    "categoryId": "tempo-eras-destino",
    "title": "A urgência de agir no bem antes que o prazo expire",
    "description": "A advertência contra a procrastinação da retidão e o remorso tardio.",
    "introduction": "O Alcorão desaconselha adiar a generosidade e a reconciliação: 'Fazei caridade daquilo com que vos agraciamos antes que a morte chegue a um de vós'. Viva o bem hoje.",
    "keywords": [
      "presente",
      "urgência",
      "procrastinação",
      "ação",
      "oportunidade"
    ],
    "passageIds": [
      "63:10-11",
      "23:99-100",
      "35:37",
      "40:85",
      "4:18"
    ]
  },
  {
    "id": "a-sucessao-das-geracoes-no-tempo",
    "categoryId": "tempo-eras-destino",
    "title": "O revezamento contínuo dos dias e das nações na história",
    "description": "A pedagogia corânica do alternar de altos e baixos para provar os corações.",
    "introduction": "'Esses dias Nós os alternamos entre os seres humanos'. Nações ascendem, florescem e declinam segundo leis morais imutáveis. Pondere sobre a roda da história humana.",
    "keywords": [
      "gerações",
      "história",
      "revezamento",
      "ciclos",
      "civilizações",
      "tempo"
    ],
    "passageIds": [
      "3:140",
      "10:14",
      "7:34",
      "15:5",
      "6:133"
    ]
  },
  {
    "id": "o-proposito-divino-na-diversidade",
    "categoryId": "pluralidade-dialogo",
    "title": "Povos e tribos criados diversos para o mútuo conhecimento",
    "description": "O célebre versículo 49:13: a diversidade como convite à convivência enriquecedora.",
    "introduction": "'Ó humanos! Nós vos criamos de um macho e de uma fêmea, e vos dividimos em povos e tribos para que vos reconheçais reciprocamente'. A diferença cultural é desígnio de Deus.",
    "keywords": [
      "diversidade",
      "pluralidade",
      "povos",
      "tribos",
      "respeito",
      "humanidade"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "49:13",
      "30:22",
      "11:118-119",
      "5:48",
      "10:19",
      "2:136"
    ]
  },
  {
    "id": "a-etica-do-debate-respeitoso",
    "categoryId": "pluralidade-dialogo",
    "title": "A arte de dialogar com cortesia e excelentes argumentos",
    "description": "A ordem expressa: 'Convida ao caminho de teu Senhor com sabedoria e debate com o melhor trato'.",
    "introduction": "O Alcorão proíbe o sarcasmo e a agressão em debates teológicos ou sociais. Mesmo com Faraó, Deus ordenou a Moisés: 'Falai-lhe com palavras brandas, para que talvez reflita'.",
    "keywords": [
      "debate",
      "cortesia",
      "argumentação",
      "diálogo",
      "sabedoria",
      "tolerância"
    ],
    "passageIds": [
      "16:125",
      "29:46",
      "20:44",
      "17:53",
      "3:64",
      "41:34",
      "2:83"
    ]
  },
  {
    "id": "o-tratamento-justo-a-todas-as-pessoas",
    "categoryId": "pluralidade-dialogo",
    "title": "A benevolência e justiça para com todos os que promovem a paz",
    "description": "A diretriz fundamental da surata Al-Mumtahanah sobre a convivência justa com os demais.",
    "introduction": "Allah não proíbe tratar com bondade e perfeita justiça aqueles que não vos combatem pela fé nem vos expulsam de vossos lares. Em verdade, Allah ama os justos.",
    "keywords": [
      "benevolência",
      "justiça universal",
      "paz",
      "não-discriminação",
      "convivência"
    ],
    "passageIds": [
      "60:8-9",
      "5:8",
      "4:135",
      "2:177",
      "16:90"
    ]
  },
  {
    "id": "a-liberdade-de-consciencia-religiosa",
    "categoryId": "pluralidade-dialogo",
    "title": "A proibição de coerção na aceitação da fé e o respeito às escolhas",
    "description": "O pilar supremo: 'Não há imposição na religião; o caminho reto já se distinguiu do erro'.",
    "introduction": "A fé genuína só tem valor se brotar do livre arbítrio do coração. Forçar crenças é anátema no Alcorão. Estude os princípios que garantem a liberdade de pensamento e crença.",
    "keywords": [
      "liberdade de consciência",
      "sem imposição",
      "livre arbítrio",
      "tolerância",
      "fé"
    ],
    "passageIds": [
      "2:256",
      "10:99",
      "18:29",
      "109:1-6",
      "88:21-22"
    ]
  },
  {
    "id": "a-linguagem-da-afabilidade-e-paz",
    "categoryId": "pluralidade-dialogo",
    "title": "A resposta serena aos interlocutores agressivos ('Salam')",
    "description": "A nobreza moral de quem desvia de provocações vazias desejando a paz.",
    "introduction": "Quando confrontados com insolência ou preconceito, os servos sábios não rebaixam sua dignidade com revanches chulas; retribuem com votos serenos de paz e lucidez.",
    "keywords": [
      "salam",
      "paz",
      "serenidade",
      "resposta nobre",
      "tolerância",
      "afabilidade"
    ],
    "passageIds": [
      "25:63",
      "28:55",
      "43:88-89",
      "41:34",
      "73:10"
    ]
  },
  {
    "id": "os-pontos-comuns-na-revelacao",
    "categoryId": "pluralidade-dialogo",
    "title": "A reverência aos profetas e escrituras anteriores em comunhão",
    "description": "A conclamação a uma palavra comum de justiça e adoração sincera ao Criador.",
    "introduction": "'Dizei: Cremos em Allah e no que nos foi revelado, e no que foi revelado a Abraão, Ismael, Isaac, Jacó e as tribos, e no que foi concedido a Moisés e Jesus'. A aliança de fraternidade.",
    "keywords": [
      "pontos comuns",
      "ecumenismo",
      "escrituras",
      "profetas bíblicos",
      "diálogo"
    ],
    "passageIds": [
      "2:136",
      "3:84",
      "42:13",
      "5:46-48",
      "29:46"
    ]
  },
  {
    "id": "a-terra-como-santuario-de-sustento",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A Terra posta em harmonia com todas as suas criaturas",
    "description": "A generosidade dos biomas, montes, pradarias e oceanos preparados para o florescimento da vida.",
    "introduction": "O Alcorão enfatiza que a Terra foi estendida e dotada de sustento não apenas para os humanos, mas para todas as espécies viventes. Pondere sobre a sacralidade dos ecossistemas.",
    "keywords": [
      "ecologia",
      "terra",
      "biomas",
      "harmonia",
      "sustento",
      "natureza"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "55:10-12",
      "7:10",
      "67:15",
      "20:53-54",
      "78:6-16",
      "16:10-11",
      "30:48-50"
    ]
  },
  {
    "id": "a-proibicao-da-devastacao-ecologica",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A condenação da poluição e corrupção na terra e no mar",
    "description": "O diagnóstico corânico: 'A corrupção surgiu na terra e no mar pelas mãos humanas'.",
    "introduction": "O versículo 30:41 antecipou a crise ambiental global gerada pela ganância desmedida. O Alcorão proíbe a pilhagem ecológica e conclama à restauração do equilíbrio vulnerável.",
    "keywords": [
      "poluição",
      "corrupção ecológica",
      "devastação",
      "fasad",
      "meio ambiente",
      "equilíbrio"
    ],
    "passageIds": [
      "30:41",
      "7:56",
      "7:85",
      "2:205",
      "26:151-152"
    ]
  },
  {
    "id": "o-ser-humano-como-guardiao-khalifah",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A investidura de responsabilidade e cuidado sobre o mundo (Khalifah)",
    "description": "O ser humano constituído não como tirano explorador, mas como guardião zeloso da Criação.",
    "introduction": "A condição de Khalifah (zelador responsável sobre a Terra) implica prestar contas diante de Allah por cada árvore derrubada, rio poluído ou animal maltratado sem motivo legítimo.",
    "keywords": [
      "khalifah",
      "zelador",
      "guardião",
      "responsabilidade",
      "mordomia",
      "dever"
    ],
    "passageIds": [
      "2:30",
      "6:165",
      "35:39",
      "10:14",
      "38:26"
    ]
  },
  {
    "id": "a-agua-como-fonte-de-toda-a-vida",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A reverência pela água doce e sua preservação sem esbanjamento",
    "description": "O princípio vital: 'E fizemos da água todas as coisas vivas. Acaso não crerão?'.",
    "introduction": "A água é a linfa vital da criação divina. O Alcorão nos desafia: 'Acaso já vistes a água que bebeis? Se quiséssemos, fá-la-íamos salobra. Por que não agradeceis?'.",
    "keywords": [
      "água",
      "vida",
      "preservação",
      "hidrologia",
      "recursos naturais",
      "gratidão"
    ],
    "passageIds": [
      "21:30",
      "56:68-70",
      "67:30",
      "23:18",
      "16:10-11",
      "30:48-50"
    ]
  },
  {
    "id": "as-comunidades-animais-como-irmas",
    "categoryId": "meio-ambiente-mordomia",
    "title": "O reconhecimento dos animais e aves como comunidades estruturadas",
    "description": "A declaração corânica surpreendente: 'Não há animal na terra nem ave que voe que não sejam comunidades como vós'.",
    "introduction": "O versículo 6:38 confere dignidade comunitária aos reinos animais e à avifauna. Eles glorificam ao Criador segundo suas próprias preces e exigem consideração compassiva.",
    "keywords": [
      "animais",
      "aves",
      "fauna",
      "comunidades animais",
      "compaixão",
      "biodiversidade"
    ],
    "passageIds": [
      "6:38",
      "24:41",
      "16:68-69",
      "67:19",
      "16:5-8"
    ]
  },
  {
    "id": "o-cultivo-agricola-e-a-flora-generosa",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A beleza das árvores, hortas e olivais como bênçãos sagradas",
    "description": "A contemplação das tamareiras, videiras e sementes germinadas com beleza botânica.",
    "introduction": "As plantas alimentícias e as flores não servem apenas para subsistência biológica: são presentes estéticos cuja beleza harmoniosa deve despertar louvor e cuidado carinhoso.",
    "keywords": [
      "agricultura",
      "flora",
      "plantas",
      "árvores",
      "alimentos",
      "jardins"
    ],
    "passageIds": [
      "6:99",
      "6:141",
      "16:11",
      "50:9-11",
      "36:33-35"
    ]
  },
  {
    "id": "a-proibicao-do-desperdicio-recursos",
    "categoryId": "meio-ambiente-mordomia",
    "title": "A moderação no consumo dos alimentos e recursos naturais",
    "description": "A ordem expressa de comer e beber sem desperdiçar, pois Allah não ama os esbanjadores.",
    "introduction": "Em um planeta sob estresse hídrico e alimentar, a proibição corânica ao desperdício (Israf) é um manual indispensável para um estilo de vida sustentável e consciente.",
    "keywords": [
      "desperdício",
      "israf",
      "sustentabilidade",
      "consumo consciente",
      "alimentos"
    ],
    "passageIds": [
      "7:31",
      "6:141",
      "17:26-27",
      "25:67",
      "5:87"
    ]
  },
  {
    "id": "a-gratidao-que-multiplica-a-graca",
    "categoryId": "gratidao-esperanca",
    "title": "A lei divina da ampliação do bem através do reconhecimento (Shukr)",
    "description": "A promessa solene de Ibrahim: 'Se fordes gratos, certamente vos aumentarei as graças'.",
    "introduction": "O Shukr (gratidão consciente) não é passividade: é a atitude nobre de quem percebe a generosidade da vida e a retribui com atos generosos, abrindo as comportas para novas bênçãos.",
    "keywords": [
      "shukr",
      "gratidão",
      "multiplicação",
      "reconhecimento",
      "louvor",
      "abundância"
    ],
    "editorialFeatured": true,
    "passageIds": [
      "14:7",
      "16:18",
      "2:152",
      "31:12",
      "4:147",
      "39:7"
    ]
  },
  {
    "id": "as-incontáveis-gracas-invisiveis",
    "categoryId": "gratidao-esperanca",
    "title": "A impossibilidade de enumerar a abundância das dádivas diárias",
    "description": "A constatação afetuosa: 'E se tentardes contar as mercês de Allah, jamais podereis enumerá-las'.",
    "introduction": "A respiração autônoma, o pulsar do sangue, a visão que percebe cores, o afeto de um amigo: o Alcorão convida a reparar nas bênçãos cotidianas que a rotina acostumou a ignorar.",
    "keywords": [
      "bênçãos",
      "graças",
      "abundância",
      "dádivas",
      "vida",
      "maravilhas"
    ],
    "passageIds": [
      "16:18",
      "14:34",
      "55:13",
      "31:20",
      "67:23"
    ]
  },
  {
    "id": "o-otimismo-na-dificuldade",
    "categoryId": "gratidao-esperanca",
    "title": "O alívio entrelaçado ao desafio e a superação das adversidades",
    "description": "A certeza espiritual de que todo obstáculo carrega em si a semente de uma grande lição.",
    "introduction": "O crente genuíno não se desespera: sabe que a noite mais escura antecede o amanhecer mais belo. O Alcorão fortalece a mente para atravessar tempestades com esperança inabalável.",
    "keywords": [
      "otimismo",
      "esperança",
      "superação",
      "alívio",
      "fé",
      "resiliência"
    ],
    "passageIds": [
      "94:5-6",
      "65:7",
      "2:214",
      "12:87",
      "3:139"
    ]
  },
  {
    "id": "o-louvor-permanente-al-hamd",
    "categoryId": "gratidao-esperanca",
    "title": "A consagração de todo louvor ao Senhor dos Mundos (Al-Hamd)",
    "description": "As quatro palavras que abrem e fecham a criação cósmica: 'Al-Hamdulillahi Rabbil 'Alamin'.",
    "introduction": "Al-Hamd é mais do que obrigado: é o louvor alegre, espontâneo e total ao Criador por Sua própria perfeição, amor e magnificência. Descubra a oração que abre o Livro Sagrado.",
    "keywords": [
      "al-hamd",
      "louvor",
      "fatihah",
      "glorificação",
      "senhor dos mundos"
    ],
    "passageIds": [
      "1:2",
      "14:39",
      "17:111",
      "18:1",
      "35:1",
      "39:74-75"
    ]
  },
  {
    "id": "a-gratidao-manifestada-em-acoes",
    "categoryId": "gratidao-esperanca",
    "title": "A família de Davi e o louvor demonstrado em serviço generoso",
    "description": "A instrução revelada: 'Praticai a gratidão, ó família de Davi, através de boas ações!'.",
    "introduction": "A gratidão mais elevada não se resume a dizer 'Graças a Deus' com os lábios, mas se comprova alimentando famintos, consolando os aflitos e compartilhando o que se recebeu.",
    "keywords": [
      "serviço",
      "ações",
      "prática",
      "davi",
      "família de davi",
      "caridade"
    ],
    "passageIds": [
      "34:13",
      "76:8-9",
      "93:11",
      "2:177",
      "9:105"
    ]
  },
  {
    "id": "a-esperanca-nas-promessas-do-futuro",
    "categoryId": "gratidao-esperanca",
    "title": "A alegria serena dos que confiam no cumprimento da verdade",
    "description": "A promessa divina aos homens e mulheres que agem com retidão: 'Conceder-lhes-emos uma vida pura'.",
    "introduction": "O Alcorão encerra sua mensagem não com medo apocalíptico, mas com promessa radiante de dignidade e ventura perpétua para todos os que semearam o bem sobre a Terra.",
    "keywords": [
      "vida pura",
      "futuro",
      "promessa",
      "recompensa",
      "alegria",
      "paz"
    ],
    "passageIds": [
      "10:62-64",
      "41:30",
      "16:97",
      "3:195",
      "9:72"
    ]
  }
];

export const QURAN_THEMES: QuranTheme[] = THEME_SEEDS.map((theme, index) => ({
  ...theme,
  addedOrder: index + 1,
  editorialReviewStatus: "pending",
}));

function normalizePassageReference(reference: string): QuranPassageReference | null {
  const match = /^(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?$/.exec(reference.trim().replace(/[–—]/g, "-"));
  if (!match) return null;
  const surahNumber = Number(match[1]);
  const startAyah = Number(match[2]);
  const endAyah = match[3] ? Number(match[3]) : undefined;
  const surah = ALL_SURAHS.find((item) => item.number === surahNumber);
  if (!surah || startAyah < 1 || (endAyah !== undefined && endAyah < startAyah)) return null;
  if (startAyah > surah.totalAyahs || (endAyah !== undefined && endAyah > surah.totalAyahs))
    return null;

  return {
    id: `${surahNumber}:${startAyah}${endAyah !== undefined ? `-${endAyah}` : ""}`,
    surahNumber,
    startAyah,
    ...(endAyah !== undefined ? { endAyah } : {}),
  };
}

/** Shared registry: one normalized record per distinct Quran passage reference. */
export const QURAN_PASSAGES: QuranPassageReference[] = Array.from(
  new Set(QURAN_THEMES.flatMap((theme) => theme.passageIds)),
)
  .map(normalizePassageReference)
  .filter((passage): passage is QuranPassageReference => passage !== null);

export const QURAN_PASSAGES_BY_ID = Object.fromEntries(
  QURAN_PASSAGES.map((passage) => [passage.id, passage]),
) as Record<string, QuranPassageReference>;

export const QURAN_THEME_CATEGORIES_BY_ID = Object.fromEntries(
  QURAN_THEME_CATEGORIES.map((category) => [category.id, category]),
) as Record<string, QuranThemeCategory>;

/** Runtime data-integrity checks, also used by the unit tests. */
export function getQuranThemeLibraryIssues(): string[] {
  const issues: string[] = [];
  const categoryIds = new Set(QURAN_THEME_CATEGORIES.map((category) => category.id));
  const themeIds = new Set<string>();
  const passageIds = new Set(QURAN_PASSAGES.map((passage) => passage.id));

  if (QURAN_THEME_CATEGORIES.length < 20) issues.push("A biblioteca deve conter pelo menos 20 categorias.");
  if (QURAN_THEMES.length < 100) issues.push("A biblioteca deve conter mais de 100 temas.");
  if (passageIds.size !== QURAN_PASSAGES.length)
    issues.push("Há referências canônicas duplicadas.");

  for (const theme of QURAN_THEMES) {
    if (themeIds.has(theme.id)) issues.push(`ID de tema duplicado: ${theme.id}`);
    themeIds.add(theme.id);
    if (!categoryIds.has(theme.categoryId))
      issues.push(`Categoria inexistente no tema ${theme.id}.`);
    if (theme.passageIds.length < 5 || theme.passageIds.length > 15) {
      issues.push(`Quantidade de passagens fora do intervalo esperado no tema ${theme.id}.`);
    }
    for (const reference of theme.passageIds) {
      if (!passageIds.has(reference))
        issues.push(`Referência inválida ou não normalizada: ${reference} (${theme.id}).`);
    }
  }

  const passageCountVariants = new Set(QURAN_THEMES.map((theme) => theme.passageIds.length));
  if (passageCountVariants.size < 2)
    issues.push("A quantidade de passagens deve variar entre os temas.");

  for (const category of QURAN_THEME_CATEGORIES) {
    const categoryThemes = QURAN_THEMES.filter((theme) => theme.categoryId === category.id);
    if (categoryThemes.length < 4 || categoryThemes.length > 15) {
      issues.push(`A categoria ${category.id} contém ${categoryThemes.length} temas.`);
    }
    if (new Set(categoryThemes.map((theme) => theme.passageIds.length)).size < 2) {
      issues.push(
        `A quantidade de passagens não varia entre os temas da categoria ${category.id}.`,
      );
    }
  }

  return issues;
}
