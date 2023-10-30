import {BrowserRouter, Route, Routes } from 'react-router-dom'
import { GameProvider } from './Contexts/GameContext'
import GamePage from './pages/GamePage'
import HomePage from './pages/HomePage'
import './components/Card/card.css'
import './App.css'
import './components/Buttons.css'
import NavBar from './NavBar/NavBar';
import RulesPage from './pages/RulesPage'
import ProfilePage from './pages/ProfilePage'
import LoginPage from './pages/LoginPage'


function App() {

  return (
    <>
    <GameProvider>
      {/* <BrowserRouter> */}
      <NavBar></NavBar>
      <br/>
    <Routes>
      <Route path='/' element={<HomePage />}/>
      <Route path='/gamePage' element={<GamePage />}/>
      <Route path='/rules' element={<RulesPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      {/* if nothing mathches this route will catch */}
      <Route path='*' element={<h1>Not Found</h1>}/>
    </Routes>
    {/* </BrowserRouter> */}
    </GameProvider>
    </>
  )
}

export default App
