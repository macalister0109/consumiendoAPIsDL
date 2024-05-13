import { useState, useEffect } from "react";

const Lista = ({search}) => {
    const [personajeAPI, setPersonajeAPI] = useState([]);    
    const url ="https://rickandmortyapi.com/api/character/";
    const traerPersonajes= async()=>{
        try{
          const data = await fetch(url);      
          const resultado = await data.json();
          const personajes = resultado.results;
          setPersonajeAPI(personajes);
          console.log(personajes);
          
        }catch(error){
          console.log("No trae los datos")
        }
      };
      useEffect(() => {
        traerPersonajes();
      }, []);
      let personajeAMostrar = [];
      if(search === ""){
        personajeAMostrar = personajeAPI;
      }else{
        personajeAMostrar = personajeAPI.filter(personaje=>
            personaje.name.toLowerCase().includes(search.toLowerCase()));  
    }
    return(
       <>
        <div>
      {
        personajeAMostrar.map((personaje,id)=> 
          (      
            <p key={id}>{ `${personaje.id}`} - {personaje.name}</p>
          )        
        )
      }
      
    </div>  
    {personajeAMostrar.length == 0? <p>No hay personajes</p>: null} 
        </>
    )
     
}
export default Lista;
