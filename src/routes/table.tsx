import { CrudTable } from "@/pages/Table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/table")({
	component: () => (
		<>
			<CrudTable />
		</>
	),
});
