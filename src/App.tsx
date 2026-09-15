import './App.css'
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer'

import SavedEvents from './components/pages/saved-events/SavedEvents'

function App() {
  return (
    <>
      <Header />
      <SavedEvents/>
      <Footer />
    </>
  )
}

export default App
