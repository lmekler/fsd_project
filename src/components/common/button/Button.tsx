import type { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>{
    children: React.ReactNode; // Prop for button label
}

export default function Button( { 
    children,
    ...props
}: ButtonProps) {
    return (
        <button {...props}>
            {children}
        </button>
    )
}