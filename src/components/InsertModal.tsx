'use client'

import useInsertModal from "@/hooks/useInsertModal";
import Modal from "./Modal";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import toast from "react-hot-toast";
import router from "next/router";

const InsertModal = () => {
    const [getuser, setGetUser] = useState(false);

    useEffect(() => {
        // Check if the code is running in the browser
        if (typeof window !== "undefined") {
          const sessionData = sessionStorage.getItem("userdetail");
          if (sessionData) {
            const parsedData = JSON.parse(sessionStorage.userdetail);
            // Parse the session data as JSON and set it in the state
            setGetUser(parsedData.data);
          }
        }
      }, []);

       
        // Now you can use the `userdata` object
      
    // let userdata = JSON.parse(sessionStorage.userdetail);
    console.log(getuser);
    
    // const {isOpen, onClose} = useInsertModal();
    const uploadModal = useInsertModal();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm<FieldValues>({
        defaultValues:{
            customer_name: '',
            destination_address: '',
            shipment_status: 'In Transit',
            plan_delivery_date: '',
            actual_delivery_date: null,
            entered_by: getuser
        }
    })

    const onChange = ( open: boolean)=>{
        if(!open){
            uploadModal.onClose();
        }
    }

    const onSubmit: SubmitHandler<FieldValues> = async (values) =>{
        console.log(values);
        try{
            setIsLoading(true);
            const response = await fetch('/api/shipment', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
              });
              console.log(JSON.stringify(values));
        
              if (response.ok) {
                console.log('Data Saved successfully');
                reset();
                
                // toast.success('Data Saved successfully');
                // Clear the form or redirect to a success page
                
                uploadModal.onClose();
                router.reload();
              } else {
                console.log('Failed to register user');
              }
        }catch(err){
            console.log("Something went wrong")
        }finally{
            setIsLoading(false);
        }
    }

    return ( 
        <Modal title='Create New Shipment'
        description=''
        isOpen ={ uploadModal.isOpen }
        onChange={onChange}
        >
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">

                <div>
                    <div className="pb-1">
                    Customer Name
                    </div>
                <Input id="customer_name" disabled = {isLoading} {...register('customer_name',{required: true})}
                    placeholder = "Customer Name"/>
                </div>
                <div>
                    <div className="pb-1">
                    Destination Address
                    </div>
                <Input id="destination_address" disabled = {isLoading} {...register('destination_address',{required: true})}
                    placeholder = "Destination Address"/>

                </div>
                
                <div>
                    <div className="pb-1">
                    Plan Delivery Date
                    </div>
                <Input id="plan_delivery_date" type="date" disabled = {isLoading} {...register('plan_delivery_date',{required: true})}
                    placeholder = "Plan Delivery Date"/>

                </div>
                <div>
                    <div className="pb-1">
                    Actual Delivery                    </div>
                <Input id="actual_delivery_date" type="date" disabled = {isLoading} {...register('actual_delivery_date',{required: true})}
                    placeholder = "Actual Delivery"/>

                </div>
                {/* <div>
                    <div className="pb-1">
                    Entered By                    </div>
                <Input id="entered_by" disabled = {isLoading} {...register('entered_by',{required: true})}
                    placeholder = "Entered By"/>

                </div> */}
                {errors.exampleRequired && <span>This field is required</span>}
                <Button disabled={isLoading} type="submit">
                    Submit
                </Button>
            </form>
        </Modal>
     );
}
 
export default InsertModal;