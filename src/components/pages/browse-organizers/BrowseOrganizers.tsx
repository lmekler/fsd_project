import type { Organizer } from "./organizer"
import organizerData from "../../../data.json"

function Organizers() {
    const organizers: Organizer[] = organizerData.organizers

    return (
        <section className="organizers">
            <h1>Event Organizers</h1>

            {
                organizers.map((organizer) => 
                    <section className="{organizer.id}">
                        <h2>{organizer.name}</h2>
                        <p>{organizer.description}</p>
                        <p>Website: {organizer.website}</p>
                        <p>Email: {organizer.email}</p>
                        <p>Phone Number: {organizer.phone}</p>
                    </section>
                )
            }
        </section>
    )
}

export default Organizers;
