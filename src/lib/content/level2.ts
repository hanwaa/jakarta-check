import type { Level } from "../types";

export const LEVEL_2: Level = {
  id: "level-2",
  number: 2,
  title: "Kenapa Kita Bisa Tertipu?",
  subtitle: "Kenali trik psikologis yang membuat otak kita percaya tanpa berpikir.",
  emoji: "🧠",
  gradient: "from-amber-500 to-orange-600",
  ring: "ring-amber-200",
  description:
    "Hoaks menang bukan karena kita bodoh, tapi karena ia dirancang untuk menembus kelemahan alami cara berpikir kita.",
  lessons: [
    {
      id: "l2-1",
      title: "Clickbait",
      emoji: "🎣",
      minutes: 2,
      intro:
        "Clickbait adalah judul yang dirancang untuk membuatmu penasaran, bukan untuk memberi informasi.",
      points: [
        "Judul seperti 'TERNYATA!!!' atau 'DILARANG BACA INI' sengaja memancing rasa penasaran.",
        "Isi artikelnya sering tidak seheboh judulnya — kamu merasa tertipu, tapi sudah terlanjur klik dan bagikan.",
        "Clickbait biasanya memakai huruf kapital, tanda seru berlebihan, dan klaim 'diam-diam'.",
      ],
      tips: [
        "Baca dulu isinya sebelum membagikan judulnya.",
        "Judul yang terlalu heboh biasanya tanda isinya tidak sehebat itu.",
      ],
      takeaway: "Judul itu umpan. Jangan gigit sebelum membaca isi dan mengecek sumbernya.",
    },
    {
      id: "l2-2",
      title: "Bias",
      emoji: "🎯",
      minutes: 2,
      intro:
        "Bias adalah kecenderungan otak kita menilai informasi berdasarkan perasaan, bukan fakta.",
      points: [
        "Kita cenderung lebih percaya pada informasi yang cocok dengan pandangan kita — itu wajar, tapi berbahaya.",
        "Bias membuat kita malas memeriksa bukti yang bertentangan.",
        "Mengenali bias adalah langkah pertama untuk melawannya.",
      ],
      tips: [
        "Tanyakan: 'Apakah aku akan percaya ini jika datang dari pihak yang aku tidak suka?'",
        "Cari sumber yang menantang keyakinanmu, bukan hanya yang menguatkannya.",
      ],
      takeaway: "Otak kita bukan alat ukur kebenaran. Dia suka informasi yang enak, bukan yang benar.",
    },
    {
      id: "l2-3",
      title: "Emosi",
      emoji: "🔥",
      minutes: 2,
      intro:
        "Informasi yang memicu marah, takut, panik, atau senang berlebihan biasanya dirancang untuk menghentikan pikiran kritis.",
      points: [
        "Saat emosi tinggi, kita cenderung bereaksi dulu, berpikir belakangan.",
        "Konten yang membuatmu marah biasanya ingin kamu membagikannya tanpa berpikir.",
        "Tanda bahaya: informasi yang membuat jantungmu berdegup lebih cepat.",
      ],
      tips: [
        "Saat merasa sangat emosional membaca sesuatu, pause dulu.",
        "Jangan bagikan sesuatu yang hanya membuatmu 'geregetan' — itu justru yang paling sering hoaks.",
      ],
      takeaway: "Emosi adalah pintu masuk hoaks. Kalau kamu merasa panas, berhenti dulu.",
    },
    {
      id: "l2-4",
      title: "Fear Mongering",
      emoji: "😱",
      minutes: 2,
      intro:
        "Fear mongering memakai rasa takut untuk mendorongmu melakukan sesuatu tanpa berpikir.",
      points: [
        "'SEGERA BAGIKAN AGAR SELAMAT!' — pola klasik penyebar ketakutan.",
        "Biasanya memakai kata darurat, bahaya, dan ancaman yang dibesar-besarkan.",
        "Tujuannya bukan menolongmu, tapi membuatmu menyebarkan narasi itu lebih jauh.",
      ],
      tips: [
        "Cek siapa yang menyebarkan dan apa buktinya, bukan sekadar peringatannya.",
        "Informasi penting sejati selalu datang dari sumber resmi, bukan dari pesan berantai.",
      ],
      takeaway: "Ketakutan adalah bahan bakar hoaks. Panik membuatmu lupa mengecek.",
    },
    {
      id: "l2-5",
      title: "Confirmation Bias",
      emoji: "🪞",
      minutes: 2,
      intro:
        "Confirmation bias adalah kecenderungan mencari dan mempercayai informasi yang sesuai keyakinan kita.",
      points: [
        "Kita lebih mudah menerima 'bukti' yang cocok dengan pendapat kita dan menolak yang bertentangan.",
        "Inilah kenapa hoaks politik dan SARA sangat mudah menyebar.",
        "Melawannya berarti sengaja mencari sudut pandang yang berbeda.",
      ],
      tips: [
        "Kesimpulan yang terlalu 'pas' dengan keyakinanmu perlu diperiksa dua kali.",
        "Gunakan prinsip: bukti dulu, lalu keyakinan — bukan sebaliknya.",
      ],
      takeaway:
        "Kita semua punya confirmation bias. Sadari itu, dan jadikan keingintahuan lebih kuat dari keinginan benar.",
    },
  ],
  quiz: [
    {
      id: "l2-q1",
      question:
        "'INFO PENTING!!! SEGERA BAGIKAN SEBELUM DITUTUP! BUKTI-BUKTI INI DI SEMBUNYIKAN!' Judul seperti ini memanfaatkan...",
      options: ["Clickbait dan fear mongering", "Statistik resmi", "Sumber primer", "Cross-check"],
      correct: 0,
      explanation:
        "Huruf kapital, kata 'PENTING!!!', dan ajakan buru-buru membagikan adalah kombinasi clickbait dan fear mongering.",
    },
    {
      id: "l2-q2",
      question:
        "Kamu hanya membaca berita yang setuju dengan pendapatmu dan menolak yang tidak. Ini contoh...",
      options: ["Clickbait", "Confirmation bias", "Malinformation", "FIMI"],
      correct: 1,
      explanation:
        "Mencari informasi yang sesuai keyakinan adalah confirmation bias — lawan dengan mencari sumber yang berbeda pendapat.",
    },
    {
      id: "l2-q3",
      question: "Perasaan apa yang paling sering dimanfaatkan hoaks?",
      options: ["Rasa kenyang", "Rasa kantuk", "Marah, takut, dan panik", "Rasa lapar"],
      correct: 2,
      explanation:
        "Emosi kuat seperti marah, takut, dan panik membuat kita bereaksi dulu tanpa berpikir — persis yang diinginkan penyebar hoaks.",
    },
  ],
};