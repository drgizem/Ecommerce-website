import { Navbarpart } from "./Navbar"
import { Outlet } from "react-router-dom"


const RootLayout = () => {
    return (
        <div className="root-layout">
            <Navbarpart />
            <Outlet/>
        </div>
    )
}

export default RootLayout