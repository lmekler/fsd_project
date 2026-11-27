import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Navigation } from "./navigation/Navigation";
import { Footer } from "./footer/Footer";

export function Layout() {
    return (
        <div className="flex min-h-screen flex-col">
            <Header />
            <Navigation/>
            <div className="flex-1">
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}