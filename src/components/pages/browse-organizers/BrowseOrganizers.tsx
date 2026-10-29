import { useState } from "react"
import type { CreateOrganizer, Organizer } from "../../types/Organizer"
import { provinces } from "../../types/Province";
import Button from "../../common/button/Button";
import { useOrganizer } from "../../../hooks/useOrganizer";
import { OrganizerList } from "./organizer-list/OrganizerList";

function Organizers() {
    const {
        organizers,
        loading,
        errors,
        addOrganizer
    } = useOrganizer();

    // Defines organizer with default values
    const defaultOrganizer: Organizer = {
        id: '',
        name: '',
        description: '',
        website: '',
        email: '',
        phone: '',
        location: {
            city: '',
            province: 'Manitoba',
            country: 'Canada'
        },
        image: ''
    }

    const [formData, setFormData] = useState(defaultOrganizer);

    async function handleAddOrganizer(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newOrganizer: CreateOrganizer = {
            name: formData.name,
            description: formData.description,
            website: formData.website,
            email: formData.email,
            phone: formData.phone,
            location: {
                city: formData.location.city,
                province: formData.location.province
            }
        }

        const added = await addOrganizer(newOrganizer);

        if (added) {
            setFormData(defaultOrganizer);
        }
    }
    
    return (
        <section className="page-container grid grid-cols-1 gap-8 py-8 ">
            <div className="flex flex-col gap-10">
                {loading ? (
                    <p>Loading organizers...</p>
                ) : (
                    <OrganizerList
                    organizers={organizers}
                    removeOrganizer={}
                    />
                )}
                
                <section className="surface-card v-fit p-6 md:sticky md:top-6">
                    <h3 className="subsection-title mb-6">Add New Organizer</h3>
                    <form className="flex flex-col gap-6" method="post" onSubmit={handleAddOrganizer}>
                        <label className="form-label">
                            Name:
                            <input 
                                name="name" 
                                value={formData.name} 
                                className="form-control"
                                required
                            />
                        </label>
                        <hr />
                        <label className="form-label">
                            Description:
                            <textarea 
                                name="description" 
                                value={formData.description} 
                                rows={5}
                                cols={40}
                                className="form-control"
                                required
                            />
                        </label>
                        <hr />
                        <label className="form-label">
                            Website:
                            <input 
                                name="website" 
                                value={formData.website} 
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            Email:
                            <input 
                                name="email" 
                                value={formData.email} 
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            Phone Number:
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                className="form-control"
                                required
                            />
                        </label>
                        <hr />
                        <p className="form-label">Location:</p>
                        <label className="form-label">
                            City:
                            <input 
                                name="city" 
                                // value={formData.city} 
                                value={formData.location.city} 
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            Province:
                            <select 
                                name="province" 
                                id="province" 
                                value={formData.location.province}
                                className="form-control"
                            >
                                {provinces.map(p => {
                                    return <option key={p} value={p}>{p}</option>
                                })};
                            </select>
                        </label>
                        <hr />
                        <Button
                            variant="danger"
                            size="sm"
                            type="submit"
                        >
                            Add Organizer
                        </Button>
                    </form>
                    {errors && <p className="errors" role="alert">{errors}</p>}
                </section>
            </div>
        </section>
    );
}

export default Organizers;
