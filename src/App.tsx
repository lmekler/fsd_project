// Main Imports
import { Routes, Route } from 'react-router-dom'

// Common Component Imports
import { Layout } from './components/common/layout/Layout'
import NotFound from './components/pages/NotFound'

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
  const [organizers, setOrganizers] = useState<Organizer[]>(eventData.organizers);

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        {/* <Route index element=
          {
            <BrowseEvents
              events={events}
              setEvents={setEvents}
              saveEvent={saveEvent}
            />
          }
        /> */}

        {/* <Route path="/browse-events" element=
          {
            <BrowseEvents
              events={events}
              setEvents={setEvents}
              saveEvent={saveEvent}
            />
          }
        /> */}

        <Route path="saved-events/:userId" element={
          <SavedEvents />
        }/>

        <Route path="/organizers">
          <Route index element={<Organizers
              organizers={organizers}
              setOrganizers={setOrganizers}
            />}/>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
