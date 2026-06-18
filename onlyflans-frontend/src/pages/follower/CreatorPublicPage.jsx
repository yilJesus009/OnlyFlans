import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import {
  addFavorite,
  createComment,
  donateFlans,
  getPublicCreatorProfile,
  getUnlockedPosts
} from '../../api/followerService.js';
import { uploadUrl } from '../../utils/media.js';

export default function CreatorPublicPage() {
  const { id } = useParams();
  const [creator, setCreator] = useState(null);
  const [posts, setPosts] = useState(null);
  const [lockedMessage, setLockedMessage] = useState('');
  const [message, setMessage] = useState('');
  const { register, handleSubmit, reset } = useForm({ defaultValues: { cantidad: 1 } });

  const loadProfile = async () => setCreator(await getPublicCreatorProfile(id));

  const loadPosts = async () => {
    try {
      setPosts(await getUnlockedPosts(id));
      setLockedMessage('');
    } catch (error) {
      setPosts(null);
      setLockedMessage(error.response?.data?.message || 'Contenido bloqueado');
    }
  };

  useEffect(() => {
    loadProfile();
    loadPosts();
  }, [id]);

  const onDonate = async (values) => {
    await donateFlans({ creadorId: Number(id), cantidad: Number(values.cantidad) });
    setMessage('Donacion registrada. Publicaciones desbloqueadas.');
    reset({ cantidad: 1 });
    loadPosts();
  };

  const onFavorite = async () => {
    await addFavorite(Number(id));
    setMessage('Creador agregado a favoritos.');
  };

  const onComment = async (postId, texto) => {
    await createComment({ postId, texto });
    setMessage('Comentario enviado.');
  };

  return (
    <AppLayout title={creator?.nombre || 'Perfil de creador'}>
      {message && <p className="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
      <Card className="overflow-hidden">
        <div className="h-44 bg-stone-200">
          {creator?.perfil?.banner && (
            <img className="h-full w-full object-cover" src={uploadUrl(creator.perfil.banner)} alt="" />
          )}
        </div>
        <div className="p-5">
          <h2 className="text-2xl font-black text-ink">{creator?.nombre}</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-stone-600">{creator?.perfil?.descripcion}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button variant="outline" onClick={onFavorite}>Agregar a favoritos</Button>
          </div>
        </div>
      </Card>

      <div className="mt-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-4">
          <Card className="p-5">
            <h3 className="font-bold text-ink">Enviar flanes</h3>
            <form className="mt-4 flex gap-3" onSubmit={handleSubmit(onDonate)}>
              <Input type="number" min="1" {...register('cantidad')} />
              <Button type="submit" variant="accent">Donar</Button>
            </form>
          </Card>
          <Card className="p-5">
            <h3 className="font-bold text-ink">Metas</h3>
            <div className="mt-3 space-y-3">
              {creator?.metas?.length === 0 && <p className="text-sm text-stone-500">Sin metas publicadas.</p>}
              {creator?.metas?.map((goal) => (
                <div key={goal.id} className="rounded-md bg-stone-50 p-3">
                  <p className="font-semibold text-ink">{goal.titulo}</p>
                  <p className="mt-1 text-sm text-stone-600">{goal.descripcion}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          {!posts && <EmptyState title="Posts bloqueados" description={lockedMessage} />}
          {posts?.length === 0 && <EmptyState title="Sin posts" description="Este creador aun no publico contenido." />}
          {posts?.map((post) => (
            <PostWithComment key={post.id} post={post} onComment={onComment} />
          ))}
        </div>
      </div>
    </AppLayout>
  );
}

function PostWithComment({ post, onComment }) {
  const [texto, setTexto] = useState('');

  const submit = async (event) => {
    event.preventDefault();
    if (!texto.trim()) return;
    await onComment(post.id, texto);
    setTexto('');
  };

  return (
    <Card className="overflow-hidden">
      {post.imagen && <img className="max-h-72 w-full object-cover" src={uploadUrl(post.imagen)} alt="" />}
      <div className="p-5">
        <p className="whitespace-pre-wrap text-sm leading-6 text-stone-700">{post.texto}</p>
        <form className="mt-4 space-y-2" onSubmit={submit}>
          <Textarea value={texto} onChange={(event) => setTexto(event.target.value)} placeholder="Deja un comentario privado" />
          <Button type="submit" variant="outline">Comentar</Button>
        </form>
      </div>
    </Card>
  );
}
