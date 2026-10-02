import { useState, type JSX } from "react"
import type { Organizer } from "../../types/Organizer"
import { provinces } from "../../types/Province";
import Button from "../../common/button/Button";

function Organizers({
        organizers,
        setOrganizers
    }:
    {
        organizers: Organizer[],
        setOrganizers: React.Dispatch<React.SetStateAction<Organizer[]>>
    }): JSX.Element {

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
        }
    }

    const organizerErrors = {
        name: '',
        description: '',
        website: '',
        email: '',
        phone: '',
        location: {
            city: ''
        }
    }

    const [formData, setFormData] = useState(defaultOrganizer);

    const [errors, setErrors] = useState(organizerErrors);

    const validateForm = (): boolean => {
        let isValid: boolean = true;
        const newErrors = organizerErrors;

        const websiteRegex = /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        const phoneRegex = /^\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

        if (formData.name.trim().length < 3) {
            newErrors.name = "First name must be at least 3 characters long.";
            isValid = false;
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required.";
            isValid = false;
        }

        if (!websiteRegex.test(formData.website)) {
            newErrors.website = "Website is invalid.";
            isValid = false;
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Email is invalid.";
            isValid = false;
        }

        if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid.";
            isValid = false;
        }

        if (!formData.location.city.trim()) {
            newErrors.location.city = "City is required.";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    }

    function GenerateId (): string {
        const prefix: string = "org-";
        const zerosNeeded: number = Math.max(0, 3 - organizers.length.toString().length);

        return prefix + "0".repeat(zerosNeeded) + (organizers.length + 1).toString();
    }

    const handleChange = (e: React.ChangeEvent<HTMLFormElement>): void => {
        const {name, value} = e.target;

        if (name === "city" || name === "province") {
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

        // Clears error once field is updated
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        };
    }

    const handleAddOrganizer = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        if (!validateForm()) return;

        const newOrganizer: Organizer = {
            id: GenerateId(),
            name: formData.name,
            description: formData.description,
            website: formData.website,
            email: formData.email,
            phone: formData.phone,
            location: {
                city: formData.location.city,
                province: formData.location.province,
                country: formData.location.country
            }
        }

        setOrganizers(prevOrganizers => [
            ...prevOrganizers,
            newOrganizer
        ])

        setFormData(defaultOrganizer);
    }

    const handleRemoveOrganizer = (id: string) => {
        setOrganizers((prevOrganizers) => prevOrganizers.filter(
            (organizer) => organizer.id !== id
        ));
    }

    const organizerListItem: JSX.Element[] = organizers.map(organizer => {
        return (
            <section className="surface-card flex flex-col gap-4 p-6 sm:flex-row sm:items-start sm:justify-between" key={organizer.id}>
                <article className="flex-1">
                    <h3 className="section-title mb-4" key={organizer.id + "name"}>
                        {organizer.name}
                    </h3>

                    <div className="muted-text mb-4 flex flex-col gap-1">
                        <p className="font-medium text-text" key={organizer.id + "website"}>
                            Website: <a href="#">{organizer.website}</a>
                        </p>

                        <p className="font-medium text-text" key={organizer.id + "email"}>Email: {organizer.email}</p>
                        <p className="font-medium text-text" key={organizer.id + "phone"}>Phone Number: {organizer.phone}</p>
                    </div>
                    
                    <p className="body-text mb-4 leading-relaxed" key={organizer.id + "description"}>
                        {organizer.description}
                    </p>

                    <p className="muted-text mb-4 flex flex-col gap-1" key={organizer.id + "location"}>
                        Location: {organizer.location.city}, {organizer.location.province}
                    </p>
                    <Button 
                        variant="danger"
                        size="sm"
                        onClick={() => handleRemoveOrganizer(organizer.id)}
                    >
                        Remove
                    </Button>
                </article>
            </section>
        )
    })
    
    return (
        <section className="page-container grid grid-cols-1 gap-8 py-8 ">
            <div className="flex flex-col gap-10">
                <section className="flex flex-col gap-6">
                    <h2 className="page-title mb-6">Event Organizers</h2>
                    {organizerListItem}
                </section>
                
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
                            />
                            {errors.name && <span className="form-error" style={{ color: 'red' }}>{errors.name}</span>}
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
                            />
                            {errors.description && <span className="form-error" style={{ color: 'red' }}>{errors.description}</span>}
                        </label>
                        <hr />
                        <label className="form-label">
                            Website:
                            <input 
                                name="website" 
                                value={formData.website} 
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.website && <span className="form-error" style={{ color: 'red' }}>{errors.website}</span>}
                        </label>
                        <label className="form-label">
                            Email:
                            <input 
                                name="email" 
                                value={formData.email} 
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.email && <span className="form-error" style={{ color: 'red' }}>{errors.email}</span>}
                        </label>
                        <label className="form-label">
                            Phone Number:
                            <input 
                                name="phone" 
                                value={formData.phone} 
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.phone && <span className="form-error" style={{ color: 'red' }}>{errors.phone}</span>}
                        </label>
                        <hr />
                        <p className="form-label">Location:</p>
                        <label className="form-label">
                            City:
                            <input 
                                name="city" 
                                value={formData.city} 
                                onChange={handleChange}
                                className="form-control"
                            />
                            {errors.location.city && <span className="form-error" style={{ color: 'red' }}>{errors.location.city}</span>}
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
                </section>
            </div>
        </section>
    );
}

export default Organizers;
