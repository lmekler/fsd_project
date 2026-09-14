import './App.css'

import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer/Footer'

import { BrowseEvents } from './components/pages/browse-events/BrowseEvents'

function App() {
  return (
    <>
      <Header/>
      <BrowseEvents/>
      <Footer/>
    </>
  )
}

export default App
