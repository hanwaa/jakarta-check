import type { DetectiveCase } from "../types";

export const CASES: DetectiveCase[] = [
  {
    id: "case-001",
    number: "CASE #001",
    title: "Peristiwa di Jakarta",
    emoji: "🏙️",
    scenario:
      "Sebuah informasi viral mengatakan bahwa suatu peristiwa besar terjadi di Jakarta. Kamu menemukan 5 bukti. Manakah yang paling bisa dipercaya?",
    evidence: [
      {
        label: "A. Screenshot dari akun anonim",
        reliability: "Sangat rendah",
        detail: "Identitas pembuat tidak bisa diverifikasi. Tangkapan layar mudah dipalsukan.",
        isReliable: false,
      },
      {
        label: "B. Posting ulang influencer",
        reliability: "Rendah",
        detail: "Influencer sering menyalin tanpa verifikasi. Bukan sumber asli.",
        isReliable: false,
      },
      {
        label: "C. Website resmi lembaga terkait",
        reliability: "Tinggi",
        detail: "Punya nama, kontak, dan rekam jejak. Informasi bisa diverifikasi langsung.",
        isReliable: true,
      },
      {
        label: "D. Pesan WhatsApp tanpa sumber",
        reliability: "Sangat rendah",
        detail: "Tanpa nama dan tanpa tautan, tidak ada yang bisa dicek.",
        isReliable: false,
      },
      {
        label: "E. Blog pribadi tanpa referensi",
        reliability: "Rendah",
        detail: "Tidak ada referensi dan tidak ada proses verifikasi.",
        isReliable: false,
      },
    ],
    steps: [
      {
        id: "c1-s1",
        phase: "SOURCE CHECK",
        prompt: "Dari 5 bukti di atas, manakah sumber yang paling dapat dipercaya?",
        options: [
          "A. Screenshot dari akun anonim",
          "B. Posting ulang influencer",
          "C. Website resmi lembaga terkait",
          "D. Pesan WhatsApp tanpa sumber",
          "E. Blog pribadi tanpa referensi",
        ],
        correct: 2,
        explanation:
          "Website resmi lembaga terkait punya identitas, kontak, dan rekam jejak yang bisa diverifikasi. Bukti lain tidak bisa diperiksa asal-usulnya.",
        scoreKey: "source",
        points: 25,
      },
      {
        id: "c1-s2",
        phase: "EVIDENCE",
        prompt: "Screenshot dari akun anonim — apakah bisa dipercaya sebagai bukti?",
        options: [
          "Ya, karena sudah tersebar luas",
          "Tidak, karena identitas pembuat tidak bisa diverifikasi",
          "Ya, karena gambarnya terlihat jelas",
          "Tergantung jumlah like-nya",
        ],
        correct: 1,
        explanation:
          "Tangkapan layar mudah dipalsukan dan akun anonim tidak punya identitas yang bisa dicek. Popularitas bukan bukti kebenaran.",
        scoreKey: "evidence",
        points: 20,
      },
      {
        id: "c1-s3",
        phase: "DATE CHECK",
        prompt: "Screenshot tersebut menunjukkan timestamp dari 2 tahun lalu. Apa artinya?",
        options: [
          "Kejadiannya pasti terjadi kemarin",
          "Informasi itu tidak mungkin benar",
          "Informasi lama dibagikan kembali — konteks waktunya harus dicek",
          "Tidak ada hubungannya dengan tanggal",
        ],
        correct: 2,
        explanation:
          "Tangkapan layar lama yang dibagikan ulang sering diklaim sebagai kejadian baru. Tanggal menentukan relevansi informasi.",
        scoreKey: "date",
        points: 20,
      },
      {
        id: "c1-s4",
        phase: "CROSS-CHECK",
        prompt: "Apa langkah terbaik untuk memastikan kebenaran peristiwa itu?",
        options: [
          "Membagikan ke semua grup agar lebih banyak yang tahu",
          "Mencari 2–3 sumber independen yang terpercaya",
          "Menyimpan buktinya untuk dibagikan nanti",
          "Menanyakan ke satu teman saja",
        ],
        correct: 1,
        explanation:
          "Cross-check: cari minimal beberapa sumber independen. Jangan hanya mencari sumber yang mengonfirmasi keyakinanmu.",
        scoreKey: "crosscheck",
        points: 25,
      },
      {
        id: "c1-s5",
        phase: "CONCLUDE",
        prompt: "Kamu belum menemukan sumber independen apa pun. Status terbaik untuk klaim ini?",
        options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
        correct: 3,
        explanation:
          "Tanpa sumber yang bisa diverifikasi, kita belum bisa memvonis benar atau salah. Status yang jujur adalah 'belum terbukti'.",
        scoreKey: "conclusion",
        points: 10,
      },
    ],
    bonusClue:
      "Kunci utamanya: identitas sumber. Setiap bukti yang tidak bisa ditelusuri asal-usulnya, semakin rendah nilainya.",
    scoreKeys: [
      { key: "source", label: "Source evaluation", max: 25 },
      { key: "date", label: "Date/context", max: 20 },
      { key: "crosscheck", label: "Cross-check", max: 25 },
      { key: "evidence", label: "Evidence interpretation", max: 20 },
      { key: "conclusion", label: "Final conclusion", max: 10 },
    ],
  },
  {
    id: "case-002",
    number: "CASE #002",
    title: "Kapan Ini Terjadi?",
    emoji: "🕰️",
    scenario:
      "Foto kerumunan besar tersebar dengan caption 'MASSA MEMBANJIRI JAKARTA HARI INI'. Kamu curiga fotonya bukan dari hari ini.",
    evidence: [
      {
        label: "Foto kerumunan tanpa metadata",
        reliability: "Rendah",
        detail: "Tanpa metadata dan tanggal, asal-usul foto tidak jelas.",
        isReliable: false,
      },
      {
        label: "Hasil reverse image search: foto muncul pertama kali 3 tahun lalu",
        reliability: "Tinggi",
        detail: "Menunjukkan foto bukan dari hari ini — dibagikan ulang dengan konteks baru.",
        isReliable: true,
      },
      {
        label: "Caption tanpa sumber media",
        reliability: "Sangat rendah",
        detail: "Tidak ada media atau lembaga yang bisa dikonfirmasi.",
        isReliable: false,
      },
      {
        label: "Berita media nasional hari ini (tanpa foto itu)",
        reliability: "Tinggi",
        detail: "Media kredibel meliput kejadian hari ini tanpa foto tersebut.",
        isReliable: true,
      },
    ],
    steps: [
      {
        id: "c2-s1",
        phase: "DATE CHECK",
        prompt: "Hal pertama yang harus kamu cek dari foto ini adalah...",
        options: [
          "Jumlah like-nya",
          "Kapan foto ini pertama kali muncul",
          "Siapa yang mengirim ke grupmu",
          "Warna bajunya",
        ],
        correct: 1,
        explanation:
          "Cek tanggal publikasi dan kapan foto pertama kali muncul. Reverse image search membantu menelusuri asal-usulnya.",
        scoreKey: "date",
        points: 20,
      },
      {
        id: "c2-s2",
        phase: "EVIDENCE",
        prompt: "Reverse image search menemukan foto yang sama dari 3 tahun lalu. Kesimpulannya...",
        options: [
          "Foto itu benar dari hari ini",
          "Foto itu sudah lama, kemungkinan dipakai ulang dengan klaim baru",
          "Foto itu pasti palsu",
          "Foto itu tidak bisa dianggap apa-apa",
        ],
        correct: 1,
        explanation:
          "Foto lama yang dipakai ulang dengan klaim 'hari ini' adalah bentuk malinformation: fakta asli, konteks menyesatkan.",
        scoreKey: "evidence",
        points: 20,
      },
      {
        id: "c2-s3",
        phase: "CROSS-CHECK",
        prompt: "Berita media nasional hari ini tidak memuat foto itu. Apa artinya?",
        options: [
          "Media nasional pasti salah",
          "Kemungkinan besar kejadian yang diklaim tidak terjadi hari ini",
          "Media nasional menyembunyikan kebenaran",
          "Tidak ada artinya sama sekali",
        ],
        correct: 1,
        explanation:
          "Jika kejadian sebesar itu benar terjadi, media kredibel akan meliputnya. Ketidakhadiran liputan adalah tanda kuat untuk mencurigai klaim.",
        scoreKey: "crosscheck",
        points: 25,
      },
      {
        id: "c2-s4",
        phase: "SOURCE CHECK",
        prompt: "Untuk memverifikasi kejadian di Jakarta, sumber terbaik adalah...",
        options: [
          "Akun anonim penyebar foto",
          "Komentar netizen",
          "Website resmi lembaga terkait atau media kredibel",
          "Screenshot grup tetangga",
        ],
        correct: 2,
        explanation:
          "Sumber resmi dan media kredibel bisa dikonfirmasi. Akun anonim dan komentar netizen tidak bisa diverifikasi.",
        scoreKey: "source",
        points: 25,
      },
      {
        id: "c2-s5",
        phase: "CONCLUDE",
        prompt: "Foto asli dari 3 tahun lalu diklaim sebagai kejadian hari ini. Status yang tepat...",
        options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
        correct: 2,
        explanation:
          "Fotonya asli tapi konteks waktunya diubah — itu menyesatkan (malinformation). Fakta benar, konteks salah.",
        scoreKey: "conclusion",
        points: 10,
      },
    ],
    bonusClue: "Waktu adalah konteks. Foto asli + klaim waktu yang salah = informasi yang menyesatkan.",
    scoreKeys: [
      { key: "source", label: "Source evaluation", max: 25 },
      { key: "date", label: "Date/context", max: 20 },
      { key: "crosscheck", label: "Cross-check", max: 25 },
      { key: "evidence", label: "Evidence interpretation", max: 20 },
      { key: "conclusion", label: "Final conclusion", max: 10 },
    ],
  },
  {
    id: "case-003",
    number: "CASE #003",
    title: "Bongkar Angka Palsu",
    emoji: "📊",
    scenario:
      "Sebuah infografis viral menampilkan statistik besar-besaran tanpa menyebutkan sumber datanya. Kamu harus membongkarnya.",
    evidence: [
      {
        label: "Infografis tanpa sumber data",
        reliability: "Sangat rendah",
        detail: "Angka tanpa sumber dan tanpa tahun data tidak bisa diverifikasi.",
        isReliable: false,
      },
      {
        label: "Statistik resmi lembaga terkait",
        reliability: "Tinggi",
        detail: "Data resmi punya metodologi, tahun, dan bisa diakses publik.",
        isReliable: true,
      },
      {
        label: "Postingan ulang akun besar tanpa referensi",
        reliability: "Rendah",
        detail: "Popularitas akun bukan jaminan kebenaran angka.",
        isReliable: false,
      },
      {
        label: "Berita kredibel yang mengutip data resmi",
        reliability: "Tinggi",
        detail: "Media kredibel mencantumkan sumber dan konteks datanya.",
        isReliable: true,
      },
    ],
    steps: [
      {
        id: "c3-s1",
        phase: "CROSS-CHECK",
        prompt: "Bagaimana cara terbaik memverifikasi angka dalam infografis itu?",
        options: [
          "Mempercayainya karena desainnya rapi",
          "Membandingkan dengan data dari lembaga statistik resmi",
          "Menanyakan ke tetangga",
          "Menghitung jumlah like-nya",
        ],
        correct: 1,
        explanation:
          "Angka harus dibandingkan dengan data resmi yang metodologinya jelas. Desain yang rapi bukan bukti kebenaran.",
        scoreKey: "crosscheck",
        points: 25,
      },
      {
        id: "c3-s2",
        phase: "SOURCE CHECK",
        prompt: "Sumber paling kredibel untuk data statistik adalah...",
        options: [
          "Akun anonim pembuat infografis",
          "Lembaga statistik resmi atau instansi berwenang",
          "Screenshot grup chat",
          "Blog tanpa referensi",
        ],
        correct: 1,
        explanation:
          "Lembaga resmi punya metodologi dan data yang bisa diakses publik. Sumber lain tidak bisa dipertanggungjawabkan.",
        scoreKey: "source",
        points: 25,
      },
      {
        id: "c3-s3",
        phase: "EVIDENCE",
        prompt: "Infografis tidak menyebutkan tahun data. Apa masalahnya?",
        options: [
          "Tidak masalah, angka tetaplah angka",
          "Kita tidak bisa tahu apakah datanya masih relevan",
          "Berarti datanya pasti palsu",
          "Berarti datanya pasti benar",
        ],
        correct: 1,
        explanation:
          "Tanpa tahun, kita tidak bisa menilai relevansi data. Data lama sering dipakai untuk membuat klaim yang menyesatkan.",
        scoreKey: "evidence",
        points: 20,
      },
      {
        id: "c3-s4",
        phase: "DATE CHECK",
        prompt: "Data resmi ternyata dari 2 tahun lalu, tapi infografis mengesankan data hari ini. Ini...",
        options: [
          "Cara penyajian yang wajar",
          "Menyesatkan — konteks waktu data disembunyikan",
          "Bukti datanya salah",
          "Tidak ada hubungannya",
        ],
        correct: 1,
        explanation:
          "Data lama yang disajikan sebagai data terkini adalah malinformation: angkanya asli, konteks waktunya menyesatkan.",
        scoreKey: "date",
        points: 20,
      },
      {
        id: "c3-s5",
        phase: "CONCLUDE",
        prompt: "Angka asli dari tahun lalu dipakai seolah data terbaru. Status yang tepat...",
        options: ["BENAR", "SALAH", "MENYESATKAN", "BELUM TERBUKTI"],
        correct: 2,
        explanation:
          "Datanya nyata tapi konteksnya diubah — kesimpulan jujurnya adalah MENYESATKAN.",
        scoreKey: "conclusion",
        points: 10,
      },
    ],
    bonusClue: "Angka punya tanggal lahir. Cek tahun datanya sebelum percaya infografisnya.",
    scoreKeys: [
      { key: "source", label: "Source evaluation", max: 25 },
      { key: "date", label: "Date/context", max: 20 },
      { key: "crosscheck", label: "Cross-check", max: 25 },
      { key: "evidence", label: "Evidence interpretation", max: 20 },
      { key: "conclusion", label: "Final conclusion", max: 10 },
    ],
  },
];