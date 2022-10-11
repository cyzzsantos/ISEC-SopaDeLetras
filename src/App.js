import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { palavras_usadas } from "./components/main-game/game.js";
import Game from "./components/main-game/game.js";
import ControlPanel from "./components/control-panel/control-panel.js";
import "./app.css";

let timerId = undefined;
const TEMPOLIMITE = 60;

var index = 0;
var pontuacao = 0;
var x = 0;
var selecionados = [];
var palavras_encontradas = [];
var total_palavras = 0;

function App() {
  const [dificuldade, setDificuldade] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [palavraEncontrada, setPalavraEncontrada] = useState(false);
  const [timer, setTimer] = useState(TEMPOLIMITE);

  // Responsavel por alterar a dificuldade do Jogo
  const handleDificuldadeChange = (event) => {
    var { value } = event.currentTarget;
    value = parseInt(value);
    setDificuldade(value);
  };

  // Responsavel por todas as alteraçoes causadas ao clicar numa letra da grelha
  const handleLetraClick = (event) => {
    // caso a letra tenha sido selecionada, mudar a sua côr para preto
    if (event.currentTarget.classList.contains("red")) {
      event.currentTarget.classList.remove("red");
      for (let i = selecionados.length - 1; i >= 0; i--) {
        if (selecionados[i] === event.target.textContent) {
          selecionados.splice(i, 1);
          index--;
          return;
        }
      }
      // caso a letra não tenha sido selecionada e o jogo tenha começado, mudar a sua côr para vermelho
    } else if (event.currentTarget.textContent !== "?") {
      event.currentTarget.classList.add("red");
      selecionados[index] = event.target.textContent;
      index++;
    }

    // verifica se alguma palavra já foi selecionada e, caso tenha sido, adiciona-a à lista de palavras encontradas e atribui os correspondentes pontos
    for (let i = 0; i < palavras_usadas.length; i++) {
      if (selecionados.toString().replace(/,/g, "") === palavras_usadas[i]) {
        selecionados = selecionados.toString().replace(/,/g, "");
        for (let i = 0; i < palavras_usadas.length; i++) {
          if (selecionados === palavras_usadas[i]) {
            palavras_encontradas[x] = selecionados;
            palavras_usadas[i] = "";
            x++;
            pontuacao = Math.round(
              pontuacao + selecionados.length * (0.5 * timer)
            );
            selecionados = [];

            if (palavraEncontrada) {
              setPalavraEncontrada(false);
            } else {
              setPalavraEncontrada(true);
            }

            if (dificuldade === 0) {
              total_palavras = 3;
            }
            if (dificuldade === 1) {
              total_palavras = 5;
            }
            if (dificuldade === 2) {
              total_palavras = 9;
            }

            if (palavras_encontradas.length === total_palavras) {
              setGameStarted(false);
              palavras_encontradas = [];
              selecionados = [];
              x = 0;
              return;
            }
          }
        }
      }
    }
  };

  // Responsavel por todas as alterações quando o jogo começa/acaba e torna o botão de inicio/fim do jogo funcional.
  const handleGameStart = () => {
    if (gameStarted) {
      setGameStarted(false);
      palavras_encontradas = [];
      selecionados = [];
      x = 0;
      if (palavraEncontrada) {
        setPalavraEncontrada(false);
      } else {
        setPalavraEncontrada(true);
      }
    } else {
      setGameStarted(true);
      pontuacao = 0;
    }
  };

  // Responsavel pelo contador de tempo quando o jogo começa
  useEffect(() => {
    if (gameStarted) {
      timerId = setInterval(() => {
        let nextTimer;
        setTimer((previousState) => {
          nextTimer = previousState - 1;
          if (nextTimer === 0) {
            setGameStarted(false);
            palavras_encontradas = [];
            selecionados = [];
            x = 0;
          }
          return nextTimer;
        });
      }, 1000);
    } else if (timer !== TEMPOLIMITE) {
      setTimer(TEMPOLIMITE);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    }; // eslint-disable-next-line
  }, [gameStarted]);

  return (
    <div id="container">
      <div id="jogo">
        <Game
          dificuldade={dificuldade}
          handleLetraClick={handleLetraClick}
          gameStarted={gameStarted}
          palavraEncontrada={palavraEncontrada}
        />
        <ControlPanel
          onDificuldadeChange={handleDificuldadeChange}
          gameStarted={gameStarted}
          onGameStart={handleGameStart}
          timer={timer}
        />
      </div>
    </div>
  );
}

export default App;
export { palavras_encontradas };
export { pontuacao };
