import { useMutation } from "@tanstack/react-query";
import axiosInstance from '../../config/axios'

export type TRegister = {
    name:string;
    bio: string;
    termsAccepted:boolean;
    email: string
}
const useRegister = () => {
    return useMutation({
        mutationKey: ["Hospital_Register"],
        mutationFn: (formData: TRegister) => axiosInstance.post('/register', formData).then((res) => res.data)
    })
}
 
export default useRegister