import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogOverlay, DialogPortal, DialogTitle } from "@/components/ui/dialog";
import { CrudTable } from "@/pages/Table";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Suspense } from "react";

export const Route = createFileRoute("/table")({
	component: () => (
		<>
			<CrudTable />
		</>
	),
});
