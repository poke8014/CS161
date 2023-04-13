import useAuth from "./useAuth"
import axios from "../axios"

export default function useRefreshToken(){
    const { setAuth } =  useAuth()

    async function refresh(){
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            return {...prev, 
                accessToken: response.data.accessToken,
                email: response.data.email
            }
        })
        return response.data.accessToken
    }

    return refresh
}
