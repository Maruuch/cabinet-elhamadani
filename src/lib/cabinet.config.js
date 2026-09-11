export const CABINET = {
  nom: {
    ar: "مكتب الحمداني للمحاماة والاستشارات القانونية",
    fr: "Cabinet Elhamadani - Avocats & Conseil Juridique",
  },

  avocat: {
    nom: {
      ar: "الأستاذة الحمداني فاطمة الزهراء",
      fr: "Maître Fatima Zahra Elhamadani",
    },
    titre: {
      ar: "محامية بهيئة الدار البيضاء",
      fr: "Avocate au Barreau de Casablanca",
    },
    bio: {
      ar: "أستاذة الحمداني فاطمة الزهراء، محامية بهيئة الدار البيضاء، حاصلة على الإجازة في الدراسات القانونية وماستر في الدراسات العقارية والتعمير. تتميز بكفاءة عالية في تقديم الاستشارات القانونية والدفاع عن حقوق موكليها أمام مختلف المحاكم المغربية.",
      fr: "Maître Fatima Zahra Elhamadani, avocate inscrite au Barreau de Casablanca, titulaire d'une Licence en Études Juridiques et d'un Master en Études Immobilières et Urbanisme. Elle se distingue par sa rigueur et son engagement dans la défense des intérêts de ses clients devant les juridictions marocaines.",
    },
    experience: {
      ar: "خبرة قانونية متخصصة",
      fr: "Expertise juridique spécialisée",
    },
    photo: "/images/avocat.jpg",
    initiales: "FZE",
  },

  contact: {
    adresse: {
      ar: "160 مصطفى المعاني، الطابق الثاني رقم 8، الدار البيضاء",
      fr: "160 Mustapha El Maani, 2ème étage, Bureau 8, Casablanca",
    },
    telephone: "+212705646242",
    whatsapp: "+212705646242",
    email: "contact@cabinet-elhamadani.ma",
    horaires: {
      ar: "الإثنين – الجمعة: 9:00 – 18:00",
      fr: "Lundi – Vendredi : 9h00 – 18h00",
    },
    maps: "https://maps.google.com/?q=160+Mustapha+El+Maani+Casablanca",
  },

  services: [
    {
      slug: "droit-civil",
      icon: "⚖️",
      title: { ar: "القانون المدني", fr: "Droit Civil" },
      description: {
        ar: "نتولى الدفاع عن حقوقكم في النزاعات المدنية، العقود، والقضايا العقارية بكفاءة واحترافية.",
        fr: "Nous défendons vos droits dans les litiges civils, les contrats et la propriété immobilière avec compétence et professionnalisme.",
      },
    },
    {
      slug: "droit-famille",
      icon: "👨‍👩‍👧",
      title: { ar: "قانون الأسرة", fr: "Droit de la Famille" },
      description: {
        ar: "نقدم استشارات قانونية متخصصة في قضايا الزواج والطلاق والحضانة والإرث.",
        fr: "Nous offrons des conseils juridiques spécialisés dans les affaires de mariage, divorce, garde d'enfants et succession.",
      },
    },
    {
      slug: "droit-commercial",
      icon: "💼",
      title: { ar: "القانون التجاري", fr: "Droit Commercial" },
      description: {
        ar: "نساعد المقاولات والتجار في النزاعات التجارية وعقود الشراكة وتأسيس الشركات.",
        fr: "Nous accompagnons les entreprises et commerçants dans les litiges commerciaux, contrats de partenariat et création de sociétés.",
      },
    },
    {
      slug: "droit-immobilier",
      icon: "🏢",
      title: { ar: "قانون العقارات", fr: "Droit Immobilier" },
      description: {
        ar: "تخصص في القضايا العقارية، عقود البيع والإيجار، ونزاعات التعمير والتحفيظ العقاري.",
        fr: "Spécialisation en droit immobilier : vente, location, urbanisme et conservation foncière.",
      },
    },
    {
      slug: "droit-penal",
      icon: "🛡️",
      title: { ar: "القانون الجنائي", fr: "Droit Pénal" },
      description: {
        ar: "دفاع قانوني متخصص في القضايا الجنائية وضمان حقوق المتهمين أمام المحاكم.",
        fr: "Défense pénale spécialisée garantissant les droits des prévenus devant les juridictions pénales.",
      },
    },
    {
      slug: "droit-travail",
      icon: "👷",
      title: { ar: "قانون الشغل", fr: "Droit du Travail" },
      description: {
        ar: "حماية حقوق الأجراء والمشغلين في نزاعات الشغل والفصل التعسفي والتعويضات.",
        fr: "Protection des droits des salariés et employeurs dans les litiges de travail, licenciements abusifs et indemnisations.",
      },
    },
  ],

  stats: [
    { value: 10, suffix: "+", label: { ar: "سنوات الخبرة", fr: "Ans d'expérience" } },
    { value: 500, suffix: "+", label: { ar: "قضية ناجحة", fr: "Dossiers traités" t },
    { value: 98, suffix: "%", label: { ar: "رضا العملاء", fr: "Clients satisfaits" } },
    { value: 6, suffix: "", label: { ar: "تخصصات قانونية", fr: "Domaines d'expertise" } },
  ],

  process: [
    {
      num: 1,
      title: { ar: "الاستشارة الأولى", fr: "Consultation initiale" },
      desc: {
        ar: "نستمع إليكم ونحلل وضعكم القانوني بعناية.",
        fr: "Nous vous écoutons et analysons votre situation juridique avec attention.",
      },
    },
    {
      num: 2,
      title: { ar: "دراسة الملف", fr: "Étude du dossier" },
      desc: {
        ar: "نقوم بدراسة معمقة لملفكم وجمع الوثائق اللازمة.",
        fr: "Nous effectuons une étude approfondie de votre dossier et rassemblons les pièces nécessaires.",
      },
    },
    {
      num: 3,
      title: { ar: "وضع الاستراتيجية", fr: "Élaboration de la stratégie" },
      desc: {
        ar: "نضع معكم أفضل استراتيجية قانونية لقضيتكم.",
        fr: "Nous élaborons avec vous la meilleure stratégie juridique pour votre affaire.",
      },
    },
    {
      num: 4,
      title: { ar: "التمثيل والدفاع", fr: "Représentation & Défense" },
      desc: {
        ar: "نمثلكم أمام المحاكم ونتابع قضيتكم حتى النهاية.",
        fr: "Nous vous représentons devant les tribunaux et suivons votre affaire jusqu'à son terme.",
      },
    },
  ],

  faq: [
    {
      q: {
        ar: "كيف يمكنني حجز استشارة قانونية؟",
        fr: "Comment prendre rendez-vous pour une consultation ?",
      },
      a: {
        ar: "يمكنكم التواصل معنا عبر الواتساب أو الهاتف على الرقم +212705646242 أو عبر نموذج التواصل في الموقع.",
        fr: "Vous pouvez nous contacter via WhatsApp ou téléphone au +212705646242 ou via le formulaire de contact sur le site.",
      },
    },
    {
      q: {
        ar: "ما هي تكلفة الاستشارة الأولى؟",
        fr: "Quel est le coût de la première consultation ?",
      },
      a: {
        ar: "تواصلوا معنا مباشرة للاستفسار عن أتعاب الاستشارة القانونية.",
        fr: "Contactez-nous directement pour vous renseigner sur les honoraires de consultation.",
      },
    },
    {
      q: {
        ar: "ما هي المناطق التي تغطيها الخدمات القانونية؟",
        fr: "Quelles zones géographiques couvrez-vous ?",
      },
      a: {
        ar: "نتدخل أمام محاكم الدار البيضاء وسائر المحاكم المغربية.",
        fr: "Nous intervenons devant les tribunaux de Casablanca et l'ensemble des juridictions marocaines.",
      },
    },
    {
      q: {
        ar: "كم تستغرق القضية القانونية؟",
        fr: "Combien de temps dure une procédure judiciaire ?",
      },
      a: {
        ar: "تختلف المدة حسب طبيعة القضية وتعقيداتها. نحرص على إبقائكم على اطلاع دائم بمراحل قضيتكم.",
        fr: "La durée varie selon la nature et la complexité du dossier. Nous vous tenons informés à chaque étape de la procédure.",
      },
    },
    {
      q: {
        ar: "هل يمكن الحصول على استشارة عن بعد؟",
        fr: "Peut-on avoir une consultation à distance ?",
      },
      a: {
        ar: "نعم، يمكن إجراء الاستشارة القانونية عبر الهاتف أو الواتساب حسب طلبكم.",
        fr: "Oui, la consultation juridique peut se faire par téléphone ou WhatsApp selon votre convenance.",
      },
    },
  ],

  reseaux: {
    facebook: "",
    linkedin: "",
    instagram: "",
  },

  siteUrl: "https://cabinet-elhamadani.vercel.app",
};
