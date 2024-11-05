import { EditHandle, FormEdit } from '@/components/forms/form';
import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef } from 'react';

export const Route = createFileRoute('/table/$patientId/edit')({
  component: () => <TableIdEdit/>
})

const TableIdEdit = () => {
	const { patientId } = Route.useParams();
    const editRef= useRef<EditHandle>(null)
    useEffect(() => {
            editRef.current?.open(patientId, true);
        
    },[patientId])
	

	return <FormEdit ref={editRef} ></FormEdit>;
};
