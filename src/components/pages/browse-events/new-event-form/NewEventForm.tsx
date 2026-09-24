import { useState } from "react"

import "./NewEventForm.css"
import type { Event } from "../../../types/Event"

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

    // list of times the event can start/end at (in increments of 30 minutes)
    const timeOptions = 
    [
        "12:00 AM",
        "12:30 AM",
        "1:00 AM",
        "1:30 AM",
        "2:00 AM",
        "2:30 AM",
        "3:00 AM",
        "3:30 AM",
        "4:00 AM",
        "4:30 AM",
        "5:00 AM",
        "5:30 AM",
        "6:00 AM",
        "6:30 AM",
        "7:00 AM",
        "7:30 AM",
        "8:00 AM",
        "8:30 AM",
        "9:00 AM",
        "9:30 AM",
        "10:00 AM",
        "10:30 AM",
        "11:00 AM",
        "11:30 AM",
        "12:00 PM",
        "12:30 PM",
        "1:00 PM",
        "1:30 PM",
        "2:00 PM",
        "2:30 PM",
        "3:00 PM",
        "3:30 PM",
        "4:00 PM",
        "4:30 PM",
        "5:00 PM",
        "5:30 PM",
        "6:00 PM",
        "6:30 PM",
        "7:00 PM",
        "7:30 PM",
        "8:00 PM",
        "8:30 PM",
        "9:00 PM",
        "9:30 PM",
        "10:00 PM",
        "10:30 PM",
        "11:00 PM",
        "11:30 PM",
    ]

    // list of categories the user can choose from
    const categories = 
    [
        "Social",
        "Sports",
        "Music",
        "Arts & Culture",
        "Food & Drink",
        "Education",
        "Business & Networking",
        "Technology",
        "Health & Wellness",
        "Outdoors & Nature",
        "Entertainment",
        "Community",
        "Family & Kids",
        "Gaming",
        "Travel",
        "Charity & Fundraising",
        "Religious & Spiritual",
        "Other",
    ]

    // list of tags the user can select
    const tags = 
    [
        "Free",
        "Paid",
        "Family Friendly",
        "18+",
        "All Ages",
        "Beginner Friendly",
        "Intermediate",
        "Advanced",
        "Networking",
        "Live Music",
        "Live Entertainment",
        "Food",
        "Drinks",
        "Dancing",
        "Workshop",
        "Lecture",
        "Conference",
        "Meetup",
        "Competition",
        "Tournament",
        "Fundraiser",
        "Volunteer",
        "Outdoor",
        "Indoor",
        "Virtual",
        "In Person",
        "Local",
        "Community",
        "Arts",
        "Culture",
        "Sports",
        "Fitness",
        "Gaming",
        "Technology",
        "Business",
        "Education",
        "Career",
        "Wellness",
        "Social",
        "Nightlife",
        "Festival",
        "Concert",
        "Exhibition",
        "Market",
        "Networking",
        "Pets Welcome",
        "Accessible",
        "Student Friendly",
    ]

    return (
        <form className="new-event-form">
            <div className="photo">
                <label>
                    Photo
                    <input 
                        key="photo" 
                        type="file"
                        value={event.image}
                        accept="image/*"
                        onChange=
                        {
                            (e) => setEvent(
                            {
                                ...event,
                                image: e.target.value
                            })
                        }
                    />
                </label>
            </div>
            <div className="event-title">
                <label>
                    Event title
                    <input 
                        key="eventTitle" 
                        type="text"
                        value={event.title}
                        placeholder="Event title"
                        onChange=
                        {
                            (e) => setEvent(
                            {
                                ...event,
                                title: e.target.value
                            })
                        }
                    />
                </label>
            </div>
            <div className="description">
                <label>
                    Description
                    <input 
                        key="description" 
                        type="text"
                        value={event.description}
                        placeholder="Description"
                        onChange=
                        {
                            (e) => setEvent(
                            {
                                ...event,
                                description: e.target.value
                            })
                        }
                    />
                </label>
            </div>
            <div className="date-time">
                <label>
                    Date and location
                    <label>
                        Date
                        <input 
                            key="date" 
                            type="date"
                            value={event.date}
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    date: e.target.value
                                })
                            }
                        />
                    </label>
                    <label>
                        Start time
                        <select 
                            key="time" 
                            value={event.startTime}
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    startTime: e.target.value
                                })
                            }
                        >
                            {
                                timeOptions.map((time) =>
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
                            key="time" 
                            value={event.endTime}
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    endTime: e.target.value
                                })
                            }
                        >
                            {
                                timeOptions.map((time) =>
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
                                key="venue" 
                                type="text"
                                value={event.location.venue}
                                onChange=
                                {
                                    (e) => setEvent(
                                    {
                                        ...event,
                                        location: 
                                        {
                                            ...event.location,
                                            venue: e.target.value
                                        }
                                    })
                                }
                            />
                        </label>
                        <label>
                            Address
                            <input 
                                key="address" 
                                type="text"
                                value={event.location.address}
                                onChange=
                                {
                                    (e) => setEvent(
                                    {
                                        ...event,
                                        location: 
                                        {
                                            ...event.location,
                                            address: e.target.value
                                        }
                                    })
                                }
                            />
                        </label>
                        <label>
                            City
                            <input 
                                key="city" 
                                type="text"
                                value={event.location.city}
                                onChange=
                                {
                                    (e) => setEvent(
                                    {
                                        ...event,
                                        location: 
                                        {
                                            ...event.location,
                                            city: e.target.value
                                        }
                                    })
                                }
                            />
                        </label>
                        <label>
                            Province
                            <input 
                                key="province" 
                                type="text"
                                value={event.location.province}
                                onChange=
                                {
                                    (e) => setEvent(
                                    {
                                        ...event,
                                        location: 
                                        {
                                            ...event.location,
                                            province: e.target.value
                                        }
                                    })
                                }
                            />
                        </label>
                        <label>
                            Postal Code
                            <input 
                                key="postalCode" 
                                type="text"
                                value={event.location.postalCode}
                                onChange=
                                {
                                    (e) => setEvent(
                                    {
                                        ...event,
                                        location: 
                                        {
                                            ...event.location,
                                            postalCode: e.target.value
                                        }
                                    })
                                }
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
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    price: parseInt(e.target.value)
                                })
                            }
                        />
                    </label>
                    <label>
                        Capacity
                        <input 
                            key="capacity" 
                            type="number"
                            value={event.capacity}
                            placeholder="0"
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    capacity: parseInt(e.target.value)
                                })
                            }
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
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    category: e.target.value
                                })
                            }
                        >
                            {
                                categories.map((category) =>
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
                            onChange=
                            {
                                (e) => setEvent(
                                {
                                    ...event,
                                    tags: 
                                    [
                                        e.target.value
                                    ]
                                })
                            }
                        >
                            {
                                tags.map((tag) =>
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