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
} from "@radix-ui/react-dialog";
import { Button } from "../ui/button";
import { DialogHeader, DialogFooter } from "../ui/dialog";
import { Label } from "../ui/label";
import { useMatch, useNavigate } from "@tanstack/react-router";
export type EditHandle = {
	open: (id: string, show: boolean) => void;
};
import * as uuid from "uuid";
export type AddHandle = {
	open: (show: boolean) => void;
};

export const FormEdit = forwardRef<EditHandle, React.PropsWithChildren<{}>>(
	(_props, ref) => {
		const navigation = useNavigate();
		const match = useMatch({ from: `/table/$patientId/edit` });
		const [open, setOpen] = useState(false);
		const [loading, setLoading] = useState(false);
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
			setLoading(true);
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
			}).finally(() => {
				setLoading(false);
				navigation({ to: "/table" });
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
				<div className="w-full fixed  h-lvh opacity-90 z-20 bg-black"> </div>
				<div className="  pointer-events-none flex-justify-center align-middle  z-20 max-w-96 max-h-96  mx-auto pt-9 w-full h-full">
					<Dialog open={open}>
						<DialogContent className="dark:bg-white rounded-md z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-56 p-5 bg-white ">
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
									<Label htmlFor="name">Name:</Label>
									<Input
										id="name"
										required
										name="name"
										placeholder="John Doe"
										defaultValue={data?.patient}
										className="w-full"
									/>
									<Label htmlFor="name">Status:</Label>
									<Input
										id="status"
										name="status"
										required
										placeholder="Pending"
										defaultValue={data?.status}
										className="w-full"
									/>
									<Label htmlFor="amount">Amount:</Label>
									<CurrencyInput
										id="amount"
										name="amount"
										required
										placeholder="$250.00"
										defaultValue={data?.totalAmount}
										value={data?.totalAmount}
										className="w-full"
										onValueChange={function (value: string): void {
											setData({ ...data, totalAmount: value });
										}}
									/>
								</DialogDescription>

								<DialogFooter>
									<DialogClose asChild>
										<Button
											variant={"outline"}
											onClick={() => navigation({ to: "/table" })}
										>
											{" "}
											Close
										</Button>
									</DialogClose>

									<Button disabled={loading} type="submit">
										Save{" "}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</>
		);
	}
);

export const FormAdd = forwardRef<AddHandle, React.PropsWithChildren<{}>>(
	(_props, ref) => {
		const [loading, setLoading] = useState(false);
		const [open, setOpen] = useState(false);
		const navigation = useNavigate();
		const { addInvoiceTable } = useTableContext();
		const [data, setData] = useState<Invoices>();

		useImperativeHandle(ref, () => ({
			async open(show: boolean) {
				setOpen(show);
			},
		}));

		const add = async (data: FormEvent<HTMLFormElement>) => {
			setLoading(true);
			data.preventDefault();
			const formData = new FormData(data.currentTarget);

			const result = ["name", "status", "amount"].map((key) => {
				return formData.get(key).toString() || ""; // retorne uma string vazia se formData.get(key) for nulo ou indefinido
			});

			await addInvoiceTable({
				id: uuid.v4(),
				patient: result[0],
				status: result[1],
				totalAmount: result[2],
			}).finally(() => {
				setLoading(false);
				navigation({ to: "/table" });
			});
		};

		return (
			<>
				<div className="w-full fixed h-lvh opacity-90 z-20 bg-black"> </div>
				<div className="  pointer-events-none flex-justify-center align-middle  z-20 max-w-96 max-h-96  mx-auto pt-9 w-full h-full">
					<Dialog open={open}>
						<DialogContent className="dark:bg-white rounded-md p-5 z-30 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 min-w-56 p-5 bg-white ">
							<form className="space-y-4" onSubmit={(data) => add(data)}>
								<DialogHeader>
									<DialogTitle>Add Form</DialogTitle>
								</DialogHeader>
								<DialogDescription>
									<Label htmlFor="name">Name:</Label>
									<Input
										id="name"
										name="name"
										required
										placeholder="John Doe"
										defaultValue={data?.patient}
										className="w-full"
									/>
									<Label htmlFor="name">Status:</Label>
									<Input
										id="status"
										name="status"
										required
										placeholder="Pending"
										defaultValue={data?.status}
										className="w-full"
									/>
									<Label htmlFor="amount">Amount:</Label>
									<CurrencyInput
										id="amount"
										name="amount"
										required
										placeholder="$250.00"
										defaultValue={data?.totalAmount}
										value={data?.totalAmount}
										className="w-full"
										onValueChange={function (value: string): void {
											setData({ ...data, totalAmount: value });
										}}
									/>
								</DialogDescription>

								<DialogFooter>
									<DialogClose asChild>
										<Button
											className="dark:text-white"
											variant={"outline"}
											onClick={() => navigation({ to: "/table" })}
										>
											{" "}
											Close
										</Button>
									</DialogClose>
									<Button disabled={loading} type="submit">
										Save{" "}
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>
			</>
		);
	}
);
