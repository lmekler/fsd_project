# Saved Events Architecture

**Author**: Patrick Arevalo
**Date**: October 26, 2026

## SavedEvents Design

Saved Events is built on a three-layer architecture (Hook-Service-Repo) for the separation
of concerns, ease of debugging, and maintainability. Each implementation is discussed in more detail below.

### useSavedEvents() Hook

This hook is largely dependent on user-based interaction and therefore requires a `userId` parameter.

It defines the following states:

```typescript
const [savedEvents, setSavedEvents] = useState<SavedEventWithDetails[]>([]);
const [searchTerm, setSearchTerm] = useState<string>("")
const [categoryFilters, setCategoryFilters] = useState<string>("")
```

- `savedEvents` is an array for user-saved events with three keys (`savedEventId`, `userId`, `eventId`) and properties associated with the `Event` data structure.
- `searchTerm` is a string value for keyword filtering
- `categoryFilters` is a string value for category-based filtering

The hook also uses `useEffect()` and `useCallback` to rerender `savedEvents` when a new event is added (`addSavedEvent`) or removed (`removeSavedEvent`).

No business logic is found inside this hook as it is solely responsible for defining states, receiving changes to these states, and exposing them back to the components that invoke them. This allows for logic changes in services while keeping the communication between services and components intact.

#### Use Case: SavedEvents Page render

Despite the definition of `savedEvents` at the Hook level, what is actually implemented at the SavedEvents page level is `filteredSavedEvents` since the events displayed on the page will largely depend on if any filters such as `searchTerm` or `categoryFilters` are present.

Upon initial load, SavedEvents loads `filteredSavedEvents` and passes it through a component. Categories in the filter form are populated based on the main `savedEvents` array. If the user doesn't have any items inside `savedEvents`, there will be a message indicating it. Different `userId` will render different events, representing user-related data.

The `Button` component calls the `removeSavedEvent` hook on click.

#### Use Case: Adding an event from BrowseEvents page

In the BrowseEvents page, the `addSavedEvent` hook is used on the `Button` for saving events.

### savedEventsService

The following services are defined:

- `getSavedEventsByUser`: Returns an array of Saved Events based on the user logged in. Requires `userId`.

  - Calls the method of the same name from the Repo which only contains an array of keys.
  - Iterates through the array, calling the BrowseEvents service, getEventById, to check the corresponding event from its ID and "appends" it to the entry.
  - Builds a new array with both keys and event properties and returns it.

- `filterSavedEvents`: Returns an array fo Saved Events based on `searchTerm` and `categoryFilters` exposed by the Hook. Requires `userId`.

  - Contains the already established filtering logic from forms.
  - Returns the filteredArray as a new array.

- `addSavedEvent`: Returns a new array of Saved Events that includes the newly added Event. Requires `userId` and `eventId`.

  - Generates a new `savedEventId`.
  - Builds a new array object to pass to the Repo method of the same name.
  - Calls the new array using `getEventsByUserId` and returns it.

- `removeSavedEvent`: Returns a new array of Saved Events after removing an event based on `eventId`. Requires `userId` and `savedEventId` to prevent users from removing other users' saved events.

  - Checks to see if the Saved Event exists using the Repo method `getSavedEventById` using `savedEventId`.
  - If the Saved Event exists, calls the method of the same name in the Repo.
  - In all cases, the Saved Events array is returned via `getEventsByUserId`.

The services layer contains all the business logic of the resource and prepares the object to be passed at the Repo layer connected to a source of truth such as a database. This allows changes in business logic to remain in one place, which may include error handling in the future.

This layer is also the last layer which handles the data type `SavedEventsWithDetails` as it returns arrays with objects that have the `Event` data type appended on each.

### savedEventsRepo

This layer handles logic that concerns the source of truth such as a database. Here, the objects do not have Event properties as the data structure for a Saved Event only contains `savedEventId`, `userId`, and `eventId` as properties.

The methods defined here are:

- `getAllSavedEvents`: Returns all the objects in the array.
- `getSavedEventsByUser`: Returns all objects in the array that matches the `userId` argument.
- `getSavedEventById`: Returns a single Saved Event object that matches the `savedEventId` argument.
- `addSavedEvent`: Appends the Saved Event object built from the service layer of the same name into the array and returns the Saved Event object.
- `removeSavedEvent`: Splices the Saved Event object from the array that matches the `savedEventId` argument.

Currently anything referencing the "array" is the source of truth at the writing of this document. However, this array, along with the methods of the Repo can be connected to a database instead for persistence while maintaining the core logic.
