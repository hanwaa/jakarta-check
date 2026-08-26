import Link from "next/link";

export default function NotFound() {
  return (
    <div className="jc-zone jc-zone-fact zone-fact">
      <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-20 text-center">
        <p className="font-display text-8xl font-black text-red-500 text-glow">404</p>
        <h1 className="mt-4 font-display text-2xl font-extrabold text-white">
          Halaman ini seperti hoaks — tidak ditemukan.
        </h1>
        <p className="mt-2 text-slate-400">
          Alamat yang kamu tuju tidak ada atau sudah dipindahkan. Jangan dibagikan, ya. Cek lagi alamatnya.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#991b1b] to-[#ef4444] px-6 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:brightness-110"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
