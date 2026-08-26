import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Ketentuan — JAKARTA CHECK!",
  description: "Kebijakan privasi dan ketentuan penggunaan JAKARTA CHECK!.",
};

export default function LegalPage() {
  return (
    <div className="jc-zone">
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <Link href="/" className="text-sm font-semibold text-slate-400 hover:text-white">
          ← Beranda
        </Link>
        <h1 className="mt-4 font-display text-3xl font-black tracking-tight text-white sm:text-4xl">
          Kebijakan Privasi & Ketentuan
        </h1>
        <p className="mt-2 text-slate-400">
          Terakhir diperbarui: {new Date().getFullYear()}. Dokumen ini menjelaskan bagaimana JAKARTA CHECK! menangani
          data dan hal-hal yang perlu kamu ketahui saat menggunakan situs ini.
        </p>

        <div className="mt-8 space-y-6">
          <Card>
            <h2 className="font-display text-xl font-extrabold text-white">1. Kebijakan Privasi</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-400">
              <p>
                <strong className="text-slate-200">Penyimpanan lokal.</strong> Progres, XP, badge, dan riwayat kuis
                disimpan di perangkatmu sendiri (localStorage browser). Kami tidak mengirimkan data pribadimu ke server
                mana pun.
              </p>
              <p>
                <strong className="text-slate-200">Statistik anonim.</strong> Kami mencatat hitungan kunjungan dan
                aktivitas secara anonim (tanpa nama, tanpa identitas) untuk menampilkan statistik global di halaman
                beranda. Tidak ada data pribadi yang dikumpulkan.
              </p>
              <p>
                <strong className="text-slate-200">Cookie.</strong> Kami tidak menggunakan cookie pelacakan lintas
                situs. Sesi aktif ditandai dengan penyimpanan sesi browser biasa.
              </p>
              <p>
                <strong className="text-slate-200">Konten pengguna.</strong> Klaim yang kamu masukkan di fitur Cek
                Fakta tidak diunggah ke server dan hanya digunakan untuk panduan interaktif di perangkatmu.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-xl font-extrabold text-white">2. Ketentuan Penggunaan</h2>
            <div className="mt-3 space-y-3 text-sm text-slate-400">
              <p>
                <strong className="text-slate-200">Sifat edukasi.</strong> JAKARTA CHECK! adalah platform edukasi
                literasi digital. Semua materi, kuis, dan kasus disusun untuk tujuan pembelajaran, bukan untuk
                menyatakan secara otomatis bahwa sebuah klaim benar atau salah.
              </p>
              <p>
                <strong className="text-slate-200">Bukan pengganti verifikasi profesional.</strong> Kesimpulan yang kamu
                buat di fitur Cek Fakta adalah keputusanmu sendiri. Untuk klaim penting, selalu rujuk sumber resmi dan
                organisasi fact-checking profesional seperti Mafindo/TurnBackHoax.
              </p>
              <p>
                <strong className="text-slate-200">Penggunaan wajar.</strong> Materi boleh digunakan untuk pembelajaran
                dan pengajaran non-komersial dengan mencantumkan sumber. Dilarang memakai materi untuk menyebarkan
                informasi yang menyesatkan.
              </p>
              <p>
                <strong className="text-slate-200">Tools eksternal.</strong> Tautan ke alat eksternal (search engine,
                reverse image search, detektor AI, arsip) disediakan sebagai bantuan. Kami tidak bertanggung jawab atas
                konten situs eksternal tersebut.
              </p>
            </div>
          </Card>

          <Card>
            <h2 className="font-display text-xl font-extrabold text-white">3. Kontak</h2>
            <p className="mt-3 text-sm text-slate-400">
              Pertanyaan atau masukan tentang privasi dan ketentuan ini bisa disampaikan lewat kanal resmi JAKARTA
              CHECK!.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
