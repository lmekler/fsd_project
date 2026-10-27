import { useState } from "react";

export function useFormInput(
    {
        field, 
        type, 
        dropdown, 
        extraFields
    } : {
        field: string, 
        type: string, 
        dropdown?: string[], 
        extraFields?: any
    })
{
    const [value, setValue] = useState<string | number | undefined>("")
    const [error, setError] = useState<string | null>(null)

    function validate(validate: (value: string) => string | null): boolean
    {
        const errorMessage = validate(field)
        setError(errorMessage)

        return errorMessage === null
    }

    return (
    {
        field, 
        type, 
        dropdown, 
        extraFields,
        value,
        setValue,
        error,
        validate
    })
}