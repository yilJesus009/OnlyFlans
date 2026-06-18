import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import Textarea from '../../components/ui/Textarea.jsx';
import { createCreatorGoal, deleteCreatorGoal, getCreatorGoals } from '../../api/creatorService.js';

export default function CreatorGoalsPage() {
  const [goals, setGoals] = useState([]);
  const { register, handleSubmit, reset } = useForm();

  const loadGoals = async () => setGoals(await getCreatorGoals());

  useEffect(() => {
    loadGoals();
  }, []);

  const onSubmit = async (values) => {
    await createCreatorGoal(values);
    reset();
    loadGoals();
  };

  const onDelete = async (id) => {
    await deleteCreatorGoal(id);
    loadGoals();
  };

  return (
    <AppLayout title="Metas de apoyo">
      <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <Card className="p-5">
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Titulo</label>
              <Input {...register('titulo', { required: true })} />
            </div>
            <div>
              <label className="mb-1 block text-sm font-medium text-stone-700">Descripcion</label>
              <Textarea {...register('descripcion')} />
            </div>
            <Button type="submit" variant="accent">
              Crear meta
            </Button>
          </form>
        </Card>
        <div className="space-y-3">
          {goals.length === 0 && <EmptyState title="No hay metas" description="Agrega una meta para motivar apoyo." />}
          {goals.map((goal) => (
            <Card key={goal.id} className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="font-bold text-ink">{goal.titulo}</h2>
                  <p className="mt-1 text-sm leading-6 text-stone-600">{goal.descripcion}</p>
                </div>
                <Button variant="danger" onClick={() => onDelete(goal.id)}>
                  Eliminar
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
