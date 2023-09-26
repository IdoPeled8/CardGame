import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { DeckProvider } from './Contexts/DeckContext'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import 'bootstrap/dist/css/bootstrap.css';
import SimpleLink from './components/ui/Link/SimpleLink';


function App() {

  return (
    <>
    <nav>
      <div>
        <SimpleLink to={'/'}>Home</SimpleLink>
        <SimpleLink className='btn btn-info link'  to='/rules'>rules</SimpleLink>
      </div>
      <br/>
    </nav>
    <DeckProvider>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/gamePage' element={<GamePage />}/>
      <Route path='/rules' element={<h1>Game Ruels</h1>}/>
      {/* if nothing mathches this route will catch */}
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
    </DeckProvider>
    </>
  )
}

export default App
