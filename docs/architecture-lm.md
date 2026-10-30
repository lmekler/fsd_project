# Browse Events Architecture

**Author**: Leann Mekler
**Date**: October 29, 2026

## 1. Hooks

### `useEvents`

**What does it do?**

The `useEvents` hook manages event data for React components. It provides functions to retrieve, add, and remove events, as well as maintaining the current list of events in React state.

**How was the logic separated?**

The hook is responsible for managing the React state associated with events. Instead of placing event management logic directly inside components, the hook provides reusable functions that components can call.

**Where is it used?**

The hook is used by components that need to interact with event data. `BrowseEvents` uses it to retrieve the event list and add or remove events.

### `useFormInput`

**What does it do?**

The `useFormInput` hook manages the state and validation information for an individual form input.

It stores:

- The input value.
- Any validation error associated with the input.
- A `setValue` function to update the input.
- A `validate` function to check the input against a supplied validation rule.

**How was the logic separated?**

Input state and validation feedback are reusable concerns that do not need to be implemented separately for every form field.

The hook does not decide which validation rules apply to each field. It accepts a validation function so the validation rules can be passed to the hook. This allows the form to supply the appropriate validation rules while the hook manages the value and error state.

The `validate` function passes the current input value to the supplied validation function and stores the resulting error message, returning whether or not the input is valid.

**Where is it used?**

It is used in `NewEventForm` to create and manage the individual form fields. The form calls each field's `validate` function when checking whether the event can be submitted.

## 2. Services

### `EventService`

**What does it do?**

The `EventService` handles the business logic associated with events. It provides functions to retrieve, add, and remove events.

It also validates events before they are added. For example, it checks that required information such as the image, title, date, and location details has been provided.

**How was the logic separated?**

The `EventService` is responsible for handling event-related business logic, including validating event information before it is added. Keeping validation in the service ensures that business rules are handled in one central location rather than being repeated throughout different components.

When validation fails, the service throws an error. This allows the calling component to handle the error appropriately.

**Where is it used?**

The service is used by the `useEvents` hook. When a component calls `addEvent`, the hook passes the event to the service. The service validates the event before asking the repository to store it.

## 3. Repositories

### `EventRepository`

**What does it do?**

The `EventRepository` is responsible for managing event data storage and retrieval. It provides operations such as retrieving all events, finding an event by its ID, adding an event, and removing an event.

**How was the logic separated?**

The repository separates data access from business logic. It focuses on how event data is stored and retrieved, rather than deciding whether an event is valid.

This means the service can use the repository without needing to know the details of the storage implementation. If the storage method changes in the future, the repository can be updated without needing to make major changes to the service or components.

**Where is it used?**

The repository is used by `EventService`. The service calls the repository when it needs to retrieve, add, or remove event data.
