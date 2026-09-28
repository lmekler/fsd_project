import type { Organizer } from "../../types/Organizer"

function Organizers({
        organizers,
        setOrganizers
    }:
    {
        organizers: Organizer[],
        setOrganizers: React.Dispatch<React.SetStateAction<Organizer[]>>
    }) {

    const organizerListItem = organizers.map(organizer => {
        return <section className="organizer" key={organizer.id}>
            <h3 className="name" key={organizer.id + "name"}>{organizer.name}</h3>
            <p className="description" key={organizer.id + "description"}>{organizer.description}</p>
            <p className="website" key={organizer.id + "website"}>Website: <a href="#">{organizer.website}</a></p>
            <p className="email" key={organizer.id + "email"}>Email: {organizer.email}</p>
            <p className="phone-number" key={organizer.id + "phone"}>Phone Number: {organizer.phone}</p>
            <p className="location" key={organizer.id + "location"}>Location: {organizer.location.city}, {organizer.location.province}</p>
        </section>
    })

    
    return (
        <section className="organizers">
            <section className="organizerList">
                <h2>Event Organizers</h2>
                {organizerListItem}
            </section>
            
            <form method="post" onSubmit={handleAddOrganizer} onChange={handleChange}>
                <label>
                    Name:
                    <input name="name" />
                </label>
                <label>
                    Description:
                    <input name="description" />
                </label>
                <hr />
                <label>
                    Website:
                    <input name="website">
                </label>
                <hr />
                <button type="submit">Add Organizer</button>
            </form>
        </section>
    );
}



export default Organizers;
