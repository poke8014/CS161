import {Outlet} from "react-router-dom"
import react from "react"
import useRefreshToken from "../hooks/useRefreshToken"
import useAuth from "../hooks/useAuth"

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
                console.error(error)
            }
            finally{
                isMounted && setLoading(false)
            }
        }

        !auth?.accessToken ? verifyRT() : setLoading(false)

        return () => isMounted = false;
    }, [])

    react.useEffect(() => {
        console.log("loading " + loading)
        console.log("at: " + JSON.stringify(auth?.email))
    },[loading])

    return(
        <>
            {loading
                ? <p>Loading...</p>
                : <Outlet />
            }
        </>
    )
}