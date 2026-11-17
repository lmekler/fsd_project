import historicalData from "../../frontend/src/data/data.json";
import type { Event, SavedEvent } from "@shared/types/event";
import type { Organizer } from "@shared/types/organizer";
import { prisma } from "../src/db";

const events: Event[] = historicalData.events;
const savedEvents: SavedEvent[] = historicalData.savedEvents;
const organizers: Organizer[] = historicalData.organizers;

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.event.deleteMany();
        await tx.savedEvent.deleteMany();
        await tx.organizer.deleteMany();
        await tx.location.deleteMany();
        
        for (const event of events) {
          await tx.event.create({ data: {
            id: event.id,
            organizerId: event.organizerId,
            title: event.title,
            description: event.description,
            category: event.category,
            date: event.date,
            startTime: event.startTime,
            endTime: event.endTime,
            image: event.image,
            capacity: event.capacity,
            registeredCount: event.registeredCount,
            price: event.price,
            isFeatured: event.isFeatured,
            tags: event.tags,
            location: {
              create: {
                venue: event.location.venue,
                address: event.location.address,
                postalCode: event.location.postalCode,
                city: event.location.city,
                province: event.location.province
              }
            }
          }})
        }

        for (const organizer of organizers) {
          await tx.organizer.create({ data: {
            id: organizer.id,
            name: organizer.name,
            description: organizer.description,
            website: organizer.website,
            email: organizer.email,
            phone: organizer.phone,
            image: organizer.image,
            location: organizer.location
          }})
        }
    })
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
