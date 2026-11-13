import { NavLink } from "react-router";

function getNavLinkClasses({ isActive }: { isActive: boolean }) {
    return `border-b-2 px-4 py-4 font-body text-sm font-medium transition-colors ${
        isActive ? "border-primary text-primary"
        : "border-transparent text-text hover:border-primary-light hover:text-primary"
    }`;
}

export function Navigation()
{
    return (
        <nav className="border-b border-border bg-surface">
            <div className="mx-auto flex w-full max-w-7x1 flex-col px-4 sm:px-6 md:flex-row lg:px-8">
                <NavLink 
                    className={getNavLinkClasses}
                    to="/browse-events" 
                >
                    Browse Events
                </NavLink>
                <NavLink 
                    className={getNavLinkClasses}
                    to="/saved-events"
                >
                    Saved Events
                </NavLink>
                <NavLink 
                    className={getNavLinkClasses}
                    to="/organizers"
                >
                    Organizers
                </NavLink>
            </div>
        </nav>
    )

}