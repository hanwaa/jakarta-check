import type { Level } from "../types";

export const LEVEL_4: Level = {
  id: "level-4",
  number: 4,
  title: "Mengenali AI & Deepfake",
  subtitle: "Deteksi gambar, video, audio, dan teks buatan AI sebelum kamu tertipu.",
  emoji: "🤖",
  gradient: "from-blue-500 to-indigo-600",
  ring: "ring-blue-500/30",
  description:
    "AI kini bisa membuat wajah, suara, dan artikel yang terlihat nyata. Pelajari ciri-ciri khas konten rekayasa AI dan bagaimana membongkarnya.",
  lessons: [
    {
      id: "l4-1",
      title: "Ciri Gambar Buatan AI",
      emoji: "🖼️",
      minutes: 3,
      intro:
        "Gambar hasil AI (Midjourney, DALL-E, Stable Diffusion) sering terlihat sempurna — justru kesempurnaan itulah petunjuknya.",
      points: [
        "Perhatikan kejanggalan fisik: jumlah jari tangan yang acak (bisa 4, 6, atau 7), tangan yang saling menyatu, atau anggota badan terlalu panjang.",
        "Tekstur kulit terlalu mulus seperti lilin atau plastik — pori-pori dan detail alami kulit hilang.",
        "Aksesori simetris tidak pas: kacamata dengan gagang beda bentuk, anting yang hanya ada satu, gigi yang jumlahnya tidak masuk akal.",
        "Tulisan di latar belakang acak dan tidak terbaca: papan nama, spanduk, atau label produk berisi huruf palsu menyerupai tulisan.",
        "Latar belakang sering buram mengelabui, cahaya tidak konsisten, dan benda-benda menyatu tanpa batas yang jelas.",
      ],
      tips: [
        "Zoom bagian tangan, telinga, gigi, dan mata — di situlah AI paling sering keliru.",
        "Periksa tulisan apa pun di dalam gambar. Jika tidak bisa dibaca atau hurufnya berubah bentuk, curigai.",
        "Gunakan detektor seperti Hive Moderation untuk memperkirakan persentase kemungkinan gambar buatan AI.",
      ],
      takeaway:
        "Gambar AI sering gagal di detail kecil: jari, tekstur kulit, aksesori simetris, dan tulisan latar belakang. Zoom sebelum percaya.",
    },
    {
      id: "l4-2",
      title: "Ciri Deepfake Video & Audio",
      emoji: "🎥",
      minutes: 3,
      intro:
        "Deepfake menukar wajah atau meniru suara seseorang. Kualitasnya naik terus, tapi masih meninggalkan jejak.",
      points: [
        "Gerakan bibir tidak sinkron dengan nada suara — terutama pada konsonan B, P, dan M.",
        "Kedipan mata tidak alami: terlalu jarang, terlalu cepat, atau mata berkedip serentak dengan pola aneh.",
        "Patahan halus di area wajah: garis tepi wajah bergetar atau 'meleleh' saat kepala bergerak, rahang dan leher terlihat menyatu paksa.",
        "Intonasi suara monoton tanpa napas alami — suara tiruan AI cenderung datar, tempo terlalu rapi, dan tidak punya jeda menghirup udara.",
        "Pencahayaan wajah tidak cocok dengan pencahayaan lingkungan, dan detail rambut/aleri di tepi wajah sering kabur.",
      ],
      tips: [
        "Putar video perlahan (0.25x) dan fokuskan pandangan pada tepi wajah serta bibir.",
        "Bandingkan dengan video asli orang tersebut untuk melihat perbedaan gaya bicara dan ekspresi.",
        "Pindai video mencurigakan dengan Deepware Scanner untuk mendeteksi manipulasi wajah.",
      ],
      takeaway:
        "Deepfake bocor lewat sinkronisasi bibir, kedipan mata, patahan di tepi wajah, dan intonasi suara yang datar tanpa napas alami.",
    },
    {
      id: "l4-3",
      title: "Ciri Teks Rekayasa AI",
      emoji: "✍️",
      minutes: 2,
      intro:
        "Artikel atau pesan buatan ChatGPT dan sejenisnya punya gaya menulis yang khas — terlalu rapi untuk ukuran manusia.",
      points: [
        "Pola kalimat sangat rapi dan seragam: panjang kalimat konsisten, struktur paragraf selalu sama, transisi selalu mulus.",
        "Repetitif dan berputar-putar: ide yang sama diulang dengan kata berbeda tanpa informasi baru.",
        "Sering membuat klaim fakta buatan (hallucination): menyebut statistik, kutipan, atau tanggal yang tampak meyakinkan tapi tidak bisa diverifikasi.",
        "Hampir tidak ada kesalahan ketik atau gaya personal — tulisan manusia biasanya punya ritme dan 'warna' tersendiri.",
        "Gelar berlebihan seperti 'penting untuk dicatat' atau 'dalam era digital yang terus berkembang' adalah pembuka favorit AI.",
      ],
      tips: [
        "Verifikasi semua angka dan kutipan di dalam teks — hallucination AI paling mudah dibongkar lewat sumbernya.",
        "Gunakan ZeroGPT atau CopyLeaks untuk memperkirakan apakah teks ditulis generator AI.",
        "Ingat: detektor bukan vonis final. Gunakan sebagai alat bantu, lalu cek fakta isinya secara manual.",
      ],
      takeaway:
        "Teks AI itu terlalu rapi, repetitif, berputar-putar, dan kerap mengarang fakta. Selalu verifikasi klaimnya, bukan hanya gayanya.",
    },
  ],
  quiz: [
    {
      id: "l4-q1",
      question: "Sebuah foto viral memperlihatkan tangan seseorang yang memiliki enam jari dan kulit terlalu mulus seperti lilin. Kemungkinan besar foto itu...",
      options: [
        "Foto asli dari kamera profesional",
        "Hasil buatan AI",
        "Foto lama yang pudar",
        "Foto yang dikompres ulang",
      ],
      correct: 1,
      explanation:
        "Jumlah jari yang salah dan tekstur kulit seperti lilin adalah ciri klasik gambar hasil AI. Cek juga tulisan di latar belakangnya.",
    },
    {
      id: "l4-q2",
      question: "Video pidato seorang pejabat beredar. Bibirnya kadang tidak sinkron dengan suara, dan intonasinya datar tanpa jeda napas. Ini tanda...",
      options: [
        "Video direkam dengan kamera murah",
        "Koneksi internet buruk saat video diunggah",
        "Kemungkinan deepfake video/audio",
        "Pejabat tersebut sedang sakit",
      ],
      correct: 2,
      explanation:
        "Bibir tak sinkron, kedipan tak alami, patahan halus di wajah, dan intonasi monoton tanpa napas adalah ciri deepfake. Pindai dengan tools seperti Deepware Scanner.",
    },
    {
      id: "l4-q3",
      question: "Sebuah artikel berpola kalimat sangat rapi, repetitif, berputar-putar, dan menyebut statistik yang tidak bisa ditemukan sumbernya. Artinya...",
      options: [
        "Artikel itu pasti ditulis ahli",
        "Artikel itu dicurigai dibuat AI dan mengalami hallucination — verifikasi setiap klaimnya",
        "Statistiknya otomatis benar karena detail",
        "Gaya rapi berarti media besar",
      ],
      correct: 1,
      explanation:
        "Pola kalimat terlalu rapi + repetitif + klaim fakta yang tak bisa diverifikasi adalah kombinasi khas teks AI. Pindai dengan ZeroGPT/CopyLeaks dan cek sumber datanya.",
    },
  ],
};
