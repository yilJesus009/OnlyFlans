import { Link } from 'react-router';

export default function AuthShell({ title, subtitle, children }) {
  return (
    <main className="grid min-h-screen bg-paper lg:grid-cols-[0.9fr_1.1fr]">
      <section className="hidden bg-ink px-10 py-12 text-white lg:flex lg:flex-col lg:justify-between">
        <div>
          <div className="grid h-12 w-12 place-items-center rounded-md bg-flan text-lg font-black text-ink">
            OF
          </div>
          <h1 className="mt-8 max-w-xl text-5xl font-black leading-tight">
            Apoya creadores con flanes simbolicos
          </h1>
          <p className="mt-5 max-w-lg text-base leading-7 text-stone-300">
            Plataforma academica para publicar contenido, desbloquear posts con donaciones
            y separar claramente permisos de creadores y seguidores.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-3xl font-black text-flan">1</p>
            <p className="mt-2 text-stone-300">Registro por rol</p>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-3xl font-black text-flan">2</p>
            <p className="mt-2 text-stone-300">Donacion simbolica</p>
          </div>
          <div className="rounded-lg border border-white/10 p-4">
            <p className="text-3xl font-black text-flan">3</p>
            <p className="mt-2 text-stone-300">Contenido desbloqueado</p>
          </div>
        </div>
      </section>

      <section className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md">
          <Link to="/" className="mb-8 inline-flex items-center gap-3 lg:hidden">
            <span className="grid h-10 w-10 place-items-center rounded-md bg-flan font-black text-ink">
              OF
            </span>
            <span className="text-lg font-bold text-ink">OnlyFlans</span>
          </Link>
          <div className="rounded-lg border border-stone-200 bg-white p-6 shadow-sm">
            <h2 className="text-2xl font-bold text-ink">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
            <div className="mt-6">{children}</div>
          </div>
        </div>
      </section>
    </main>
  );
}
