import './App.css'
import GamePage from './pages/GamePage'
import { DeckProvider } from './Contexts/DeckContext'

function App() {

  return (
    <DeckProvider>
    <div>
     <GamePage/>
    </div>
    </DeckProvider>
  )
}

export default App
