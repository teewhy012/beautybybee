export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="border-b border-espresso/10 bg-linear-to-b from-blush/60 to-cream">
      <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-honey">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 font-serif text-4xl font-medium leading-tight tracking-tight sm:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-cocoa">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}