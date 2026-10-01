import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../data/dropdown.json"
import type { Event } from "../../../types/Event"
import { toCamelCase, toCapitalized, toKebabCase, toTitle } from "../../../common/stringUtils"

export function NewEventForm({handleSubmit} : {handleSubmit: (event: Event) => void})
{
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
            startTime: "",
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
    const handleChange = (e: any) => 
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

    const eventFields =
    [
        {field: "image", type: "file", extraFields: {accept: "image/*"}},
        {field: "title", type: "text"},
        {field: "description", type: "text"},
        {field: "date", type: "text"},
        {field: "start time", type: "dropdown", dropdown: dropdown.timeOptions},
        {field: "end time", type: "dropdown", dropdown: dropdown.timeOptions},
        {field: "venue", type: "text"},
        {field: "address", type: "text"},
        {field: "city", type: "text"},
        {field: "province", type: "text"},
        {field: "postal code", type: "text"},
        {field: "price", type: "number", extraFields: {min: "0"}},
        {field: "capacity", type: "number", extraFields: {min: "0"}},
        {field: "category", type: "dropdown", dropdown: dropdown.categories}
    ]
    
    return (
        <form className="new-event-form">
            {eventFields.map(({field, type, extraFields, dropdown}) =>
            (
                dropdown &&
                <div>
                    <label>
                        {toTitle(field)}
                        <div>
                            <select 
                                value={event[toCamelCase(field) as keyof Event]?.toString()}
                                onChange={(e) => (handleChange(e))}
                            >
                                {
                                    dropdown.map((value) =>
                                    (
                                        <option key={field+value} value={value}>
                                            {value}
                                        </option>
                                    ))   
                                }
                            </select>
                        </div>
                    </label>
                </div>
                ||
                <div>
                    <label className={toKebabCase(field)}>
                        {toTitle(field)}
                        <div>
                            <input 
                                type={type}
                                name={toCamelCase(field)}
                                value={event[toCamelCase(field) as keyof Event]?.toString()} 
                                placeholder= {toCapitalized(field)}
                                onChange={(e) => handleChange(e)}
                                {...extraFields}
                            />
                        </div>
                    </label>
                    <span>{errors[toCamelCase(field) as keyof Errors]?.toString()}</span>
                </div>
            ))}
            <div>
                <label>
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
                                        onChange={(e) => handleChange(e)}
                                    />
                                </label>
                            ))   
                        }
                    </div>
                </label>
            </div>
            <div>
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
            </div>
        </form>
    )
}