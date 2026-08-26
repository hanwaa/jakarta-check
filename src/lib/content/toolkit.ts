export interface ToolItem {
  name: string;
  url: string;
  use: string;
  how: string;
}

export interface ToolCategory {
  id: string;
  title: string;
  emoji: string;
  accent: string;
  description: string;
  tools: ToolItem[];
}

export const TOOL_CATEGORIES: ToolCategory[] = [
  {
    id: "reverse-image",
    title: "Reverse Image Search",
    emoji: "🖼️",
    accent: "text-sky-300 border-sky-500/30 bg-sky-500/10",
    description: "Telusuri asal-usul foto dan video — cari tahu di mana dan kapan pertama kali muncul.",
    tools: [
      {
        name: "Google Lens / Images",
        url: "https://images.google.com/",
        use: "Mencari sumber utama dan asal-usul penyebaran foto.",
        how: "Unggah atau drag-and-drop gambarnya, lalu telusuri halaman lain yang memakai foto yang sama untuk menemukan versi paling awal.",
      },
      {
        name: "TinEye",
        url: "https://tineye.com/",
        use: "Mengetahui kapan foto pertama diunggah dan riwayat editannya.",
        how: "Sortir hasil berdasarkan 'oldest' untuk melihat kemunculan pertama foto, termasuk versi lama yang sudah diedit.",
      },
      {
        name: "Yandex Images",
        url: "https://yandex.com/images/",
        use: "Pencarian pengenalan wajah (facial recognition) terbaik.",
        how: "Unggah foto seseorang; Yandex paling jago menemukan foto wajah identik di berbagai situs dan ukuran.",
      },
      {
        name: "InVID / WeVerify",
        url: "https://www.invid-project.eu/tools-and-services/invid-verification-plugin/",
        use: "Ekstensi browser untuk bedah metadata visual dan video.",
        how: "Pecah video menjadi keyframe, analisis metadata, dan lakukan reverse search pada tiap frame dari satu ekstensi.",
      },
    ],
  },
  {
    id: "ai-deepfake",
    title: "AI & Deepfake Detector",
    emoji: "🤖",
    accent: "text-blue-300 border-blue-500/30 bg-blue-500/10",
    description: "Perkirakan apakah gambar, video, audio, atau teks dibuat oleh AI.",
    tools: [
      {
        name: "Hive Moderation",
        url: "https://hive.ai/moderation",
        use: "Deteksi persentase gambar/video buatan AI (Midjourney/DALL-E).",
        how: "Unggah gambar; Hive memberi skor perkiraan apakah konten dibuat model AI tertentu beserta tingkat keyakinannya.",
      },
      {
        name: "Deepware Scanner",
        url: "https://scanner.deepware.ai/",
        use: "Memindai rekayasa manipulasi wajah (deepfake video).",
        how: "Masukkan URL atau unggah video; scanner menganalisis pola wajah untuk mendeteksi tanda manipulasi deepfake.",
      },
      {
        name: "ZeroGPT / CopyLeaks",
        url: "https://www.zerogpt.com/",
        use: "Memindai artikel/teks buatan generator AI (ChatGPT).",
        how: "Tempel teksnya; alat menghitung persentase kemungkinan kalimat dihasilkan model bahasa AI.",
      },
    ],
  },
  {
    id: "database",
    title: "Database Cek Fakta",
    emoji: "🗄️",
    accent: "text-red-300 border-red-500/30 bg-red-500/10",
    description: "Klaim viral biasanya sudah pernah diperiksa — cari dulu sebelum memeriksa ulang.",
    tools: [
      {
        name: "Google Fact Check Explorer",
        url: "https://toolbox.google.com/factcheck/explorer",
        use: "Mesin pencari arsip pengecekan fakta global.",
        how: "Ketik klaim atau kata kuncinya; hasilnya menghimpun pemeriksaan fakta dari organisasi fact-check di seluruh dunia.",
      },
      {
        name: "TurnBackHoax.id / CekFakta.com",
        url: "https://turnbackhoax.id/",
        use: "Database utama verifikasi hoaks lokal Indonesia.",
        how: "Cari kata kunci isu yang viral; Mafindo dan koalisi CekFakta sudah membongkar ribuan hoaks berbahasa Indonesia.",
      },
    ],
  },
  {
    id: "forensics",
    title: "Forensik & Metadata",
    emoji: "🔬",
    accent: "text-amber-300 border-amber-500/30 bg-amber-500/10",
    description: "Bedah detail teknis: versi lama halaman web, posisi matahari, hingga data EXIF.",
    tools: [
      {
        name: "Wayback Machine",
        url: "https://web.archive.org/",
        use: "Cek versi lama web yang dihapus atau diubah.",
        how: "Masukkan URL-nya, lalu lihat arsip snapshot dari waktu ke waktu untuk membandingkan isi halaman yang berubah.",
      },
      {
        name: "SunCalc",
        url: "https://www.suncalc.org/",
        use: "Verifikasi posisi matahari/waktu pada foto.",
        how: "Tentukan lokasi dan tanggal foto, lalu bandingkan arah bayangan dengan posisi matahari untuk menguji kebenaran waktu.",
      },
    ],
  },
];
