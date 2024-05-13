import { useEffect, useState } from 'react'
import Lista from './components/Lista'
function App() {
  const [search, setSearch] = useState("");
  return (
    <>
    <h1>Bienvenido a la web de rick and morty</h1>
    <input type="text" value={search} onChange={(e)=>
      setSearch(e.target.value)
    }/>
   <Lista search={search}/>
   
      
    </>
  )
}

export default App
