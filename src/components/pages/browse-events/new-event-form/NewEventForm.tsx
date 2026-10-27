import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../../data/dropdown.json"
import type { Event } from "../../../../types/Event"
import Button from "../../../common/button/Button"
import { toCamelCase, toCapitalized, toKebabCase, toTitle } from "../../../common/stringUtils"
import { useFormInput } from "../../../../hooks/useFormInput"

export function NewEventForm(
    {
        handleSubmit
    } : {
        handleSubmit: (event: Event) => void
    })
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

    // // fields that require validation
    // interface Errors   
    // {
    //     image?: string
    //     title?: string
    //     description?: string
    //     date?: string
    //     address?: string
    //     city?: string
    //     province?: string
    //     postalCode?: string
    // }

    // const [errors, setErrors] = useState<Errors>({})

    // // sets error messages for invalid inputs and 
    // // returns whether the inputs are all valid or not
    // const formIsValid = (): boolean =>
    // {
    //     let errors: Errors = {}

    //     if (!event.image)
    //     {
    //         errors.image = "Image is required."
    //     }
        
    //     if (!event.title) 
    //     {
    //         errors.title = "Title is required."
    //     } 
        
    //     if (event.description && event.description.length >= 500) {
    //         errors.description = "Description cannot exceed 500 characters."
    //     }

    //     if (!event.date) 
    //     {
    //         errors.date = "Date is required."
    //     }
    //     else if (new Date(event.date.toString()) < new Date)
    //     {
    //         errors.date = "Date must be in the future."
    //     }

    //     if (!event.location.address) 
    //     {
    //         errors.address = "Address is required."
    //     }

    //     if (!event.location.city) 
    //     {
    //         errors.city = "City is required."
    //     }

    //     if (!event.location.province) 
    //     {
    //         errors.province = "Province is required."
    //     }

    //     if (!event.location.postalCode) 
    //     {
    //         errors.postalCode = "Postal code is required."
    //     }

    //     setErrors(errors);
        
    //     return (Object.keys(errors).length === 0)
    // }

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
        <form className="event-form">
            {eventFields.map((field) =>
            (
                field.dropdown ? (
                <div className={"event-" + toKebabCase(field.field)}>
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
                <div className={"event-" + toKebabCase(field.field)}>
                    <label className="form-label">
                        {toTitle(field.field)}
                        <div>
                            <input 
                                className="form-control"
                                type={field.type}
                                name={toCamelCase(field.field)}
                                value={field.value} 
                                placeholder= {toCapitalized(field.field)}
                                onChange={(e) => field.setValue(e.target.value)}
                                {...field.extraFields}
                            />
                        </div>
                        <p className="error">{field.error}</p>
                    </label>
                    {/* {
                        errors[toCamelCase(field) as keyof Errors]?.toString() 
                        &&
                        <span className="form-error">{errors[toCamelCase(field) as keyof Errors]?.toString()}</span>
                    } */}
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
                            // if (formIsValid())
                            // {
                                handleSubmit(event)
                            // }
                        }
                    }
                >
                    Submit
                </Button>
            </div>
        </form>
    )
}