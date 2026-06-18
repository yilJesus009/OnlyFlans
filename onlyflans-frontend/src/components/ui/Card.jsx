export default function Card({ className = '', ...props }) {
  return (
    <section
      className={`rounded-lg border border-stone-200 bg-white shadow-sm ${className}`}
      {...props}
    />
  );
}
