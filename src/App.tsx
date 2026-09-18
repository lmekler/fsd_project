import './App.css'
<<<<<<< HEAD
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'
=======
>>>>>>> c39dbcfdead1070b6010e2fefcd2e8ae563fbc2e

// Common Component Imports
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer/Footer'

// Feature Imports
import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'
import SavedEvents from './components/pages/saved-events/SavedEvents'


function App() {
  return (
    <>
      <Header/>
<<<<<<< HEAD
      <Organizers/>
=======
      <BrowseEvents/>
      <SavedEvents/>
>>>>>>> c39dbcfdead1070b6010e2fefcd2e8ae563fbc2e
      <Footer/>
    </>
  )
}

export default App
