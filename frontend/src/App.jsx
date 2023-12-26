import { useState } from 'react'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Roster from './pages/Roster'
import Users from './pages/Users'
import Statistics from './pages/Statistics'
import './App.css'
import AddPlayer from './pages/AddPlayer'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='App'>
        <BrowserRouter>
           <Routes>
                <Route path="/" element={<Roster/>}/>
                <Route path="/users" element={<Users/>}/>
                <Route path="/add" element={<AddPlayer/>}/>
                <Route path="/stats" element={<Statistics/>}/>
            </Routes> 
        </BrowserRouter>
        
    </div>
  )
}

export default App
