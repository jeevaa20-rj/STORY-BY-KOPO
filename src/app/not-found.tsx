import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return <main className="grid min-h-screen place-items-center bg-ink p-8 text-center text-ivory"><div><p className="eyebrow mb-5 text-copper-light">404 · Lost frame</p><h1 className="font-serif text-6xl">This story isn&apos;t here.</h1><Link href="/" className="button button--outline mt-8"><ArrowLeft size={17} /> Return home</Link></div></main>;
}
