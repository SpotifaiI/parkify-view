import { useState } from 'react';
import { io } from 'socket.io-client';
import { Card } from '../components/Card';
import '../styles/screens/Home.css';

type WSRefresh = {
  recentFilledSlot: string;
  recentFreeSlot: string;
  busySlot: string;
  chillSlot: string;
  timeFreeToday: string;
  timeFilledToday: string;
  recentFree: string[];
  recentFilled: string[];
};

export function Home() {
  const socket = io(import.meta.env.VITE_WS_ENDPOINT);

  const [recentFilledSlot, setRecentFilledSlot] = useState('');
  const [recentFreeSlot, setRecentFreeSlot] = useState('');
  const [busySlot, setBusySlot] = useState('');
  const [chillSlot, setChillSlot] = useState('');
  const [timeFreeToday, setTimeFreeToday] = useState('');
  const [timeFilledToday, setTimeFilledToday] = useState('');
  const [recentFree, setRecentFree] = useState<string[]>([]);
  const [recentFilled, setRecentFilled] = useState<string[]>([]);

  socket.on("refresh", (data: WSRefresh) => {
    console.log('recebendo dados...', data);

    if (data.recentFilledSlot) setRecentFilledSlot(data.recentFilledSlot);
    if (data.recentFreeSlot) setRecentFreeSlot(data.recentFreeSlot);
    if (data.busySlot) setBusySlot(data.busySlot);
    if (data.chillSlot) setChillSlot(data.chillSlot);
    if (data.timeFreeToday) setTimeFreeToday(data.timeFreeToday);
    if (data.timeFilledToday) setTimeFilledToday(data.timeFilledToday);
    if (data.recentFree) setRecentFree(data.recentFree);
    if (data.recentFilled) setRecentFilled(data.recentFilled);
  });

  return (
    <main id="home-screen">
      <section>
        <Card label='Ocupada recente' heading={recentFilledSlot} />
        <Card label='Livre recente' heading={recentFreeSlot} />
        <Card label='Vaga concorrida' heading={busySlot} />
        <Card label='Vaga tranquila' heading={chillSlot} />
        <Card label='Média espera' heading={timeFreeToday} content='minutos' />
        <Card label='Média ocupação' heading={timeFilledToday} content='minutos' />
        <Card label='Histórico livres' heading={recentFree[0] || ''} content={[
          recentFree[1] || '',
          recentFree[2] || ''
        ].filter(item => item.length > 0).join(', ')} />
        <Card label='Histórico ocupadas' heading={recentFilled[0] || ''} content={[
          recentFilled[1] || '',
          recentFilled[2] || ''
        ].filter(item => item.length > 0).join(', ')} />
      </section>
    </main>
  );
}