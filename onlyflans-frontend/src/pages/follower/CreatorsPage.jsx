import { useState } from 'react';
import { Link } from 'react-router';
import { Search } from 'lucide-react';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import { searchCreators } from '../../api/followerService.js';
import { uploadUrl } from '../../utils/media.js';

export default function CreatorsPage() {
  const [query, setQuery] = useState('');
  const [creators, setCreators] = useState([]);
  const [searched, setSearched] = useState(false);
  const [error, setError] = useState('');

  const onSearch = async (event) => {
    event.preventDefault();
    setError('');
    if (!query.trim()) {
      setError('El backend requiere un texto de busqueda.');
      return;
    }
    setCreators(await searchCreators(query));
    setSearched(true);
  };

  return (
    <AppLayout title="Creadores">
      <Card className="p-5">
        <form className="flex flex-col gap-3 sm:flex-row" onSubmit={onSearch}>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre"
          />
          <Button type="submit" variant="accent">
            <Search size={18} />
            Buscar
          </Button>
        </form>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {searched && creators.length === 0 && (
          <div className="md:col-span-2">
            <EmptyState title="Sin resultados" description="Prueba con otro nombre." />
          </div>
        )}
        {creators.map((creator) => (
          <Card key={creator.id} className="overflow-hidden">
            <div className="h-28 bg-stone-200">
              {creator.perfil?.banner && (
                <img className="h-full w-full object-cover" src={uploadUrl(creator.perfil.banner)} alt="" />
              )}
            </div>
            <div className="p-5">
              <h2 className="text-lg font-bold text-ink">{creator.nombre}</h2>
              <p className="mt-1 line-clamp-2 text-sm text-stone-600">{creator.perfil?.descripcion}</p>
              <Link className="mt-4 inline-block text-sm font-semibold text-berry underline" to={`/seguidor/creadores/${creator.id}`}>
                Ver perfil
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
