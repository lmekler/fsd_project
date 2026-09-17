import type { Organizer } from "./organizer"
import organizerData from "../../../data.json"

function Organizers() {
    const organizers: Organizer[] = organizerData.organizers

    return (
        <section className="organizers">
            <h1>Event Organizers</h1>

            {organizers.map((organizer) => (
                <section className="{organizer.id}">
                    <h2 className="name">{organizer.name}</h2>
                    <p className="description">{organizer.description}</p>
                    <p className="website">Website: <a href="#">{organizer.website}</a></p>
                    <p className="email">Email: {organizer.email}</p>
                    <p className="phone-number">Phone Number: {organizer.phone}</p>
                    <p className="location">Location:</p>
                    <ul>
                        <li className="city">City: {organizer.location.city}</li>
                        <li className="province">Province: {organizer.location.province}</li>
                        <li className="country">Country: {organizer.location.country}</li>
                    </ul>
                </section>
            ))}    
        </section>
    );
}

export default Organizers;
