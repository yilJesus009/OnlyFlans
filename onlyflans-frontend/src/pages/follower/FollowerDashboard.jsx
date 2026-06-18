import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import { getFeed } from '../../api/followerService.js';
import { uploadUrl } from '../../utils/media.js';

export default function FollowerDashboard() {
  const [feed, setFeed] = useState([]);

  useEffect(() => {
    getFeed().then(setFeed);
  }, []);

  return (
    <AppLayout title="Feed">
      <div className="space-y-4">
        {feed.length === 0 && (
          <EmptyState
            title="Tu feed esta vacio"
            description="Busca creadores y dona flanes para desbloquear sus publicaciones."
          />
        )}
        {feed.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            {post.imagen && <img className="max-h-80 w-full object-cover" src={uploadUrl(post.imagen)} alt="" />}
            <div className="p-5">
              <Link to={`/seguidor/creadores/${post.creador?.id}`} className="font-semibold text-berry">
                {post.creador?.nombre}
              </Link>
              <p className="mt-3 whitespace-pre-wrap text-sm leading-6 text-stone-700">{post.texto}</p>
            </div>
          </Card>
        ))}
      </div>
    </AppLayout>
  );
}
