import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { useTableContext } from "@/context/contextTable";
import { wait } from "@/lib/utils";
import { createFileRoute } from "@tanstack/react-router";
import { Terminal } from "lucide-react";
import { Suspense, useEffect, useState } from "react";

export const Route = createFileRoute("/table/$patientId/delete")({
	component: () => <TableIdDelete />,
});
const TableIdDelete = () => {
	const { patientId } = Route.useParams();
	const { deleteInvoiceTable: deleteInvoice } = useTableContext();
	const [result, setResult] = useState<JSX.Element | null>(null);

	useEffect(() => {
		const deletePatient = async () => {
			try {
				await deleteInvoice(patientId);
				setResult(
					<>
						<div className="fixed top-5 right-5 w-vw h-vh z-50">
							<Alert className="bg-green-100">
								<Terminal className="h-4 w-4 " />
								<AlertTitle>Success!</AlertTitle>
								<AlertDescription>
									has been deleted sucessfully.
								</AlertDescription>
							</Alert>
						</div>
					</>
				);
			} catch (e) {
				setResult(
					<Alert variant={"destructive"}>
						<Terminal className="h-4 w-4 " />
						<AlertTitle>Failed!</AlertTitle>
						<AlertDescription>
							There was a problem trying to delete.
						</AlertDescription>
					</Alert>
				);
			} finally {
				wait(2000).then(() => setResult(null));
			}
		};
		deletePatient();
	}, [patientId]);

	return <Suspense fallback={<div>Carregando...</div>}>{result}</Suspense>;
};
