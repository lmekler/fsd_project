import type { Organizer } from "../../../types/Organizer";
import { OrganizerListItem } from "./OrganizerListItem";

interface OrganizerListProps {
  organizers: Organizer[];
  removeOrganizer: (id: string) => Promise<boolean>;
}

export function OrganizerList({
  organizers,
  removeOrganizer,
}: OrganizerListProps) {
  if (organizers.length === 0) {
    return <p className="errors">No organizers found.</p>;
  }
  
  return (
    <section className="flex flex-col gap-6">
        <h2 className="page-title mb-6">Event Organizers</h2>
        {organizers.map((organizer) => (
            <OrganizerListItem
                key={organizer.id}
                organizer={organizer}
                removeOrganizer={removeOrganizer}
            />
        ))}
    </section>
  );
}