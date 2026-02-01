export type Language = "ja" | "en" | "zh" | "pt";

export const LANGUAGES: { code: Language; label: string; flag: string }[] = [
  { code: "ja", label: "日本語", flag: "🇯🇵" },
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "pt", label: "Português", flag: "🇧🇷" },
];

export const translations = {
  ja: {
    // Header
    siteName: "蒲郡市議会AIウォッチ",
    siteSubtitle: "GAMAGORI CITY COUNCIL WATCH",
    nav: {
      home: "ホーム",
      articles: "記事一覧",
      youtube: "YouTube",
    },
    // Disclaimer banner
    disclaimer: "本サイトは蒲郡市議会の公式記録ではありません。AIによる自動生成のため、内容の正確性は公式情報をご確認ください。",
    // Hero section
    hero: {
      badge: "新着動画を自動で更新中",
      title: "市議会を",
      titleAccent: "もっと身近に。",
      description: "難しい議会の話を、AIがわかりやすい記事に。蒲郡市の「今」がわかる、市民のためのメディアです。",
      feature1: "YouTube動画を自動取得",
      feature2: "AIが文字起こし",
      feature3: "インフォグラフィック生成",
    },
    // Search and Filter
    search: {
      placeholder: "議会内容をキーワードで検索（例：子育て、防災、教育）",
      button: "検索",
      filterByTopic: "トピックで絞り込み",
      all: "すべて",
    },
    // Session types
    session: {
      all: "すべて",
      regular: "定例会",
      extraordinary: "臨時会",
      committee: "委員会",
      default: "議会",
    },
    // Tags
    tags: {
      kosodate: "子育て・教育",
      hojokin: "補助金・給付金",
      yosan: "予算・財政",
      suidou: "水道・インフラ",
      iryo: "医療・福祉",
      senkyo: "選挙",
      bosai: "防災・安全",
      kankyo: "環境",
      kanko: "観光・商業",
    },
    // Article list
    articles: {
      searchResults: "検索結果",
      latest: "最新の記事",
      found: "件の記事が見つかりました",
      noArticles: "記事がありません",
      noArticlesDesc: "検索条件に一致する記事が見つかりませんでした。新しい動画がアップロードされると、自動的に記事が追加されます。",
      viewAll: "すべての記事を見る",
      readingTime: "で読める",
      readArticle: "記事を読む",
      read: "読む",
      about: "約",
      minutes: "分",
      hasInfographic: "図解あり",
      infographic: "図解",
      noTitle: "（タイトルなし）",
    },
    // Article detail
    detail: {
      summary: "要約",
      summaryDesc: "わかりやすい要約",
      transcript: "全文",
      transcriptDesc: "文字起こし全文",
      noSummary: "要約はまだありません",
      noSummaryDesc: "AIが要約を生成中です。しばらくお待ちください。",
      noTranscript: "文字起こしはまだありません",
      noTranscriptDesc: "AIが文字起こしを処理中です。しばらくお待ちください。",
      originalVideo: "元のYouTube動画",
      watchOnYoutube: "YouTubeで見る",
      unknownTitle: "タイトル不明",
      infographicAlt: "議会内容のインフォグラフィック",
    },
    // AI Technology section
    aiTech: {
      badge: "AI TECHNOLOGY",
      title: "AIが議会をわかりやすく",
      description: "最新のAI技術を活用して、難しい議会情報を誰にでもわかりやすい形でお届けします",
      step1Title: "動画を自動取得",
      step1Desc: "蒲郡市議会のYouTubeチャンネルから、新着動画を自動で検知して取得します。",
      step2Title: "AIが分析・要約",
      step2Desc: "Gemini AIが音声を高精度に文字起こしし、要点を抽出してわかりやすい記事に変換します。",
      step3Title: "図解で見える化",
      step3Desc: "議論の構造や対立点をインフォグラフィックにして、ひと目でわかるように可視化します。",
      aiPowered: "AI Powered",
    },
    // Footer
    footer: {
      brand: "蒲郡市議会AIウォッチ",
      brandSub: "Gamagori City Council Watch",
      description: "AIが議会動画を自動で分析。難しい議会の話を、市民のみなさんにわかりやすくお届けします。",
      links: "関連リンク",
      officialSite: "蒲郡市議会 公式サイト",
      youtubeChannel: "蒲郡市議会 YouTube",
      cityHall: "蒲郡市役所",
      siteInfo: "サイト情報",
      terms: "利用規約・免責事項",
      privacy: "プライバシーポリシー",
      warning: "ご注意ください",
      warningText: "本サイトは蒲郡市議会の公式記録ではありません。AIによる自動生成のため、内容に誤りが含まれる可能性があります。正確な情報は",
      warningLink: "蒲郡市議会公式サイト",
      warningTextEnd: "をご確認ください。",
      copyright: "© 2026 蒲郡市議会AIウォッチ - Powered by CONTE inc.",
    },
    // Articles page
    articlesPage: {
      title: "記事一覧",
      description: "蒲郡市議会の動画をAIが解説した記事の一覧です",
      backToHome: "トップに戻る",
    },
    // Language
    language: "言語",
  },
  en: {
    // Header
    siteName: "Gamagori City Council AI Watch",
    siteSubtitle: "GAMAGORI CITY COUNCIL WATCH",
    nav: {
      home: "Home",
      articles: "Articles",
      youtube: "YouTube",
    },
    // Disclaimer banner
    disclaimer: "This site is not an official record of Gamagori City Council. Content is AI-generated. Please verify accuracy with official sources.",
    // Hero section
    hero: {
      badge: "Auto-updating with new videos",
      title: "Making city council",
      titleAccent: "more accessible.",
      description: "AI transforms complex council discussions into easy-to-understand articles. Your source for Gamagori's latest news.",
      feature1: "Auto-fetch YouTube videos",
      feature2: "AI transcription",
      feature3: "Infographic generation",
    },
    // Search and Filter
    search: {
      placeholder: "Search council content (e.g., childcare, disaster prevention, education)",
      button: "Search",
      filterByTopic: "Filter by topic",
      all: "All",
    },
    // Session types
    session: {
      all: "All",
      regular: "Regular Session",
      extraordinary: "Extraordinary Session",
      committee: "Committee",
      default: "Council",
    },
    // Tags
    tags: {
      kosodate: "Childcare & Education",
      hojokin: "Subsidies & Benefits",
      yosan: "Budget & Finance",
      suidou: "Water & Infrastructure",
      iryo: "Medical & Welfare",
      senkyo: "Elections",
      bosai: "Disaster Prevention & Safety",
      kankyo: "Environment",
      kanko: "Tourism & Commerce",
    },
    // Article list
    articles: {
      searchResults: "Search Results",
      latest: "Latest Articles",
      found: " articles found",
      noArticles: "No articles",
      noArticlesDesc: "No articles match your search criteria. New articles will be added automatically when new videos are uploaded.",
      viewAll: "View all articles",
      readingTime: " read",
      readArticle: "Read article",
      read: "Read",
      about: "~",
      minutes: "min",
      hasInfographic: "Has infographic",
      infographic: "Infographic",
      noTitle: "(No title)",
    },
    // Article detail
    detail: {
      summary: "Summary",
      summaryDesc: "Easy-to-understand summary",
      transcript: "Full Text",
      transcriptDesc: "Full transcript",
      noSummary: "No summary yet",
      noSummaryDesc: "AI is generating the summary. Please wait.",
      noTranscript: "No transcript yet",
      noTranscriptDesc: "AI is processing the transcript. Please wait.",
      originalVideo: "Original YouTube video",
      watchOnYoutube: "Watch on YouTube",
      unknownTitle: "Unknown title",
      infographicAlt: "Council content infographic",
    },
    // AI Technology section
    aiTech: {
      badge: "AI TECHNOLOGY",
      title: "AI makes council easy to understand",
      description: "Using the latest AI technology to deliver complex council information in an easy-to-understand format",
      step1Title: "Auto-fetch videos",
      step1Desc: "Automatically detects and retrieves new videos from the Gamagori City Council YouTube channel.",
      step2Title: "AI analysis & summary",
      step2Desc: "Gemini AI provides high-accuracy transcription and extracts key points into easy-to-read articles.",
      step3Title: "Visualize with infographics",
      step3Desc: "Visualizes the structure of discussions and points of contention with infographics.",
      aiPowered: "AI Powered",
    },
    // Footer
    footer: {
      brand: "Gamagori City Council AI Watch",
      brandSub: "Gamagori City Council Watch",
      description: "AI automatically analyzes council videos. Making complex council discussions easy to understand for all citizens.",
      links: "Related Links",
      officialSite: "Gamagori City Council Official",
      youtubeChannel: "Gamagori City Council YouTube",
      cityHall: "Gamagori City Hall",
      siteInfo: "Site Info",
      terms: "Terms of Use & Disclaimer",
      privacy: "Privacy Policy",
      warning: "Please Note",
      warningText: "This site is not an official record of Gamagori City Council. As content is AI-generated, it may contain errors. For accurate information, please refer to the ",
      warningLink: "official Gamagori City Council website",
      warningTextEnd: ".",
      copyright: "© 2026 Gamagori City Council AI Watch - Powered by CONTE inc.",
    },
    // Articles page
    articlesPage: {
      title: "Article List",
      description: "List of articles where AI explains Gamagori City Council videos",
      backToHome: "Back to Home",
    },
    // Language
    language: "Language",
  },
  zh: {
    // Header
    siteName: "蒲郡市议会AI观察",
    siteSubtitle: "GAMAGORI CITY COUNCIL WATCH",
    nav: {
      home: "首页",
      articles: "文章列表",
      youtube: "YouTube",
    },
    // Disclaimer banner
    disclaimer: "本网站不是蒲郡市议会的官方记录。内容由AI自动生成，请以官方信息为准。",
    // Hero section
    hero: {
      badge: "自动更新最新视频",
      title: "让市议会",
      titleAccent: "更贴近市民。",
      description: "AI将复杂的议会讨论转化为易懂的文章。了解蒲郡市最新动态的市民媒体。",
      feature1: "自动获取YouTube视频",
      feature2: "AI语音转文字",
      feature3: "生成信息图表",
    },
    // Search and Filter
    search: {
      placeholder: "搜索议会内容（例：育儿、防灾、教育）",
      button: "搜索",
      filterByTopic: "按主题筛选",
      all: "全部",
    },
    // Session types
    session: {
      all: "全部",
      regular: "定期会议",
      extraordinary: "临时会议",
      committee: "委员会",
      default: "议会",
    },
    // Tags
    tags: {
      kosodate: "育儿・教育",
      hojokin: "补贴・福利金",
      yosan: "预算・财政",
      suidou: "水利・基础设施",
      iryo: "医疗・福利",
      senkyo: "选举",
      bosai: "防灾・安全",
      kankyo: "环境",
      kanko: "观光・商业",
    },
    // Article list
    articles: {
      searchResults: "搜索结果",
      latest: "最新文章",
      found: "篇文章",
      noArticles: "没有文章",
      noArticlesDesc: "没有符合搜索条件的文章。上传新视频后会自动添加文章。",
      viewAll: "查看所有文章",
      readingTime: "阅读",
      readArticle: "阅读文章",
      read: "阅读",
      about: "约",
      minutes: "分钟",
      hasInfographic: "有图解",
      infographic: "图解",
      noTitle: "（无标题）",
    },
    // Article detail
    detail: {
      summary: "摘要",
      summaryDesc: "易懂的摘要",
      transcript: "全文",
      transcriptDesc: "完整记录",
      noSummary: "暂无摘要",
      noSummaryDesc: "AI正在生成摘要，请稍候。",
      noTranscript: "暂无记录",
      noTranscriptDesc: "AI正在处理语音转文字，请稍候。",
      originalVideo: "原始YouTube视频",
      watchOnYoutube: "在YouTube上观看",
      unknownTitle: "标题未知",
      infographicAlt: "议会内容信息图表",
    },
    // AI Technology section
    aiTech: {
      badge: "AI技术",
      title: "AI让议会更易懂",
      description: "利用最新AI技术，将复杂的议会信息以易懂的形式呈现给大家",
      step1Title: "自动获取视频",
      step1Desc: "从蒲郡市议会YouTube频道自动检测并获取新视频。",
      step2Title: "AI分析与摘要",
      step2Desc: "Gemini AI高精度地将语音转为文字，提取要点并转化为易读的文章。",
      step3Title: "信息图表可视化",
      step3Desc: "将讨论的结构和争论点以信息图表的形式可视化呈现。",
      aiPowered: "AI驱动",
    },
    // Footer
    footer: {
      brand: "蒲郡市议会AI观察",
      brandSub: "Gamagori City Council Watch",
      description: "AI自动分析议会视频。将复杂的议会讨论以易懂的方式传达给市民。",
      links: "相关链接",
      officialSite: "蒲郡市议会官网",
      youtubeChannel: "蒲郡市议会YouTube",
      cityHall: "蒲郡市政府",
      siteInfo: "网站信息",
      terms: "使用条款・免责声明",
      privacy: "隐私政策",
      warning: "请注意",
      warningText: "本网站不是蒲郡市议会的官方记录。由于内容由AI自动生成，可能存在错误。准确信息请参考",
      warningLink: "蒲郡市议会官网",
      warningTextEnd: "。",
      copyright: "© 2026 蒲郡市议会AI观察 - Powered by CONTE inc.",
    },
    // Articles page
    articlesPage: {
      title: "文章列表",
      description: "AI解说蒲郡市议会视频的文章列表",
      backToHome: "返回首页",
    },
    // Language
    language: "语言",
  },
  pt: {
    // Header
    siteName: "Câmara de Gamagori AI Watch",
    siteSubtitle: "GAMAGORI CITY COUNCIL WATCH",
    nav: {
      home: "Início",
      articles: "Artigos",
      youtube: "YouTube",
    },
    // Disclaimer banner
    disclaimer: "Este site não é um registro oficial da Câmara Municipal de Gamagori. O conteúdo é gerado por IA. Por favor, verifique a precisão com fontes oficiais.",
    // Hero section
    hero: {
      badge: "Atualizando automaticamente com novos vídeos",
      title: "Tornando a câmara municipal",
      titleAccent: "mais acessível.",
      description: "A IA transforma discussões complexas da câmara em artigos fáceis de entender. Sua fonte para as últimas notícias de Gamagori.",
      feature1: "Busca automática de vídeos do YouTube",
      feature2: "Transcrição por IA",
      feature3: "Geração de infográficos",
    },
    // Search and Filter
    search: {
      placeholder: "Pesquisar conteúdo da câmara (ex: educação infantil, prevenção de desastres, educação)",
      button: "Pesquisar",
      filterByTopic: "Filtrar por tópico",
      all: "Todos",
    },
    // Session types
    session: {
      all: "Todos",
      regular: "Sessão Ordinária",
      extraordinary: "Sessão Extraordinária",
      committee: "Comissão",
      default: "Câmara",
    },
    // Tags
    tags: {
      kosodate: "Infância e Educação",
      hojokin: "Subsídios e Benefícios",
      yosan: "Orçamento e Finanças",
      suidou: "Água e Infraestrutura",
      iryo: "Saúde e Bem-estar",
      senkyo: "Eleições",
      bosai: "Prevenção de Desastres e Segurança",
      kankyo: "Meio Ambiente",
      kanko: "Turismo e Comércio",
    },
    // Article list
    articles: {
      searchResults: "Resultados da Pesquisa",
      latest: "Últimos Artigos",
      found: " artigos encontrados",
      noArticles: "Sem artigos",
      noArticlesDesc: "Nenhum artigo corresponde aos critérios de pesquisa. Novos artigos serão adicionados automaticamente quando novos vídeos forem enviados.",
      viewAll: "Ver todos os artigos",
      readingTime: " de leitura",
      readArticle: "Ler artigo",
      read: "Ler",
      about: "~",
      minutes: "min",
      hasInfographic: "Com infográfico",
      infographic: "Infográfico",
      noTitle: "(Sem título)",
    },
    // Article detail
    detail: {
      summary: "Resumo",
      summaryDesc: "Resumo fácil de entender",
      transcript: "Texto Completo",
      transcriptDesc: "Transcrição completa",
      noSummary: "Ainda sem resumo",
      noSummaryDesc: "A IA está gerando o resumo. Por favor, aguarde.",
      noTranscript: "Ainda sem transcrição",
      noTranscriptDesc: "A IA está processando a transcrição. Por favor, aguarde.",
      originalVideo: "Vídeo original do YouTube",
      watchOnYoutube: "Assistir no YouTube",
      unknownTitle: "Título desconhecido",
      infographicAlt: "Infográfico do conteúdo da câmara",
    },
    // AI Technology section
    aiTech: {
      badge: "TECNOLOGIA IA",
      title: "IA torna a câmara fácil de entender",
      description: "Usando a mais recente tecnologia de IA para entregar informações complexas da câmara em um formato fácil de entender",
      step1Title: "Busca automática de vídeos",
      step1Desc: "Detecta e obtém automaticamente novos vídeos do canal do YouTube da Câmara Municipal de Gamagori.",
      step2Title: "Análise e resumo por IA",
      step2Desc: "A IA Gemini fornece transcrição de alta precisão e extrai pontos-chave em artigos fáceis de ler.",
      step3Title: "Visualização com infográficos",
      step3Desc: "Visualiza a estrutura das discussões e pontos de discordância com infográficos.",
      aiPowered: "Powered by IA",
    },
    // Footer
    footer: {
      brand: "Câmara de Gamagori AI Watch",
      brandSub: "Gamagori City Council Watch",
      description: "A IA analisa automaticamente os vídeos da câmara. Tornando as discussões complexas da câmara fáceis de entender para todos os cidadãos.",
      links: "Links Relacionados",
      officialSite: "Site Oficial da Câmara de Gamagori",
      youtubeChannel: "YouTube da Câmara de Gamagori",
      cityHall: "Prefeitura de Gamagori",
      siteInfo: "Informações do Site",
      terms: "Termos de Uso e Isenção de Responsabilidade",
      privacy: "Política de Privacidade",
      warning: "Atenção",
      warningText: "Este site não é um registro oficial da Câmara Municipal de Gamagori. Como o conteúdo é gerado por IA, pode conter erros. Para informações precisas, consulte o ",
      warningLink: "site oficial da Câmara de Gamagori",
      warningTextEnd: ".",
      copyright: "© 2026 Câmara de Gamagori AI Watch - Powered by CONTE inc.",
    },
    // Articles page
    articlesPage: {
      title: "Lista de Artigos",
      description: "Lista de artigos onde a IA explica os vídeos da Câmara Municipal de Gamagori",
      backToHome: "Voltar ao Início",
    },
    // Language
    language: "Idioma",
  },
} as const;

export type Translations = (typeof translations)[Language];

export function getTranslations(lang: Language): Translations {
  return translations[lang];
}

// Date formatting by language
export function formatDate(iso: string | null, lang: Language): string {
  if (!iso) return "—";
  try {
    const localeMap: Record<Language, string> = {
      ja: "ja-JP",
      en: "en-US",
      zh: "zh-CN",
      pt: "pt-BR",
    };
    return new Date(iso).toLocaleDateString(localeMap[lang], {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "—";
  }
}

// Reading time formatting by language
export function formatReadingTime(minutes: number, lang: Language, t: Translations): string {
  return `${t.articles.about}${minutes}${t.articles.minutes}${t.articles.readingTime}`;
}
