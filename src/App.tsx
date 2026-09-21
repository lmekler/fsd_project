import './App.css'

// Common Component Imports
import { Header } from './components/common/layout/header/Header'
import { Footer } from './components/common/layout/footer/Footer'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'


function App() {
  return (
    <>
      <Header/>
      <BrowseEvents/>
      <SavedEvents/>
      <Organizers/>
      <Footer/>
    </>
  )
}

export default App
