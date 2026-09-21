export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "center" | "left";
}) {
  const centered = align === "center";
  return (
    <div
      className={`max-w-2xl ${centered ? "mx-auto text-center" : "text-left"}`}
    >
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cocoa">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-4 font-serif text-3xl font-medium leading-tight sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-base leading-7 text-cocoa">{description}</p>
      )}
    </div>
  );
}