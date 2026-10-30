# Browse Organizers Architecture

**Author**: Chan Madut
**Date**: October 29, 2026

## 1. Hooks

### `useOrganizers`

**What does it do?**

The `useOrganizers` hook manages organizer data for React components. It provides functions to retrieve, add, and remove organizers, as well as maintaining the current list of organizers in React state.

**How was the logic separated?**

The hook is responsible for managing the React state associated with organizers. Instead of placing the organizer management logic directly inside components, the hook provides reusable functions that components can call to handle the data.

**Where is it used?**

The hook is used by components that need to interact with organizer data. `BrowseOrganizers` uses it to load, add, and remove organizers.

## 2. Services

### `organizerService`

**What does it do?**

The `organizerService` handles the business logic associated with organizers. It provides functions to retrieve, add, and remove organizers. It also validates organizers before they are added, such as verifying the phone number is in the correct format.

**How was the logic separated?**

The `organizerService` is responsible for handling organizer-related business logic, including validating organizer information before it is added. Keeping validation in the service ensures that business rules are handled in one central location rather than being repeated throughout different components. When validation fails, the service throws an error. This allows the calling component to handle the error appropriately.

**Where is it used?**

The service is used by the `useOrganizers` hook. When a component calls `addOrganizer`, the hook passes the organizer to the service. The service validates the organizer before asking the repository to store it.

## 3. Repositories

### `organizerRepository`

**What does it do?**

The `organizerRepository` is responsible for managing organizer data storage and retrieval. It provides operations such as retrieving all organizers, adding an organizer, and removing an organizer.

**How was the logic separated?**

The repository separates data access from business logic. It focuses on how all organizer data is stored and retrieved. It allows the data access to be handled and updated via this file without having to adjust any business logic or React state logic.

**Where is it used?**

The repository is used by `organizerService`. The service calls the repository when it needs to retrieve, add, or remove organizer data.
