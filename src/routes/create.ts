import { createFileRoute } from "@tanstack/react-router";
import { Create } from "../pages/Table/Create";

export const Route = createFileRoute("/create")({
	component: Create,
});

