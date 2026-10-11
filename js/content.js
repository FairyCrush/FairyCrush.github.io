window.PORTFOLIO = {
  person: {
    name: "Bevlin Logen",
    firstName: "Bevlin",
    initials: "BL",
    email: "bevlinlogen@gmail.com",
    avatar: "",
    titleTag: { en: "Data Science", id: "Data Science" },
    role: { en: "Computer Science student · Data Science, BINUS University", id: "Mahasiswa Ilmu Komputer · Data Science, BINUS University" },
    links: [
      { icon: "mail", url: "mailto:bevlinlogen@gmail.com", label: { en: "Email", id: "Email" } },
      { icon: "github", url: "https://github.com/FairyCrush", label: { en: "GitHub", id: "GitHub" } },
      { icon: "linkedin", url: "https://www.linkedin.com/in/bevlin-logen-92276a331", label: { en: "LinkedIn", id: "LinkedIn" } },
      { icon: "kaggle", url: "https://www.kaggle.com/bevlinlogen", label: { en: "Kaggle", id: "Kaggle" } },
      { icon: "instagram", url: "https://www.instagram.com/bevs.alv_logen/", label: { en: "Instagram", id: "Instagram" } },
      { icon: "cv", url: "cv/CV_Bevlin_Logen.pdf", label: { en: "CV", id: "CV" } }
    ]
  },

  about: {
    lead: {
      en: "I'm a computer science student at BINUS University, focused on data science and on knowing when a result can be trusted.",
      id: "Saya mahasiswa Ilmu Komputer di BINUS University yang fokus di data science, terutama soal kapan sebuah hasil layak dipercaya."
    },
    body: {
      en: [
        "Most of my work runs from raw data to a model people can use: scraping and cleaning, training on a laptop GPU, then serving through FastAPI, Streamlit or AWS SageMaker. Every score along the way gets compared with a baseline.",
        "In our TB notification benchmark the main hypothesis came out null, and the draft paper reports it that way."
      ],
      id: [
        "Kebanyakan kerjaan saya berjalan dari data mentah sampai model yang bisa dipakai orang, mulai dari scraping dan pembersihan data, training di GPU laptop, sampai disajikan lewat FastAPI, Streamlit, atau AWS SageMaker. Setiap skor di sepanjang jalan saya bandingkan dengan baseline.",
        "Di benchmark notifikasi TBC yang kami kerjakan, hipotesis utamanya hasilnya null, dan draf papernya melaporkan hasil itu apa adanya."
      ]
    }
  },

  now: {
    en: "Finishing the TB benchmark paper and looking for a data science internship through BINUS.",
    id: "Menyelesaikan paper benchmark TBC dan mencari magang data science lewat BINUS."
  },

  figure: { value: "0.948", project: "automl" },

  skills: [
    {
      icon: "data",
      project: "textmining",
      title: { en: "Data", id: "Data" },
      tools: "SQL · pandas · scraping",
      proof: { en: "5,000 articles crawled, deduped to 4,979", id: "5.000 artikel di-crawl, sisa 4.979 setelah dedup" }
    },
    {
      icon: "model",
      project: "automl",
      title: { en: "Modeling", id: "Pemodelan" },
      tools: "scikit-learn · XGBoost · statsmodels",
      proof: { en: "nested CV, Holm-corrected tests", id: "nested CV, uji dengan koreksi Holm" }
    },
    {
      icon: "deep",
      project: "textmining",
      title: { en: "Deep Learning", id: "Deep Learning" },
      tools: "PyTorch · Transformers · LoRA",
      proof: { en: "IndoBERT at 95.68% test accuracy", id: "IndoBERT, akurasi uji 95,68%" }
    },
    {
      icon: "cloud",
      project: "sagemaker",
      title: { en: "Deployment", id: "Deployment" },
      tools: "FastAPI · Streamlit · AWS SageMaker",
      proof: { en: "models served behind FastAPI and SageMaker", id: "model disajikan lewat FastAPI dan SageMaker" }
    }
  ],

  languages: ["Python", "R", "JavaScript", "TypeScript", "Java", "C", "C++"],

  credentials: [
    {
      image: "assets/aws-academy-ml-foundations.png",
      alt: { en: "AWS Academy Machine Learning Foundations badge, Trained", id: "Badge AWS Academy Machine Learning Foundations, Trained" },
      issuer: "AWS Academy",
      title: "Machine Learning Foundations",
      level: "Trained",
      date: "2026-05",
      note: { en: "Module knowledge checks: 570 / 600 (95%)", id: "Knowledge check per modul: 570 / 600 (95%)" },
      skills: ["Amazon Web Services (AWS)", "Artificial Intelligence", "Machine Learning"],
      url: "https://www.credly.com/badges/d4739d24-3909-4dd0-aa6e-fb8baee3d845/public_url"
    }
  ],

  projects: [
    {
      id: "scanl",
      featured: true,
      year: "2026",
      context: { en: "Product built with a teammate · I built the engine, benchmarks and security layer · since Jun 2026", id: "Produk bareng satu teman · engine, benchmark, dan lapisan keamanannya saya yang bangun · sejak Jun 2026" },
      title: { en: "Vanscroft's ScanL", id: "Vanscroft's ScanL" },
      lead: {
        en: "A data analysis workspace that shows how much weight each result can carry. Upload a dataset and every answer comes with its sample size, a baseline and a short verdict.",
        id: "Workspace analisis data yang menunjukkan seberapa kuat sebuah hasil. Setelah dataset di-upload, tiap hasil langsung dilengkapi ukuran sampel, baseline, dan kesimpulan singkat."
      },
      problem: {
        en: "People analysing CSV or Excel files often can't tell a solid result from noise in a small sample. In our survey, 27 of 33 respondents said they had doubted whether their own analysis was right.",
        id: "Orang yang menganalisis file CSV atau Excel sering susah membedakan hasil yang kuat dari noise di sampel kecil. Di survei kami, 27 dari 33 responden pernah ragu apakah analisis mereka sendiri benar."
      },
      approach: {
        en: "A Next.js 15 app on PostgreSQL, with a FastAPI service running pandas, scikit-learn and statsmodels behind it, plus an optional PyTorch computer-vision worker on my RTX 5050. Its 27 analysis modules live in one registry, and the newer ones had to pass an honesty benchmark first by refusing a known-null fixture and finding a planted signal. Each user's data is encrypted with AES-256-GCM, and audit-log checkpoints are signed with Ed25519.",
        id: "Aplikasinya Next.js 15 dengan database PostgreSQL, dan di belakangnya ada service FastAPI dengan pandas, scikit-learn, dan statsmodels, plus worker computer vision berbasis PyTorch yang jalan di RTX 5050 saya. Ada 27 modul analisis dalam satu registry, dan modul yang lebih baru harus lolos benchmark kejujuran dulu, yaitu menolak fixture null dan menemukan sinyal yang sengaja ditanam. Data tiap user dienkripsi AES-256-GCM, dan checkpoint audit log ditandatangani dengan Ed25519."
      },
      metrics: [
        { label: { en: "Analysis modules active", id: "Modul analisis aktif" }, value: "21 / 27", note: { en: "2 more available, 4 coming", id: "2 lagi tersedia, 4 menyusul" } },
        { label: { en: "Survey: had doubted their own analysis", id: "Survei: pernah ragu dengan analisisnya" }, value: "27 / 33", note: { en: "respondents watched a demo video", id: "responden menonton video demo" } },
        { label: { en: "Survey: would try it", id: "Survei: mau mencoba" }, value: "29 / 33" },
        { label: { en: "Codebase", id: "Ukuran kode" }, value: { en: "~78k lines", id: "~78 ribu baris" }, note: { en: "68.6k TypeScript, 9.1k Python, 56 pages, 33 API routes", id: "68,6 ribu TypeScript, 9,1 ribu Python, 56 halaman, 33 rute API" } },
        { label: { en: "Automated tests", id: "Tes otomatis" }, value: { en: "42 files", id: "42 file" }, note: { en: "about 488 test cases", id: "sekitar 488 kasus uji" } }
      ],
      headline: 0,
      stack: ["Next.js 15", "TypeScript", "PostgreSQL", "Drizzle", "FastAPI", "pandas", "scikit-learn", "statsmodels", "PyTorch", "Vitest"],
      caveat: { en: "Pre-production. It has not been deployed publicly yet.", id: "Masih pra-produksi dan belum dirilis ke publik." },
      viz: {
        type: "registry",
        active: 21,
        available: 2,
        soon: 4,
        accent: 20,
        caption: { en: "module registry, one cell per module", id: "registry modul, satu sel per modul" },
        legend: { en: "21 active · 2 available · 4 coming", id: "21 aktif · 2 tersedia · 4 menyusul" },
        bar: {
          label: { en: "27 of 33 had doubted their analysis", id: "27 dari 33 pernah ragu" },
          total: 33,
          segments: [{ value: 11, hot: true }, { value: 16 }, { value: 3, muted: true }, { value: 3, muted: true }],
          note: { en: "often · once or twice · never · blank", id: "sering · sekali-dua kali · tidak · kosong" }
        }
      }
    },
    {
      id: "automl",
      featured: true,
      year: "2026",
      context: { en: "Part of ScanL · Jul to Aug 2026", id: "Bagian dari ScanL · Jul sampai Agu 2026" },
      title: { en: "AutoML That Refuses to Lie", id: "AutoML yang Jujur soal Skor" },
      lead: {
        en: "The old training pipeline reported 0.948 accuracy on pure noise. I replaced it with a nested-CV engine that has to beat a baseline before it says anything good.",
        id: "Pipeline training yang lama melaporkan akurasi 0,948 pada data yang isinya cuma noise. Saya ganti dengan engine nested CV yang baru melaporkan hasil bagus kalau skornya mengalahkan baseline."
      },
      problem: {
        en: "An audit of the old pipeline found four main faults. It reported the same score it had used to pick the winning model, it fitted imputation and one-hot encoding on the full data before cross-validation, it scored imbalanced labels with plain accuracy and no baseline, and it showed mean ± 1.96 SD over a few folds as a 95% CI.",
        id: "Audit pada pipeline lama menemukan empat masalah utama. Skor yang dipakai untuk memilih model terbaik ikut dilaporkan sebagai performa, imputasi dan one-hot encoding di-fit ke seluruh data sebelum cross-validation, label yang tidak seimbang dinilai pakai akurasi biasa tanpa baseline, dan rata-rata ± 1,96 SD dari beberapa fold ditampilkan sebagai 95% CI."
      },
      approach: {
        en: "Every transform now lives inside a scikit-learn Pipeline, so it is fitted per fold. Inner folds pick the model, outer folds score it, and the score is reported as skill over a dummy baseline fitted in the same fold. A separate check flags any single feature that predicts the target almost perfectly as suspected leakage. The engine answers with one of six verdicts, and 'no better than baseline' is one of them.",
        id: "Semua transformasi sekarang ada di dalam Pipeline scikit-learn, jadi di-fit per fold. Fold dalam memilih model, fold luar menilainya, dan skornya dilaporkan sebagai skill di atas baseline dummy yang di-fit di fold yang sama. Ada pengecekan terpisah yang menandai fitur tunggal yang bisa menebak target hampir sempurna sebagai dugaan leakage. Hasil akhirnya berupa salah satu dari enam verdict, dan salah satunya 'tidak lebih baik dari baseline'."
      },
      metrics: [
        { label: { en: "Noise features, 95% one class", id: "Fitur noise, 95% satu kelas" }, value: "0.948 → 0.000", note: { en: "old accuracy, then new skill: no better than baseline", id: "akurasi lama, lalu skill baru: tidak lebih baik dari baseline" } },
        { label: { en: "Target copied into a feature", id: "Target disalin ke fitur" }, value: { en: "R² 0.996 → flagged", id: "R² 0,996 → ditandai" }, note: { en: "verdict: leakage suspected", id: "verdict: dugaan leakage" } },
        { label: { en: "Real logistic signal", id: "Sinyal logistik asli" }, value: "0.747 → 0.545", note: { en: "old accuracy 0.747, new skill over baseline 0.545 · verdict: usable", id: "akurasi lama 0,747, skill baru di atas baseline 0,545 · verdict: layak dipakai" } },
        { label: { en: "Benchmark cases with the expected verdict", id: "Kasus benchmark dengan verdict yang sesuai" }, value: "7 / 7" }
      ],
      headline: 0,
      stack: ["Python", "scikit-learn", "pandas", "NumPy", "FastAPI"],
      caveat: { en: "Fixtures are synthetic and seeded. Scores come from the benchmark run on 31 Jul 2026.", id: "Fixture-nya sintetis dengan seed tetap. Skornya diambil dari run benchmark 31 Jul 2026." },
      viz: {
        type: "slope",
        min: 0,
        max: 1,
        baseline: 0,
        caption: { en: "claimed score, then measured skill", id: "skor yang diklaim, lalu skill terukur" },
        leftTitle: { en: "old claim", id: "klaim lama" },
        rightTitle: { en: "new engine", id: "engine baru" },
        rows: [
          { left: 0.996, leftText: "0.996", leftDy: -3, right: null, flagAt: 0.92, rightText: { en: "leakage", id: "leakage" }, label: { en: "target copied", id: "target disalin" } },
          { left: 0.948, leftText: "0.948", leftDy: 4, right: 0, rightText: "0.000", hot: true, label: { en: "pure noise", id: "noise murni" } },
          { left: 0.747, leftText: "0.747", right: 0.545, rightText: "0.545", label: { en: "real signal", id: "sinyal asli" } }
        ],
        footer: { en: "dashed line = baseline skill 0", id: "garis putus-putus = skill baseline 0" }
      }
    },
    {
      id: "eveline",
      featured: true,
      year: "2026",
      context: { en: "Personal project · Aug 2026", id: "Proyek pribadi · Agu 2026" },
      title: { en: "Eveline, a 1.5B Code Model", id: "Eveline, Model Kode 1,5B" },
      lead: {
        en: "A 1.5B code model I fine-tuned with LoRA on an 8 GB laptop GPU. On 214 held-out tasks none of its outputs broke the checked rules (no comments, emoji, docstrings or raw hex colours), ahead of a model twice its size.",
        id: "Model kode 1,5B yang saya fine-tune pakai LoRA di GPU laptop 8 GB. Di 214 tugas uji, tidak satu pun output-nya melanggar aturan yang dicek (komentar, emoji, docstring, warna hex mentah), dan skornya mengungguli model yang dua kali lebih besar."
      },
      problem: {
        en: "Small open code models often ignore a codebase's house rules even when every rule is written in the prompt. I wanted to know if a 1.5B model running locally could learn those habits well enough to beat larger general models on this narrow task.",
        id: "Model kode open-source yang kecil sering mengabaikan aturan sebuah codebase, padahal semua aturannya sudah ditulis di prompt. Saya ingin tahu apakah model 1,5B yang jalan lokal bisa belajar kebiasaan itu sampai mengalahkan model umum yang lebih besar di tugas sempit ini."
      },
      approach: {
        en: "I locked the test split by fingerprint before building a single example. Layered filters for duplicates, test leakage, secrets and dead code left 1,916 code units, which became 1,308 instruction pairs. Training used LoRA r=16 with completion-only loss and early stopping. I built the scoring harness on the TypeScript compiler API and Python's ast module, and every rival got the same system prompt. The final model writes a short reasoning block before the code and runs locally through Ollama.",
        id: "Split uji saya kunci pakai fingerprint sebelum satu contoh pun dibuat. Setelah disaring dari duplikat, kebocoran data uji, secret, dan kode mati, tersisa 1.916 unit kode yang lalu dijadikan 1.308 pasangan instruksi. Training pakai LoRA r=16 dengan loss yang cuma dihitung di bagian jawaban, plus early stopping. Alat penilainya saya bangun di atas TypeScript compiler API dan modul ast Python, dan semua model pembanding dapat system prompt yang sama. Model akhirnya menulis blok penalaran singkat sebelum kode dan jalan lokal lewat Ollama."
      },
      metrics: [
        { label: { en: "Checked-rule compliance, 214 pairs", id: "Kepatuhan aturan yang dicek, 214 pasangan" }, value: "100%", note: { en: "Qwen2.5-Coder-3B 85.5 · Qwen-1.5B 63.6 · DeepSeek-1.3B 36.4", id: "Qwen2.5-Coder-3B 85,5 · Qwen-1.5B 63,6 · DeepSeek-1.3B 36,4" } },
        { label: { en: "Indonesian UI strings", id: "Teks UI berbahasa Indonesia" }, value: "87.9%", note: { en: "Qwen-3B 59.7 · Qwen-1.5B 26.7 · DeepSeek-1.3B 25.4", id: "Qwen-3B 59,7 · Qwen-1.5B 26,7 · DeepSeek-1.3B 25,4" } },
        { label: { en: "Syntax-parse pass rate", id: "Lolos parse sintaks" }, value: "98.1%", note: { en: "rivals 97.2 to 98.1", id: "pembanding 97,2 sampai 98,1" } },
        { label: { en: "Degenerate outputs", id: "Output rusak atau berulang" }, value: "0.5%", note: { en: "rivals 1.4 to 3.7", id: "pembanding 1,4 sampai 3,7" } },
        { label: { en: "Verbatim copies of training data", id: "Salinan persis data latih" }, value: "0 / 214" },
        { label: { en: "Local speed", id: "Kecepatan lokal" }, value: "~80 tok/s", note: { en: "GGUF f16, 3.1 GB, Ollama", id: "GGUF f16, 3,1 GB, Ollama" } }
      ],
      headline: 0,
      stack: ["PyTorch", "Transformers", "PEFT (LoRA)", "TRL", "llama.cpp", "Ollama", "Node.js", "CUDA"],
      caveat: { en: "Narrow benchmark on one codebase that the rivals never saw. General coding ability was outside its scope.", id: "Benchmark sempit di satu codebase yang belum pernah dilihat model pembanding. Kemampuan coding secara umum berada di luar cakupannya." },
      viz: {
        type: "compare",
        max: 100,
        caption: { en: "checked-rule compliance, % of 214 tasks", id: "kepatuhan aturan, % dari 214 tugas" },
        rows: [
          { label: "Eveline 1.5B", value: 100, display: "100", highlight: true },
          { label: "Qwen2.5-Coder-3B", value: 85.5, display: "85.5" },
          { label: "Qwen2.5-Coder-1.5B", value: 63.6, display: "63.6" },
          { label: "DeepSeek-Coder-1.3B", value: 36.4, display: "36.4" }
        ]
      }
    },
    {
      id: "tb",
      featured: true,
      year: "2026",
      context: { en: "Research Methodology · IEEE paper draft · team of 2", id: "Research Methodology · draf paper IEEE · tim 2 orang" },
      title: { en: "Could 2019 Data Predict the TB Notification Drop?", id: "Bisakah Data 2019 Menebak Turunnya Notifikasi TBC?" },
      lead: {
        en: "A benchmark across 120 countries, with protocol, code and data hash-locked before the final run. Ten pre-pandemic country indicators added no detectable value beyond WHO region and the pre-pandemic trend, and the draft reports that null result as it came out.",
        id: "Benchmark di 120 negara. Protokol, kode, dan datanya dikunci pakai hash sebelum run final. Sepuluh indikator negara sebelum pandemi tidak menambah nilai yang terdeteksi di luar region WHO dan tren sebelum pandemi, dan drafnya melaporkan hasil null itu apa adanya."
      },
      problem: {
        en: "TB case notifications fell sharply during COVID-19. The question was whether routinely published 2019 indicators could have flagged which national programmes would fall the most, tested out of sample against a region-plus-trend benchmark.",
        id: "Notifikasi kasus TBC turun tajam selama COVID-19. Pertanyaannya, apakah indikator 2019 yang rutin dipublikasikan bisa menandai lebih awal program negara mana yang bakal turun paling dalam, diuji out-of-sample melawan benchmark region plus tren."
      },
      approach: {
        en: "My first design fell apart in an audit. Its target was mostly a WHO model output, and a persistence baseline beat every ML model. I rebuilt it around directly reported notifications, compared ridge, random forest, XGBoost and SVR with 5-fold CV repeated 10 times, and tested two pre-specified hypotheses with corrected t-tests and Holm adjustment. Protocol, code and data were hash-locked with SHA-256 before the final run.",
        id: "Desain pertama saya gugur waktu diaudit. Targetnya ternyata sebagian besar hasil model WHO, dan baseline persistence mengalahkan semua model ML. Saya bangun ulang dengan target notifikasi yang benar-benar dilaporkan, membandingkan ridge, random forest, XGBoost, dan SVR dengan 5-fold CV yang diulang 10 kali, lalu menguji dua hipotesis yang ditetapkan di awal dengan corrected t-test dan koreksi Holm. Protokol, kode, dan data dikunci dengan hash SHA-256 sebelum run final."
      },
      metrics: [
        { label: { en: "Countries", id: "Negara" }, value: "120", note: { en: "99.72% of global TB notifications in 2019", id: "99,72% notifikasi TBC dunia tahun 2019" } },
        { label: { en: "R² from WHO region alone", id: "R² dari region WHO saja" }, value: "0.257" },
        { label: { en: "R² change from 10 indicators (H1)", id: "Perubahan R² dari 10 indikator (H1)" }, value: { en: "−0.027 to 0.054", id: "−0,027 sampai 0,054" }, note: { en: "not supported by the data", id: "tidak didukung data" } },
        { label: { en: "SVR over ridge (H2)", id: "SVR dibanding ridge (H2)" }, value: "+0.102 R²", note: { en: "region + indicators, Holm-adjusted p = 0.045; not significant once trend is added", id: "fitur region + indikator, p = 0,045 setelah Holm; tidak signifikan kalau tren ikut dimasukkan" } },
        { label: { en: "Full rerun from scratch", id: "Run ulang dari nol" }, value: { en: "identical", id: "sama persis" }, note: { en: "66.5 minutes, same summary file", id: "66,5 menit, file ringkasan sama persis" } }
      ],
      headline: 1,
      stack: ["Python", "scikit-learn", "XGBoost", "SciPy", "statsmodels", "pandas", "matplotlib", "Zotero"],
      caveat: { en: "Draft, not submitted yet. The design is ecological, so the associations stay correlational. I ran the design and pipeline, and my partner checked the literature.", id: "Masih draf dan belum disubmit. Desainnya ekologis, jadi hubungan yang ditemukan sebatas korelasi. Saya pegang desain dan pipeline, sedangkan partner saya mengecek literatur." },
      viz: {
        type: "ladder",
        min: -0.05,
        max: 0.35,
        reference: 0.257,
        referenceLabel: { en: "region only", id: "region saja" },
        ticks: [0, 0.1, 0.2, 0.3],
        tickLabels: { en: ["0", "0.1", "0.2", "0.3"], id: ["0", "0,1", "0,2", "0,3"] },
        caption: { en: "out-of-fold R², without → with indicators", id: "R² out-of-fold, tanpa → dengan indikator" },
        rows: [
          { label: { en: "Mean", id: "Rata-rata" }, values: [-0.022] },
          { label: "Region", values: [0.257] },
          { label: { en: "+ trend", id: "+ tren" }, values: [0.257] },
          { label: "Ridge", values: [0.261, 0.234] },
          { label: "RF", values: [0.268, 0.302] },
          { label: "XGBoost", values: [0.208, 0.263] },
          { label: "SVR", values: [0.291, 0.31], hot: true }
        ],
        footer: { en: "120 countries", id: "120 negara" }
      }
    },
    {
      id: "textmining",
      year: "2026",
      context: { en: "Text Mining final · Sep 2026", id: "Final Text Mining · Sep 2026" },
      title: { en: "Indonesian News, Classified and Summarized", id: "Klasifikasi dan Ringkasan Berita Indonesia" },
      lead: {
        en: "5,000 scraped detik.com articles in five categories. IndoBERT reached 95.68% test accuracy, LDA found 37 sub-topics, and each topic got a summary drawn from several articles.",
        id: "5.000 artikel detik.com hasil scraping dalam lima kategori. IndoBERT mencapai akurasi uji 95,68%, LDA menemukan 37 subtopik, dan tiap topik dapat ringkasan dari beberapa artikel sekaligus."
      },
      problem: {
        en: "Classify Indonesian news by category with a deep learning model and a BERT model, find sub-topics inside each category, then summarize each topic. Two earlier attempts had failed quietly: an LSTM stuck near 29%, and a ROUGE setup that compared summaries with themselves.",
        id: "Mengklasifikasi berita Indonesia per kategori dengan model deep learning dan model BERT, mencari subtopik di tiap kategori, lalu meringkas tiap topik. Dua percobaan sebelumnya gagal diam-diam, yaitu LSTM yang mentok di sekitar 29% dan setup ROUGE yang membandingkan ringkasan dengan dirinya sendiri."
      },
      approach: {
        en: "A sitemap crawl with BeautifulSoup, deduplication down to 4,979 articles, and a stratified split made before anything was fitted. A Keras BiLSTM and a fine-tuned IndoBERT each had to clear a majority-class gate, and an 8-variant ablation showed which LSTM fixes mattered. Topics came from per-class LDA with a coherence sweep, summaries from MMR, and ROUGE scores were compared with random, lead and oracle baselines.",
        id: "Crawl lewat sitemap dengan BeautifulSoup, deduplikasi sampai tersisa 4.979 artikel, dan split stratified yang dibuat sebelum apa pun di-fit. BiLSTM Keras dan IndoBERT yang di-fine-tune sama-sama harus lolos batas baseline kelas mayoritas, dan ablation 8 varian menunjukkan perbaikan LSTM mana yang berpengaruh. Topik dicari dengan LDA per kelas plus sweep coherence, ringkasan dibuat dengan MMR, lalu skor ROUGE-nya dibandingkan dengan baseline random, lead, dan oracle."
      },
      metrics: [
        { label: { en: "IndoBERT test accuracy", id: "Akurasi uji IndoBERT" }, value: "95.68%", note: { en: "macro-F1 0.9561", id: "macro-F1 0,9561" } },
        { label: { en: "BiLSTM test accuracy", id: "Akurasi uji BiLSTM" }, value: "92.37%", note: { en: "macro-F1 0.9277", id: "macro-F1 0,9277" } },
        { label: { en: "Without bidirectionality", id: "Tanpa bidirectional" }, value: { en: "−3.81 pts", id: "−3,81 poin" }, note: { en: "largest drop from any single change", id: "penurunan terbesar dari satu perubahan" } },
        { label: { en: "LDA topics", id: "Topik LDA" }, value: "37", note: { en: "over 4,979 articles", id: "dari 4.979 artikel" } },
        { label: { en: "ROUGE-1 F1, topic-aware vs lead", id: "ROUGE-1 F1, topic-aware vs lead" }, value: "0.150 vs 0.120", note: { en: "title-based reference; lead wins with a lead-based one", id: "referensi dari judul; lead menang kalau referensinya dari lead" } }
      ],
      headline: 0,
      stack: ["BeautifulSoup", "pandas", "NLTK", "TensorFlow / Keras", "PyTorch", "IndoBERT", "gensim", "rouge_score"],
      caveat: { en: "Not submitted yet; the interpretation and video are still to come. Only aggregate numbers are shown, because the article text belongs to detik.com.", id: "Belum dikumpulkan, interpretasi dan videonya masih menyusul. Yang ditampilkan cuma angka agregat, karena isi artikelnya milik detik.com." },
      viz: {
        type: "matrix",
        caption: { en: "IndoBERT, true ↓ predicted →", id: "IndoBERT, asli ↓ prediksi →" },
        labels: { en: ["Finance", "Health", "News", "Sports", "Tech"], id: ["Keuangan", "Kesehatan", "Berita", "Olahraga", "Teknologi"] },
        cells: [[186, 2, 6, 0, 3], [2, 96, 1, 1, 0], [6, 2, 241, 2, 8], [0, 1, 2, 197, 1], [2, 2, 1, 1, 233]],
        footer: { en: "test set, n = 996", id: "data uji, n = 996" }
      }
    },
    {
      id: "deeplearning",
      year: "2026",
      context: { en: "Deep Learning final exam · Jun 2026", id: "Ujian akhir Deep Learning · Jun 2026" },
      title: { en: "LSTM, Autoencoder and Conditional GAN", id: "LSTM, Autoencoder, dan Conditional GAN" },
      lead: {
        en: "Three PyTorch models trained on my laptop GPU, each against its own baseline. Three of the four comparisons improved, and the AMD forecast did not.",
        id: "Tiga model PyTorch yang dilatih di GPU laptop, masing-masing diadu dengan baseline-nya sendiri. Tiga dari empat perbandingan membaik, dan prediksi AMD tidak."
      },
      problem: {
        en: "Forecast next-day closing prices for AAPL and AMD, compress 28×28 satellite images into a 128-dimensional code, and generate storage-tank and parking-lot images by class.",
        id: "Menebak harga penutupan hari berikutnya untuk AAPL dan AMD, memampatkan citra satelit 28×28 jadi kode 128 dimensi, dan menghasilkan gambar tangki penyimpanan dan lahan parkir per kelas."
      },
      approach: {
        en: "Chronological splits with the scaler fitted on training data only, and models chosen by validation MSE. A convolutional autoencoder replaced the fully connected one at the same bottleneck. The conditional GAN got a wider generator, twice the epochs (120 vs 60), one-sided label smoothing and discriminator dropout. Seeds and cuDNN were fixed so the runs repeat.",
        id: "Split berdasarkan urutan waktu, scaler cuma di-fit ke data latih, dan model dipilih dari MSE validasi. Autoencoder konvolusi menggantikan versi fully connected dengan bottleneck yang sama. Conditional GAN dapat generator yang lebih lebar, epoch dua kali lipat (120 vs 60), label smoothing satu sisi, dan dropout di discriminator. Seed dan cuDNN dikunci supaya hasilnya bisa diulang."
      },
      metrics: [
        { label: { en: "AAPL test RMSE (USD)", id: "RMSE uji AAPL (USD)" }, value: "11.32 → 6.90", note: { en: "39% lower", id: "turun 39%" } },
        { label: { en: "AMD test RMSE (USD)", id: "RMSE uji AMD (USD)" }, value: "1.41 → 1.45", note: { en: "no improvement", id: "tidak membaik" } },
        { label: { en: "Autoencoder test SSIM", id: "SSIM uji autoencoder" }, value: "0.412 → 0.677" },
        { label: { en: "Conditional GAN test FID", id: "FID uji conditional GAN" }, value: "282.5 → 245.4", note: { en: "lower is better", id: "makin kecil makin baik" } },
        { label: { en: "Satellite images", id: "Citra satelit" }, value: "16,016", note: { en: "storage_tank and parking_lot", id: "storage_tank dan parking_lot" } }
      ],
      headline: 0,
      stack: ["PyTorch", "CUDA", "torchmetrics", "torch-fidelity", "scikit-learn", "pandas", "matplotlib"],
      caveat: { en: "The GAN variant was picked by test FID because the task named FID as its metric. The LSTM and autoencoder were picked on validation data.", id: "Varian GAN dipilih dari FID data uji karena tugasnya memang menetapkan FID sebagai metrik. LSTM dan autoencoder dipilih dari data validasi." },
      viz: {
        type: "glyphs",
        caption: { en: "baseline → modified, test set", id: "baseline → modifikasi, data uji" },
        lowerLabel: { en: "↓ better", id: "↓ lebih baik" },
        higherLabel: { en: "↑ better", id: "↑ lebih baik" },
        items: [
          { label: "AAPL", metric: "RMSE", before: 11.3172, after: 6.8975, beforeText: "11.32", afterText: "6.90", lowerBetter: true },
          { label: "AMD", metric: "RMSE", before: 1.4077, after: 1.4526, beforeText: "1.41", afterText: "1.45", lowerBetter: true },
          { label: "AE", metric: "SSIM", before: 0.412, after: 0.677, beforeText: "0.41", afterText: "0.68" },
          { label: "cGAN", metric: "FID", before: 282.52, after: 245.4, beforeText: "282.5", afterText: "245.4", lowerBetter: true }
        ]
      }
    },
    {
      id: "underwater",
      year: "2026",
      context: { en: "Deep Learning course project · team of 5 · May 2026", id: "Proyek kuliah Deep Learning · tim 5 orang · Mei 2026" },
      title: { en: "Underwater Image Enhancement", id: "Perbaikan Citra Bawah Air" },
      lead: {
        en: "Three models trained to restore color and contrast in underwater photos. A plain encoder-decoder (SSIM 0.7309) stayed below the raw input's average over all pairs (0.7835), adding skip connections alone raised it to 0.8463, and a U-Net with a pretrained EfficientNet-B0 encoder reached 0.9175.",
        id: "Tiga model dilatih untuk memulihkan warna dan kontras foto bawah air. Skor encoder-decoder biasa (SSIM 0,7309) masih di bawah rata-rata input mentah di semua pasangan (0,7835). Cukup dengan menambah skip connection, skornya naik ke 0,8463, dan U-Net dengan encoder EfficientNet-B0 pretrained mencapai 0,9175."
      },
      problem: {
        en: "Water absorbs red light first, so underwater photos come out green-blue, low in contrast and short on detail. Across the 4,279 LSUI pairs, the mean red channel value (0 to 255) is 59.5 in the raw input and 95.2 in the reference images.",
        id: "Air menyerap cahaya merah paling dulu, sehingga foto bawah air tampak hijau kebiruan, kontrasnya rendah, dan detailnya hilang. Di 4.279 pasangan gambar LSUI, rata-rata nilai kanal merah (skala 0 sampai 255) di input mentah cuma 59,5, sedangkan di gambar referensinya 95,2."
      },
      approach: {
        en: "Every image was resized to 256×256, and the 4,279 pairs were split 70/15/15 into 2,995 training, 641 validation and 643 test pairs. All three models used the same MSE loss, Adam at 1e-3 and 50 epochs. Models 1 and 2 differ only in the skip connections: a plain CNN encoder-decoder (1.70M parameters) and the same network as a U-Net (1.88M). Model 3 swaps in an ImageNet-pretrained EfficientNet-B0 encoder through segmentation_models_pytorch, which changes the encoder design, the size (6.25M) and the starting weights at once. The weights with the lowest validation loss were kept. Each model was scored on the test pairs with SSIM, PSNR and MSE against the reference images, and its SSIM was compared with the raw input's average SSIM over all pairs (0.7835).",
        id: "Semua gambar di-resize ke 256×256, lalu 4.279 pasangannya dibagi 70/15/15 jadi 2.995 pasangan latih, 641 validasi, dan 643 uji. Ketiga model memakai setelan yang sama: loss MSE, Adam 1e-3, dan 50 epoch. Model 1 dan 2 cuma beda di skip connection, yaitu CNN encoder-decoder biasa (1,70 juta parameter) dan jaringan yang sama dalam bentuk U-Net (1,88 juta). Model 3 memakai encoder EfficientNet-B0 yang sudah di-pretrain di ImageNet lewat segmentation_models_pytorch, jadi desain encoder, ukuran (6,25 juta), dan bobot awalnya berubah sekaligus. Yang disimpan adalah bobot dengan val loss terendah. Tiap model dinilai di data uji pakai SSIM, PSNR, dan MSE terhadap gambar referensi, lalu SSIM-nya dibandingkan dengan rata-rata SSIM input mentah di semua pasangan (0,7835)."
      },
      metrics: [
        { label: { en: "Test SSIM, U-Net + EfficientNet-B0", id: "SSIM uji, U-Net + EfficientNet-B0" }, value: "0.9175", note: { en: "raw input, all 4,279 pairs: 0.7835", id: "input mentah, semua 4.279 pasangan: 0,7835" } },
        { label: { en: "Test SSIM, U-Net", id: "SSIM uji, U-Net" }, value: "0.8463", note: { en: "skip connections, 11% more parameters", id: "skip connection, parameternya cuma naik 11%" } },
        { label: { en: "Test SSIM, plain CNN encoder-decoder", id: "SSIM uji, CNN encoder-decoder biasa" }, value: "0.7309", note: { en: "below the raw-input average; sample outputs looked color-corrected but blurred", id: "di bawah rata-rata input mentah; di sampel, warnanya terlihat membaik tapi gambarnya blur" } },
        { label: { en: "PSNR, best model", id: "PSNR, model terbaik" }, value: "25.28 dB", note: { en: "CNN 19.02 dB · U-Net 19.84 dB", id: "CNN 19,02 dB · U-Net 19,84 dB" } },
        { label: { en: "MSE (0 to 255 scale), best model", id: "MSE (skala 0 sampai 255), model terbaik" }, value: "293.67", note: { en: "CNN 969.97 · U-Net 890.74", id: "CNN 969,97 · U-Net 890,74" } },
        { label: { en: "Image pairs (LSUI)", id: "Pasangan gambar (LSUI)" }, value: "4,279", note: { en: "2,995 train · 641 validation · 643 test", id: "2.995 latih · 641 validasi · 643 uji" } }
      ],
      headline: 0,
      stack: ["PyTorch", "segmentation_models_pytorch", "EfficientNet-B0", "scikit-image", "Google Colab"],
      caveat: { en: "Team result, with one training run per model at 256×256. A second CNN run saved in the notebook scored 0.7277 SSIM. The raw-input baseline (0.7835) covers all 4,279 pairs, while the models were scored on 643 test pairs taken as the last 15% of the sorted file list, so the comparison with the baseline is approximate.", id: "Hasil tim, dengan satu kali training per model di 256×256. Run CNN lain yang tersimpan di notebook dapat SSIM 0,7277. Baseline input mentah (0,7835) diukur di semua 4.279 pasangan, sedangkan modelnya dinilai di 643 pasangan uji, yaitu 15% terakhir dari daftar file yang diurutkan, jadi perbandingan dengan baseline-nya cuma perkiraan." },
      viz: {
        type: "ladder",
        min: 0.6,
        max: 1,
        reference: 0.7835,
        referenceLabel: { en: "raw input, all pairs", id: "input mentah, semua pasangan" },
        ticks: [0.6, 0.7, 0.8, 0.9, 1],
        tickLabels: { en: ["0.6", "0.7", "0.8", "0.9", "1"], id: ["0,6", "0,7", "0,8", "0,9", "1"] },
        caption: { en: "SSIM, raw input → model", id: "SSIM, input mentah → model" },
        rows: [
          { label: "CNN", values: [0.7835, 0.7309] },
          { label: "U-Net", values: [0.7835, 0.8463] },
          { label: "EffNet U-Net", values: [0.7835, 0.9175], hot: true }
        ],
        footer: { en: "models: 643 test images", id: "model: 643 gambar uji" }
      }
    },
    {
      id: "sagemaker",
      year: "2026",
      context: { en: "AWS Learner Lab · May 2026", id: "AWS Learner Lab · Mei 2026" },
      title: { en: "Wine Quality on a SageMaker Endpoint", id: "Kualitas Wine di Endpoint SageMaker" },
      lead: {
        en: "Three classifiers trained on the UCI red wine data, the winner deployed as a SageMaker real-time endpoint, and a Streamlit app on EC2 that calls it with signed requests.",
        id: "Tiga classifier dilatih di data red wine UCI, pemenangnya di-deploy sebagai endpoint real-time SageMaker, dan aplikasi Streamlit di EC2 memanggilnya dengan request yang ditandatangani."
      },
      problem: {
        en: "Practise the full cloud path for a model: train it, package it, host it, and call it from a web app without putting credentials in the code.",
        id: "Latihan jalur cloud yang lengkap untuk sebuah model, mulai dari training, packaging, hosting, sampai dipanggil dari web app tanpa menaruh credential di kode."
      },
      approach: {
        en: "Quality scores from 3 to 8 are binned into low, medium and high. Logistic regression, KNN and XGBoost run as interchangeable scikit-learn Pipelines, and the winner by test accuracy is saved with joblib and uploaded to S3. A SageMaker SKLearnModel serves it on an ml.m5.large endpoint through a custom inference script. On EC2, a user-data script installs Streamlit as a systemd service, and boto3 picks up the instance role, so no keys are stored anywhere.",
        id: "Skor kualitas 3 sampai 8 dikelompokkan jadi low, medium, dan high. Logistic regression, KNN, dan XGBoost dijalankan sebagai Pipeline scikit-learn yang bisa saling tukar, lalu pemenangnya berdasarkan akurasi uji disimpan dengan joblib dan di-upload ke S3. SKLearnModel di SageMaker menyajikannya di endpoint ml.m5.large lewat script inference sendiri. Di EC2, script user-data memasang Streamlit sebagai service systemd, dan boto3 memakai role instance, jadi tidak ada key yang disimpan di mana pun."
      },
      metrics: [
        { label: { en: "Credentials in code", id: "Credential di kode" }, value: "0", note: { en: "EC2 instance role + SigV4 signing", id: "role instance EC2 + tanda tangan SigV4" } },
        { label: { en: "Input features", id: "Fitur input" }, value: "11", note: { en: "physico-chemical measurements", id: "pengukuran fisiko-kimia" } },
        { label: { en: "Classes", id: "Kelas" }, value: "3", note: { en: "low, medium, high", id: "low, medium, high" } },
        { label: { en: "Candidate models", id: "Model kandidat" }, value: "3", note: { en: "logistic regression, KNN, XGBoost", id: "logistic regression, KNN, XGBoost" } },
        { label: { en: "Endpoint instance", id: "Instance endpoint" }, value: "ml.m5.large" }
      ],
      headline: 0,
      stack: ["AWS SageMaker", "EC2", "S3", "IAM", "boto3", "scikit-learn", "XGBoost", "Streamlit"],
      caveat: { en: "A guided Learner Lab, so the architecture follows the course handout. Lab resources are temporary, so there is no live link.", id: "Ini Learner Lab terpandu, jadi arsitekturnya mengikuti modul kuliah. Resource lab-nya sementara, jadi tidak ada link yang bisa dibuka." },
      viz: {
        type: "flow",
        caption: { en: "request path", id: "alur request" },
        steps: [
          { label: "Streamlit on EC2", sub: { en: "instance role, no keys", id: "role instance, tanpa key" } },
          { label: "SigV4 request", sub: "boto3 sagemaker-runtime" },
          { label: "SageMaker endpoint", sub: "ml.m5.large" },
          { label: "sklearn Pipeline", sub: "low · medium · high", hot: true }
        ]
      }
    },
    {
      id: "titanic",
      year: "2026",
      context: { en: "Kaggle competition + Model Deployment course · Feb to Apr 2026", id: "Kompetisi Kaggle + mata kuliah Model Deployment · Feb sampai Apr 2026" },
      title: { en: "Spaceship Titanic, From Kaggle to an API", id: "Spaceship Titanic, dari Kaggle sampai API" },
      lead: {
        en: "A Spaceship Titanic classifier that scored 0.79869 accuracy on Kaggle's public leaderboard. For the Model Deployment course, the same task got a FastAPI /predict endpoint and a Streamlit form.",
        id: "Classifier Spaceship Titanic dengan akurasi 0,79869 di public leaderboard Kaggle. Untuk mata kuliah Model Deployment, kasus yang sama lalu dipasang di endpoint FastAPI /predict lengkap dengan form Streamlit."
      },
      problem: {
        en: "Kaggle's Spaceship Titanic asks which passengers were transported to another dimension. The first half was the competition itself, and the second half was serving a model so someone without a notebook could use it.",
        id: "Spaceship Titanic dari Kaggle menanyakan penumpang mana yang terlempar ke dimensi lain. Bagian pertama adalah kompetisinya, dan bagian kedua menyajikan model supaya bisa dipakai orang yang tidak membuka notebook."
      },
      approach: {
        en: "The modelling work compared XGBoost, LightGBM and logistic regression, tuned with Optuna and cross-validation, and the predictions for all 4,277 test passengers went to Kaggle. For deployment, a trained model sits behind a FastAPI POST /predict route that takes the passenger fields as JSON and returns a true/false prediction, documented through Swagger. A Streamlit page collects the same fields and shows whether the passenger was transported.",
        id: "Di tahap pemodelan, XGBoost, LightGBM, dan logistic regression dibandingkan lalu di-tuning pakai Optuna dan cross-validation, dan prediksi untuk 4.277 penumpang uji dikirim ke Kaggle. Untuk deployment, model yang sudah dilatih dipasang di route FastAPI POST /predict yang menerima data penumpang dalam bentuk JSON dan mengembalikan prediksi true/false, lengkap dengan dokumentasi Swagger. Halaman Streamlit mengumpulkan data yang sama dan menampilkan apakah penumpangnya terlempar atau tidak."
      },
      metrics: [
        { label: { en: "Kaggle public score (accuracy)", id: "Skor publik Kaggle (akurasi)" }, value: "0.79869", note: { en: "public leaderboard, 2 submissions", id: "public leaderboard, 2 submission" } },
        { label: { en: "Test passengers predicted", id: "Penumpang uji yang diprediksi" }, value: "4,277", note: { en: "51.3% predicted as transported", id: "51,3% diprediksi terlempar" } },
        { label: { en: "Serving", id: "Penyajian" }, value: "FastAPI + Streamlit" },
        { label: { en: "Endpoint", id: "Endpoint" }, value: "POST /predict", note: { en: "JSON in, true/false out, Swagger docs", id: "masuk JSON, keluar true/false, ada dokumentasi Swagger" } },
        { label: { en: "Candidate models", id: "Model kandidat" }, value: "3", note: { en: "XGBoost, LightGBM, logistic regression", id: "XGBoost, LightGBM, logistic regression" } }
      ],
      headline: 0,
      stack: ["Python", "scikit-learn", "XGBoost", "LightGBM", "Optuna", "FastAPI", "Streamlit", "Kaggle"],
      links: [
        { label: { en: "Kaggle competition", id: "Kompetisi Kaggle" }, url: "https://www.kaggle.com/competitions/spaceship-titanic" }
      ],
      caveat: { en: "The score is from Kaggle's public leaderboard. The API runs locally.", id: "Skornya dari public leaderboard Kaggle. API-nya jalan di lokal." },
      viz: {
        type: "flow",
        caption: { en: "request path · Kaggle public score 0.79869", id: "alur request · skor publik Kaggle 0,79869" },
        steps: [
          { label: "Streamlit form", sub: "localhost:8501" },
          { label: "POST /predict", sub: "FastAPI · :8000" },
          { label: { en: "trained classifier", id: "classifier terlatih" }, sub: { en: "passenger fields as JSON", id: "data penumpang dalam JSON" } },
          { label: "{\"prediction\": true}", sub: { en: "transported", id: "terlempar" }, hot: true }
        ]
      }
    },
    {
      id: "columns",
      year: "2026",
      context: { en: "Part of ScanL · Jul 2026", id: "Bagian dari ScanL · Jul 2026" },
      title: { en: "Column Roles Without a Word List", id: "Peran Kolom Tanpa Daftar Kata" },
      lead: {
        en: "A classifier that tells measures from row counters, IDs, places and dates by reading column statistics. With its word list deleted, role accuracy is 87.9% and 99.1% of the decisions built on it stay correct.",
        id: "Classifier yang membedakan angka ukuran, nomor baris, ID, lokasi, dan tanggal dari statistik kolomnya. Waktu daftar katanya dihapus, akurasi perannya 87,9% dan 99,1% keputusan turunannya tetap benar."
      },
      problem: {
        en: "The app once suggested averaging a row counter called NO. My first keyword-based fix made things worse. It marked every Chinese, Cyrillic or Arabic header as broken, read customer_id as a measure, and tagged Capacity as a place because the word contains 'city'.",
        id: "Aplikasinya sempat menyarankan merata-rata kolom nomor baris bernama NO. Perbaikan pertama yang berbasis kata kunci malah bikin lebih parah. Semua header berhuruf Mandarin, Sirilik, atau Arab dianggap rusak, customer_id dibaca sebagai angka ukuran, dan Capacity ditandai sebagai lokasi karena mengandung kata 'city'."
      },
      approach: {
        en: "I rebuilt the core without a single natural-language word. Roles come from dtype, uniqueness, value ranges, skew, entropy, digit width, value shapes such as ISO dates or UUIDs, and structural name patterns. A separate lexicon of 309 hint terms may only confirm what the evidence already suggests. It was scored on a generated ground-truth corpus of 107 columns in four suites, with and without the lexicon.",
        id: "Intinya saya bangun ulang tanpa satu kata bahasa manusia pun. Peran kolom ditentukan dari dtype, tingkat keunikan, rentang nilai, skew, entropi, lebar digit, bentuk nilai seperti tanggal ISO atau UUID, dan pola struktur nama kolom. Leksikon terpisah berisi 309 kata petunjuk cuma boleh menguatkan apa yang sudah ditunjukkan bukti. Penilaiannya pakai korpus ground-truth buatan berisi 107 kolom dalam empat suite, dengan dan tanpa leksikon."
      },
      metrics: [
        { label: { en: "Role accuracy, with lexicon", id: "Akurasi peran, dengan leksikon" }, value: "107 / 107" },
        { label: { en: "Role accuracy, evidence only", id: "Akurasi peran, bukti saja" }, value: "87.9%", note: { en: "multilingual suite 71.9%", id: "suite multibahasa 71,9%" } },
        { label: { en: "Downstream flags, evidence only", id: "Flag turunan, bukti saja" }, value: "99.1%" }
      ],
      headline: 2,
      stack: ["TypeScript", "Python", "pandas", "tsx"],
      caveat: { en: "The benchmark corpus is synthetic and generated by script.", id: "Korpus benchmark-nya sintetis dan dibuat pakai script." },
      viz: {
        type: "pairs",
        caption: { en: "role accuracy per suite, %", id: "akurasi peran per suite, %" },
        reference: 99.1,
        referenceLabel: { en: "flags without lexicon 99.1", id: "flag tanpa leksikon 99,1" },
        legend: [{ en: "with lexicon", id: "dengan leksikon" }, { en: "evidence only", id: "bukti saja" }],
        groups: [
          { label: { en: "business", id: "bisnis" }, a: 100, b: 91.7 },
          { label: { en: "multilang", id: "multibahasa" }, a: 100, b: 71.9 },
          { label: { en: "edge cases", id: "kasus aneh" }, a: 100, b: 91.3 },
          { label: { en: "sci / fin", id: "sains / keu" }, a: 100, b: 100 }
        ]
      }
    },
    {
      id: "honest",
      year: "2026",
      context: { en: "Part of ScanL · Aug 2026", id: "Bagian dari ScanL · Agu 2026" },
      title: { en: "Four Modules That Must Refuse Noise", id: "Empat Modul yang Wajib Menolak Noise" },
      lead: {
        en: "Market basket, survival, recommender and sentiment. Each one stayed switched off until it refused a known-null dataset and found a planted signal.",
        id: "Market basket, survival, recommender, dan sentimen. Masing-masing baru diaktifkan setelah bisa menolak dataset null dan menemukan sinyal yang ditanam."
      },
      problem: {
        en: "The registry had placeholders for these four, and nothing checked whether pure noise would produce the same rules, hazard ratios or sentiment shares. The Indonesian sentiment lexicon in the repo had never been checked either.",
        id: "Registry-nya cuma punya placeholder untuk empat modul ini, dan belum ada yang mengecek apakah noise murni bakal menghasilkan aturan, hazard ratio, atau persentase sentimen yang sama. Leksikon sentimen bahasa Indonesia di repo juga belum pernah dicek."
      },
      approach: {
        en: "Apriori with Benjamini-Hochberg control and a permutation null that keeps basket sizes, after Fisher's test turned out to be confounded by them. Kaplan-Meier, log-rank and Cox with a proportional-hazards check. Leave-one-out recommender evaluation against popularity and random baselines. The lexicon audit found 1,142 words listed as both positive and negative.",
        id: "Apriori dengan kontrol Benjamini-Hochberg dan null permutasi yang menjaga ukuran keranjang, setelah ketahuan uji Fisher ikut terpengaruh ukuran keranjang. Survival pakai Kaplan-Meier, log-rank, dan Cox dengan pengecekan proportional hazards. Recommender dievaluasi leave-one-out melawan baseline popularitas dan random. Audit leksikon sentimen menemukan 1.142 kata yang tercatat positif sekaligus negatif."
      },
      metrics: [
        { label: { en: "Survival: false alarms on null cohorts", id: "Survival: alarm palsu di kohort null" }, value: "0 / 20" },
        { label: { en: "Basket: 'usable' verdicts on pure noise", id: "Basket: verdict 'layak' di noise murni" }, value: "1 / 20", note: { en: "FDR set at 0.01; 1 of 20 is within chance for 20 trials", id: "FDR 0,01; 1 dari 20 masih wajar untuk 20 percobaan" } },
        { label: { en: "Recommender hit rate, planted families", id: "Hit rate recommender, pola ditanam" }, value: "76% vs 36%", note: { en: "against the popularity baseline", id: "dibanding baseline popularitas" } },
        { label: { en: "Recommender on popularity-skewed data", id: "Recommender di data condong populer" }, value: "28% vs 59%", note: { en: "the module reports that it loses", id: "modulnya melaporkan kalah" } },
        { label: { en: "Lexicon words listed as both", id: "Kata leksikon yang tercatat ganda" }, value: "1,142" }
      ],
      headline: 0,
      stack: ["Python", "statsmodels", "SciPy", "NumPy", "pandas", "FastAPI"],
      caveat: { en: "Fixtures are synthetic and seeded. Scores come from benchmark runs in August 2026.", id: "Fixture-nya sintetis dengan seed tetap. Skornya diambil dari run benchmark Agustus 2026." },
      viz: {
        type: "dumbbell",
        caption: { en: "baseline → module, %", id: "baseline → modul, %" },
        legend: { en: "hollow = baseline · solid = module", id: "kosong = baseline · isi = modul" },
        rows: [
          { label: { en: "Recommender, planted", id: "Recommender, ditanam" }, baseline: 36, module: 76 },
          { label: { en: "Recommender, skewed", id: "Recommender, condong" }, baseline: 59, module: 28 },
          { label: { en: "Sentiment, labelled", id: "Sentimen, berlabel" }, baseline: 46.3, module: 90.7 },
          { label: { en: "Sentiment, random labels", id: "Sentimen, label acak" }, baseline: 53, module: 42 }
        ]
      }
    },
    {
      id: "eveline3b",
      year: "2026",
      context: { en: "Personal project · paused, Sep 2026", id: "Proyek pribadi · ditunda, Sep 2026" },
      title: { en: "Eveline-3B and a Judge Worth Trusting", id: "Eveline-3B dan Juri yang Bisa Dipercaya" },
      lead: {
        en: "A follow-up on IBM's Apache-licensed Granite 3B. Before trusting any automatic judge, I measured each candidate against two annotators and dropped the NLI judge and the keyword proxy.",
        id: "Lanjutan Eveline di atas Granite 3B dari IBM yang berlisensi Apache. Sebelum percaya pada juri otomatis, tiap kandidat saya ukur dulu terhadap dua anotator, lalu juri NLI dan proksi kata kunci saya buang."
      },
      problem: {
        en: "The 1.5B model nailed the conventions but stalled on matching the reference code, and it could only do one task. Scoring prose answers such as code explanations needed a judge I could actually trust.",
        id: "Model 1,5B sudah lancar soal konvensi tapi mentok di kemiripan dengan kode referensi, dan cuma bisa satu jenis tugas. Untuk menilai jawaban berupa teks, seperti penjelasan kode, dibutuhkan juri yang benar-benar bisa dipercaya."
      },
      approach: {
        en: "I picked the base model on its license, then measured that it trains faster than the smaller Qwen. I built 3,932 training pairs across four tasks and a 367-item decontaminated test set. In a calibration study, two annotators labelled 74 explanations, each in a clean and a planted version, and agreed at kappa 0.947. An NLI judge (AUC 0.659) and a keyword proxy both failed against those labels and were dropped, and a dual-agent judge was kept. Verification became fail-closed after a bug let 92 entries pass with zero checks.",
        id: "Model dasarnya saya pilih dari lisensi, lalu saya ukur dan ternyata lebih cepat dilatih daripada Qwen yang lebih kecil. Saya bangun 3.932 pasangan latih untuk empat tugas dan 367 soal uji yang sudah bersih dari kontaminasi. Di studi kalibrasi, dua anotator memberi label pada 74 penjelasan, masing-masing dalam versi bersih dan versi yang disisipi klaim salah, dan kesepakatannya kappa 0,947. Juri NLI (AUC 0,659) dan proksi kata kunci sama-sama gagal terhadap label itu dan dibuang, sementara juri dua agen dipakai. Verifikasinya dibuat fail-closed setelah ada bug yang membuat 92 entri lolos tanpa dicek sama sekali."
      },
      metrics: [
        { label: { en: "Annotator agreement", id: "Kesepakatan anotator" }, value: "κ 0.947" },
        { label: { en: "NLI judge vs annotators", id: "Juri NLI vs anotator" }, value: "AUC 0.659", note: { en: "dropped", id: "dibuang" } },
        { label: { en: "Keyword proxy vs annotators", id: "Proksi kata kunci vs anotator" }, value: "ρ 0.013", note: { en: "dropped", id: "dibuang" } },
        { label: { en: "Training speed vs Qwen-1.5B", id: "Kecepatan training vs Qwen-1.5B" }, value: "14.2 vs 54.4 s/step", note: { en: "4.17 vs 5.24 GB VRAM, both 4-bit", id: "VRAM 4,17 vs 5,24 GB, sama-sama 4-bit" } }
      ],
      headline: 0,
      stack: ["PyTorch", "Transformers", "PEFT", "bitsandbytes", "Granite-3B-Code", "mDeBERTa NLI"],
      caveat: { en: "Paused before training started, so what's shown here is the evaluation method.", id: "Ditunda sebelum training dimulai, jadi yang ditampilkan di sini metode evaluasinya." },
      viz: {
        type: "compare",
        max: 0.22,
        caption: { en: "score drop when a false claim is planted", id: "turunnya skor saat klaim salah disisipkan" },
        rows: [
          { label: { en: "Annotators (2)", id: "Anotator (2)" }, value: 0.204, display: "0.204", highlight: true },
          { label: { en: "Keyword proxy", id: "Proksi kata kunci" }, value: 0.02, display: "0.020" }
        ]
      }
    },
    {
      id: "healthweb",
      year: "2026",
      context: { en: "Paid client work · Aug 2026", id: "Proyek klien berbayar · Agu 2026" },
      title: { en: "District Health Office Website", id: "Website Dinas Kesehatan Kabupaten" },
      lead: {
        en: "A front-end rebuild for a district health office in Central Sulawesi, with one content layer that the client's database can plug into later.",
        id: "Membangun ulang tampilan website dinas kesehatan sebuah kabupaten di Sulawesi Tengah, dengan satu lapisan konten yang nanti tinggal disambungkan ke database klien."
      },
      problem: {
        en: "The office needed a replacement public website. The scope was layout and design, and their team will wire in the backend.",
        id: "Kantornya butuh pengganti website publik. Lingkup kerjanya layout dan desain, dan backend-nya nanti disambungkan oleh tim mereka."
      },
      approach: {
        en: "Next.js 15, React 19 and Tailwind v4. Every page reads from one typed async content module, so plugging in a real database leaves the components untouched. Data sits in tables and ledgers, and the client's required palette was checked for contrast.",
        id: "Next.js 15, React 19, dan Tailwind v4. Semua halaman membaca dari satu modul konten async yang bertipe, jadi waktu database asli dipasang, komponennya tidak perlu diubah. Data ditampilkan dalam bentuk tabel dan daftar, dan kontras palet wajib dari klien sudah dicek."
      },
      metrics: [
        { label: { en: "Page routes", id: "Rute halaman" }, value: "17" }
      ],
      headline: 0,
      stack: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS v4"],
      caveat: { en: "A web project, included as client work. Figures on the site stay placeholders until the client connects real data.", id: "Proyek web, dimasukkan sebagai contoh kerja dengan klien. Angka di websitenya masih placeholder sampai klien menyambungkan data asli." },
      viz: {
        type: "tree",
        root: "/",
        caption: { en: "site map", id: "peta situs" },
        items: ["profil", "berita", "layanan", "fasilitas", "program", "data", "ppid", "pengaduan", "unduhan", "kontak"],
        highlight: 5,
        footer: { en: "17 routes, 10 sections shown", id: "17 rute, 10 bagian ditampilkan" }
      }
    }
  ],

  notebook: [
    {
      date: "2026-10-07",
      project: "scanl",
      title: { en: "33 people answered the ScanL survey", id: "33 orang mengisi survei ScanL" },
      summary: {
        en: "After a demo video, 27 of 33 respondents said they had doubted their own analysis results, and 29 said they would try the product.",
        id: "Setelah menonton video demo, 27 dari 33 responden mengaku pernah ragu dengan hasil analisis mereka sendiri, dan 29 orang mau mencoba produknya."
      },
      more: {
        en: "The survey ran on 6 and 7 October, and most respondents were students. They had only seen the demo, so these numbers measure interest. Usage data comes next.",
        id: "Survei berjalan 6 sampai 7 Oktober, dan kebanyakan respondennya mahasiswa. Mereka baru melihat demo, jadi angka ini mengukur minat. Data pemakaian asli menyusul."
      }
    },
    {
      date: "2026-10-03",
      project: "tb",
      title: { en: "Protocol hash-locked, final run reproduced", id: "Protokol dikunci hash, run final terulang persis" },
      summary: {
        en: "Protocol, code and data were frozen with SHA-256 before any final result was seen. A 66.5-minute rerun from scratch matched exactly.",
        id: "Protokol, kode, dan data dibekukan dengan SHA-256 sebelum ada hasil final yang terlihat. Run ulang dari nol selama 66,5 menit hasilnya sama persis."
      },
      more: {
        en: "H1 came out null. Ten pre-pandemic indicators added no detectable value beyond WHO region. H2 was supported by the data, with SVR beating ridge at a Holm-adjusted p of 0.045.",
        id: "H1 hasilnya null. Sepuluh indikator sebelum pandemi tidak menambah nilai yang terdeteksi di luar region WHO. H2 didukung data, SVR mengalahkan ridge dengan p 0,045 setelah koreksi Holm."
      }
    },
    {
      date: "2026-09-28",
      project: "tb",
      title: { en: "An audit kills my first research design", id: "Audit menggugurkan desain penelitian pertama saya" },
      summary: {
        en: "The target turned out to be mostly a WHO model output, and a naive last-year baseline (MAE 2.25) beat every ML model (4.42 to 7.33).",
        id: "Targetnya ternyata sebagian besar hasil model WHO, dan baseline sederhana yang cuma memakai nilai tahun lalu (MAE 2,25) mengalahkan semua model ML (4,42 sampai 7,33)."
      },
      more: {
        en: "I redesigned the study around case notifications that countries report directly, then rebuilt the dataset from 217 countries and areas down to 120, with every exclusion logged.",
        id: "Studinya saya rancang ulang dengan target notifikasi kasus yang dilaporkan langsung oleh tiap negara, lalu datasetnya dibangun ulang dari 217 negara dan wilayah sampai tersisa 120, dengan setiap pengecualian dicatat."
      }
    },
    {
      date: "2026-09-17",
      project: "eveline3b",
      title: { en: "Testing the judge before trusting it", id: "Juri diuji dulu sebelum dipercaya" },
      summary: {
        en: "Two annotators labelled 74 explanations, each in a clean and a planted version, and agreed at kappa 0.947. An off-the-shelf NLI judge scored AUC 0.659 against them and was dropped.",
        id: "Dua anotator memberi label pada 74 penjelasan, masing-masing versi bersih dan versi yang disisipi klaim salah, dan kesepakatannya kappa 0,947. Juri NLI siap pakai cuma dapat AUC 0,659 terhadap label itu, jadi tidak dipakai."
      }
    },
    {
      date: "2026-09-10",
      project: "textmining",
      title: { en: "Classifiers rebuilt: BiLSTM 92.37%, IndoBERT 95.68%", id: "Classifier dibangun ulang: BiLSTM 92,37%, IndoBERT 95,68%" },
      summary: {
        en: "A clean rebuild fixed the training setup (bidirectional layer, masking, early stopping), and the LSTM went from about 29%, a one-class collapse, to 92.37% test accuracy.",
        id: "Setelah setup training-nya dibetulkan (layer bidirectional, masking, early stopping), akurasi uji LSTM naik dari sekitar 29%, waktu modelnya cuma menebak satu kelas, ke 92,37%."
      },
      more: {
        en: "An 8-variant ablation showed bidirectionality mattered most of any single fix (3.81 points below the ablation's full model), while class weighting barely moved the score. The same day brought 37 LDA topics and multi-document summaries with a corrected ROUGE check.",
        id: "Ablation 8 varian menunjukkan bidirectional paling berpengaruh dibanding perbaikan lain (3,81 poin di bawah model lengkap di ablation), sementara class weight hampir tidak mengubah skor. Di hari yang sama juga selesai 37 topik LDA dan ringkasan multi-dokumen dengan evaluasi ROUGE yang sudah dibetulkan."
      }
    },
    {
      date: "2026-09-09",
      project: "textmining",
      title: { en: "5,000 Indonesian news articles scraped", id: "5.000 artikel berita Indonesia di-scrape" },
      summary: {
        en: "A sitemap crawl across five detik.com sections gave a five-class corpus for the Text Mining final.",
        id: "Crawl sitemap di lima kanal detik.com menghasilkan korpus lima kelas untuk final Text Mining."
      }
    },
    {
      date: "2026-08-27",
      project: "eveline",
      title: { en: "Eveline stops losing on any metric", id: "Eveline tidak kalah lagi di metrik mana pun" },
      summary: {
        en: "Retrained to write a short reasoning block before the code. Parse rate rose to 98.1% and degenerate outputs fell to 0.5%. It now runs locally through Ollama.",
        id: "Dilatih ulang supaya menulis blok penalaran singkat sebelum kode. Tingkat lolos parse naik ke 98,1% dan output rusak turun ke 0,5%. Sekarang jalan lokal lewat Ollama."
      },
      more: {
        en: "The distillation aimed to raise similarity to the reference code, and that score fell from 0.186 to 0.165. Parse rate and degeneration improved, and the report records both results.",
        id: "Target distilasi ini menaikkan kemiripan dengan kode referensi, dan skornya turun dari 0,186 ke 0,165. Tingkat lolos parse dan output rusak membaik, dan dua-duanya dicatat di laporan."
      }
    },
    {
      date: "2026-08-25",
      project: "eveline",
      title: { en: "Benchmarked against three rival models", id: "Diadu dengan tiga model pembanding" },
      summary: {
        en: "Four full generation rounds on 214 test pairs, run on an RTX 5050 laptop. Eveline beat Qwen-1.5B, DeepSeek-1.3B and Qwen-3B on 5 of 7 metrics.",
        id: "Empat putaran generasi penuh di 214 pasangan uji, dijalankan di laptop RTX 5050. Eveline mengalahkan Qwen-1.5B, DeepSeek-1.3B, dan Qwen-3B di 5 dari 7 metrik."
      }
    },
    {
      date: "2026-08-07",
      project: "healthweb",
      title: { en: "Health office website delivered", id: "Website dinas kesehatan diserahkan" },
      summary: {
        en: "17 page routes in Next.js 15, with one content layer ready for the client's database.",
        id: "17 halaman di Next.js 15, dengan satu lapisan konten yang siap disambungkan ke database klien."
      }
    },
    {
      date: "2026-08-03",
      project: "honest",
      title: { en: "Four statistical modules switched on", id: "Empat modul statistik diaktifkan" },
      summary: {
        en: "Market basket, survival, recommender and sentiment were switched on after each passed its null and signal benchmarks. The registry reached 21 active modules.",
        id: "Market basket, survival, recommender, dan sentimen diaktifkan setelah masing-masing lolos benchmark null dan sinyal. Registry-nya jadi punya 21 modul aktif."
      }
    },
    {
      date: "2026-07-31",
      project: "automl",
      title: { en: "Caught my AutoML reporting accuracy on noise", id: "AutoML saya ketahuan melaporkan akurasi di data noise" },
      summary: {
        en: "A benchmark showed the old pipeline claiming 0.948 accuracy on pure-noise features. I rebuilt it as nested-CV AutoML with baselines and leakage checks.",
        id: "Benchmark menunjukkan pipeline lama mengklaim akurasi 0,948 pada fitur yang isinya noise semua. Saya bangun ulang jadi AutoML nested CV lengkap dengan baseline dan pengecekan leakage."
      },
      more: {
        en: "The same day I rebuilt column-role detection so the core reads statistics and a separate word list can only confirm it, after the keyword version had marked every non-Latin header as broken.",
        id: "Di hari yang sama, deteksi peran kolom juga saya bangun ulang supaya intinya membaca statistik dan daftar kata terpisah cuma boleh menguatkan, karena versi berbasis kata kunci menganggap semua header non-Latin rusak."
      }
    },
    {
      date: "2026-06-28",
      project: "deeplearning",
      title: { en: "Deep Learning final finished", id: "Final Deep Learning selesai" },
      summary: {
        en: "The LSTM cut AAPL test RMSE by 39%, a conv autoencoder raised SSIM from 0.41 to 0.68, and a conditional GAN lowered FID from 282.5 to 245.4.",
        id: "LSTM menurunkan RMSE uji AAPL sebesar 39%, autoencoder konvolusi menaikkan SSIM dari 0,41 ke 0,68, dan conditional GAN menurunkan FID dari 282,5 ke 245,4."
      },
      more: {
        en: "The AMD model did no better than its baseline (RMSE 1.41 to 1.45), and the notebook records that too.",
        id: "Model AMD tidak lebih baik dari baseline-nya (RMSE 1,41 ke 1,45), dan notebook-nya juga mencatat itu."
      }
    },
    {
      date: "2026-06-20",
      project: "scanl",
      title: { en: "First commit of ScanL", id: "Commit pertama ScanL" },
      summary: {
        en: "The core analysis engine, the join, the computer-vision service and the module registry went into git.",
        id: "Engine analisis inti, fitur join, service computer vision, dan registry modul masuk ke git."
      }
    },
    {
      date: "2026-05-27",
      project: "underwater",
      title: { en: "Underwater enhancement: EfficientNet-B0 U-Net reaches SSIM 0.9175", id: "Perbaikan citra bawah air: U-Net EfficientNet-B0 tembus SSIM 0,9175" },
      summary: {
        en: "Team project of five. Three models were scored on 643 test images: the plain CNN (0.7309) stayed below the raw input's average SSIM over all pairs (0.7835), U-Net passed it at 0.8463, and U-Net with EfficientNet-B0 led on SSIM, PSNR and MSE.",
        id: "Proyek tim 5 orang. Tiga model dinilai di 643 gambar uji: skor CNN biasa (0,7309) masih di bawah rata-rata SSIM input mentah di semua pasangan (0,7835), U-Net berhasil melampauinya dengan 0,8463, dan U-Net dengan EfficientNet-B0 unggul di SSIM, PSNR, dan MSE."
      },
      more: {
        en: "In sample outputs the CNN corrected the color but blurred the image. Skip connections were the cheapest gain at 11% more parameters. Switching to the EfficientNet-B0 U-Net gave the biggest jump in pixel-level accuracy: PSNR rose from 19.84 to 25.28 dB and MSE fell from 890.74 to 293.67. That step also more than tripled the network size, so a single run cannot tell how much came from pretraining.",
        id: "Di sampel output, CNN-nya berhasil membetulkan warna tapi gambarnya jadi blur. Skip connection adalah peningkatan paling murah karena parameternya cuma bertambah 11%. Pindah ke U-Net EfficientNet-B0 memberi lonjakan akurasi tingkat piksel paling besar: PSNR naik dari 19,84 ke 25,28 dB dan MSE turun dari 890,74 ke 293,67. Langkah itu juga membuat ukuran jaringannya lebih dari tiga kali lipat, jadi dari satu run saja belum bisa dipisahkan seberapa besar andil pretraining-nya."
      }
    },
    {
      date: "2026-05-10",
      project: "sagemaker",
      title: { en: "Wine model deployed to SageMaker", id: "Model wine di-deploy ke SageMaker" },
      summary: {
        en: "A scikit-learn pipeline packaged to S3, served on an ml.m5.large endpoint, and called from Streamlit on EC2 through the instance role.",
        id: "Pipeline scikit-learn dikemas ke S3, disajikan di endpoint ml.m5.large, lalu dipanggil dari Streamlit di EC2 lewat role instance."
      }
    },
    {
      date: "2026-05-05",
      credential: 0,
      title: { en: "AWS Academy Machine Learning Foundations", id: "AWS Academy Machine Learning Foundations" },
      summary: {
        en: "Finished the module knowledge checks with 570 of 600 points and earned the Trained badge.",
        id: "Semua knowledge check modul selesai dengan 570 dari 600 poin, dan saya dapat badge Trained."
      }
    },
    {
      date: "2026-02",
      project: "titanic",
      title: { en: "Spaceship Titanic on Kaggle: 0.79869", id: "Spaceship Titanic di Kaggle: 0,79869" },
      summary: {
        en: "Predictions for 4,277 test passengers went in, and the public leaderboard scored them at 0.79869 accuracy.",
        id: "Prediksi untuk 4.277 penumpang uji dikirim, dan public leaderboard memberi akurasi 0,79869."
      }
    },
    {
      date: "2026-04-13",
      project: "titanic",
      title: { en: "Spaceship Titanic model served over FastAPI", id: "Model Spaceship Titanic disajikan lewat FastAPI" },
      summary: {
        en: "A POST /predict endpoint with Swagger docs, plus a Streamlit form that sends passenger details and shows the prediction.",
        id: "Endpoint POST /predict lengkap dengan dokumentasi Swagger, plus form Streamlit yang mengirim data penumpang dan menampilkan hasil prediksinya."
      }
    }
  ],

  ui: {
    en: {
      "skip": "Skip to content",
      "nav.about": "About",
      "nav.expertise": "Expertise",
      "nav.work": "Work",
      "nav.notebook": "Notebook",
      "nav.contact": "Contact",
      "aria.main": "Main",
      "aria.language": "Language",
      "hero.eyebrow": "Data Science · BINUS University · Jakarta",
      "hero.sub": "I build machine learning systems and test whether their results hold up.",
      "hero.status": "Seeking a data science internship",
      "hero.caption": "Fig. 0 · Heightmap, {n} points, rendered in your browser",
      "about.label": "About",
      "about.currently": "Currently",
      "figure.caption": "Accuracy an early version of my AutoML reported on pure noise. The rebuilt engine scores the same data at 0.000 skill over baseline.",
      "figure.cta": "Read the case",
      "expertise.label": "Expertise",
      "expertise.languages": "Languages",
      "expertise.credential": "Certification",
      "credential.verify": "Verify on Credly",
      "work.label": "Selected work",
      "work.intro": "Each figure is drawn from the project's own results.",
      "work.more": "Further work",
      "work.read": "Read the case",
      "work.figure": "Fig.",
      "notebook.label": "Notebook",
      "notebook.more": "More",
      "notebook.less": "Less",
      "notebook.empty": "Nothing logged yet.",
      "contact.label": "Contact",
      "contact.lead": "For internships, collaborations or questions about any project here.",
      "contact.copy": "Copy address",
      "contact.copied": "Copied",
      "contact.based": "Based in Jakarta",
      "footer.top": "Back to top",
      "footer.copy": "© {year} {name}",
      "dialog.problem": "Problem",
      "dialog.approach": "Approach",
      "dialog.results": "Results",
      "dialog.metric": "Metric",
      "dialog.value": "Value",
      "dialog.prev": "Previous",
      "dialog.next": "Next",
      "dialog.close": "Close"
    },
    id: {
      "skip": "Langsung ke konten",
      "nav.about": "Tentang",
      "nav.expertise": "Keahlian",
      "nav.work": "Karya",
      "nav.notebook": "Catatan",
      "nav.contact": "Kontak",
      "aria.main": "Utama",
      "aria.language": "Bahasa",
      "hero.eyebrow": "Data Science · BINUS University · Jakarta",
      "hero.sub": "Saya membangun sistem machine learning dan menguji apakah hasilnya tetap bertahan saat dicek ulang.",
      "hero.status": "Mencari magang data science",
      "hero.caption": "Gbr. 0 · Heightmap, {n} titik, digambar langsung di browser",
      "about.label": "Tentang",
      "about.currently": "Sekarang",
      "figure.caption": "Akurasi yang dilaporkan AutoML versi awal saya pada data yang isinya noise semua. Engine hasil rebuild memberi skor 0,000 di atas baseline untuk data yang sama.",
      "figure.cta": "Baca kasusnya",
      "expertise.label": "Keahlian",
      "expertise.languages": "Bahasa pemrograman",
      "expertise.credential": "Sertifikasi",
      "credential.verify": "Cek di Credly",
      "work.label": "Karya pilihan",
      "work.intro": "Setiap gambar dibuat dari hasil proyeknya sendiri.",
      "work.more": "Karya lainnya",
      "work.read": "Baca kasusnya",
      "work.figure": "Gbr.",
      "notebook.label": "Catatan",
      "notebook.more": "Selengkapnya",
      "notebook.less": "Tutup",
      "notebook.empty": "Belum ada catatan.",
      "contact.label": "Kontak",
      "contact.lead": "Untuk magang, kolaborasi, atau pertanyaan soal proyek mana pun di sini.",
      "contact.copy": "Salin alamat",
      "contact.copied": "Tersalin",
      "contact.based": "Tinggal di Jakarta",
      "footer.top": "Kembali ke atas",
      "footer.copy": "© {year} {name}",
      "dialog.problem": "Masalahnya",
      "dialog.approach": "Caranya",
      "dialog.results": "Hasil",
      "dialog.metric": "Metrik",
      "dialog.value": "Nilai",
      "dialog.prev": "Sebelumnya",
      "dialog.next": "Berikutnya",
      "dialog.close": "Tutup"
    }
  }
};
