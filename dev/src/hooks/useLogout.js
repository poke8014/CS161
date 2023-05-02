import axios from "../axios"
import useAuth from "./useAuth"

export default function useLogout(){
    const { setAuth, setLoggedIn, setUserID } = useAuth()

    const logout = async () => {
        setAuth({});
        setLoggedIn(false);
        setUserID(null);

        // Clear the local storage values
        localStorage.removeItem("auth");
        localStorage.removeItem("loggedIn");
        localStorage.removeItem("userID");

        try{
            const res = await axios('/users/logout', {
                withCredentials: true
            });
        }catch(error){
            console.error(error)
        }
    }

    return logout;
}