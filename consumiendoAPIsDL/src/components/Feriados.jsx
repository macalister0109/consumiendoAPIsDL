import { useState, useEffect } from "react";
const Feriados = ({search}) => {
    const [fechasAPI, setFechasAPI] = useState([]);
    const url ="https://api.boostr.cl/feriados/en.json";
    const traerFechas = async () => {
        try{
            const data = await fetch(url);
            const resultado = await data.json();
            const fechas = resultado.data;
            setFechasAPI(fechas);
            console.log(fechas);
        }catch(error){
            console.log("No trae los datos");
    };
    useEffect(() => {
        traerFechas();
    }, []);
    let fechasAMostrar = [];
    if(search === 0){
        fechasAMostrar = fechasAPI;
    }else{
        fechasAMostrar = fechasAPI.filter((fecha) => fecha.date.includes(search));
    }
    return(
        <>
        
       
        </>

        )
    };

    export default Feriados;
