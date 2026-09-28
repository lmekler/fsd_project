
interface ButtonProps {
    children: React.ReactNode; // Prop for button label
    onClick: () => void; // Prop for clicking behaviour
}

export default function Button( { children, onClick }: ButtonProps) {
    return (
        <button onClick={onClick}>
            {children}
        </button>
    )
}