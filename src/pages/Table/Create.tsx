import { FunctionComponent } from "../../common/types";
import * as uuid from 'uuid';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"

import { useTheme } from "@/components/theme-provider"


import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableRow,
} from "@/components/ui/table"
import { useTableContext } from "@/context/contextTable";


export const Create = (): FunctionComponent => {
    return (<>
        <div className="fixed right-2 top-2">
            <ModeToggle></ModeToggle>
        </div>
        <div className="bg-white dark:bg-black font-bold w-screen h-screen flex flex-col justify-center items-center">
            <TablePatient></TablePatient>
        </div>
    </>
    );
};




export function TablePatient() {
    const {data,tableHeader,addInvoice,deleteInvoice } =useTableContext();
    const HEADER = tableHeader;

    const addPatient = () => {
        addInvoice({
            id: uuid.v4(),
            invoice: "INV-0001",
            patient: "John Doe",
            totalAmount: "$100.00",
            status: "Completed"
        })
    }

    const removePatient = (id:string) => {
        deleteInvoice(id)
    }
    return (
        <>
            <Button onClick={() => addPatient()}>Add Patient</Button>
            <Table >
                <TableCaption className="flex text-center justify-center w-full">A list of patient psicology clinical.</TableCaption>
                <TableBody>
                    <TableRow className="sm:flex hidden">
                        <TableHead >{HEADER.id}</TableHead>
                        <TableHead>{HEADER.patient}</TableHead>
                        <TableHead>{HEADER.status}</TableHead>
                        <TableHead className="text-right">{HEADER.totalAmount}</TableHead>
                        <TableHead className="text-right">{HEADER.action}</TableHead>
                    </TableRow>
                    {data.map((content) => (
                        <TableRow key={content.invoice}>
                            <TableHead className=" flex sm:hidden"> {HEADER.id}</TableHead>
                            <TableCell className="font-medium">{content.invoice}</TableCell>
                            <TableHead className=" flex sm:hidden"> {HEADER.patient}</TableHead>
                            <TableCell>{content.patient}</TableCell>
                            <TableHead className=" flex sm:hidden"> {HEADER.status}</TableHead>
                            <TableCell>{content.status}</TableCell>
                            <TableHead className=" flex sm:hidden"> {HEADER.totalAmount}</TableHead>
                            <TableCell className="text-right">{content.totalAmount}</TableCell>
                            <TableHead className=" flex sm:hidden"> {HEADER.action}</TableHead>
                            <TableCell className="text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger>...</DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                        <DropdownMenuItem>Details</DropdownMenuItem>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => removePatient(content.id)}>Delete</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell >Total</TableCell>
                        <TableCell className="text-right">$2,500.00</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        </>
    )
}



export function ModeToggle() {
    const { setTheme } = useTheme()

    const changeTheme = (mode: "moon" | "sun") => {
        if (mode === "moon") {
            setTheme('dark')
        }
        else {
            setTheme('light')
        }
    }

    return (
        <>
                <Button  onClick={()=>changeTheme('sun')} variant="outline" className=" hidden dark:flex  dark:text-white" size="icon">
                    <Sun  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-1" />
                </Button>
                <Button  onClick={()=>changeTheme('moon')} variant="outline" className=" dark:hidden flex dark:text-white" size="icon">
                    <Moon  className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                </Button>
        </>
    )
}
