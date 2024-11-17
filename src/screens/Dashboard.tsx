import { useEffect, useState } from "react";
import {
  onRefreshListener,
  testWebSocketConnection,
  triggerHttpRefresh,
  WSRefresh,
} from "../api/socket";

export function Dashboard() {
  const [nearestRole, setNearestRole] = useState<string>("P4");
  const [otherRoles, setOtherRoles] = useState<string[]>(["G4", "E7"]);

  useEffect(() => {
    const removeListener = onRefreshListener((data: WSRefresh) => {
      console.log("Dados recebidos do WebSocket:", data);

      if (data.ok) {
        setNearestRole(data.nearestRole || "N/A");
        setOtherRoles(data.otherRoles || []);
      }
    });

    return () => {
      removeListener();
    };
  }, []);

  function handleTestWS() {
    testWebSocketConnection();
  }

  async function handleHttpRefresh() {
    try {
      const data = await triggerHttpRefresh();
      console.log("Resposta do /refresh (HTTP):", data);
    } catch (error) {
      console.error("Erro ao testar /refresh (HTTP):", error);
    }
  }

  return (
    <main id="dashboard-screen">
      <section id="main-values__section">
        <div className="nearest-role__section">
          <section>Vaga Mais Próxima</section>
          <p id="nearest-role">{nearestRole}</p>
        </div>
        <div className="other_roles__section">
          <h2>Outras vagas</h2>
          {otherRoles.map((role, index) => (
            <section key={index} className="other-roles">
              {role}
            </section>
          ))}
        </div>
      </section>
      <button onClick={handleTestWS}>Testar WebSocket</button>
      <button onClick={handleHttpRefresh}>Testar /refresh (HTTP)</button>
    </main>
  );
}
