import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import Input from '../../components/ui/Input.jsx';
import { getCreatorProfile, updateCreatorProfile } from '../../api/creatorService.js';
import { uploadUrl } from '../../utils/media.js';

export default function CreatorProfilePage() {
  const [profile, setProfile] = useState(null);
  const [message, setMessage] = useState('');
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  useEffect(() => {
    getCreatorProfile().then((data) => {
      if (!data?.message) {
        setProfile(data);
        reset({ descripcion: data.descripcion || '' });
      }
    });
  }, [reset]);

  const onSubmit = async (values) => {
    const updated = await updateCreatorProfile(values);
    setProfile(updated);
    setMessage('Perfil actualizado');
  };

  return (
    <AppLayout title="Perfil publico">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <Card className="p-5">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {message && <p className="rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">{message}</p>}
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Descripcion</label>
              <Textarea placeholder="Cuenta que haces y por que te pueden apoyar" {...register('descripcion')} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Foto de perfil</label>
              <Input type="file" accept="image/*" {...register('fotoPerfil')} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Banner</label>
              <Input type="file" accept="image/*" {...register('banner')} />
            </div>
            <Button type="submit" variant="accent" disabled={isSubmitting}>
              Guardar perfil
            </Button>
          </form>
        </Card>

        <Card className="overflow-hidden">
          <div className="h-36 bg-stone-200">
            {profile?.banner && (
              <img className="h-full w-full object-cover" src={uploadUrl(profile.banner)} alt="Banner" />
            )}
          </div>
          <div className="p-5">
            <div className="-mt-14 h-20 w-20 overflow-hidden rounded-lg border-4 border-white bg-flan">
              {profile?.fotoPerfil && (
                <img className="h-full w-full object-cover" src={uploadUrl(profile.fotoPerfil)} alt="Perfil" />
              )}
            </div>
            <h2 className="mt-4 text-xl font-bold text-ink">{profile?.usuario?.nombre || 'Tu nombre'}</h2>
            <p className="mt-2 text-sm leading-6 text-stone-600">
              {profile?.descripcion || 'Tu descripcion aparecera aqui.'}
            </p>
          </div>
        </Card>
      </div>
    </AppLayout>
  );
}
