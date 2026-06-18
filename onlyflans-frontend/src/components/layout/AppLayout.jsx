import { Link, NavLink, useNavigate } from 'react-router';
import {
  BarChart3,
  Heart,
  Home,
  LogOut,
  Search,
  Target,
  UserRound,
  WalletCards
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';

const creatorLinks = [
  { to: '/creador', label: 'Inicio', icon: Home },
  { to: '/creador/perfil', label: 'Perfil', icon: UserRound },
  { to: '/creador/posts', label: 'Posts', icon: WalletCards },
  { to: '/creador/metas', label: 'Metas', icon: Target },
  { to: '/creador/reportes', label: 'Reportes', icon: BarChart3 }
];

const followerLinks = [
  { to: '/seguidor', label: 'Feed', icon: Home },
  { to: '/seguidor/creadores', label: 'Creadores', icon: Search },
  { to: '/seguidor/favoritos', label: 'Favoritos', icon: Heart },
  { to: '/seguidor/historial', label: 'Historial', icon: BarChart3 }
];

export default function AppLayout({ title, children }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = user?.role === 'creator' ? creatorLinks : followerLinks;

  const onLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-paper">
      <aside className="fixed inset-y-0 left-0 hidden w-64 border-r border-stone-200 bg-white px-4 py-5 lg:block">
        <Link to="/" className="flex items-center gap-3 px-2">
          <span className="grid h-10 w-10 place-items-center rounded-md bg-flan font-black text-ink">
            OF
          </span>
          <div>
            <p className="text-lg font-bold text-ink">OnlyFlans</p>
            <p className="text-xs text-stone-500">{user?.role === 'creator' ? 'Creador' : 'Seguidor'}</p>
          </div>
        </Link>

        <nav className="mt-8 space-y-1">
          {links.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition ${
                  isActive ? 'bg-ink text-white' : 'text-stone-700 hover:bg-stone-100'
                }`
              }
            >
              <Icon size={18} />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="absolute inset-x-4 bottom-5">
          <div className="mb-3 rounded-lg bg-stone-50 p-3">
            <p className="truncate text-sm font-semibold text-ink">{user?.nombre}</p>
            <p className="truncate text-xs text-stone-500">{user?.email}</p>
          </div>
          <Button variant="ghost" className="w-full justify-start" onClick={onLogout}>
            <LogOut size={18} />
            Cerrar sesion
          </Button>
        </div>
      </aside>

      <div className="lg:pl-64">
        <header className="sticky top-0 z-20 border-b border-stone-200 bg-paper/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-stone-500">
                OnlyFlans
              </p>
              <h1 className="text-2xl font-bold text-ink">{title}</h1>
            </div>
            <Button variant="outline" className="lg:hidden" onClick={onLogout}>
              <LogOut size={18} />
            </Button>
          </div>
          <nav className="mt-4 flex gap-2 overflow-x-auto lg:hidden">
            {links.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `whitespace-nowrap rounded-md px-3 py-2 text-sm font-medium ${
                    isActive ? 'bg-ink text-white' : 'bg-white text-stone-700'
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
        </header>

        <main className="mx-auto max-w-6xl px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}
