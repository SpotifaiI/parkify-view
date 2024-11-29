import { io } from 'socket.io-client';
import { useState } from 'react';

export type WSRefresh = { near_free_slot: string };

export function Dashboard() {
  const socket = io(import.meta.env.VITE_WS_ENDPOINT);

  const defaultParkingSlot = 'N/D';
  const [lastParkingSlot, setLastParkingSlot] = useState(defaultParkingSlot);
  const [previousLastParkingSlot, setPreviousLastParkingSlot] = useState('');

  socket.on("connect", () => {
    console.log(`Conectado por WS com ID ${socket.id}`);
  });

  socket.on("connect", () => {
    console.log(`Desconectado de WS!`);
  });

  socket.on("test-connection", () => {
    console.log("WebSocket realmente funciona!");
  });

  socket.on("refresh", (data: WSRefresh) => {
    if (lastParkingSlot !== defaultParkingSlot) {
      setPreviousLastParkingSlot(lastParkingSlot);
    }

    setLastParkingSlot(data.near_free_slot);
  });

  function onWSHandler() {
    socket.emit("test-connection");
  }

  return (
    <main id="dashboard-screen">
      <section id="main-values__section">
        <div className="nearest-role__section">
          <section>Vagas Mais Próxima</section>
          <p id="nearest-role">P4</p>
        </div>
        <div className="other_roles__section">
          <h2>Outras vagas</h2>
          <section className="other-roles">{lastParkingSlot}</section>
          <section className="other-roles">{previousLastParkingSlot}</section>
        </div>
      </section>
      <button onClick={onWSHandler}>Testar WebSocket</button>
    </main>
  );
}