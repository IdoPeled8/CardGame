import { Route, Routes } from 'react-router-dom'

import { GameProvider } from './Contexts/GameContext'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import SimpleLink from './components/ui/Link/SimpleLink';
import BasicExample from './components/NavBar'
import './components/Card/Card.css'
import './App.css'


function App() {

  return (
    <>
    <nav>
      <div>
        <BasicExample/>

        <SimpleLink to={'/'}>Home</SimpleLink>
        <SimpleLink className='btn btn-info link'  to='/rules'>rules</SimpleLink>
      </div>
      <br/>
    </nav>
    <GameProvider>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/gamePage' element={<GamePage />}/>
      <Route path='/rules' element={<h1>Game Ruels</h1>}/>
      {/* if nothing mathches this route will catch */}
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
    </GameProvider>
    </>
  )
}

export default App
