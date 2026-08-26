import type { QuizItem, QuizMode } from "../types";

export const QUIZ_MODES: QuizMode[] = [
  {
    id: "hoax-or-fact",
    title: "Hoax or Fact?",
    tagline: "Hoax, fact, misleading, atau belum cukup informasi?",
    emoji: "⚖️",
    description: "Uji instingmu menilai sebuah klaim dari status yang tersedia.",
  },
  {
    id: "red-flag",
    title: "Find the Red Flag",
    tagline: "Temukan bagian mencurigakan di sebuah postingan.",
    emoji: "🚩",
    description: "Klik bagian postingan yang mencurigakan sebelum menyebarnya.",
  },
  {
    id: "source-battle",
    title: "Source Battle",
    tagline: "Mana sumber yang paling dapat dipercaya?",
    emoji: "🥊",
    description: "Bandingkan sumber-sumber dan tentukan yang paling kredibel.",
  },
  {
    id: "spot-the-hoax",
    title: "Spot the Hoax",
    tagline: "Cari perbedaan di antara dua postingan yang mirip.",
    emoji: "👀",
    description: "Dua postingan terlihat sama — temukan semua perbedaannya.",
  },
];

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: "hqf-1",
    mode: "hoax-or-fact",
    question:
      '"Pemerintah Jakarta resmi meliburkan sekolah 3 hari karena cuaca ekstrem." — diumumkan akun anonim tanpa tautan.',
    options: ["HOAX", "FACT", "MISLEADING", "NOT ENOUGH INFORMATION"],
    correct: 3,
    explanation:
      "Tanpa sumber resmi yang bisa dicek, kita belum bisa menyatakan hoax atau fact. Status paling jujur: belum cukup informasi.",
  },
  {
    id: "hqf-2",
    mode: "hoax-or-fact",
    question: "BMKG mengeluarkan peringatan resmi cuaca ekstrem yang sesuai dengan info yang kamu terima.",
    options: ["HOAX", "FACT", "MISLEADING", "NOT ENOUGH INFORMATION"],
    correct: 1,
    explanation:
      "Pernyataan resmi dari lembaga yang berwenang (BMKG) adalah sumber kredibel. Klaim ini bisa dinyatakan FACT — selama konteks dan waktunya sama.",
  },
  {
    id: "hqf-3",
    mode: "hoax-or-fact",
    question: "Foto polisi berkerumun di jalan, diberi caption 'Aksi demo pecah di Jakarta' tanpa tanggal.",
    options: ["HOAX", "FACT", "MISLEADING", "NOT ENOUGH INFORMATION"],
    correct: 2,
    explanation:
      "Fotonya mungkin asli, tapi tanpa tanggal dan konteks kejadian, caption bisa saja menyesatkan. Itu bentuk malinformation.",
  },
  {
    id: "hqf-4",
    mode: "hoax-or-fact",
    question: '"Guru-guru Jakarta dilarang mengajar mulai besok" — hanya ada di satu blog pribadi tanpa referensi.',
    options: ["HOAX", "FACT", "MISLEADING", "NOT ENOUGH INFORMATION"],
    correct: 0,
    explanation:
      "Klaim besar seperti ini tanpa dasar dan hanya dari blog pribadi sangat kuat ciri hoaks. Belum ada bukti — jangan disebar.",
  },
  {
    id: "hqf-5",
    mode: "hoax-or-fact",
    question:
      "Berita dari media nasional besar yang mencantumkan sumber, tanggal, dan konfirmasi pihak terkait.",
    options: ["HOAX", "FACT", "MISLEADING", "NOT ENOUGH INFORMATION"],
    correct: 1,
    explanation:
      "Sumber kredibel dengan bukti lengkap dan konfirmasi langsung bisa dianggap FACT — selama kita juga mengecek konteksnya.",
  },
  {
    id: "sb-1",
    mode: "source-battle",
    question: "Mana sumber yang paling dapat dipercaya untuk memverifikasi peristiwa di Jakarta?",
    options: [
      "Akun anonim yang klaimnya tidak bisa dicek",
      "Website resmi lembaga terkait",
      "Screenshot pesan grup tanpa sumber",
    ],
    correct: 1,
    explanation:
      "Website resmi lembaga terkait punya nama, kontak, dan rekam jejak yang bisa diverifikasi. Akun anonim dan screenshot tidak bisa diperiksa.",
  },
  {
    id: "sb-2",
    mode: "source-battle",
    question:
      "Dua sumber: (1) media nasional kredibel dengan data, (2) influencer yang menyalin postingan media itu. Mana yang lebih dipercaya?",
    options: ["Media nasional kredibel", "Influencer yang menyalin", "Sama saja", "Tidak bisa dibandingkan"],
    correct: 0,
    explanation:
      "Sumber primer (media asli) selalu lebih dipercaya daripada yang menyalin. Influencer yang mengutip bukan sumber independen.",
  },
  {
    id: "sb-3",
    mode: "source-battle",
    question: "Foto viral dengan caption 'hujan es di Jakarta'. Siapa sumber paling kuat untuk dikonfirmasi?",
    options: [
      "Akun meme dengan banyak pengikut",
      "Komentar orang asing di media sosial",
      "BMKG atau media kredibel yang meliput langsung",
    ],
    correct: 2,
    explanation:
      "BMKG adalah lembaga resmi penanggung jawab cuaca, dan media kredibel meliput dengan verifikasi. Akun meme dan komentar asing bukan sumber.",
  },
  {
    id: "sb-4",
    mode: "source-battle",
    question: "Berita tanpa nama penulis, tanpa tanggal, tanpa sumber, dan semua huruf kapital. Seberapa bisa dipercaya?",
    options: [
      "Sangat bisa dipercaya",
      "Cukup dipercaya",
      "Sangat tidak bisa dipercaya",
      "Tetap bisa dipercaya karena gaya tegas",
    ],
    correct: 2,
    explanation:
      "Tanpa penulis, tanggal, dan sumber, tidak ada yang bisa diverifikasi. Gaya tegas dengan huruf kapital justru ciri khas hoaks.",
  },
  {
    id: "sb-5",
    mode: "source-battle",
    question: "Sumber terpercaya menunjukkan dari mana datanya berasal. Pilih yang paling sesuai...",
    options: [
      "Menulis 'semua orang tahu ini benar'",
      "Menyebutkan institusi, tanggal, dan metode pengumpulan data",
      "Menggunakan foto sebagai satu-satunya bukti",
      "Memakai tangkapan layar tanpa tautan",
    ],
    correct: 1,
    explanation:
      "Sumber yang transparan tentang asal data adalah tanda kredibilitas. Klaim tanpa metode dan bukti tidak bisa diverifikasi.",
  },
];