import React, { useEffect, useState } from "react";
import JogosList from './components/JogosList.jsx';

function App() {
  const [jogos, setJogos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    fetch("/jogos.json")
      .then((res) => res.json())
      .then((data) => {
        setJogos(data);
        setCarregando(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar jogos:", err);
        setCarregando(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1 style={{ marginBottom: "20px" }}>🟢 Jogos de Hoje – Faz o Simples</h1>

      {carregando ? (
        <p>Carregando jogos...</p>
      ) : jogos.length === 0 ? (
        <p>Nenhum jogo encontrado.</p>
      ) : (
        <JogosList jogos={jogos} />
      )}
    </div>
  );
}

export default App;
