import { io, Socket } from "socket.io-client";

export type WSRefresh = {
  ok: boolean;
  nearestRole?: string;
  otherRoles?: string[];
};

export const socket: Socket = io(import.meta.env.VITE_WS_ENDPOINT);

socket.on("connect", () => {
  console.log(`Conectado ao WebSocket com ID: ${socket.id}`);
});

socket.on("disconnect", () => {
  console.log("Desconectado do WebSocket");
});

socket.on("test-connection", () => {
  console.log("WebSocket testado com sucesso!");
});

export function onRefreshListener(callback: (data: WSRefresh) => void) {
  socket.on("refresh", callback);

  return () => {
    socket.off("refresh", callback);
  };
}

export function testWebSocketConnection() {
  socket.emit("test-connection");
}

export async function triggerHttpRefresh(): Promise<WSRefresh> {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_ENDPOINT}/refresh`
    );
    if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
    const data: WSRefresh = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao chamar /refresh:", error);
    throw error;
  }
}
