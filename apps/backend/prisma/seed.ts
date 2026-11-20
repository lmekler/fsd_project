import historicalData from "./data/data.json";
import { prisma } from "../src/db/prisma";

const locations = historicalData.locations
const events = historicalData.events;
const savedEvents = historicalData.savedEvents;
const organizers = historicalData.organizers;
const users = historicalData.users;

async function main() {
    await prisma.$transaction(async (tx) => {
        await tx.savedEvent.deleteMany();
        await tx.user.deleteMany();
        await tx.event.deleteMany();
        await tx.organizer.deleteMany();
        await tx.location.deleteMany();

        for (const location of locations) {
          await tx.location.create({ data: {
            id: location.id,
            venue: location.venue,
            address: location.address,
            city: location.city,
            province: location.province,
            postalCode: location.postalCode
          }})
        }

        for (const organizer of organizers) {
          await tx.organizer.create({ data: {
            id: organizer.id,
            name: organizer.name,
            description: organizer.description,
            email: organizer.email,
            phone: organizer.phone,
            website: organizer.website,
            image: organizer.image,
            locationId: organizer.locationId
          }})
        }
        
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
            locationId: event.locationId
          }})
        }

        for (const user of users) {
          await tx.user.create({ data: {
            id: user.id,
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            passwordHash: user.passwordHash,
            image: user.image
          }})
        }

        for (const savedEvent of savedEvents) {
          await tx.savedEvent.create({ data: {
            savedEventId: savedEvent.savedEventId,
            userId: savedEvent.userId,
            eventId: savedEvent.eventId
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
