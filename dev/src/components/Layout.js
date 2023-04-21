import { Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Layout(){

    const {loggedIn} = useAuth()

    return (
        <main className="App">
            <Outlet />
            {loggedIn && <p className="user-created">You have logged in successfully!</p>}
        </main>
    )
}