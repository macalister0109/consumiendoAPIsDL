
import  { useState, useEffect } from 'react';

const Feriados = () => {
    const [fechasFeriado, setFechasFeriado] = useState([]);    
    const url ="https://api.boostr.cl/feriados/en.json";
    const traerFeriados = async()=>{
        try{
            const data = await fetch(url);
            const resultado = await data.json();
            const fechas = resultado.data;
            setFechasFeriado(fechas);
            console.log(fechas);

        }catch(error){
            console.log("no trae los datos")
        }
    }
    traerFeriados();

    const fechaTarget = '2024-09-18';
    if(traerFeriados.length>0){
        for(i=0; i<traerFeriados.length; i++){
            if(traerFeriados.Date===fechaTarget){
                var fechaFeriadoAEvaluar = traerFeriados.date;
                var tituloFeriado = traerFeriados.title;
                var tipoFeriado = traerFeriados.type;
                var inalienable = traerFeriados.inalienable;
            }
        }
    }
    
    const calcularTiempoRestante = (fechaFeriadoAEvaluar)=>{
        const diferenciaTiempo = +fechaFeriadoAEvaluar - new Date();
        let tiempoRestante = {}
        if(diferenciaTiempo>0){
            tiempoRestante={
                dias: Math.floor(diferenciaTiempo / (1000 * 60 * 60 * 24)),
                horas: Math.floor((diferenciaTiempo / (1000 * 60 * 60)) % 24),
                minutos: Math.floor((diferenciaTiempo / 1000 / 60) % 60),
                segundos: Math.floor((diferenciaTiempo / 1000) % 60)
             }        
         }
        return tiempoRestante;  
    } 

    const [tiempoRestante, setTiempoRestante]=useState(calcularTiempoRestante(fechaFeriadoAEvaluar));

    useEffect(()=>{
        const timer = setTimeout(()=>{
            setTiempoRestante(calcularTiempoRestante(fechaFeriadoAEvaluar));
        },1000);
        return ()=> clearTimeout(timer);
    },[tiempoRestante, fechaFeriadoAEvaluar]);
    
    return (
        <div>
          <h2>Y nos quedan:</h2>
          <div>
            {Object.keys(tiempoRestante).length && (
              <>
                <p>{tiempoRestante.dias} days</p>
                <p>{tiempoRestante.horas} hours</p>
                <p>{tiempoRestante.minutos} minutes</p>
                <p>{tiempoRestante.segundos} seconds</p>
              </>
            )}
          </div>
        </div>
      );
}


export default Feriados;

    