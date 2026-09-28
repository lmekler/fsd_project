import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../data/dropdown.json"
import type { Event } from "../../../types/Event"
import type { Location } from "../../../types/Event"

function FieldInput(
    {
        className,
        label,
        type, 
        name,
        value, 
        onChange, 
        extraFields,
        errorField
    } : {
        className: string,
        label: string,
        type: string, 
        name: string,
        value?: string, 
        onChange: (e: any) => void, 
        extraFields?: React.InputHTMLAttributes<HTMLInputElement>
        errorField?: React.ReactNode
    })
{
    return (
        <div>
            <label className={className}>
                {label}
                <input 
                    type={type}
                    name={name}
                    value={value}
                    placeholder= {label}
                    onChange={onChange}
                    {...extraFields}
                />
            </label>
            <span>{errorField}</span>
        </div>
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

        if (name in Location)
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
                className="image"
                label="Image" 
                type="file" 
                name="image"
                onChange={(e) => handleChange(e)}
                extraFields={
                    {
                        accept: "image/*"
                    }
                }
            />
            <FieldInput 
                className="title"
                label="Title" 
                type="text" 
                name="title"
                value={event.title} 
                onChange={(e) => handleChange(e)}
                errorField={errors.title}
            />
            <FieldInput 
                className="description"
                label="Description"
                type="text" 
                name="description"
                value={event.description || ""} 
                onChange={(e) => handleChange(e)}
                errorField={errors.description}
            />
            <FieldInput 
                className="date"
                label="Date"
                type="date" 
                name="date"
                value={event.date} 
                onChange={(e) => handleChange(e)}
                errorField={errors.date}
            />
            {/* <label>
                Start time
                <select 
                    value={event.startTime}
                    onChange={(e) => updateEvent("startTime", e.target.value)}
                >
                    {
                        dropdown.timeOptions.map((time) =>
                        (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))   
                    }
                </select>
            </label>
            <label>
                End time
                <select 
                    value={event.endTime}
                    onChange={(e) => updateEvent("endTime", e.target.value)}
                >
                    {
                        dropdown.timeOptions.map((time) =>
                        (
                            <option key={time} value={time}>
                                {time}
                            </option>
                        ))   
                    }
                </select>
            </label> */}
            <FieldInput 
                className="venue"
                label="Venue"
                type="text" 
                name="venue"
                value={event.location.venue || ""} 
                onChange={(e) => handleChange(e)}
            />
            <FieldInput 
                className="address"
                label="Address"
                type="text" 
                name="address"
                value={event.location.address} 
                onChange={(e) => handleChange(e)}
                errorField={errors.address}
            />
            <FieldInput
                className="city"
                label="City"
                type="text" 
                name="city"
                value={event.location.city} 
                onChange={(e) => handleChange(e)}
                errorField={errors.city}
            />
            <FieldInput 
                className="province"
                label="Province"
                type="text" 
                name="province"
                value={event.location.province} 
                onChange={(e) => handleChange(e)}
                errorField={errors.province}
            />
             <FieldInput 
                className="postal-code"
                label="Postal Code"
                type="text" 
                name="postalCode"
                value={event.location.postalCode} 
                onChange={(e) => handleChange(e)}
                errorField={errors.postalCode}
            />
            <FieldInput 
                className="price"
                label="Price"
                name="price"
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
                className="capacity"
                label="Capacity"
                type="number" 
                name="capacity"
                value={event.capacity.toString() || "0"} 
                onChange={(e) => handleChange(e)}
                extraFields={
                    {
                        min: 0
                    }
                }
            />
            {/* <div>
                <label className="extra-info">
                    Extra information
                    <label className="category">
                        Category
                        <select 
                            key="category" 
                            value={event.category}
                            onChange={(e) => updateEvent("category", e.target.value)}
                        >
                            {
                                dropdown.categories.map((category) =>
                                (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))   
                            }
                        </select>
                    </label>
                    <label className="tags">
                        Tags
                        <select 
                            key="tags" 
                            value={event.tags}
                            multiple={true}
                            onChange={(e) => updateEvent("tags", [e.target.value])}
                        >
                            {
                                dropdown.tags.map((tag) =>
                                (
                                    <option key={tag} value={tag}>
                                        {tag}
                                    </option>
                                ))   
                            }
                        </select>
                    </label>
                </label>
            </div> */}
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