const characters = {
  Mario: {
    NOME: "Mario",
    VELOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
  },
  Peach: {
    NOME: "Peach",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 2,
    PONTOS: 0,
  },
  Yoshi: {
    NOME: "Yoshi",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 4,
    PODER: 3,
    PONTOS: 0,
  },
  Bowser: {
    NOME: "Bowser",
    VELOCIDADE: 5,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
  Luigi: {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
  },
  DonkeyKong: {
    NOME: "Donkey Kong",
    VELOCIDADE: 2,
    MANOBRABILIDADE: 2,
    PODER: 5,
    PONTOS: 0,
  },
};

function chooseRandomPlayers() {
  const keys = Object.keys(characters);
  const first = keys[Math.floor(Math.random() * keys.length)];
  let second;
  do {
    second = keys[Math.floor(Math.random() * keys.length)];
  } while (second === first);

  // Clonar os objetos para evitar reutilizar dados com pontos alterados
  const character1 = { ...characters[first], PONTOS: 0 };
  const character2 = { ...characters[second], PONTOS: 0 };

  return [character1, character2];
}

async function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

async function getRandomBlock() {
  let random = Math.random();
  let result;

  switch (true) {
    case random < 0.33:
      result = "RETA";
      break;
    case random < 0.66:
      result = "CURVA";
      break;
    default:
      result = "CONFRONTO";
  }

  return result;
}

async function logRollREsult(characterName, block, diceResult, atribute) {
  console.log(
    `${characterName.NOME} rolou 🎲 ${block} ${diceResult} + ${atribute} = ${
      diceResult + atribute
    }`
  );
}

async function playRaceEngine(character1, character2) {
  for (let round = 1; round <= 5; round++) {
    console.log(`🏁 🏎️  Rodada ${round} ...`);

    //sortear bloco

    let block = await getRandomBlock();
    console.log(`Bloco : ${block}`);

    //rolar dados
    let diceResult1 = await rollDice();
    let diceResult2 = await rollDice();

    //teste de habilidade
    let skillTest1 = 0;
    let skillTest2 = 0;

    if (block === "RETA") {
      skillTest1 = diceResult1 + character1.VELOCIDADE;
      skillTest2 = diceResult2 + character2.VELOCIDADE;

      await logRollREsult(
        character1,
        "VELOCIDADE",
        diceResult1,
        character1.VELOCIDADE
      );
      await logRollREsult(
        character2,
        "VELOCIDADE",
        diceResult2,
        character2.VELOCIDADE
      );
    }

    if (block === "CURVA") {
      skillTest1 = diceResult1 + character1.MANOBRABILIDADE;
      skillTest2 = diceResult2 + character2.MANOBRABILIDADE;

      await logRollREsult(
        character1,
        "MANOBRABILIDADE",
        diceResult1,
        character1.MANOBRABILIDADE
      );
      await logRollREsult(
        character2,
        "MANOBRABILIDADE",
        diceResult2,
        character2.MANOBRABILIDADE
      );
    }

    const colors = {
      reset: "\x1b[0m",
      red: "\x1b[31m",
      green: "\x1b[32m",
      yellow: "\x1b[33m",
      blue: "\x1b[34m",
      magenta: "\x1b[35m",
      cyan: "\x1b[36m",
      bold: "\x1b[1m",
    };

    if (block === "CONFRONTO") {
      let powerResult1 = diceResult1 + character1.PODER;
      let powerResult2 = diceResult2 + character2.PODER;

      console.log(
        `${colors.cyan}${character1.NOME}${colors.reset} confrontou com ${colors.magenta}${character2.NOME}${colors.reset}! 🥊`
      );

      await logRollREsult(character1, "PODER", diceResult1, character1.PODER);
      await logRollREsult(character2, "PODER", diceResult2, character2.PODER);

      const items = ["CASCO", "BOMBA", "NENHUM"];
      const item = items[Math.floor(Math.random() * items.length)];

      function colorItem(item) {
        switch (item) {
          case "CASCO":
            return colors.yellow + item + colors.reset;
          case "BOMBA":
            return colors.red + item + colors.reset;
          default:
            return colors.reset + item + colors.reset;
        }
      }

      if (powerResult1 > powerResult2) {
        let pontosPerdidos = 0;
        if (item === "CASCO") pontosPerdidos = 1;
        else if (item === "BOMBA") pontosPerdidos = 2;

        if (character2.PONTOS > 0) {
          character2.PONTOS -= pontosPerdidos;
          if (character2.PONTOS < 0) character2.PONTOS = 0;
        }

        console.log(
          `${colors.green}${character1.NOME} venceu o confronto!${
            colors.reset
          } ${colors.red}${character2.NOME}${colors.reset} levou ${colorItem(
            item
          )} e perdeu ${colors.red}${pontosPerdidos} ponto(s)${
            colors.reset
          }! 🐢`
        );

        if (Math.random() < 0.5) {
          character1.PONTOS++;
          console.log(
            `${colors.green}${character1.NOME} ativou turbo e ganhou 1 ponto extra! 🚀${colors.reset}`
          );
        }
      } else if (powerResult2 > powerResult1) {
        let pontosPerdidos = 0;
        if (item === "CASCO") pontosPerdidos = 1;
        else if (item === "BOMBA") pontosPerdidos = 2;

        if (character1.PONTOS > 0) {
          character1.PONTOS -= pontosPerdidos;
          if (character1.PONTOS < 0) character1.PONTOS = 0;
        }

        console.log(
          `${colors.green}${character2.NOME} venceu o confronto!${
            colors.reset
          } ${colors.red}${character1.NOME}${colors.reset} levou ${colorItem(
            item
          )} e perdeu ${colors.red}${pontosPerdidos} ponto(s)${
            colors.reset
          }! 🐢`
        );

        if (Math.random() < 0.5) {
          character2.PONTOS++;
          console.log(
            `${colors.green}${character2.NOME} ativou turbo e ganhou 1 ponto extra! 🚀${colors.reset}`
          );
        }
      } else {
        console.log(
          `${colors.yellow}Empate no confronto! Nenhum ponto perdido${colors.reset}`
        );
      }
    }



    if (skillTest1 > skillTest2) {
      character1.PONTOS++;
      console.log(`${character1.NOME} venceu a rodada e marcou um ponto! 🏆`);
    } else if (skillTest2 > skillTest1) {
      character2.PONTOS++;
      console.log(`${character2.NOME} venceu a rodada e marcou um ponto! 🏆`);
    } else if (skillTest2 === skillTest1 && block !== "CONFRONTO") {
      console.log("Empate! Nenhum ponto foi marcado.");
    }

    console.log(`----------------------------------------`);
  }
}

async function declareWinner(character1, character2) {
  console.log(`🏁 🏁 🏁 Corrida finalizada! 🏁 🏁 🏁`);
  console.log(`${character1.NOME} marcou ${character1.PONTOS} ponto(s).`);
  console.log(`${character2.NOME} marcou ${character2.PONTOS} ponto(s).`);
  console.log(`----------------------------------------`);

  if (character1.PONTOS === character2.PONTOS) {
    console.log("⛔️ Empate! Nenhum vencedor! ⛔️");
    return;
  }
  console.log(
    `🏆 🏆 🏆 Vencedor: ${
      character1.PONTOS > character2.PONTOS ? character1.NOME : character2.NOME
    } 🏆 🏆 🏆`
  );
}

(async function main() {
    const [player1, player2] = chooseRandomPlayers();
    
    console.log(
    `🏁 🚦 Corrida iniciando entre ${player1.NOME} e ${player2.NOME} ... \n`
    );

  await playRaceEngine(player1, player2);
  await declareWinner(player1, player2);
})();
