import './App.css'

// Common Component Imports
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer/Footer'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'


function App() {
  return (
    <>
      <Header/>
<<<<<<<<< Temporary merge branch 1
      <Organizers/>
=========
      <BrowseEvents/>
      <SavedEvents/>
>>>>>>> c39dbcfdead1070b6010e2fefcd2e8ae563fbc2e
      <Organizers/>
      <Footer/>
    </>
  )
}

export default App
