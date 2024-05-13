import { useState } from 'react'
import './App.css'
import Feriados from './components/Feriados'

function App() {
  const [search, setSearch] = useState(0)

  return (
    <>
      <h1>Cuanto Farta Pal 18 Cabros</h1>
      <input type="text" value={search} onChange={(e)=>
      setSearch(e.target.value)
    }/>
      <Feriados search={search} />
      
      
    </>
  )
}

export default App
