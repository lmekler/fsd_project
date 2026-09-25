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
      <Route path="/" element={<Layout/>}>

        <Route index element={<BrowseEvents />}/>

        <Route path="/browse-events" element={<BrowseEvents />}>
          <Route index element={<BrowseEvents/>}/>
        </Route>

        <Route path="/saved-events" element={<SavedEvents />}>
          <Route index element={<SavedEvents/>}/>
        </Route>

        <Route path="/organizers" element={<Organizers />}>
          <Route index element={<Organizers/>}/>
        </Route>

      </Route>
    </Routes>
  )
}

export default App
