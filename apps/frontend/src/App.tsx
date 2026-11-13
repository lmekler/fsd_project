// Main Imports
import { Routes, Route } from 'react-router-dom'

// Common Component Imports
import { Layout } from './components/common/layout/Layout'
import NotFound from './components/pages/NotFound'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'


function App() {

  return (
    <Routes>
      <Route path="/" element={<Layout/>}>

        <Route index element=
          {
            <BrowseEvents/>
          }
        />

        <Route path="/browse-events" element=
          {
            <BrowseEvents/>
          }
        />

        <Route path="saved-events/:userId?" element={
          <SavedEvents />
        }/>

        <Route path="/organizers">
          <Route index element={
            <Organizers/>
          }/>
        </Route>
        
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}

export default App
