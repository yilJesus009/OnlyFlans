export default function EmptyState({ title, description }) {
  return (
    <div className="rounded-lg border border-dashed border-stone-300 bg-white px-6 py-10 text-center">
      <h3 className="text-base font-semibold text-ink">{title}</h3>
      {description && <p className="mt-2 text-sm text-stone-600">{description}</p>}
    </div>
  );
}
