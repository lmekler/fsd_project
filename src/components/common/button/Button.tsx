interface ButtonProps {
    children: React.ReactNode; // Prop for button label
    onClick: () => void; // Prop for clicking behaviour
    disabled?: boolean;
}

export default function Button( { 
    children,
    onClick,
    disabled = false,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}