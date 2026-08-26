import type { Level } from "../types";

export const LEVEL_1: Level = {
  id: "level-1",
  number: 1,
  title: "Kenalan dengan Hoaks",
  subtitle: "Apa itu hoaks, misinformation, disinformation, malinformation, dan FIMI?",
  emoji: "🛑",
  gradient: "from-red-500 to-rose-600",
  ring: "ring-red-200",
  description:
    "Mulai dari dasar: apa sebenarnya hoaks itu dan bagaimana ia membedakan dirinya dari informasi lain.",
  lessons: [
    {
      id: "l1-1",
      title: "Apa itu Hoaks?",
      emoji: "🛑",
      minutes: 2,
      intro:
        "Hoaks adalah informasi yang sengaja dibuat palsu untuk menipu, memancing reaksi, atau menyebarkan ketakutan.",
      points: [
        "Hoaks biasanya dibuat agar terlihat meyakinkan: gaya bahasa tegas, huruf kapital, dan iming-iming 'INFO PENTING'.",
        "Hoaks menyebar cepat karena orang membagikannya sebelum memeriksa kebenarannya.",
        "Semakin emosional reaksinya (marah, takut, panik), semakin besar kemungkinan itu dirancang untuk dibagikan.",
        "Hoaks bukan sekadar 'berita salah' — ia dibuat dengan tujuan tertentu.",
      ],
      tips: [
        "Lihat dulu apakah ada nama penulis, tanggal, dan sumber yang bisa dicek.",
        "Jika hanya ada tangkapan layar tanpa tautan asli, besar kemungkinan itu hoaks.",
      ],
      takeaway:
        "Hoaks = informasi palsu yang sengaja dibuat untuk menipu. Jangan biarkan ia menang dengan dibagikan.",
    },
    {
      id: "l1-2",
      title: "Misinformation",
      emoji: "😅",
      minutes: 2,
      intro:
        "Misinformation adalah informasi salah yang disebarkan TANPA niat menipu. Si pembagi percaya bahwa itu benar.",
      points: [
        "Kamu mungkin pernah membagikan informasi yang ternyata salah — itu tergolong misinformation.",
        "Niatnya tidak jahat, tapi dampaknya tetap bisa merugikan.",
        "Misinformation mudah terjadi ketika kita membagikan berita dari grup keluarga atau media sosial tanpa cek.",
      ],
      tips: [
        "Sebelum membagikan, tanya: 'Aku sudah cek ke sumber aslinya belum?'",
        "Tangkapan layar tanpa konteks adalah bentuk umum misinformation.",
      ],
      takeaway:
        "Tidak berniat menipu bukan berarti tidak merugikan. Cek dulu, baru bagikan.",
    },
    {
      id: "l1-3",
      title: "Disinformation",
      emoji: "🎭",
      minutes: 2,
      intro:
        "Disinformation adalah informasi salah yang SENGAJA dibuat dan disebarkan untuk menipu atau memengaruhi.",
      points: [
        "Disinformation sering dibuat dengan alasan politik, keuangan, atau untuk memecah belah.",
        "Ciri khasnya: ada aktor di baliknya yang punya tujuan tertentu.",
        "Konten disinformation sering dirancang agar terlihat seperti berita asli, lengkap dengan logo 'media'. Sebenarnya buatan.",
      ],
      tips: [
        "Periksa apakah media tersebut benar-benar ada dan punya rekam jejak.",
        "Cek alamat URL: media palsu sering memakai domain yang mirip-mirip.",
      ],
      takeaway:
        "Disinformation = kebohongan yang direncanakan. Ini yang paling berbahaya karena dirancang agar sulit dikenali.",
    },
    {
      id: "l1-4",
      title: "Malinformation",
      emoji: "⚠️",
      minutes: 2,
      intro:
        "Malinformation memakai fakta yang benar, tetapi digunakan dengan cara yang menyesatkan atau merugikan.",
      points: [
        "Contohnya: foto asli dari tahun lalu, tapi diklaim sebagai kejadian baru.",
        "Atau statistik asli yang dipotong konteksnya agar terlihat mengerikan.",
        "Malinformation paling sulit dideteksi karena 'datanya benar' — masalahnya di konteks.",
      ],
      tips: [
        "Cek tanggal asli kejadian dan foto.",
        "Cari konteks lengkap, bukan hanya potongan yang membuatmu emosi.",
      ],
      takeaway:
        "Fakta yang dicabut dari konteks bisa menjadi kebohongan. Konteks adalah segalanya.",
    },
    {
      id: "l1-5",
      title: "FIMI",
      emoji: "🌐",
      minutes: 2,
      intro:
        "FIMI (Foreign Information Manipulation and Interference) adalah campur tangan informasi asing untuk memengaruhi opini publik suatu negara.",
      points: [
        "Biasanya dilakukan aktor asing melalui akun palsu, konten terkoordinasi, dan narasi berulang.",
        "Tujuannya: memecah belah masyarakat, menurunkan kepercayaan, dan memengaruhi keputusan.",
        "FIMI sering memanfaatkan isu sensitif agar cepat viral dan memancing perpecahan.",
      ],
      tips: [
        "Waspada saat narasi yang sama tiba-tiba muncul dari banyak akun aneh dalam waktu bersamaan.",
        "Akun bot biasanya punya pola posting yang tidak manusiawi.",
      ],
      takeaway:
        "FIMI adalah operasi terorganisir. Membedakannya dari hoaks biasa butuh kewaspadaan ekstra.",
    },
  ],
  quiz: [
    {
      id: "l1-q1",
      question:
        "Sepupu kamu membagikan berita yang ternyata salah. Dia tidak sadar itu palsu dan ikut percaya. Ini termasuk...",
      options: [
        "Disinformation — dia sengaja menipu",
        "Misinformation — dia menyebar tanpa niat menipu",
        "Malinformation — konteksnya dipotong",
        "FIMI — campur tangan asing",
      ],
      correct: 1,
      explanation:
        "Karena dia tidak berniat menipu dan percaya itu benar, ini adalah misinformation. Niatnya tidak jahat, tapi tetap harus berhenti dan cek dulu.",
    },
    {
      id: "l1-q2",
      question:
        "Foto asli dari 3 tahun lalu diklaim sebagai kejadian kemarin. Foto ini asli, tapi dipakai menyesatkan. Ini disebut...",
      options: ["Hoaks murni", "Misinformation", "Malinformation", "Clickbait"],
      correct: 2,
      explanation:
        "Fotonya asli, tapi konteks waktunya dihilangkan agar menyesatkan. Itulah ciri khas malinformation: fakta benar, konteks salah.",
    },
    {
      id: "l1-q3",
      question:
        "Informasi palsu yang SENGAJA dibuat dan disebarkan untuk memengaruhi opini publik disebut...",
      options: ["Misinformation", "Malinformation", "Fakta", "Disinformation"],
      correct: 3,
      explanation:
        "Disinformation adalah kebohongan yang direncanakan — dibuat dan disebarkan dengan sengaja untuk menipu atau memengaruhi.",
    },
  ],
};