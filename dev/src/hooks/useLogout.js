import axios from "../axios"
import useAuth from "./useAuth"

export default function useLogout(){
    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth({});
        try{
            const res = await axios('logout', {
                withCredentials: true
            });
        }catch(error){
            console.error(error)
        }
    }

    return logout;
}