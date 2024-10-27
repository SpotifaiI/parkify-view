import { io } from 'socket.io-client';

export type WSRefresh = {
  ok: boolean;
};

export function Dashboard() {
  const socket = io(import.meta.env.VITE_WS_ENDPOINT);

  socket.on('connect', () => {
    console.log(`Conectado por WS com ID ${socket.id}`);
  });

  socket.on('connect', () => {
    console.log(`Desconectado de WS!`);
  });

  socket.on('test-connection', () => {
    console.log('WebSocket realmente funciona!');
  });

  socket.on('refresh', (data: WSRefresh) => {
    console.log('Atualizando a página...');
    console.log(data);
    console.log(data.ok);

  })

  function onWSHandler() {
    socket.emit('test-connection');
  }

  return (
    <main id="dashboard-screen">
      <p>Dashboard</p>
      <button onClick={onWSHandler}>Testar WebSocket</button>
    </main>
  );
}