import { useState, type JSX } from "react"
import type { Organizer } from "../../types/Organizer"
import { provinces } from "../../types/Province";

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

        if (!formData.website.trim()) {
            newErrors.website = "Website is required.";
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

    const organizerListItem: JSX.Element[] = organizers.map(organizer => {
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
                    {errors.name && <span className="error-message" style={{ color: 'red' }}>{errors.name}</span>}
                </label>
                <label>
                    Description:
                    <input name="description" />
                    {errors.description && <span className="error-message" style={{ color: 'red' }}>{errors.description}</span>}
                </label>
                <hr />
                <label>
                    Website:
                    <input name="website" />
                    {errors.website && <span className="error-message" style={{ color: 'red' }}>{errors.website}</span>}
                </label>
                <label>
                    Email:
                    <input name="email" />
                    {errors.email && <span className="error-message" style={{ color: 'red' }}>{errors.email}</span>}
                </label>
                <label>
                    Phone Number:
                    <input name="phone" />
                    {errors.phone && <span className="error-message" style={{ color: 'red' }}>{errors.phone}</span>}
                </label>
                <hr />
                <p>Location:</p>
                <label>
                    City:
                    <input name="city" />
                    {errors.location.city && <span className="error-message" style={{ color: 'red' }}>{errors.location.city}</span>}
                </label>
                <label>
                    Province:
                    <select name="province" id="province" value={formData.location.province}>
                        {provinces.map(p => {
                            return <option key={p} value={p}>{p}</option>
                        })};
                    </select>
                </label>
                <hr />
                <button type="submit">Add Organizer</button>
            </form>
        </section>
    );
}

export default Organizers;
