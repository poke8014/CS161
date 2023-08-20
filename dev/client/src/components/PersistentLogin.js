import {Outlet} from "react-router-dom"
import react from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"
import Loading from "./Loading"

export default function PersistentLogin(){
    const [loading, setLoading] = react.useState(true)
    const refresh = useRefreshToken()
    const {auth} = useAuth()

    react.useEffect(() => {

        let isMounted = true;

        const verifyRT = async () => {
            try{
                await refresh()
            }
            catch(error){
                console.log("guest user")
            }
            finally{
                isMounted && setLoading(false)
            }
        }

        !auth?.accessToken ? verifyRT() : setLoading(false)

        return () => isMounted = false;
    }, [])

    return(
        <>
            {loading
                ? <Loading />
                : <Outlet />
            }
        </>
    )
}