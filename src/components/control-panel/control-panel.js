import React from "react";
import "./control-panel.css";
import { palavras_encontradas } from "../../App";
import { pontuacao } from "../../App";

function ControlPanel(props) {
  const { onDificuldadeChange, gameStarted, onGameStart, timer } = props;
  const gameStartedClass = gameStarted ? "notgameStarted" : "gameStarted";
  return (
    <div id="controlPanel">
      <div id="titulo">Painel de Jogo</div>
      <div id="painel-dificuldade">
        <form className="form">
          <fieldset className="form-group" disabled={gameStarted}>
            <label>Dificuldade: </label>
            <select
              defaultValue="0"
              id="dificuldades"
              onChange={onDificuldadeChange}
            >
              <option value="0">Simples (7x7)</option>
              <option value="1">Intermédio (9x9)</option>
              <option value="2">Avançado (10x10)</option>
            </select>
          </fieldset>
          <div id="pontuacao">
            <div>Pontuação: {pontuacao}</div>
          </div>
          <div id="botao">
            <button type="button" onClick={onGameStart}>
              {gameStarted ? "Parar jogo" : "Iniciar Jogo"}
            </button>
          </div>
        </form>
      </div>
      <div id="painel-tempo" className={gameStartedClass}>
        <div>Tempo de Jogo:</div>
        <div id="tempo">{timer}</div>
      </div>
      <div id="lista-espaco">
        <div id="lista-palavras" className={gameStartedClass}>
          Palavras Encontradas:
          <div id="1">{palavras_encontradas[0]}</div>
          <div id="2">{palavras_encontradas[1]}</div>
          <div id="3">{palavras_encontradas[2]}</div>
          <div id="4">{palavras_encontradas[3]}</div>
          <div id="5">{palavras_encontradas[4]}</div>
          <div id="6">{palavras_encontradas[5]}</div>
          <div id="7">{palavras_encontradas[6]}</div>
          <div id="8">{palavras_encontradas[7]}</div>
          <div id="9">{palavras_encontradas[8]}</div>
          <div id="10">{palavras_encontradas[9]}</div>
        </div>
      </div>
    </div>
  );
}

export default ControlPanel;
