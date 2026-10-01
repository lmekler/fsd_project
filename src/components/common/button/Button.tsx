import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode; // Prop for button label
    variant?: "primary" | "secondary" | "outline" | "danger";
    size?: "sm" | "md" | "lg";
}

export default function Button( { 
    children,
    variant = "primary",
    size = "md",
    className = "",
    ...props
}: ButtonProps) {

    // Tailwind Styles
    const baseStyles =
        "inline-flex items-center justify-center rounded-md font-body font-medium transition colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";
    
    const variants = {
        primary:
            "bg-primary text-text-inverse hover:bg-primary-hover",
        secondary:
            "bg-accent text-text hover:opacity-80",
        outline:
            "border border-primary bg-transparent text-primary hover:bg-primary-light",
        danger:
            "bg-error text-text-inverse hover:opacity-80",
    }

    const sizes = {
        sm: "px-3 py-2 text-sm",
        md: "px-4 py-2.5 text-base",
        lg: "px-6 py-3 text-lg",
    }
    
    return (
        <button 
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}