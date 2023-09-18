import './App.css'
import { DeckProvider } from './Contexts/DeckContext'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'

function App() {

  return (
    <DeckProvider>
      <div>
        <HomePage />
        <GamePage />
      </div>
    </DeckProvider>
  )
}

export default App
