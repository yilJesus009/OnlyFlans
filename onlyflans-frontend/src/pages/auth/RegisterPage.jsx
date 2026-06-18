import { Link, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { UserPlus } from 'lucide-react';
import { useState } from 'react';
import AuthShell from './AuthShell.jsx';
import Input from '../../components/ui/Input.jsx';
import Button from '../../components/ui/Button.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

const schema = yup.object({
  nombre: yup.string().required('El nombre es requerido'),
  email: yup.string().email('Ingresa un email valido').required('El email es requerido'),
  password: yup.string().min(6, 'Minimo 6 caracteres').required('La contrasena es requerida'),
  role: yup.string().oneOf(['creator', 'follower']).required('Selecciona un rol')
});

export default function RegisterPage() {
  const { register: createAccount } = useAuth();
  const navigate = useNavigate();
  const [serverError, setServerError] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { role: 'follower' }
  });

  const onSubmit = async (values) => {
    setServerError('');
    try {
      const usuario = await createAccount(values);
      navigate(usuario.role === 'creator' ? '/creador' : '/seguidor');
    } catch (error) {
      setServerError(error.response?.data?.message || 'No se pudo registrar la cuenta');
    }
  };

  return (
    <AuthShell title="Crear cuenta" subtitle="Elige tu rol inicial. El backend espera creator o follower.">
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
        {serverError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {serverError}
          </div>
        )}
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="nombre">
            Nombre
          </label>
          <Input id="nombre" autoComplete="name" {...register('nombre')} />
          {errors.nombre && <span className="field-error">{errors.nombre.message}</span>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="email">
            Email
          </label>
          <Input id="email" type="email" autoComplete="email" {...register('email')} />
          {errors.email && <span className="field-error">{errors.email.message}</span>}
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium text-stone-700" htmlFor="password">
            Contrasena
          </label>
          <Input id="password" type="password" autoComplete="new-password" {...register('password')} />
          {errors.password && <span className="field-error">{errors.password.message}</span>}
        </div>
        
        <Button type="submit" variant="accent" className="w-full" disabled={isSubmitting}>
          <UserPlus size={18} />
          Registrarme
        </Button>
      </form>
      <p className="mt-5 text-center text-sm text-stone-600">
        Ya tienes cuenta?{' '}
        <Link className="font-semibold text-ink underline" to="/login">
          Inicia sesion
        </Link>
      </p>
    </AuthShell>
  );
}
