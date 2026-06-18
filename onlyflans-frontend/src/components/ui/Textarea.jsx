export default function Textarea({ className = '', ...props }) {
  return (
    <textarea
      className={`min-h-28 w-full rounded-md border border-stone-300 bg-white px-3 py-2 text-sm text-ink outline-none transition placeholder:text-stone-400 focus:border-ink focus:ring-2 focus:ring-ink/10 ${className}`}
      {...props}
    />
  );
}
