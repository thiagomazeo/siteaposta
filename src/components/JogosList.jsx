import React from "react";

const th = {
  border: "1px solid #ccc",
  padding: "8px",
  background: "#f2f2f2",
  textAlign: "left",
};

const td = {
  border: "1px solid #ccc",
  padding: "8px",
};

export default function JogosList({ jogos }) {
  return (
    <table style={{ borderCollapse: "collapse", width: "100%" }}>
      <thead>
        <tr>
          <th style={th}>Hora</th>
          <th style={th}>Time Casa</th>
          <th style={th}>Time Fora</th>
          <th style={th}>1</th>
          <th style={th}>X</th>
          <th style={th}>2</th>
        </tr>
      </thead>
      <tbody>
        {jogos.map((jogo, index) => (
          <tr key={index}>
            <td style={td}>{jogo.hora}</td>
            <td style={td}>{jogo.timeCasa}</td>
            <td style={td}>{jogo.timeFora}</td>
            <td style={td}>{jogo.odd1}</td>
            <td style={td}>{jogo.oddX}</td>
            <td style={td}>{jogo.odd2}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
