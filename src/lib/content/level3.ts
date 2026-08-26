import type { Level } from "../types";

export const LEVEL_3: Level = {
  id: "level-3",
  number: 3,
  title: "Become a Fact Checker",
  subtitle: "Kuasai keterampilan praktis untuk memeriksa informasi sendiri.",
  emoji: "🧭",
  gradient: "from-emerald-500 to-teal-600",
  ring: "ring-emerald-200",
  description:
    "Sekarang giliranmu jadi pemeriksa fakta. Pelajari langkah konkret mengecek sumber, tanggal, dan kebenaran.",
  lessons: [
    {
      id: "l3-1",
      title: "Check Source",
      emoji: "🔎",
      minutes: 3,
      intro:
        "Langkah pertama: cari tahu siapa sumber asli informasi tersebut.",
      points: [
        "Sumber asli = siapa yang pertama kali mengeluarkan informasi itu, bukan siapa yang membagikannya ke kamu.",
        "Akun anonim, pesan tanpa nama, dan tangkapan layar tanpa tautan asli adalah tanda bahaya.",
        "Website resmi dan lembaga resmi punya nama jelas, kontak, dan rekam jejak.",
      ],
      tips: [
        "Ketik kata kunci informasi itu di mesin pencari, lalu lihat dari mana asalnya.",
        "Klik tautan aslinya — jangan percaya tangkapan layar.",
      ],
      takeaway: "Sebelum percaya, tanya: 'Siapa yang bilang, dan bisa aku cek langsung?'",
    },
    {
      id: "l3-2",
      title: "Check Date",
      emoji: "📅",
      minutes: 3,
      intro:
        "Tanggal menentukan apakah informasi masih relevan atau sudah kedaluwarsa.",
      points: [
        "Cek tanggal publikasi artikel, tanggal update, dan tanggal kejadiannya.",
        "Foto dan video bisa dari bertahun-tahun lalu — cek kapan aslinya diambil.",
        "Informasi lama yang dibagikan ulang tanpa tanggal sering dikira kejadian baru.",
      ],
      tips: [
        "Reverse image search untuk cek kapan foto pertama kali muncul.",
        "Cari metadata dan konteks di keterangan aslinya.",
      ],
      takeaway: "Konteks waktu menentukan segalanya. Tanya: 'Ini terjadi kapan?'",
    },
    {
      id: "l3-3",
      title: "Reverse Image Search",
      emoji: "🖼️",
      minutes: 3,
      intro:
        "Pencarian gambar terbalik membantu menemukan asal-usul sebuah foto.",
      points: [
        "Unggah gambar atau tempel URL-nya di mesin pencari gambar (Google Images, Yandex, dsb).",
        "Hasilnya menunjukkan foto itu pernah muncul di mana dan kapan.",
        "Foto yang dipakai ulang di banyak konteks berbeda adalah tanda malinformation.",
      ],
      tips: [
        "Potong foto agar lebih akurat saat mencari (cari bagian yang unik).",
        "Perhatikan apakah ada watermark atau logo yang terpotong.",
      ],
      takeaway: "Foto bukan bukti waktu. Cek jejaknya sebelum percaya caption-nya.",
    },
    {
      id: "l3-4",
      title: "Cross-check",
      emoji: "🔀",
      minutes: 3,
      intro:
        "Cross-check berarti membandingkan informasi dari beberapa sumber independen.",
      points: [
        "Carilah minimal 2–3 sumber terpercaya yang berbeda dan saling independen.",
        "Jangan hanya mencari sumber yang mengonfirmasi apa yang sudah kamu percaya.",
        "Jika hanya satu sumber yang mengatakannya dan tidak ada yang lain, anggap belum terbukti.",
      ],
      tips: [
        "Bandingkan fakta inti: siapa, apa, kapan, di mana, bagaimana.",
        "Perbedaan tanggal atau angka antar sumber adalah tanda untuk menyelidiki lebih dalam.",
      ],
      takeaway:
        "Satu sumber bisa salah. Dua sumber yang saling menyalin tidak dihitung — carilah sumber yang benar-benar independen.",
    },
    {
      id: "l3-5",
      title: "Source Tools",
      emoji: "🧰",
      minutes: 3,
      intro:
        "Ada banyak alat gratis untuk membantu investigasimu — tapi kamu yang tetap menilai, bukan alatnya.",
      points: [
        "Search engine: untuk menemukan sumber asli dan pembahasan lain.",
        "Reverse image search: untuk menelusuri asal foto.",
        "Archive (mis. Wayback Machine): untuk melihat halaman lama yang sudah dihapus.",
        "Layanan cek fakta (Mafindo, TurnBackHoax, dsb): untuk melihat klaim yang sudah diperiksa orang lain.",
      ],
      tips: [
        "Gunakan tools sebagai bantuan, bukan pengganti penilaianmu.",
        "Catat apa yang kamu temukan agar mudah dirangkum.",
      ],
      takeaway:
        "Alat membantu, tapi kesimpulan tetap milikmu. Kamu adalah pemeriksa fakta yang sebenarnya.",
    },
    {
      id: "l3-6",
      title: "Trusted Sources",
      emoji: "✅",
      minutes: 3,
      intro:
        "Bagaimana mengenali sumber yang bisa dipercaya?",
      points: [
        "Nama jelas, punya rekam jejak, dan bisa dihubungi.",
        "Menyebutkan sumber data, tanggal, dan metode.",
        "Koreksi kesalahan secara terbuka bila terbukti salah.",
        "Bukan sekadar mengulang klaim tanpa dasar, dan memisahkan fakta dari opini.",
      ],
      tips: [
        "Cek 'Tentang Kami' dan siapa pemilik media tersebut.",
        "Kredibilitas dibangun dari waktu — cari tahu apakah sumber itu pernah terbukti salah besar.",
      ],
      takeaway:
        "Sumber terpercaya tidak sempurna, tapi transparan. Mereka menunjukkan dari mana informasinya berasal.",
    },
  ],
  quiz: [
    {
      id: "l3-q1",
      question: "Kamu menemukan foto viral tanpa tanggal. Langkah terbaik pertama adalah...",
      options: [
        "Langsung membagikannya",
        "Reverse image search untuk mencari asal foto",
        "Mempercayai caption-nya",
        "Menghapus foto itu",
      ],
      correct: 1,
      explanation:
        "Reverse image search menunjukkan kapan dan di mana foto itu pertama kali muncul — cara paling cepat mengetahui apakah fotonya lama.",
    },
    {
      id: "l3-q2",
      question:
        "Informasi hanya muncul di satu akun anonim. Menurut prinsip cross-check, status terbaiknya adalah...",
      options: ["BENAR", "SALAH", "BELUM TERBUKTI", "PASTI HOAKS"],
      correct: 2,
      explanation:
        "Tanpa sumber independen, kita belum bisa menyimpulkan benar atau salah. Status yang jujur adalah 'belum terbukti'.",
    },
    {
      id: "l3-q3",
      question: "Ciri-ciri berikut yang paling menandakan sumber terpercaya adalah...",
      options: [
        "Memakai huruf kapital di semua kalimat",
        "Menyebutkan sumber data, tanggal, dan metode",
        "Mengaku '100% tidak pernah salah'",
        "Anonim dan tanpa kontak",
      ],
      correct: 1,
      explanation:
        "Sumber terpercaya transparan: mereka menunjukkan dari mana data berasal. Klaim 'tidak pernah salah' justru mencurigakan.",
    },
  ],
};