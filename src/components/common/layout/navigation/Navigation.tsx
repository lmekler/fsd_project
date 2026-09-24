import { NavLink } from "react-router";

import "./Navigation.css"

export function Navigation()
{
    return (
        <nav className="navigation-menu">
            <div className="navigation-links">
                <NavLink 
                    className="navigation-link"
                    to="/browse-events" 
                >
                    Browse Events
                </NavLink>
                <NavLink 
                    className="navigation-link"
                    to="/saved-events"
                >
                    Saved Events
                </NavLink>
                <NavLink 
                    className="navigation-link"
                    to="/organizers"
                >
                    Organizers
                </NavLink>
            </div>
        </nav>
    )

}