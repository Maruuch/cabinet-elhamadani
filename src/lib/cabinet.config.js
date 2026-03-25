/**
 * CABINET ELHAMADANI — CONFIGURATION CENTRALE
 * Modifiez ce fichier pour personnaliser les informations du cabinet
 */
export const CABINET = {
  nom: { ar: "مكتب الحمداني", fr: "Cabinet Elhamadani" },

  avocat: {
    nom: { ar: "ذ.ة فاطمة الزهرة الحمداني", fr: "Mᵉ Fatimaezzahra Elhamadani" },
    titre: { ar: "محامية بهيئة المحامين بالدار البيضاء", fr: "Avocate au Barreau de Casablanca" },
    bio: {
      ar: "محامية متخصصة في القانون المدني والتجاري والأسري، تتميز بخبرة واسعة في الدفاع عن حقوق موكليها أمام مختلف المحاكم المغربية.",
      fr: "Avocate spécialisée en droit civil, commercial et familial, avec une solide expérience dans la défense des droits de ses clients devant les juridictions marocaines."
    },
    experience: { ar: "أكثر من 10 سنوات من الخبرة", fr: "Plus de 10 ans d'expérience" },
    photo: "/images/avocat.jpg",
  },

  contact: {
    adresse: {
      ar: "شارع الحسن الثاني، الدار البيضاء، المغرب",
      fr: "Boulevard Hassan II, Casablanca, Maroc"
    },
    telephone: "+212 6 00 00 00 00",
    whatsapp: "212600000000",
    email: "contact@elhamadani.ma",
    horaires: {
      ar: "الاثنين - الجمعة: 9:00 - 17:00",
      fr: "Lundi - Vendredi : 9h00 - 17h00"
    },
    maps: "https://maps.google.com/?q=Casablanca",
  },

  services: [
    {
      slug: "droit-civil",
      icon: "⚖️",
      title: { ar: "القانون المدني", fr: "Droit Civil" },
      description: {
        ar: "نتولى الدفاع عن حقوقكم في المنازعات المدنية، العقود، والملكية العقارية بكفاءة واحترافية.",
        fr: "Nous défendons vos droits dans les litiges civils, les contrats et la propriété immobilière avec compétence et professionnalisme."
      },
    },
    {
      slug: "droit-famille",
      icon: "👨‍👩‍👧",
      title: { ar: "قانون الأسرة", fr: "Droit de la Famille" },
      description: {
        ar: "نقدم استشارات قانونية متخصصة في قضايا الزواج والطلاق والحضانة والإرث.",
        fr: "Nous offrons des conseils juridiques spécialisés dans les affaires de mariage, divorce, garde d'enfants et succession."
      },
    },
    {
      slug: "droit-commercial",
      icon: "💼",
      title: { ar: "القانون التجاري", fr: "Droit Commercial" },
      description: {
        ar: "نساعد الشركات والمقاولين في التعاقد وتسوية النزاعات التجارية وحماية حقوقهم.",
        fr: "Nous accompagnons les entreprises et entrepreneurs dans la contractualisation, le règlement des litiges commerciaux et la protection de leurs droits."
      },
    },
    {
      slug: "droit-immobilier",
      icon: "🏠",
      title: { ar: "قانون العقارات", fr: "Droit Immobilier" },
      description: {
        ar: "نتخصص في معالجة النزاعات العقارية، عقود البيع والإيجار، وتسجيل الملكية.",
        fr: "Nous sommes spécialisés dans le traitement des litiges immobiliers, les contrats de vente et de location, et l'enregistrement des titres."
      },
    },
    {
      slug: "droit-penal",
      icon: "🔒",
      title: { ar: "القانون الجنائي", fr: "Droit Pénal" },
      description: {
        ar: "نضمن دفاعاً قوياً ومتخصصاً في القضايا الجنائية مع احترام حقوق المتهمين.",
        fr: "Nous assurons une défense solide et spécialisée dans les affaires pénales, dans le respect des droits des prévenus."
      },
    },
    {
      slug: "droit-travail",
      icon: "👷",
      title: { ar: "قانون الشغل", fr: "Droit du Travail" },
      description: {
        ar: "نحمي حقوق العمال وأصحاب العمل في النزاعات المتعلقة بالعمل والفصل والتعويض.",
        fr: "Nous protégeons les droits des salariés et des employeurs dans les litiges liés au travail, au licenciement et à l'indemnisation."
      },
    },
  ],

  stats: [
    { value: 10, suffix: "+", label: { ar: "سنوا֪ الخبرة", fr: "Ans d'expérience" } },
    { value: 500, suffix: "+", label: { ar: "قضية ناجحة", fr: "Dossiers traités" } },
    { value: 98, suffix: "%", label: { ar: "رضا العملاء", fr: "Clients satisfaits" } },
    { value: 6, suffix: "", label: { ar: "تخصصات قانونية", fr: "Domaines d'expertise" } },
  ],

  process: [
    {
      num: 1,
      title: { ar: "الاستشارة الأولى", fr: "Consultation initiale" },
      desc: { ar: "نستمع إليكم ونحلل وضعكم القانوني بعناية.", fr: "Nous vous écoutons et analysons votre situation juridique avec attention." },
    },
    {
      num: 2,
      title: { ar: "دراسة الملف", fr: "Étude du dossier" },
      desc: { ar: "نقوم بدراسة معمقة لملفكم وجمع الوثائق اللازمة.", fr: "Nous effectuons une étude approfondie de votre dossier et rassemblons les pièces nécessaires." },
    },
    {
      num: 3,
      title: { ar: "وضع الاستراتيجية", fr: "Élaboration de la stratégie" },
      desc: { ar: "نضع معكم أفضل استراتيجية قانونية لتحقيق أهدافكم.", fr: "Nous élaborons ensemble la meilleure stratégie juridique pour atteindre vos objectifs." },
    },
    {
      num: 4,
      title: { ar: "التنفيذ والمتابعة", fr: "Exécution et suivi" },
      desc: { ar: "نتولى تنفيذ الإجراءا֪ ونتابع ملفكم بشكل مستمر.", fr: "Nous prenons en charge l'exécution des démarches et assurons un suivi continu de votre dossier." },
    },
  ],

  faq: [
    {
      q: { ar: "ما هي تكلفة الاستشارة القانونية؟", fr: "Quel est le coût d'une consultation juridique ?" },
      a: { ar: "تتفاو֪ تكلفة الاستشارة حسب طبيعة القضية وتعقيدها. نوفر أسعارًا تنافسية مع الحفاظ على أعلى معايير الجودة. يرجى التواصل معنا للحصول على تقدير مخصص.", fr: "Le coût d'une consultation varie selon la nature et la complexité du dossier. Nous proposons des tarifs compétitifs en maintenant les plus hauts standards de qualité. Contactez-nous pour un devis personnalisé." },
    },
    {
      q: { ar: "كيف يمكنني حجز موعد مع المحامية؟", fr: "Comment prendre rendez-vous avec l'avocate ?" },
      a: { ar: "يمكنكم التواصل معنا عبر الهاتف أو واتساب أو البريد الإلكتروني أو من خلال نموذج الاتصال على موقعنا. سيتم الرد على طلبكم في أقرب وقت ممكن.", fr: "Vous pouvez nous contacter par téléphone, WhatsApp, email ou via le formulaire de contact sur notre site. Votre demande sera traitée dans les meilleurs délais." },
    },
    {
      q: { ar: "ما هي مجالات التخصص الرئيسية للمكتب؟", fr: "Quels sont les principaux domaines d'expertise du cabinet ?" },
      a: { ar: "يتخصص مكتبنا في القانون المدني، قانون الأسرة، القانون التجاري، قانون العقارات، القانون الجنائي وقانون الشغل.", fr: "Notre cabinet est spécialisé en droit civil, droit de la famille, droit commercial, droit immobilier, droit pénal et droit du travail." },
    },
    {
      q: { ar: "هل تقدمون استشارات قانونية عن بُعد؟", fr: "Proposez-vous des consultations juridiques à distance ?" },
      a: { ar: "نعم، نوفر استشارات قانونية عن بُعد عبر الهاتف أو الفيديو لتلبية احتياجات موكلينا في أي مكان.", fr: "Oui, nous proposons des consultations juridiques à distance par téléphone ou vidéo pour répondre aux besoins de nos clients où qu'ils se trouvent." },
    },
    {
      q: { ar: "ما هي المستندات التي يجب إحضارها في الاستشارة الأولى؟", fr: "Quels documents apporter lors de la première consultation ?" },
      a: { ar: "يُنصح بإحظار جميع الوثائق المتعلقة بقضيتكم (عقود، مراسلات، أحكام قظائية...) وبطاقة الهوية الوطنية.", fr: "Il est conseillé d'apporter tous les documents relatifs à votre dossier (contrats, correspondances, jugements...) ainsi que votre carte d'identité nationale." },
    },
  ],

  reseaux: {
    facebook: "",
    linkedin: "",
    instagram: "",
  },

  siteUrl: "https://cabinet-elhamadani.vercel.app",
};
