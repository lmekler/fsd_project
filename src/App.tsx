import './App.css'
import { Header } from './components/common/header/Header'
import { Footer } from './components/common/footer'
import Organizers from './components/pages/browse-organizers/BrowseOrganizers'

function App()
{
  return (
    <>
      <Header/>
      <Organizers/>
      <Footer/>
    </>
  )
}

export default App
