// Main Imports
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Common Component Imports
import { Layout } from './components/common/layout/Layout'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'
import { useState } from 'react'
import eventData from "../src/data/data.json"

// Type Imports
import type { Event } from './types/Event'
import type { Organizer } from './types/Organizer'


function App() {
  const [events, setEvents] = useState<Event[]>(eventData.events)
  const [savedEvents, setSavedEvents] = useState<Event[]>([]); // Currently loading the sample data
  const [organizers, setOrganizers] = useState<Organizer[]>(eventData.organizers);

  // Logic for saving and removing events
  const saveEvent = (event: Event) => {
    // Using the setSavedEvents state here instead of the component
    setSavedEvents((currentSaved) => [
      ...currentSaved,
      event
    ])
  }

  const removeSavedEvent = (eventId: string) => {
    setSavedEvents((currentSaved) => currentSaved.filter(
      (event) => event.id !== eventId
    ))
  }

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element=
          {
            <BrowseEvents
              events={events}
              setEvents={setEvents}
              saveEvent={saveEvent}
            />
          }
        />

        <Route path="/browse-events" element=
          {
            <BrowseEvents
              events={events}
              setEvents={setEvents}
              saveEvent={saveEvent}
            />
          }
        />

        <Route path="/saved-events" element={
          <SavedEvents 
            savedEvents={savedEvents}
            removeSavedEvent={removeSavedEvent}/>
        }/>

        <Route path="/organizers">
          <Route index element={<Organizers
              organizers={organizers}
              setOrganizers={setOrganizers}
            />}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
