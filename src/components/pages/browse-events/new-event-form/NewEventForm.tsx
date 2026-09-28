import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../data/dropdown.json"
import type { Event } from "../../../types/Event"
import type { Location } from "../../../types/Event"

function FieldInput(
    {
        field, 
        type, 
        value, 
        onChange, 
        extraFields
    } : {
        field: string, 
        type: string, 
        value?: string, 
        onChange: (e: any) => void, 
        extraFields?: React.InputHTMLAttributes<HTMLInputElement>
    })
{
    const className = field.toLowerCase().replace(" ", "-")
    
    return (
        <div>
            <label className={className}>
                {field}
                <input 
                    type={type}
                    value={value}
                    placeholder= {field}
                    onChange={onChange}
                    {...extraFields}
                />
            </label>
        </div>
    )
}
export function NewEventForm({handleSubmit} : {handleSubmit: (event: Event) => void})
{
    // helper function for updating event fields
    const updateEvent = (field: keyof Event, value: any) => 
    {
        if (!validate(true, field, value))
        {
            setEvent(
            {
                ...event,
                [field]: value
            })
        }
    }

    // helper function for updating location fields
    const updateLocation = (field: keyof Location, value: string) => 
    {
        updateEvent(
            "location", 
            {
                ...event.location,
                [field]: value
            }
        )
    }

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

    return (
        <form className="new-event-form">
            <FieldInput 
                field="Event title" 
                type="file" 
                onChange={(e) => updateEvent("image", e.target.value)}
                extraFields={
                    {
                        accept: "image/*"
                    }
                }
            />
            <FieldInput 
                field="Event title" 
                type="text" 
                value={event.title} 
                onChange={(e) => updateEvent("title", e.target.value)}
            />
            <FieldInput 
                field="Description"
                type="text" 
                value={event.description || ""} 
                onChange={(e) => updateEvent("description", e.target.value)}
            />
            <FieldInput 
                field="Date"
                type="date" 
                value={event.date} 
                onChange={(e) => updateEvent("date", e.target.value)}
            />
            <label>
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
            </label>
            <FieldInput 
                field="Venue"
                type="text" 
                value={event.location.venue || ""} 
                onChange={(e) => updateLocation("venue", e.target.value)}
            />
            <FieldInput 
                field="Address"
                type="text" 
                value={event.location.address} 
                onChange={(e) => updateLocation("address", e.target.value)}
            />
            <FieldInput 
                field="City"
                type="text" 
                value={event.location.city} 
                onChange={(e) => updateLocation("city", e.target.value)}
            />
            <FieldInput 
                field="Province"
                type="text" 
                value={event.location.province} 
                onChange={(e) => updateLocation("province", e.target.value)}
            />
             <FieldInput 
                field="Postal Code"
                type="text" 
                value={event.location.postalCode} 
                onChange={(e) => updateLocation("postalCode", e.target.value)}
            />
            <FieldInput 
                field="Price"
                type="number" 
                value={event.price.toString() || "0"} 
                onChange={(e) => updateEvent("price", e.target.value)}
            />
            <FieldInput 
                field="Capacity"
                type="capacity" 
                value={event.capacity.toString() || "0"} 
                onChange={(e) => updateEvent("capacity", e.target.value)}
            />
            <div>
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
            </div>
            <button
                onClick=
                {
                    (e) => 
                    {
                        e.preventDefault()
                        handleSubmit(event)
                    }
                }
            >
                Submit
            </button>
        </form>
    )
}