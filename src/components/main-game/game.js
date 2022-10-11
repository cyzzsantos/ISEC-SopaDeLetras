import React from "react";
import "./game.css";

var palavras_usadas = [];
var letras_jogo = [];

function Game(props) {
  const { dificuldade, handleLetraClick, gameStarted, palavraEncontrada } =
    props;
  const palavraEncontradaClass = palavraEncontrada ? "reset" : "notReset";

  var basico;

  if (dificuldade === 0) {
    basico = 7;
  }
  if (dificuldade === 1) {
    basico = 9;
  }
  if (dificuldade === 2) {
    basico = 10;
  }

  var letras = "ABCDEFGHIJKLMNEOPQRSTUVXZ";
  var palavra = "";
  var posicao_random_vertical,
    posicao_random_horizontal,
    posicao_random_diagonal,
    posicao;
  var slots_ocupados = [];
  var index = 0;
  var palavras_index = 0;
  var tam = basico * basico;
  var rand;
  var rev;
  var base_diagonal;

  var limites_diagonal = [];
  const palavras = [
    "AZUL",
    "ROXO",
    "ROSA",
    "CARRO",
    "TAXI",
    "MOTA",
    "FOGO",
    "AGUA",
    "VENTO",
    "TERRA",
    "AR",
    "GELO",
    "CAO",
    "GATO",
    "FILME",
    "ARTE",
    "VIDEO",
    "JOGO",
    "PC",
    "ECRA",
    "RATO",
    "PANO",
    "LATA",
    "TETO",
    "TACO",
    "BATA",
    "BOLA",
    "COLA",
    "MOLA",
  ];

  function Reset() {
    // limpa a grelha quando o jogo começa
    letras_jogo = [];
  }

  function Gerador() {
    // gerador de sopa de letras random
    for (let i = 0; i <= tam; i++) {
      letras_jogo[i] = letras.charAt(Math.floor(Math.random() * letras.length));
    }
  }

  function PrimeiraPalavra() {
    // primeira palavra
    EscolherPalavra();
    if (Math.round(Math.random()) === 0) {
      // primeira palavra é vertical
      // escolher posicao inicial
      posicao_random_vertical = Math.floor(
        Math.random() * (tam - basico * (palavra.length - 1)) + 1
      );

      // escrever a palavra e guardar slots ocupados
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_vertical + a * basico;
        letras_jogo[posicao] = palavra[a];
        slots_ocupados[index] = posicao;
        index++;
      }
    } else {
      // primeira palavra é horizontal
      // escolher posicao inicial
      posicao_random_horizontal = Math.round(
        basico -
          palavra.length -
          Math.random() * (basico - palavra.length) +
          1 +
          Math.floor(Math.random() * basico) * basico
      );

      // escrever a palavra e guardar slots ocupados
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_horizontal + a;
        letras_jogo[posicao] = palavra[a];
        slots_ocupados[index] = posicao;
        index++;
      }
    }
  }

  function EscolherPalavra() {
    palavra = palavras[Math.round(Math.random() * (palavras.length - 1))];
    for (let i = 0; i < palavras_usadas.length; i++) {
      if (palavra === palavras_usadas[i]) {
        return EscolherPalavra();
      }
    }
    palavras_usadas[palavras_index] = palavra;
    palavras_index++;
  }

  function Vertical() {
    // posicionar palavra verticalmente
    // escolhe posiçao random para palavra vertical
    posicao_random_vertical = Math.floor(
      Math.random() * (tam - basico * (palavra.length - 1)) + 1
    );

    // verificar que a palavra vertical nao vai dar overwrite noutra palavra criada anteriormente
    for (let a = 0; a < palavra.length; a++) {
      posicao = posicao_random_vertical + a * basico;
      for (let i = 0; i < slots_ocupados.length; i++) {
        if (
          posicao === slots_ocupados[i] &&
          palavra[a] !== letras_jogo[slots_ocupados[i]]
        ) {
          return Vertical();
        }
      }
      // caso nao haja overwrite: cria palavra vertical
    }

    // guardar as novas posiçoes ocupadas
    if (Math.round(Math.random() * rand) === 1) {
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_vertical + a * basico;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[a];
        index++;
      }
    } else {
      rev = palavra.length - 1;
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_vertical + a * basico;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[rev];
        rev--;
        index++;
      }
    }
  }

  function Horizontal() {
    // posicionar palavra horizontalmente
    // escolhe posiçao random para palavra horizontal
    posicao_random_horizontal = Math.round(
      basico -
        palavra.length -
        Math.random() * (basico - palavra.length) +
        1 +
        Math.floor(Math.random() * basico) * basico
    );

    // verificar que a palavra horizontal nao vai dar overwrite noutra palavra criada anteriormente
    for (let a = 0; a < palavra.length; a++) {
      posicao = posicao_random_horizontal + a;
      for (let i = 0; i < slots_ocupados.length; i++) {
        if (
          posicao === slots_ocupados[i] &&
          palavra[a] !== letras_jogo[slots_ocupados[i]]
        ) {
          return Horizontal();
        }
      }
      // caso nao haja overwrite: cria palavra horizontal
    }

    // guardar as novas posiçoes ocupadas
    if (Math.round(Math.random() * rand) === 1) {
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_horizontal + a;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[a];
        index++;
      }
    } else {
      rev = palavra.length - 1;
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_horizontal + a;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[rev];
        rev--;
        index++;
      }
    }
  }

  function Diagonal() {
    if (Math.round(Math.random * 1) === 0) {
      Diagonal_1();
    } else {
      Diagonal_2();
    }

    function Diagonal_1() {
      //define o espaço onde pode escrever palavras diagonais
      if (dificuldade === 0) base_diagonal = 5;
      if (dificuldade === 1) base_diagonal = 7;
      if (dificuldade === 2) base_diagonal = 8;

      //define o ultimo espaço que uma palavra diagonal pode ocupar
      for (let i = 1; i <= basico; i++) {
        limites_diagonal[i - 1] = basico * i;
        limites_diagonal[i + basico] = (basico - 1) * basico + i;
      }

      //posiciona a primeira letra aleatoriamente dentro do espaço definido
      posicao_random_diagonal = Math.round(
        Math.ceil(Math.random() * base_diagonal) +
          Math.round(Math.random() * (base_diagonal - 1)) * basico
      );

      //verifica que a palavra nao dá overwrite noutra palavra e que nao ultrapassa os limites da sopa de letras
      for (let i = 0; i < palavra.length; i++) {
        posicao = posicao_random_diagonal + (basico + 1) * i;
        for (let a = 0; a < slots_ocupados.length; a++) {
          if (
            posicao === slots_ocupados[a] &&
            palavra[i] !== letras_jogo[slots_ocupados[a]]
          ) {
            return Diagonal_1();
          }
        }
        for (let a = 0; a < limites_diagonal.length; a++) {
          if (posicao === limites_diagonal[a]) {
            if (i < palavra.length - 1) {
              return Diagonal_1();
            }
          }
        }
      }

      //escreve a palavra diagonal
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_diagonal + (basico + 1) * a;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[a];
        index++;
      }
    }

    function Diagonal_2() {
      //define o espaço onde pode escrever palavras diagonais
      if (dificuldade === 0) base_diagonal = 5;
      if (dificuldade === 1) base_diagonal = 7;
      if (dificuldade === 2) base_diagonal = 8;

      //define o ultimo espaço que uma palavra diagonal pode ocupar
      for (let i = 1; i <= basico; i++) {
        limites_diagonal[i - 1] = 1 + basico * (i - 1);
        limites_diagonal[i + basico] = (basico - 1) * basico + i;
      }

      //posiciona a primeira letra aleatoriamente dentro do espaço definido
      posicao_random_diagonal = Math.round(
        Math.ceil(Math.random() * base_diagonal + (basico - base_diagonal)) +
          Math.round(Math.random() * (base_diagonal - 1)) * basico
      );

      //verifica que a palavra nao dá overwrite noutra palavra e que nao ultrapassa os limites da sopa de letras
      for (let i = 0; i < palavra.length; i++) {
        posicao = posicao_random_diagonal + (basico - 1) * i;
        for (let a = 0; a < slots_ocupados.length; a++) {
          if (
            posicao === slots_ocupados[a] &&
            palavra[i] !== letras_jogo[slots_ocupados[a]]
          ) {
            return Diagonal_2();
          }
        }
        for (let a = 0; a < limites_diagonal.length; a++) {
          if (posicao === limites_diagonal[a]) {
            if (i < palavra.length - 1) {
              return Diagonal_2();
            }
          }
        }
      }

      //escreve a palavra diagonal
      for (let a = 0; a < palavra.length; a++) {
        posicao = posicao_random_diagonal + (basico - 1) * a;
        slots_ocupados[index] = posicao;
        letras_jogo[posicao] = palavra[a];
        index++;
      }
    }
  }

  if (dificuldade === 0) {
    if (!gameStarted) {
      Reset();
      Gerador();
      PrimeiraPalavra();

      // adiciona 2 palavras (total: 3)
      for (let i = 0; i < 2; i++) {
        rand = Math.round(Math.random() * 1);
        if (rand === 0) {
          EscolherPalavra();
          Vertical();
        }
        if (rand === 1) {
          EscolherPalavra();
          Horizontal();
        }
      }
    }

    return (
      <div id="game-basico">
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[1] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[2] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[3] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[4] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[5] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[6] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[7] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[8] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[9] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[10] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[11] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[12] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[13] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[14] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[15] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[16] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[17] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[18] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[19] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[20] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[21] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[22] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[23] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[24] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[25] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[26] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[27] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[28] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[29] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[30] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[31] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[32] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[33] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[34] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[35] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[36] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[37] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[38] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[39] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[40] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[41] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[42] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[43] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[44] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[45] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[46] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[47] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[48] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[49] : "?"}
        </div>
      </div>
    );
  }

  if (dificuldade === 1) {
    if (!gameStarted) {
      Reset();
      Gerador();
      PrimeiraPalavra();

      //adiciona 4 palavras (total: 5)
      for (let i = 0; i < 4; i++) {
        rand = Math.round(Math.random() * 2);
        if (rand === 0) {
          EscolherPalavra();
          Vertical();
        }
        if (rand === 1) {
          EscolherPalavra();
          Horizontal();
        }
        if (rand === 2) {
          EscolherPalavra();
          Diagonal();
        }
      }
    }
    return (
      <div id="game-medio">
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[1] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[2] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[3] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[4] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[5] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[6] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[7] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[8] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[9] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[10] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[11] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[12] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[13] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[14] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[15] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[16] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[17] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[18] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[19] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[20] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[21] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[22] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[23] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[24] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[25] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[26] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[27] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[28] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[29] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[30] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[31] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[32] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[33] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[34] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[35] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[36] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[37] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[38] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[39] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[40] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[41] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[42] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[43] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[44] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[45] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[46] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[47] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[48] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[49] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[50] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[51] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[52] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[53] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[54] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[55] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[56] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[57] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[58] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[59] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[60] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[61] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[62] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[63] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[64] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[65] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[66] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[67] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[68] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[69] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[70] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[71] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[72] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[73] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[74] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[75] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[76] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[77] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[78] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[79] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[80] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[81] : "?"}
        </div>
      </div>
    );
  }

  if (dificuldade === 2) {
    if (!gameStarted) {
      Reset();
      Gerador();
      PrimeiraPalavra();

      //adiciona 8 palavras (total: 9)
      for (let i = 0; i < 8; i++) {
        rand = Math.round(Math.random() * 2);
        if (rand === 0) {
          EscolherPalavra();
          Vertical();
        }
        if (rand === 1) {
          EscolherPalavra();
          Horizontal();
        }
        if (rand === 2) {
          EscolherPalavra();
          Diagonal();
        }
      }
    }
    return (
      <div id="game-avancado">
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[1] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[2] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[3] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[4] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[5] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[6] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[7] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[8] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[9] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[10] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[11] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[12] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[13] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[14] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[15] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[16] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[17] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[18] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[19] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[20] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[21] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[22] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[23] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[24] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[25] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[26] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[27] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[28] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[29] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[30] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[31] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[32] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[33] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[34] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[35] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[36] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[37] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[38] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[39] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[40] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[41] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[42] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[43] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[44] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[45] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[46] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[47] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[48] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[49] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[50] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[51] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[52] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[53] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[54] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[55] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[56] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[57] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[58] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[59] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[60] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[61] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[62] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[63] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[64] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[65] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[66] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[67] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[68] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[69] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[70] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[71] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[72] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[73] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[74] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[75] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[76] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[77] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[78] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[79] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[80] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[81] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[82] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[83] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[84] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[85] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[86] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[87] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[88] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[89] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[90] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[91] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[92] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[93] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[94] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[95] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[96] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[97] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[98] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[99] : "?"}
        </div>
        <div onClick={handleLetraClick} className={palavraEncontradaClass}>
          {gameStarted ? letras_jogo[100] : "?"}
        </div>
      </div>
    );
  }
}

export default Game;
export { palavras_usadas };
