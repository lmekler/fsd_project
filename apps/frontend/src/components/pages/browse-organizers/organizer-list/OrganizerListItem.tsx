import type { Organizer } from "../../../../types/Organizer";
import Button from "../../../common/button/Button";

interface OrganizerListItemProps {
  organizer: Organizer;
  removeOrganizer: (id: string) => Promise<boolean>;
}

export function OrganizerListItem({
  organizer,
  removeOrganizer
}: OrganizerListItemProps) {
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
                    onClick={() => {
                        void removeOrganizer(organizer.id);
                    }}
                >
                    Remove
                </Button>
            </article>
        </section>
    );
}