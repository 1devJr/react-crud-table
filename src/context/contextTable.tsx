import React, { createContext, useContext, useState } from "react";
import { headers, invoices, InvoicesHeaders, InvoicesProps } from "./data/table.data";

interface TableContextType {
  tableHeader: InvoicesHeaders;
  data:InvoicesProps[]; // Replace with your actual data type
  addInvoice: (invoice:InvoicesProps) => void;
  setTableHeader: (headers:InvoicesHeaders) => void;
  updateInvoice: (updatedInvoice:InvoicesProps) => void;
  deleteInvoice: (id: string) => void;
}

const TableContext = createContext<TableContextType | undefined>(undefined);

export const useTableContext = () => {
  const context = useContext(TableContext);
  if (!context) {
    throw new Error("useTableContext must be used within a TableProvider");
  }
  return context;
};

export const TableProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<InvoicesProps[]>(invoices);
  const [tableHeader,setTableHeader] = useState<InvoicesHeaders>(headers)
  const addInvoice = (invoice: InvoicesProps) => {
    setData((prevData) => [...prevData, invoice]);
  };

  const updateInvoice = (updatedInvoice: InvoicesProps) => {
    setData((prevData) =>
      prevData.map((invoice) => (invoice.id === updatedInvoice.id ? updatedInvoice : invoice))
    );
  };

  const deleteInvoice = (id: string) => {
    setData((prevData) => prevData.filter((invoice) => invoice.id !== id));
  };

  return (
    <TableContext.Provider value={{ data, addInvoice, updateInvoice, deleteInvoice,tableHeader,setTableHeader }}>
      {children}
    </TableContext.Provider>
  );
};

// Define your Invoice type here or import it if it's defined elsewhere
