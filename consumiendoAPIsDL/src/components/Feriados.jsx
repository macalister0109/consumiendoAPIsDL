import React, { useState, useEffect } from 'react';

const Feriados = () => {
  const [siguienteFeriado, setSiguienteFeriado] = useState(null);
  const [tiempoRestante, setTiempoRestante] = useState({});

  useEffect(() => {
    const fetchFeriados = async () => {
      try {
        const response = await fetch('https://api.boostr.cl/feriados/en.json');
        const data = await response.json();
        const feriados = data.data;
        const hoy = new Date();

        const feriadoEntrante = feriados.find(feriado => {
          const fechaFeriado = new Date(feriado.date);
          return fechaFeriado > hoy;
        });

        setSiguienteFeriado(feriadoEntrante);
      } catch (error) {
        console.error('Error en carga de feriados:', error);
      }
    };

    fetchFeriados();
  }, []);

  useEffect(() => {
    if (!siguienteFeriado) return;

    const intervalId = setInterval(() => {
      const fechaFeriado = new Date(siguienteFeriado.date);
      const hoy = new Date();

      const diferencia = fechaFeriado - hoy;

      const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
      const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
      const minutos = Math.floor((diferencia / 1000 / 60) % 60);
      const segundos = Math.floor((diferencia / 1000) % 60);

      setTiempoRestante({ dias, horas, minutos, segundos });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [siguienteFeriado]);

  if (!siguienteFeriado) {
    return <div>Cargando...</div>;
  }

  return (
    <div>
      <h2>y será por: {siguienteFeriado.title}</h2>
      <h2>en</h2>
      <div>
        <span>{tiempoRestante.dias} Dias </span>
        <span>{tiempoRestante.horas} Horas </span>
        <span>{tiempoRestante.minutos} Minutos </span>
        <span>{tiempoRestante.segundos} Segundos </span>
      </div>
      
    </div>
  );
};

export default Feriados;