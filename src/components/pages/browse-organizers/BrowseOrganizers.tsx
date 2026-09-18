import type { Organizer } from "../../types/Organizer"
import organizerData from "../../../data.json"

function Organizers() {
    const organizers: Organizer[] = organizerData.organizers

    return (
        <section className="organizers">
            <h2>Event Organizers</h2>

            {organizers.map((organizer) => (
                <section className="{organizer.id}">
                    <h3 className="name">{organizer.name}</h3>
                    <p className="description">{organizer.description}</p>
                    <p className="website">Website: <a href="#">{organizer.website}</a></p>
                    <p className="email">Email: {organizer.email}</p>
                    <p className="phone-number">Phone Number: {organizer.phone}</p>
                    <p className="location">Location: {organizer.location.city}, {organizer.location.province}</p>
                </section>
            ))}    
        </section>
    );
}

export default Organizers;
