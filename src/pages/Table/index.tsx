import type { FunctionComponent } from "../../common/types";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";

import { useTheme } from "@/components/theme-provider";

import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableRow,
} from "@/components/ui/table";
import { useTableContext } from "@/context/contextTable";
import { Outlet, useNavigate } from "@tanstack/react-router";

export function TablePatient(): JSX.Element {
	const navigate = useNavigate({ from: "/table/$patientId/delete" });

	const { data, tableHeader } = useTableContext();

	const HEADER = tableHeader;

	const editPatient = (id: string): void => {
		navigate({ to: "/table/$patientId/edit", params: { patientId: id } });
	};

	const removePatient = (patientId: string): void => {
		navigate({ to: "/table/$patientId/delete", params: { patientId } });
	};

	const addPatient = () => {
		navigate({ to: "/table/add", params: {} });
	};

	return (
		<>
			<div>
				<div className="flex justify-center align-middle w-full h-full p-5">
					<Button
						onClick={() => {
							addPatient();
						}}
					>
						Add Patient
					</Button>
				</div>
				<Table>
					<TableCaption className="flex text-center justify-center w-full">
						A list of patient psicology clinical.
					</TableCaption>
					<TableBody>
						<TableRow className="sm:flex hidden">
							<TableHead>{HEADER.id}</TableHead>
							<TableHead>{HEADER.patient}</TableHead>
							<TableHead>{HEADER.status}</TableHead>
							<TableHead className="text-right">{HEADER.totalAmount}</TableHead>
							<TableHead className="text-right">{HEADER.action}</TableHead>
						</TableRow>
						{data.map((content) => (
							<TableRow key={content.id}>
								<TableHead className=" flex sm:hidden"> {HEADER.id}</TableHead>
								<TableCell className="font-medium">{content.id}</TableCell>
								<TableHead className=" flex sm:hidden">
									{" "}
									{HEADER.patient}
								</TableHead>
								<TableCell>{content.patient}</TableCell>
								<TableHead className=" flex sm:hidden">
									{" "}
									{HEADER.status}
								</TableHead>
								<TableCell>{content.status}</TableCell>
								<TableHead className=" flex sm:hidden">
									{" "}
									{HEADER.totalAmount}
								</TableHead>
								<TableCell className="text-right">
									{content.totalAmount}
								</TableCell>
								<TableHead className=" flex sm:hidden">
									{" "}
									{HEADER.action}
								</TableHead>
								<TableCell className="text-right">
									<DropdownMenu>
										<DropdownMenuTrigger>...</DropdownMenuTrigger>
										<DropdownMenuContent>
											<DropdownMenuLabel>Actions</DropdownMenuLabel>

											<DropdownMenuItem
												onClick={() => {
													editPatient(content.id);
												}}
											>
												Edit
											</DropdownMenuItem>
											<DropdownMenuItem
												onClick={() => {
													removePatient(content.id);
												}}
											>
												Delete
											</DropdownMenuItem>
										</DropdownMenuContent>
									</DropdownMenu>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</>
	);
}

export function ModeToggle(): JSX.Element {
	const { setTheme } = useTheme();

	const changeTheme = (mode: "moon" | "sun"): void => {
		if (mode === "moon") {
			setTheme("dark");
		} else {
			setTheme("light");
		}
	};

	return (
		<>
			<Button
				className=" hidden dark:flex  dark:text-white"
				size="icon"
				variant="outline"
				onClick={() => {
					changeTheme("sun");
				}}
			>
				<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-1" />
			</Button>
			<Button
				className=" dark:hidden flex dark:text-white"
				size="icon"
				variant="outline"
				onClick={() => {
					changeTheme("moon");
				}}
			>
				<Moon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			</Button>
		</>
	);
}

export const CrudTable = (): FunctionComponent => {
	return (
		<>
			<div className="w-full h-lvh dark:bg-zinc-950 bg-white">
				<Outlet />
				<div className="fixed right-2 top-2">
					<ModeToggle></ModeToggle>
				</div>
				<div className="p-6 max-w-4xl mx-auto">
					<div className="border rounded">
						<TablePatient></TablePatient>
					</div>
				</div>
				<div />
			</div>
		</>
	);
};
