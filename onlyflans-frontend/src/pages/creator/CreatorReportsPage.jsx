import { useState } from 'react';
import { useForm } from 'react-hook-form';
import AppLayout from '../../components/layout/AppLayout.jsx';
import Button from '../../components/ui/Button.jsx';
import Card from '../../components/ui/Card.jsx';
import Input from '../../components/ui/Input.jsx';
import { getIncomeReport } from '../../api/creatorService.js';

export default function CreatorReportsPage() {
  const [report, setReport] = useState(null);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (values) => {
    setReport(await getIncomeReport(values));
  };

  return (
    <AppLayout title="Reporte de ingresos">
      <Card className="p-5">
        <form className="grid gap-4 md:grid-cols-[1fr_1fr_auto]" onSubmit={handleSubmit(onSubmit)}>
          <Input type="date" {...register('fechaInicio')} />
          <Input type="date" {...register('fechaFin')} />
          <Button type="submit" variant="accent">Filtrar</Button>
        </form>
      </Card>

      {report && (
        <div className="mt-6 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="p-5">
              <p className="text-sm text-stone-500">Total de flanes</p>
              <p className="mt-2 text-4xl font-black text-ink">{report.totalFlanes}</p>
            </Card>
            <Card className="p-5">
              <p className="text-sm text-stone-500">Donaciones</p>
              <p className="mt-2 text-4xl font-black text-ink">{report.cantidadDonaciones}</p>
            </Card>
          </div>
          <Card className="overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-stone-100 text-stone-600">
                <tr>
                  <th className="px-4 py-3">Seguidor</th>
                  <th className="px-4 py-3">Cantidad</th>
                  <th className="px-4 py-3">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {report.historial.map((item) => (
                  <tr key={item.id} className="border-t border-stone-100">
                    <td className="px-4 py-3">{item.seguidorNombre}</td>
                    <td className="px-4 py-3">{item.cantidad}</td>
                    <td className="px-4 py-3">{new Date(item.fecha).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>
      )}
    </AppLayout>
  );
}
