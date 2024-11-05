import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { InvoicesHeaders, Invoices, headers, invoices } from "./data/table.data";
import { wait } from "@/lib/utils";

interface TableContextType {
  tableHeader: InvoicesHeaders;
  data: Invoices[];
  isOpen: boolean;
  showModal : (show: boolean) => void;
  setTableHeader: (headers: InvoicesHeaders) => void;
  addInvoiceTable: (invoice: Invoices) => Promise<void>;
  findInvoiceTable: ( id: string) => Promise<Invoices | undefined>;
  updateInvoiceTable: (updatedInvoice: Invoices) => Promise<void>;
  deleteInvoiceTable:  (id: string) => Promise<void>;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = (): TableContextType => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<Invoices[]>(invoices);
  const [isOpen, setIsOpen] = useState(false);
  const [tableHeader, setTableHeader] = useState<InvoicesHeaders>(headers);
  
  const addInvoice =async (invoice: Invoices): Promise<void> => {
    await wait(1000)
    setData((prevData) => [...prevData, invoice]);
    return Promise.resolve();
  };
  
  
  
  const showModal= ( show: boolean) =>{
    setIsOpen(show);
  }
   const findInvoiceTable = async (id:string ): Promise<Invoices | undefined> => {
    debugger
    const data = invoices.find((invoice) => invoice.id === id) || undefined;
    return Promise.resolve(data);
  }
  
  const updateInvoice = async (updatedInvoice: Invoices): Promise<void> => {
     await wait(1000)
    setData((prevData) =>
      prevData.map((invoice) => (invoice.id === updatedInvoice.id ? updatedInvoice : invoice))
    );
    return Promise.resolve();
  };

  const deleteInvoice = async (id: string): Promise<void> => {
     await wait(1000)
    setData((prevData) => prevData.filter((invoice) => invoice.id !== id));
    return Promise.resolve();
  };

  useEffect(() => {
    console.log("Updated invoices data:", data);
  }, [data]);

  return (
    <TableContext.Provider value={{ data,isOpen,showModal, addInvoiceTable: addInvoice,findInvoiceTable: findInvoiceTable, updateInvoiceTable: updateInvoice, deleteInvoiceTable: deleteInvoice, tableHeader, setTableHeader }}>
      {children}
    </TableContext.Provider>
  );
};