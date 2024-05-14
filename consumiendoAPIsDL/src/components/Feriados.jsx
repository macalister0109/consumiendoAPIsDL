import React, { useState, useEffect } from 'react';

const Feriados = () => {
  const [nextHoliday, setNextHoliday] = useState(null);
  const [timeLeft, setTimeLeft] = useState({});

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await fetch('https://api.boostr.cl/feriados/en.json');
        const data = await response.json();
        const holidays = data.data;
        const today = new Date();

        const upcomingHoliday = holidays.find(holiday => {
          const holidayDate = new Date(holiday.date);
          return holidayDate > today;
        });

        setNextHoliday(upcomingHoliday);
      } catch (error) {
        console.error('Error fetching holidays:', error);
      }
    };

    fetchHolidays();
  }, []);

  useEffect(() => {
    if (!nextHoliday) return;

    const intervalId = setInterval(() => {
      const holidayDate = new Date(nextHoliday.date);
      const now = new Date();

      const difference = holidayDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [nextHoliday]);

  if (!nextHoliday) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Siguiente Feriado en: {nextHoliday.name}</h1>
      <div>
        <span>{timeLeft.days} Dias </span>
        <span>{timeLeft.hours} Horas </span>
        <span>{timeLeft.minutes} Minutos </span>
        <span>{timeLeft.seconds} Segundos </span>
      </div>
    </div>
  );
};

export default Feriados;