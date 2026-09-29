import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../data/dropdown.json"
import type { Event } from "../../../types/Event"
import type { Location } from "../../../types/Event"
import { toCamelCase, toCapitalized, toKebabCase, toTitle } from "../../../common/stringUtils"

function FieldInput(
    {
        field,
        type, 
        value, 
        onChange, 
        extraFields,
        errorField
    } : {
        field: string,
        type: string, 
        value?: string, 
        onChange: (e: any) => void, 
        extraFields?: React.InputHTMLAttributes<HTMLInputElement>
        errorField?: React.ReactNode
    }
)
{
    return (
        <div>
            <label className={toKebabCase(field)}>
                {toTitle(field)}
                <input 
                    type={type}
                    name={toCamelCase(field)}
                    value={value}
                    placeholder= {toCapitalized(field)}
                    onChange={onChange}
                    {...extraFields}
                />
            </label>
            <span>{errorField}</span>
        </div>
    )
}

function FieldSelect(
    {
        field,
        value,
        onChange,
        dropdown
    } : {
        field: string,
        value?: string,
        onChange: (e: any) => void,
        dropdown: string[]
    }
)
{
    return (
        <label>
            {toTitle(field)}
            <select 
                value={value}
                onChange={onChange}
            >
                {
                    dropdown.map((value) =>
                    (
                        <option key={value} value={value}>
                            {value}
                        </option>
                    ))   
                }
            </select>
        </label>
    )
}

export function NewEventForm({handleSubmit} : {handleSubmit: (event: Event) => void})
{
    // default event fields
    const [event, setEvent] = useState<Event>
    (
        {
            id: "",
            organizerId: "",
            title: "",
            date: new Date().toLocaleDateString(),
            startTime: "",
            location: 
            {
                address: "",
                city: "",
                province: "",
                postalCode: ""
            },
            image: "",
            capacity: 0,
            registeredCount: 0,
            price: 0,
            isFree: true,
            isFeatured: false,
        }
    )

    // fields that require validation
    interface Errors   
    {
        image?: string
        title?: string
        description?: string
        date?: string
        address?: string
        city?: string
        province?: string
        postalCode?: string
    }

    const [errors, setErrors] = useState<Errors>({})

    // sets error messages for invalid inputs and 
    // returns whether the inputs are all valid or not
    const formIsValid = (): boolean =>
    {
        let errors: Errors = {}

        if (!event.image)
        {
            errors.image = "Image is required."
        }
        
        if (!event.title) 
        {
            errors.title = "Title is required."
        } 
        
        if (event.description && event.description.length >= 500) {
            errors.description = "Description cannot exceed 500 characters."
        }

        if (!event.date) 
        {
            errors.date = "Date is required."
        }
        else if (new Date(event.date) < new Date)
        {
            errors.date = "Date must be in the future."
        }

        if (!event.location.address) 
        {
            errors.address = "Address is required."
        }

        if (!event.location.city) 
        {
            errors.city = "City is required."
        }

        if (!event.location.province) 
        {
            errors.province = "Province is required."
        }

        if (!event.location.postalCode) 
        {
            errors.postalCode = "Postal code is required."
        }

        setErrors(errors);
        
        return (Object.keys(errors).length === 0)
    }

    // updates the event with user input
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => 
    {
        const { name, value } = e.target

        if (name in event.location)
        {
            setEvent(
            {
                ...event,
                "location": 
                {
                    ...event.location,
                    [name]: value
                }
            })
        }
        else
        {
            setEvent(
            {
                ...event,
                [name]: value
            })
        }
    }

    return (
        <form className="new-event-form">
            <FieldInput 
                field="image"
                type="file" 
                onChange={(e) => handleChange(e)}
                extraFields={
                    {
                        accept: "image/*"
                    }
                }
            />
            <FieldInput 
                field="title"
                type="text" 
                value={event.title} 
                onChange={(e) => handleChange(e)}
                errorField={errors.title}
            />
            <FieldInput 
                field="description"
                type="text" 
                value={event.description || ""} 
                onChange={(e) => handleChange(e)}
                errorField={errors.description}
            />
            <FieldInput 
                field="date"
                type="date"
                value={event.date} 
                onChange={(e) => (handleChange(e))}
                errorField={errors.date}
            />
            <FieldSelect
                field="start time"
                value={event.startTime}
                onChange={(e) => (handleChange(e))}
                dropdown={dropdown.timeOptions}
            />
            <FieldSelect
                field="end time"
                value={event.endTime}
                onChange={(e) => (handleChange(e))}
                dropdown={dropdown.timeOptions}
            />
            <FieldInput 
                field="venue"
                type="text"
                value={event.location.venue || ""} 
                onChange={(e) => handleChange(e)}
            />
            <FieldInput 
                field="address"
                type="text"
                value={event.location.address} 
                onChange={(e) => handleChange(e)}
                errorField={errors.address}
            />
            <FieldInput
                field="city"
                type="text"
                value={event.location.city} 
                onChange={(e) => handleChange(e)}
                errorField={errors.city}
            />
            <FieldInput 
                field="province"
                type="text"
                value={event.location.province} 
                onChange={(e) => handleChange(e)}
                errorField={errors.province}
            />
             <FieldInput 
                field="postal code"
                type="text"
                value={event.location.postalCode} 
                onChange={(e) => handleChange(e)}
                errorField={errors.postalCode}
            />
            <FieldInput 
                field="price"
                type="number" 
                value={event.price.toString() || "0"} 
                onChange={(e) => handleChange(e)}
                extraFields={
                    {
                        min: 0
                    }
                }
            />
            <FieldInput 
                field="capacity"
                type="number"
                value={event.capacity.toString() || "0"} 
                onChange={(e) => handleChange(e)}
                extraFields={
                    {
                        min: 0
                    }
                }
            />
            <FieldSelect
                field="category"
                value={event.category}
                onChange={(e) => (handleChange(e))}
                dropdown={dropdown.categories}
            />
            <label>
                Tags
                {
                    dropdown.tags.map((value) =>
                    (
                        <label>
                            {value}
                            <input 
                                type="checkbox" 
                                name={value} 
                                value={value}
                                onChange={(e) => handleChange(e)}
                            />
                        </label>
                    ))   
                }
            </label>
            <button
                onClick=
                {
                    (e) => 
                    {
                        e.preventDefault()
                        if (formIsValid())
                        {
                            handleSubmit(event)
                        }
                    }
                }
            >
                Submit
            </button>
        </form>
    )
}