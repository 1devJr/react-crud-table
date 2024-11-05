// Import the v4 function to generate random UUIDs
import * as uuid from 'uuid';

// Generate a UUID

export type Invoices = {
    id:string,
    patient: string,
    totalAmount: string,
    status: string,
};
export type InvoicesHeaders = Invoices
    &
{ id: string, action: string };


export const headers: InvoicesHeaders = {
    id: "Id",
    patient: "Patient",
    totalAmount: "Amount",
    status: "Status",
    action: "Action",
}


export const invoices: Array<Invoices> = [
    {
        id: uuid.v4(),
        patient: "João",
        totalAmount: "$250.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        patient: "Alfredo",
        totalAmount: "$150.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        patient: "Lucia",
        totalAmount: "$350.00",
        status: "Paid",
    },
    {
        id: uuid.v4(),
        patient: "Paulo",
        totalAmount: "$450.00",
        status: "Pending",
    },
    {
        id: uuid.v4(),
        patient: "José Maria",
        totalAmount: "$550.00",
        status: "Refuse",
    },
    {
        id: uuid.v4(),
        patient: "Pedroso",
        totalAmount: "$200.00",
        status: "Paid",
    },
    {
        id: uuid.v4(),
        patient: "Ernesto",
        totalAmount: "$300.00",
        status: "Refuse",
    },
]