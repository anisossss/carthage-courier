import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rule-double mb-10" />
      <p className="kicker text-carmine">Correction — Page 404</p>
      <h1 className="mt-4 font-display text-6xl font-black tracking-tight md:text-7xl">
        Not in this edition
      </h1>
      <p className="mx-auto mt-5 max-w-md text-lg italic leading-relaxed text-navy">
        The page you requested went to press without us. It may have been
        retracted, moved to another column, or never typeset at all.
      </p>
      <p className="mt-10">
        <Link
          href="/"
          className="kicker inline-block border border-ink px-5 py-3 text-ink transition-colors hover:border-carmine hover:text-carmine"
        >
          Return to the front page
        </Link>
      </p>
      <p className="mt-10 font-display text-3xl text-carmine" aria-hidden="true">
        ❦
      </p>
      <div className="rule-double-flip mt-10" />
    </section>
  );
}
