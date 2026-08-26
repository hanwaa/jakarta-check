import Link from "next/link";

const FOOTER_LINKS = [
  { href: "/cek-fakta", label: "Cek Fakta" },
  { href: "/academy", label: "Antihoax Academy" },
  { href: "/quiz", label: "Quiz Center" },
  { href: "/toolkit", label: "Fact-Checking Toolkit" },
  { href: "/detective", label: "Digital Detective" },
  { href: "/progress", label: "Progres Saya" },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-[#080b12] text-slate-300">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2 font-display text-lg font-extrabold text-white">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-red-600 text-sm font-black text-white">
                ✓
              </span>
              <span>JAKARTA CHECK!</span>
            </div>
            <p className="mt-3 text-sm text-slate-400">
              Berhenti sebelum berbagi. Temukan. Cek. Bongkar. Bagikan Kebenaran.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Navigasi</h3>
            <ul className="mt-3 space-y-2">
              {FOOTER_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="text-sm text-slate-400 transition hover:text-white">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Tentang</h3>
            <p className="mt-3 text-sm text-slate-400">
              JAKARTA CHECK! adalah platform edukasi literasi digital dan fact-checking. Kami mengajarkan cara berpikir
              sebelum berbagi — bukan menghakimi.
            </p>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/legal" className="text-sm text-slate-400 transition hover:text-white">
                  Kebijakan Privasi & Ketentuan
                </Link>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">
              © {new Date().getFullYear()} JAKARTA CHECK! · THINK BEFORE YOU SHARE.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}