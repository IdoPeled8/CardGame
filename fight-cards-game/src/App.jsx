import { Route, Routes } from 'react-router-dom'
import { GameProvider } from './Contexts/GameContext'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import SimpleLink from './components/ui/Link/SimpleLink';
import './components/Card/Card.css'
import './App.css'
import './components/Buttons.css'

import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
        
//theme
import "primereact/resources/themes/lara-light-indigo/theme.css";
        
import BasicDemo from './components/NavBar';
        


function App() {

  return (
    <>
    <PrimeReactProvider>
    <nav>
      <div>
        <SimpleLink className="myBtn2" to={'/'}>Home</SimpleLink>
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
    </PrimeReactProvider>
    </>
  )
}

export default App
