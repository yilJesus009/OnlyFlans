import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import EmptyState from '../../components/ui/EmptyState.jsx';
import Input from '../../components/ui/Input.jsx';
import { getDonationHistory } from '../../api/followerService.js';

export default function DonationHistoryPage() {
  const [history, setHistory] = useState([]);
  const [searched, setSearched] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    setHistory(await getDonationHistory(values));
    setSearched(true);
  };

  return (
    <AppLayout title="Historial de donaciones">
      <Card className="p-5">
        <form className="grid gap-3 md:grid-cols-[1fr_1fr_1fr_auto]" onSubmit={handleSubmit(onSubmit)}>
          <Input type="date" {...register('fechaInicio')} />
          <Input type="date" {...register('fechaFin')} />
          <Input placeholder="Nombre del creador" {...register('nombreCreador')} />
          <Button type="submit" variant="accent">Filtrar</Button>
        </form>
      </Card>

      <div className="mt-6">
        {searched && history.length === 0 && <EmptyState title="Sin donaciones" description="No hay resultados para esos filtros." />}
        {history.length > 0 && (
          <Card className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-100 text-stone-600">
                <tr>
                  <th className="px-4 py-3">Creador</th>
                  <th className="px-4 py-3">Flanes</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item) => (
                  <tr key={item.id} className="border-t border-stone-100">
                    <td className="px-4 py-3">{item.creador?.nombre}</td>
                    <td className="px-4 py-3">{item.cantidad}</td>
                    <td className="px-4 py-3">{new Date(item.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </AppLayout>
  );
}
