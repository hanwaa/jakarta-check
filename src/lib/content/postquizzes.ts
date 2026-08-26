import type { RedFlagItem, SpotPair } from "../types";

export const RED_FLAG_ITEMS: RedFlagItem[] = [
  {
    id: "rf-1",
    prompt: "Klik bagian yang terasa mencurigakan pada postingan ini.",
    explanation:
      "Ada 3 tanda bahaya: judul berhuruf kapital penuh, tidak ada nama sumber, dan tidak ada tanggal. Tangkapan layar yang terpotong juga mencurigakan.",
    post: {
      id: "rf-post-1",
      platform: "WhatsApp",
      username: "Grup Keluarga Besar",
      avatarText: "GK",
      time: "08:47",
      headline: "INFO PENTING!!! SEGERA BAGIKAN!!!",
      body: "Besok semua sekolah di Jakarta diliburkan karena angin kencang. Bagikan ke semua grup agar tidak ketinggalan info! (diteruskan)",
      hotspots: [
        { id: "rf-a", label: "Judul", x: 20, y: 33, isFlag: true, note: "Huruf kapital penuh + 'INFO PENTING!!!' adalah pola klasik hoaks." },
        { id: "rf-d", label: "Tanpa tanggal", x: 78, y: 33, isFlag: true, note: "Tidak ada tanggal kejadian. Kapan? Hari ini? Bulan lalu?" },
        { id: "rf-b", label: "Isi", x: 20, y: 62, isFlag: false, note: "Klaimnya sendiri memang tidak wajar, tapi cari tanda lain dulu." },
        { id: "rf-c", label: "Tanpa sumber", x: 20, y: 83, isFlag: true, note: "Tidak ada sumber resmi yang bisa dicek — red flag besar." },
      ],
    },
  },
  {
    id: "rf-2",
    prompt: "Klik semua bagian mencurigakan pada screenshot berita ini.",
    explanation:
      "Screenshot dipotong sehingga tautan dan tanggalnya hilang — ini cara favorit penyebar hoaks menghilangkan bukti yang bisa dicek.",
    post: {
      id: "rf-post-2",
      platform: "Instagram",
      username: "berita.cepat99",
      avatarText: "B9",
      time: "screenshot",
      headline: "TERUNGKAP!! Kebenaran yang selama ini disembunyikan!",
      body: "Klik link di bio untuk melihat bukti lengkapnya. Jangan percaya media mainstream!",
      hotspots: [
        { id: "rf-a", label: "Judul", x: 20, y: 33, isFlag: true, note: "'TERUNGKAP!!' dan 'disembunyikan' = clickbait yang memancing rasa ingin tahu." },
        { id: "rf-d", label: "Akun", x: 78, y: 28, isFlag: false, note: "Akunnya memang mencurigakan, tapi fokus ke isi postingan dulu." },
        { id: "rf-b", label: "Link di bio", x: 20, y: 62, isFlag: true, note: "Mengarahkan ke link tak jelas = cara menarikmu ke situs mencurigakan." },
        { id: "rf-c", label: "Media mainstream", x: 78, y: 62, isFlag: true, note: "Menjelekkan sumber kredibel untuk membangun rasa percaya pada klaimnya." },
      ],
    },
  },
  {
    id: "rf-3",
    prompt: "Klik semua bagian yang mencurigakan.",
    explanation:
      "Klaim tanpa bukti + '100% benar' tanpa sumber + huruf kapital berlebihan = kombinasi khas disinformasi.",
    post: {
      id: "rf-post-3",
      platform: "X (Twitter)",
      username: "@warga_tau",
      avatarText: "WT",
      time: "2 jam",
      headline: "PASTI BENER 100%!!!",
      body: "Saya punya info dari dalam. Dijamin nyata. Percaya deh, ini bukan hoaks. JANGAN LUPA SHARE!!",
      hotspots: [
        { id: "rf-a", label: "Judul", x: 20, y: 33, isFlag: true, note: "'100%' + kapital penuh = klaim tanpa bukti." },
        { id: "rf-b", label: "Info dari dalam", x: 20, y: 58, isFlag: true, note: "'Info dari dalam' tanpa bukti = klaim anonim yang tak bisa dicek." },
        { id: "rf-c", label: "Bukan hoaks", x: 20, y: 80, isFlag: true, note: "Menyatakan 'ini bukan hoaks' tanpa sumber justru mencurigakan." },
        { id: "rf-d", label: "SHARE", x: 78, y: 80, isFlag: false, note: "Ajakan berbagi itu memang umum, tapi bukan tanda bahaya utama di sini." },
      ],
    },
  },
];

export const SPOT_PAIRS: SpotPair[] = [
  {
    id: "st-1",
    prompt: "Dua postingan terlihat mirip. Klik perbedaan di antara keduanya.",
    explanation:
      "Perbedaannya: tanggal berita, nama sumber, dan salah satu angka berubah. Klik semua titik perbedaan untuk membongkar hoaksnya.",
    postA: {
      id: "st-1-a",
      platform: "Berita",
      username: "BeritaJakarta.com",
      avatarText: "BJ",
      time: "12 Mei 2026",
      headline: "Ketinggian Air di Jakarta Utara Capai 20 cm",
      body: "Hujan deras menyebabkan genangan setinggi 20 cm di beberapa titik Jakarta Utara. Sumber: Dinas PUPR DKI.",
      hotspots: [
        { id: "a-head", label: "Judul", x: 20, y: 36, isFlag: false, note: "Judulnya normal, bukan titik perbedaan." },
        { id: "a-date", label: "Tanggal", x: 78, y: 28, isFlag: true, note: "Tanggal 12 Mei 2026." },
        { id: "a-src", label: "Sumber", x: 20, y: 72, isFlag: true, note: "Dinas PUPR DKI — lembaga resmi." },
        { id: "a-num", label: "Angka", x: 78, y: 72, isFlag: true, note: "20 cm." },
      ],
    },
    postB: {
      id: "st-1-b",
      platform: "Berita",
      username: "BeritaJakarta.co.id (mirip)",
      avatarText: "BJ",
      time: "3 Maret 2023",
      headline: "Ketinggian Air di Jakarta Utara Capai 200 cm",
      body: "Hujan deras menyebabkan genangan setinggi 200 cm di beberapa titik Jakarta Utara. Sumber: akun pribadi.",
      hotspots: [
        { id: "b-head", label: "Judul", x: 20, y: 36, isFlag: false, note: "Judulnya sama, bukan titik perbedaan." },
        { id: "b-date", label: "Tanggal", x: 78, y: 28, isFlag: true, note: "Tanggal berubah jadi 3 Maret 2023 — berita lama dibagikan ulang." },
        { id: "b-src", label: "Sumber", x: 20, y: 72, isFlag: true, note: "Sumber berubah jadi 'akun pribadi' — tidak kredibel." },
        { id: "b-num", label: "Angka", x: 78, y: 72, isFlag: true, note: "Angka 20 cm berubah jadi 200 cm — dibesar-besarkan." },
      ],
    },
    differences: [
      ["a-date", "b-date"],
      ["a-src", "b-src"],
      ["a-num", "b-num"],
    ],
  },
  {
    id: "st-2",
    prompt: "Cari 3 perbedaan antara postingan asli dan versi yang diubah.",
    explanation:
      "Versi palsu menghapus tanda tangan redaksi, membesar-besarkan angka toko terdampak dari 5 menjadi 50, dan mengganti tanggal menjadi lebih baru agar terkesan aktual.",
    postA: {
      id: "st-2-a",
      platform: "Portal Berita",
      username: "Kompas.ID",
      avatarText: "K",
      time: "18 Juli 2026",
      headline: "Kebakaran Pasar: 5 Toko Terdampak, Tidak Ada Korban Jiwa",
      body: "Pemadam kebakaran berhasil menangani. Dikonfirmasi oleh Dinas Gulkarmat Jakarta. By: Redaksi Jakarta.",
      hotspots: [
        { id: "a-head", label: "Judul", x: 20, y: 36, isFlag: false, note: "Bukan titik perbedaan." },
        { id: "a-date", label: "Tanggal", x: 78, y: 28, isFlag: true, note: "18 Juli 2026." },
        { id: "a-red", label: "Redaksi", x: 20, y: 72, isFlag: true, note: "Ada nama redaksi/penanggung jawab." },
        { id: "a-num", label: "5 toko", x: 78, y: 68, isFlag: true, note: "5 toko terdampak." },
      ],
    },
    postB: {
      id: "st-2-b",
      platform: "Portal Berita",
      username: "Kompas.ID (diubah)",
      avatarText: "K",
      time: "15 Desember 2026",
      headline: "Kebakaran Pasar: 50 Toko Terdampak, Tidak Ada Korban Jiwa",
      body: "Pemadam kebakaran berhasil menangani. Dikonfirmasi oleh Dinas Gulkarmat Jakarta.",
      hotspots: [
        { id: "b-head", label: "Judul", x: 20, y: 36, isFlag: false, note: "Bukan titik perbedaan." },
        { id: "b-date", label: "Tanggal", x: 78, y: 28, isFlag: true, note: "Tanggal diubah menjadi Desember 2026 agar terkesan baru." },
        { id: "b-red", label: "Redaksi", x: 20, y: 72, isFlag: true, note: "Nama redaksi dihapus dari versi ini." },
        { id: "b-num", label: "50 toko", x: 78, y: 68, isFlag: true, note: "Angka diubah dari 5 menjadi 50 toko." },
      ],
    },
    differences: [
      ["a-red", "b-red"],
      ["a-num", "b-num"],
      ["a-date", "b-date"],
    ],
  },
];