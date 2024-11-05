import { AddHandle, FormAdd } from '@/components/forms/form'
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/table/add')({
  component: () => <TableAdd></TableAdd>
})

const TableAdd = () => {
    const add= useRef<AddHandle>(null)

    useEffect(() => {
            add.current?.open(true);
    },[])
	

	return <FormAdd ref={add} ></FormAdd>;
};
