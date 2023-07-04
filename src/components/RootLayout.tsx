import { Navbarpart } from "./Navbar"
import { Outlet } from "react-router-dom"
import Footer from "./Footer"

const RootLayout = () => {
    return (
        <div className="root-layout">
            <Navbarpart />
            <Outlet/>
        <div>
            <Footer/>
        </div>
        </div>
    )
}

export default RootLayout