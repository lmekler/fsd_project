import { useState } from "react"
import type { CreateOrganizer } from "../../../types/Organizer"
import { provinces } from "../../../types/Province";
import Button from "../../common/button/Button";
import { useOrganizer } from "../../../hooks/useOrganizer";
import { OrganizerList } from "./organizer-list/OrganizerList";

function Organizers() {
    const {
        organizers,
        loading,
        errors,
        addOrganizer,
        removeOrganizer
    } = useOrganizer();

    // Defines organizer with default values
    const defaultOrganizer: CreateOrganizer = {
        name: '',
        description: '',
        website: '',
        email: '',
        phone: '',
        location: {
            address: '',
            city: '',
            province: 'Manitoba',
            postalCode: ''
        },
        image: ''
    }

    const [formData, setFormData] = useState(defaultOrganizer);

    const handleChange = (e: any): void => {
        const {name, value} = e.target;

        if (name === "address" 
        || name === "city"
        || name === "province"
        || name === "postalCode") {
            setFormData(prev => ({
                ...prev,
                location: {
                    ...prev.location,
                    [name]: value
                }
            }));
        } else {
            setFormData((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    }

    async function handleAddOrganizer(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const newOrganizer: CreateOrganizer = {
            name: formData.name,
            description: formData.description,
            website: formData.website,
            email: formData.email,
            phone: formData.phone,
            image: formData.image,
            location: {
                address: formData.location.address,
                city: formData.location.city,
                province: formData.location.province,
                postalCode: formData.location.postalCode
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
                    removeOrganizer={removeOrganizer}
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
                                onChange={handleChange} 
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
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            Email:
                            <input 
                                name="email" 
                                value={formData.email}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            Phone Number:
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <hr />
                        <p className="form-label">Location:</p>
                        <label className="form-label">
                            Address:
                            <input 
                                name="address"
                                value={formData.location.address} 
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                        </label>
                        <label className="form-label">
                            City:
                            <input 
                                name="city"
                                value={formData.location.city} 
                                onChange={handleChange}
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
                                onChange={handleChange}
                                className="form-control"
                            >
                                {provinces.map(p => {
                                    return <option key={p} value={p}>{p}</option>
                                })};
                            </select>
                        </label>
                        <label className="form-label">
                            Postal Code:
                            <input 
                                name="postalCode"
                                value={formData.location.postalCode} 
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
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
