import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import {
  createCreatorPost,
  deleteCreatorPost,
  getCreatorPosts,
  getPostComments
} from '../../api/creatorService.js';
import { uploadUrl } from '../../utils/media.js';

export default function CreatorPostsPage() {
   const [comments, setComments] = useState({});
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const loadPosts = async () => setPosts(await getCreatorPosts());

  useEffect(() => {
    loadPosts();
  }, []);

  const onSubmit = async (values) => {
    await createCreatorPost(values);
    reset();
    loadPosts();
  };

  const onDelete = async (id) => {
    await deleteCreatorPost(id);
    loadPosts();
  };

  const toggleComments = async (postId) => {
    if (comments[postId]) {
      setComments((current) => ({ ...current, [postId]: null }));
      return;
    }
    const data = await getPostComments(postId);
    setComments((current) => ({ ...current, [postId]: data }));
  };

  return (
    <AppLayout title="Mis publicaciones">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Texto</label>
              <Textarea placeholder="Escribe una publicacion para tus donadores" {...register('texto', { required: true })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Imagen opcional</label>
              <Input type="file" accept="image/*" {...register('imagen')} />
            </div>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              Publicar
            </Button>
          </form>
        </Card>

        <div className="space-y-4">
          {posts.length === 0 && <EmptyState title="Sin posts todavia" description="Crea tu primera publicacion." />}
          {posts.map((post) => (
            <Card key={post.id} className="overflow-hidden">
              {post.imagen && <img className="max-h-72 w-full object-cover" src={uploadUrl(post.imagen)} alt="" />}
              <div className="p-5">
                <p className="whitespace-pre-wrap text-sm leading-6 text-stone-700">{post.texto}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button variant="outline" onClick={() => toggleComments(post.id)}>
                    Comentarios
                  </Button>
                  <Button variant="danger" onClick={() => onDelete(post.id)}>
                    Eliminar
                  </Button>
                </div>
                {comments[post.id] && (
                  <div className="mt-4 space-y-2 rounded-md bg-stone-50 p-3">
                    {comments[post.id].length === 0 && <p className="text-sm text-stone-500">Sin comentarios.</p>}
                    {comments[post.id].map((comment) => (
                      <div key={comment.id} className="text-sm">
                        <p className="font-semibold text-ink">{comment.seguidor?.nombre}</p>
                        <p className="text-stone-600">{comment.texto}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
