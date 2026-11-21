import type { Event } from "../types/Event"
import { eventRepository } from "../repositories/EventRepository"
import { toTitle } from "@shared/utils/stringUtils"

function validateEvent(event: Event): void 
{
    const errors: string[] = []

    if (!event.image)
    {
        errors.push("Image is required.")
    }
    
    if (!event.title) 
    {
        errors.push("Title is required.")
    } 
    
    if (event.description && event.description.length >= 500) 
    {
        errors.push("Description cannot exceed 500 characters.")
    }

    if (!event.date) 
    {
        errors.push("Date is required.")
    }
    else if (new Date(event.date.toString()) < new Date)
    {
        errors.push("Date must be in the future.")
    }

    if (!event.location.address) 
    {
        errors.push("Address is required.")
    }

    if (!event.location.city) 
    {
        errors.push("City is required.")
    }

    if (!event.location.province) 
    {
        errors.push("Province is required.")
    }

    if (!event.location.postalCode) 
    {
        errors.push("Postal code is required.")
    }

    if (errors.length > 0) 
    {
        throw new Error(errors.join(" "))
    }
}

export const eventService =
{
    getEvents(): Event[]
    {
        return eventRepository.getAll()
    },

    getEventById(id: string): Event | null
    {
        return eventRepository.getById(id)
    },

    addEvent(input: Event): Event
    {
        const event: Event =
        {
            ...input,
            organizerId: input.organizerId,
            title: toTitle(input.title),
            description: input.description,
            category: input.category,
            date: input.date,
            startTime: input.startTime,
            endTime: input.endTime,
            location: input.location,
            image: input.image,
            capacity: input.capacity,
            registeredCount: input.registeredCount,
            price: input.price,
            isFree: input.isFree,
            isFeatured: input.isFeatured,
            tags: input.tags
        }

        validateEvent(event)

        return eventRepository.add(event)
    },

    removeEvent(id: string): void
    {
        eventRepository.remove(id)
    }
}
  if (event.description && event.description.length >= 500) {
    errors.push("Description cannot exceed 500 characters.");
  }

  if (!event.date) {
    errors.push("Date is required.");
  } else if (new Date(event.date.toString()) < new Date()) {
    errors.push("Date must be in the future.");
  }

  if (!event.location.address) {
    errors.push("Address is required.");
  }

  if (!event.location.city) {
    errors.push("City is required.");
  }

  if (!event.location.province) {
    errors.push("Province is required.");
  }

  if (!event.location.postalCode) {
    errors.push("Postal code is required.");
  }

  if (errors.length > 0) {
    throw new Error(errors.join(" "));
  }
}

export const eventService = {
  getEvents(): Event[] {
    return eventRepository.getAll();
  },

  getEventById(id: string): Event | null {
    return eventRepository.getById(id);
  },

  addEvent(input: Event): Event {
    const event: Event = {
      ...input,
      organizerId: input.organizerId,
      title: toTitle(input.title),
      description: input.description,
      category: input.category,
      date: input.date,
      startTime: input.startTime,
      endTime: input.endTime,
      location: input.location,
      image: input.image,
      capacity: input.capacity,
      registeredCount: input.registeredCount,
      price: input.price,
      isFree: input.isFree,
      isFeatured: input.isFeatured,
      tags: input.tags,
    };

    validateEvent(event);

    return eventRepository.add(event);
  },

  removeEvent(id: string): void {
    eventRepository.remove(id);
  },
};
