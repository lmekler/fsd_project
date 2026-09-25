import { useState } from "react"

import "./NewEventForm.css"
import dropdown from "../../../data/dropdown.json"
import type { Event } from "../../../types/Event"
import type { Location } from "../../../types/Event"

export function NewEventForm({handleSubmit} : {handleSubmit: (event: Event) => void})
{
    // helper function for updating event fields
    const updateEvent = (field: keyof Event, value: any) => 
    {
        setEvent(
        {
            ...event,
            [field]: value
        })
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
            <div className="photo">
                <label>
                    Photo
                    <input 
                        type="file"
                        value={event.image}
                        accept="image/*"
                        onChange={(e) => updateEvent("image", e.target.value)}
                    />
                </label>
            </div>
            <div className="event-title">
                <label>
                    Event title
                    <input 
                        type="text"
                        value={event.title}
                        placeholder="Event title"
                        onChange={(e) => updateEvent("title", e.target.value)}
                    />
                </label>
            </div>
            <div className="description">
                <label>
                    Description
                    <input 
                        type="text"
                        value={event.description}
                        placeholder="Description"
                        onChange={(e) => updateEvent("description", e.target.value)}
                    />
                </label>
            </div>
            <div className="date-time">
                <label>
                    Date and location
                    <label>
                        Date
                        <input 
                            type="date"
                            value={event.date}
                            onChange={(e) => updateEvent("date", e.target.value)}
                        />
                    </label>
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
                    <label>
                        Location
                        <label>
                            Venue name
                            <input 
                                type="text"
                                value={event.location.venue}
                                onChange={(e) => updateLocation("venue", e.target.value)}
                            />
                        </label>
                        <label>
                            Address
                            <input 
                                type="text"
                                value={event.location.address}
                                onChange={(e) => updateLocation("address", e.target.value)}
                            />
                        </label>
                        <label>
                            City
                            <input 
                                type="text"
                                value={event.location.city}
                                onChange={(e) => updateLocation("city", e.target.value)}
                            />
                        </label>
                        <label>
                            Province
                            <input 
                                type="text"
                                value={event.location.province}
                                onChange={(e) => updateLocation("province", e.target.value)}
                            />
                        </label>
                        <label>
                            Postal Code
                            <input 
                                type="text"
                                value={event.location.postalCode}
                                onChange={(e) => updateLocation("postalCode", e.target.value)}
                            />
                        </label>
                    </label>
                </label>
            </div>
            <div className="ticket-info">
                <label>
                    Ticket information
                    <label>
                        Price
                        <input 
                            key="price" 
                            type="number"
                            value={event.price}
                            placeholder="0.00"
                            onChange={(e) => updateEvent("price", e.target.value)}
                        />
                    </label>
                    <label>
                        Capacity
                        <input 
                            key="capacity" 
                            type="number"
                            value={event.capacity}
                            placeholder="0"
                            onChange={(e) => updateEvent("capacity", parseInt(e.target.value))}
                        />
                    </label>
                </label>
            </div>
            <div className="extra-info">
                <label>
                    Extra information
                    <label>
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
                    <label>
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