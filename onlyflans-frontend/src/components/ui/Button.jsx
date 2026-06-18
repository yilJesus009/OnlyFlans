const variants = {
  primary: 'bg-ink text-white hover:bg-stone-700 focus:ring-ink',
  accent: 'bg-flan text-ink hover:bg-amber-400 focus:ring-flan',
  danger: 'bg-berry text-white hover:bg-rose-800 focus:ring-berry',
  ghost: 'bg-transparent text-ink hover:bg-stone-100 focus:ring-stone-300',
  outline: 'border border-stone-300 bg-white text-ink hover:bg-stone-50 focus:ring-stone-300'
};

export default function Button({ variant = 'primary', className = '', type = 'button', ...props }) {
  return (
    <button
      type={type}
      className={`inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant]} ${className}`}
      {...props}
    />
  );
}
