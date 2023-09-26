import { create } from "zustand";

interface InsertModalStore{
    isOpen: boolean;
    onOpen: ()=>void;
    onClose: ()=>void;
};

const useInsertModal = create<InsertModalStore>((set)=>({
    isOpen: false,
    onOpen: ()=> set({isOpen: true}),
    onClose: ()=> set({isOpen: false}),
}));

export default useInsertModal;