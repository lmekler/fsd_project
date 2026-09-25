import { Outlet } from "react-router-dom";
import { Header } from "./header/Header";
import { Navigation } from "./navigation/Navigation";
import { Footer } from "./footer/Footer";

export function Layout() {
    return (
        <>
            <Header />
            <Navigation/>
            <Outlet />
            <Footer />
        </>
    )
}