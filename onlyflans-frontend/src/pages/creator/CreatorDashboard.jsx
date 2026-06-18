import { Link } from 'react-router';
import { BarChart3, FileText, Target, UserRound } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Card from '../../components/ui/Card.jsx';

const actions = [
  { to: '/creador/perfil', title: 'Perfil publico', text: 'Foto, banner y descripcion.', icon: UserRound },
  { to: '/creador/posts', title: 'Publicaciones', text: 'Contenido para seguidores que donaron.', icon: FileText },
  { to: '/creador/metas', title: 'Metas de apoyo', text: 'Motivos para incentivar donaciones.', icon: Target },
  { to: '/creador/reportes', title: 'Ingresos', text: 'Total de flanes filtrado por fecha.', icon: BarChart3 }
];

export default function CreatorDashboard() {
  return (
    <AppLayout title="Panel de creador">
      <div className="grid gap-4 md:grid-cols-2">
        {actions.map(({ to, title, text, icon: Icon }) => (
          <Link key={to} to={to}>
            <Card className="h-full p-5 transition hover:-translate-y-0.5 hover:shadow-md">
              <Icon className="text-berry" size={24} />
              <h2 className="mt-4 text-lg font-bold text-ink">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{text}</p>
            </Card>
          </Link>
        ))}
      </div>
    </AppLayout>
  );
}
