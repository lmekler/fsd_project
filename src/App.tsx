import './App.css'

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
      <BrowseEvents/>
      <SavedEvents/>
      <Footer/>
    </>
  )
}

export default App
