// Import the v4 function to generate random UUIDs
import * as uuid from 'uuid';

// Generate a UUID

export type InvoicesProps = {
    id:string,
    invoice: string,
    patient: string,
    totalAmount: string,
    status: string,
};
export type InvoicesHeaders = InvoicesProps
    &
{ id: string, action: string };


export const headers: InvoicesHeaders = {
    id: "Id",
    invoice: "Invoices",
    patient: "Patient",
    totalAmount: "Amount",
    status: "Status",
    action: "Action",
}


export const invoices: Array<InvoicesProps> = [
    {
        id: uuid.v4(),
        invoice: "INV001",
        patient: "João",
        totalAmount: "$250.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        invoice: "INV002",
        patient: "Alfredo",
        totalAmount: "$150.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        invoice: "INV003",
        patient: "Lucia",
        totalAmount: "$350.00",
        status: "Paid",
    },
    {
        id: uuid.v4(),
        invoice: "INV004",
        patient: "Paulo",
        totalAmount: "$450.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        invoice: "INV005",
        patient: "José Maria",
        totalAmount: "$550.00",
        status: "Refuse",
    },
    {
        id: uuid.v4(),
        invoice: "INV006",
        patient: "Pedroso",
        totalAmount: "$200.00",
        status: "Paid",
    },
    {
        id: uuid.v4(),
        invoice: "INV007",
        patient: "Ernesto",
        totalAmount: "$300.00",
        status: "Refuse",
    },
]