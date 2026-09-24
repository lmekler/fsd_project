// Main Imports
import { Routes, Route } from 'react-router-dom'
import './App.css'

// Common Component Imports
import { Layout } from './components/common/layout/Layout'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'


function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>

        {/* All child pages that will have Layout as a render goes below */}

        <Route index 
          element={<BrowseEvents />}
        />

        <Route path="/saved-events"
          element={<SavedEvents />}
        />

        <Route path="/organizers"
          element={<Organizers />}
        />

      </Route>
    </Routes>
  )
}

export default App
