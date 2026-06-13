export default function EmptyState({
  title = "Fresh ink coming soon…",
  message = "The presses are warming up. Our correspondents are filing their first dispatches, and the next edition will appear here shortly.",
  kicker = "Notice to our readers",
}: {
  title?: string;
  message?: string;
  kicker?: string;
}) {
  return (
    <section className="mx-auto max-w-2xl px-4 py-20 text-center">
      <div className="rule-double mb-10" />
      <p className="kicker text-carmine">{kicker}</p>
      <h2 className="mt-4 font-display text-4xl font-bold italic tracking-tight md:text-5xl">
        {title}
      </h2>
      <p className="mx-auto mt-5 max-w-md text-lg italic leading-relaxed text-navy">
        {message}
      </p>
      <p
        className="mt-8 font-display text-3xl text-carmine"
        aria-hidden="true"
      >
        ❦
      </p>
      <div className="rule-double-flip mt-10" />
    </section>
  );
}
