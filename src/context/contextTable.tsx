import { createContext, useContext, useState, useEffect } from "react";
import { InvoicesHeaders, InvoicesProps, headers, invoices } from "./data/table.data";
import { wait } from "@/lib/utils";

interface TableContextType {
  tableHeader: InvoicesHeaders;
  data: InvoicesProps[];
  setTableHeader: (headers: InvoicesHeaders) => void;
  addInvoiceTable: (invoice: InvoicesProps) => Promise<void>;
  updateInvoiceTable: (updatedInvoice: InvoicesProps) => Promise<void>;
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
  const [data, setData] = useState<InvoicesProps[]>(invoices);
  const [tableHeader, setTableHeader] = useState<InvoicesHeaders>(headers);

  const addInvoice =async (invoice: InvoicesProps): Promise<void> => {
     await wait(1000)
    setData((prevData) => [...prevData, invoice]);
    return Promise.resolve();
  };

  const updateInvoice = async (updatedInvoice: InvoicesProps): Promise<void> => {
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
    <TableContext.Provider value={{ data, addInvoiceTable: addInvoice, updateInvoiceTable: updateInvoice, deleteInvoiceTable: deleteInvoice, tableHeader, setTableHeader }}>
      {children}
    </TableContext.Provider>
  );
};