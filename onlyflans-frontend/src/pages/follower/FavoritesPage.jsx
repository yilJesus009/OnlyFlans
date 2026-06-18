import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { getFavorites, removeFavorite } from '../../api/followerService.js';

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = async () => setFavorites(await getFavorites());

  useEffect(() => {
    loadFavorites();
  }, []);

  const onRemove = async (creadorId) => {
    await removeFavorite(creadorId);
    loadFavorites();
  };

  return (
    <AppLayout title="Favoritos">
      <div className="space-y-3">
        {favorites.length === 0 && <EmptyState title="Sin favoritos" description="Marca creadores para volver rapido a ellos." />}
        {favorites.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-bold text-ink">{item.creador?.nombre}</h2>
                <p className="text-sm text-stone-500">{item.creador?.email}</p>
              </div>
              <div className="flex gap-2">
                <Link className="rounded-md bg-ink px-4 py-2 text-sm font-semibold text-white" to={`/seguidor/creadores/${item.creadorId}`}>
                  Ver perfil
                </Link>
                <Button variant="danger" onClick={() => onRemove(item.creadorId)}>Quitar</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
