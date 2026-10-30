import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../../data/dropdown.json"
import type { Event } from "../../../../types/Event"
import Button from "../../../common/button/Button"
import { toCamelCase, toCapitalized, toKebabCase, toTitle } from "../../../common/stringUtils"
import { useFormInput } from "../../../../hooks/useFormInput"

export function NewEventForm({handleSubmit} : {handleSubmit: (event: Event) => void})
{

    function validateField(field: string, value: any): string | null
    {
        if (field === "image" && !value)
        {
            return "Image is required."
        }

        if (field === "title" && !value.trim())
        {
            return "Title is required."
        }

        if (field === "description" && value.length >= 500)
        {
            return "Description cannot exceed 500 characters."
        }

        if (field === "date")
        {
            if (!value)
            {
                return "Date is required."
            }

            if (new Date(value) < new Date())
            {
                return "Date must be in the future."
            }
        }

        if (field === "address" && !value.trim())
        {
            return "Address is required."
        }

        if (field === "city" && !value.trim())
        {
            return "City is required."
        }

        if (field === "province" && !value.trim())
        {
            return "Province is required."
        }

        if (field === "postal code" && !value.trim())
        {
            return "Postal code is required."
        }

        return null
    }

    function validateForm(): boolean
    {
        let isValid = true

        eventFields.forEach((field) =>
        {
            const valid = field.validate((value) => validateField(field.field, value))
            if (!valid)
            {
                isValid = false
            }
        })

        return isValid
    }

    // default event fields
    const [event, setEvent] = useState<Event>
    (
        {
            id: "",
            organizerId: "",
            title: "",
            description: "",
            category: "",
            date: new Date().toLocaleDateString(),
            startTime: "12:00",
            endTime: "",
            location: 
            {
                venue: "",
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
            tags: []
        }
    )

    // updates the event with user input
    const handleChange = (field: any, e: any) => 
    {
        field.setValue(e.target.value)
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

    const eventFields =
    [
        useFormInput({field: "image", type: "file", extraFields: {accept: "image/*"}}),
        useFormInput({field: "title", type: "text"}),
        useFormInput({field: "description", type: "text"}),
        useFormInput({field: "date", type: "date"}),
        useFormInput({field: "start time", type: "dropdown", dropdown: dropdown.timeOptions}),
        useFormInput({field: "end time", type: "dropdown", dropdown: dropdown.timeOptions}),
        useFormInput({field: "venue", type: "text"}),
        useFormInput({field: "address", type: "text"}),
        useFormInput({field: "city", type: "text"}),
        useFormInput({field: "province", type: "text"}),
        useFormInput({field: "postal code", type: "text"}),
        useFormInput({field: "price", type: "number", extraFields: {min: "0"}}),
        useFormInput({field: "capacity", type: "number", extraFields: {min: "0"}}),
        useFormInput({field: "category", type: "dropdown", dropdown: dropdown.categories})
    ]
    
    return (
        <form className="event-form surface-card p-6">
            {eventFields.map((field) =>
            (
                field.dropdown ? (
                <div key={field.field + field.type} className={"event-" + toKebabCase(field.field)}>
                    <label className="form-label">
                        {toTitle(field.field)}
                        <div>
                            <select 
                                className="form-control"
                                name={toCamelCase(field.field)}
                                value={field.value}
                                onChange={(e) => handleChange(field, e)}
                            >
                                {
                                    field.dropdown.map((value) =>
                                    (
                                        <option key={toKebabCase(field.field+" "+value)} value={value}>
                                            {value}
                                        </option>
                                    ))   
                                }
                            </select>
                        </div>
                    </label>
                </div>
                ) : (
                <div key={field.field + field.type} className={"event-" + toKebabCase(field.field)}>
                    <label className="form-label">
                        {toTitle(field.field)}
                        <div>
                            <input 
                                className="form-control"
                                type={field.type}
                                name={toCamelCase(field.field)}
                                value={field.value} 
                                placeholder={toCapitalized(field.field)}
                                onChange={(e) => handleChange(field, e)}
                                {...field.extraFields}
                            />
                        </div>
                        <p className="error">{field.error}</p>
                    </label>
                    </div>
                )
            ))}
            {/* <div key="tags">
                <label className="form-label">
                    Tags
                    <div>
                        {
                            dropdown.tags.map((value) =>
                            (
                                <label key={"tags"+value}>
                                    {value}
                                    <input 
                                        type="checkbox" 
                                        name={value} 
                                        value={value}
                                        onChange={handleChange}
                                    />
                                </label>
                            ))   
                        }
                    </div>
                </label>
            </div> */}
            <div>
                <Button
                    variant="primary"
                    size="md"
                    onClick=
                    {
                        (e: any) => 
                        {
                            e.preventDefault()
                            if (validateForm())
                            {
                                handleSubmit(event)
                            }
                        }
                    }
                >
                    Submit
                </Button>
            </div>
        </form>
    )
}