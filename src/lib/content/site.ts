import type { Badge, ChallengeItem } from "../types";

export const SITE = {
  name: "JAKARTA CHECK!",
  tagline: "Berhenti sebelum berbagi.",
  slogan: "Temukan. Cek. Bongkar. Bagikan Kebenaran.",
  coreCta: "THINK BEFORE YOU SHARE.",
};

export const BADGES: Badge[] = [
  {
    id: "stop-and-think",
    emoji: "🛑",
    name: "STOP & THINK",
    description: "Menyelesaikan Level 1 — Kenalan dengan Hoaks.",
  },
  {
    id: "source-hunter",
    emoji: "🔎",
    name: "SOURCE HUNTER",
    description: "Menyelesaikan langkah Check Source di Cek Fakta.",
  },
  {
    id: "digital-detective",
    emoji: "🕵️",
    name: "DIGITAL DETECTIVE",
    description: "Menyelesaikan kasus pertama di Digital Detective.",
  },
  {
    id: "fact-checker",
    emoji: "🧠",
    name: "FACT CHECKER",
    description: "Menyelesaikan Level 3 — Become a Fact Checker.",
  },
  {
    id: "ai-spotter",
    emoji: "🤖",
    name: "AI SPOTTER",
    description: "Menyelesaikan modul Mengenali AI & Deepfake.",
  },
  {
    id: "hoax-buster",
    emoji: "🏆",
    name: "HOAX BUSTER",
    description: "Menyelesaikan seluruh Antihoax Academy.",
  },
];

export const XP_RULES: Record<string, number> = {
  lesson: 10,
  quiz: 10,
  factCheck: 20,
  case: 50,
  challenge: 30,
};

export const CHALLENGE_POOL: ChallengeItem[] = [
  {
    id: "ch-1",
    question: "Video lama 2021 diklaim sebagai kejadian pekan ini di Jakarta. Status terbaiknya?",
    options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
    correct: 2,
    explanation:
      "Video asli tapi konteks waktunya salah = menyesatkan. Fakta benar, waktu yang diklaim bohong.",
  },
  {
    id: "ch-2",
    question: "Klaim hanya muncul di satu akun anonim, tidak ada sumber independen. Status terbaiknya?",
    options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
    correct: 3,
    explanation: "Tanpa sumber yang bisa diverifikasi, status paling jujur adalah belum terbukti.",
  },
  {
    id: "ch-3",
    question: "Peringatan resmi dari BMKG soal cuaca ekstrem di Jakarta. Statusnya?",
    options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
    correct: 0,
    explanation: "Lembaga resmi yang berwenang mengeluarkan informasi — selama konteks dan waktunya sesuai, ini benar.",
  },
  {
    id: "ch-4",
    question: "Judul 'TERUNGKAP!!! RAHASIA BESAR YANG DISEMBUNYIKAN!' tanpa nama penulis dan sumber. Ini ciri...",
    options: ["Berita investigasi berkualitas", "Clickbait / disinformasi", "Sumber resmi", "Statistik akurat"],
    correct: 1,
    explanation: "Huruf kapital, kata 'TERUNGKAP', tanpa penulis dan sumber = pola klasik clickbait dan disinformasi.",
  },
  {
    id: "ch-5",
    question: "Screenshot tanpa tautan asli, tanggal, dan nama pengirim. Apa yang harus kamu lakukan?",
    options: [
      "Langsung teruskan",
      "Simpan untuk dibagikan nanti",
      "Cek sumber asli dulu sebelum membagikan",
      "Tambahkan komentar lalu teruskan",
    ],
    correct: 2,
    explanation: "Screenshot tanpa tautan asli tidak bisa diverifikasi. Selalu cek sumber asli dulu.",
  },
  {
    id: "ch-6",
    question: "Untuk memverifikasi foto yang viral, alat paling tepat adalah...",
    options: [
      "Menghitung like-nya",
      "Reverse image search",
      "Membaca komentarnya",
      "Menebak kualitas gambarnya",
    ],
    correct: 1,
    explanation: "Reverse image search menelusuri kapan dan di mana foto pertama kali muncul.",
  },
  {
    id: "ch-7",
    question: "Angka '20 cm' diubah menjadi '200 cm' pada berita yang sama. Ini termasuk...",
    options: ["Kesalahan ketik wajar", "Manipulasi angka yang menyesatkan", "Sumber kredibel", "Opini pribadi"],
    correct: 1,
    explanation: "Mengubah angka agar terlihat lebih parah adalah bentuk manipulasi informasi yang menyesatkan.",
  },
  {
    id: "ch-8",
    question: "Dua sumber independen dan terpercaya mengonfirmasi hal yang sama. Status klaimnya...",
    options: ["Pasti hoaks", "Semakin dapat dipercaya", "Tidak berpengaruh", "Harus diabaikan"],
    correct: 1,
    explanation: "Konfirmasi dari beberapa sumber independen meningkatkan kepercayaan terhadap informasi.",
  },
  {
    id: "ch-9",
    question: "Kamu sangat marah saat membaca sebuah info dan ingin langsung membagikannya. Langkah terbaik?",
    options: [
      "Langsung share agar orang lain ikut marah",
      "Pause, tarik napas, lalu cek sumbernya",
      "Membagikan hanya ke satu orang",
      "Menyimpan tanpa membagikan",
    ],
    correct: 1,
    explanation: "Emosi kuat adalah pintu masuk hoaks. Berhenti dulu, baru cek dan berpikir.",
  },
  {
    id: "ch-10",
    question: "Media memakai foto lama tanpa mencantumkan tanggal pengambilan. Apa yang hilang?",
    options: ["Konteks waktu", "Nama media", "Jumlah kata", "Warna foto"],
    correct: 0,
    explanation: "Tanpa konteks waktu, pembaca bisa salah mengira kejadian lama sebagai kejadian baru.",
  },
];