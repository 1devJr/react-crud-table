import { Invoices } from "@/context/data/table.data";
import { CurrencyInput, Input } from "./input";
import { FormEvent, useEffect, useState } from "react";
import { useTableContext } from "@/context/contextTable";
import React, { forwardRef, useImperativeHandle } from "react";
import {
	Dialog,
	DialogContent,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogOverlay,
} from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter, DialogPortal } from "../ui/dialog";
import { Label } from "../ui/label";
import { useMatch, useNavigate } from "@tanstack/react-router";
export type EditHandle = {
	open: (id: string, show: boolean) => void;
};

export const FormEdit = forwardRef<EditHandle, React.PropsWithChildren<{}>>(
	(props, ref) => {
		const navigation = useNavigate();
		const match = useMatch({ from: `/table/$patientId/edit` });
		const [open, setOpen] = useState(false);
		const { findInvoiceTable, updateInvoiceTable } = useTableContext();
		const [data, setData] = useState<Invoices>();

		useImperativeHandle(ref, () => ({
			async open(id: string, show: boolean) {
				const result = await findInvoiceTable(id);
				setOpen(show);
				if (result) {
					setData(result);
					console.debug(result);
				}
			},
		}));

		const edit = async (data: FormEvent<HTMLFormElement>) => {
			data.preventDefault();
			const formData = new FormData(data.currentTarget);

			const result = ["id", "name", "status", "amount"].map((key) => {
				return formData.get(key).toString() || ""; // retorne uma string vazia se formData.get(key) for nulo ou indefinido
			});

			await updateInvoiceTable({
				id: result[0],
				patient: result[1],
				status: result[2],
				totalAmount: result[3],
			});
		};
		useEffect(() => {
			if (match) {
				const id = match.params.patientId;
				findInvoiceTable(id);
			}
		});

		return (
			<>
				<div className=" pointer-events-none z-50 max-w-96 max-h-96  mx-auto pt-9 w-full h-full">
					<div className="w-full h-full opacity-90 bg-black"> </div>
					<Dialog open={open}>
						<DialogContent className="dark:bg-slate-50 min-w-96 min-h-96">
							<form className="space-y-4" onSubmit={(data) => edit(data)}>
								<DialogHeader>
									<DialogTitle>Edit Form</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									<Input
										
										type="hidden"
										name="id"
										defaultValue={data?.id}
									></Input>
									<Label htmlFor="name">Nome:</Label>
									<Input
										id="name"
										name="name"
										placeholder="John Doe"
										defaultValue={data?.patient}
										className="w-full"
									/>
									<Label htmlFor="name">Status:</Label>
									<Input
										id="status"
										name="status"
										placeholder="Pending"
										defaultValue={data?.status}
										className="w-full"
									/>
									<Label htmlFor="amount">Amount:</Label>
									<CurrencyInput
										id="amount"
										name="amount"
										placeholder="$250.00"
										defaultValue={data?.totalAmount}
										value={data?.totalAmount}	
										className="w-full" onValueChange={function (value: string): void {
											setData({ ...data, totalAmount: value });
										} }									/>
								</DialogDescription>

								<DialogFooter>
									<DialogClose asChild>
										<Button
											variant={"outline"}
											onClick={() => navigation({ to: "/table" })}
										>
											{" "}
											Cancelar
										</Button>
									</DialogClose>

									<Button type="submit">Salvar </Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</>
		);
	}
);
