import { CrudTable } from "@/pages/Table";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/table")({
	component: () => (
		<>
			<CrudTable />

			<Outlet></Outlet>
		</>
	),
});
