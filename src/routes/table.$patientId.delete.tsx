import { useTableContext } from "@/context/contextTable";
import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";

export const Route = createFileRoute("/table/$patientId/delete")({
	component: () => (
      <TableIdDelete />
	),
});
const TableIdDelete = () => {
  const { patientId } = Route.useParams();
  const { deleteInvoiceTable: deleteInvoice } = useTableContext();
  const [result, setResult] = useState<JSX.Element | null>(null);

  useEffect(() => {
    const deletePatient = async () => {
      try {
        await deleteInvoice(patientId);
        setResult(<div className="text-green-500"> Excluido com sucesso</div>);
      } catch (e) {
        setResult(<div className="text-red-500"> Falha ao tenter excluir</div>);
      }
    };
    deletePatient();
  }, [patientId]);

  return <Suspense fallback={<div>Carregando...</div>}>{result}</Suspense>;
}