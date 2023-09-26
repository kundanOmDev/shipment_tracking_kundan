'use client'

import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import toast from "react-hot-toast";
import router from "next/router";
import useDeleteModal from "@/hooks/useDeleteModal";
import Alert from "./Alert";


// Define the type for the selectedShipment prop
interface DeleteModalProps {
  selectedShipments: number;
}

const DeleteModal:React.FC<DeleteModalProps> = ({selectedShipments}) => {    
    {selectedShipments}
    const deleteModal = useDeleteModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues:{
            shipment_id: '',
            
        }
    })

    const onChange = ( )=>{
      deleteModal.onClose();
        if(!open){
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (selectedShipments) =>{
      console.log("Data from table:", selectedShipments.shipment_id);

        console.log(selectedShipments);
        try{
            setIsLoading(true);
            const response = await fetch('/api/deleteshipment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(selectedShipments),
              });
              console.log(JSON.stringify(selectedShipments));
              toast.success('Data Saved successfully');
        
              if (response.ok) {
                console.log('Data Saved successfully');

                toast.success('Data Saved successfully');
                // reset();
                deleteModal.onClose();
                // Clear the form or redirect to a success page
                router.reload();
                
              } else {
                toast.error('Failed to register user');
              }
        }catch(err){
            toast.error("Something went wrong")
        }finally{
            setIsLoading(false);
        }
    }

    return ( 
        <Alert title='Are You sure? Want to delete'
        description=''
        isOpen ={ deleteModal.isOpen }
        onChange={onChange}
        >
          <div className="flex">
            <Button disabled={isLoading} onClick={handleSubmit(onSubmit)} className="bg-red-400">
                Yes
              </Button>
              <Button onClick={onChange}>
                No
              </Button  >
          </div>
          
        </Alert>
     );
}
 
export default DeleteModal;