const player1 = {
    NOME: "Mario",
    VELOCIDADE: 4,   
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi",
    VELOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};

async function rollDice() {

    return Math.floor(Math.random() * 6) + 1;

}

async function getRandomBlock() {

    let random = Math.random();
    let result;

    switch (true) {
        case (random < 0.33):
            result = "RETA";
            break;
        case (random < 0.66):
            result = "CURVA";
            break;
        default:
            result = "CONFRONTO";
    }

    return result;

}

async function logRollREsult(characterName, block, diceResult, atribute) {

    console.log(`${characterName.NOME} rolou 🎲 ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`);

}

async function playRaceEngine(character1, character2) {

    for(let round = 1; round <= 5; round++) {
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

      if (block === "CONFRONTO") {
        let powerResult1 = diceResult1 + character1.PODER;
        let powerResult2 = diceResult2 + character2.PODER;

        console.log(
          `${character1.NOME} confrontou com ${character2.NOME}! 🥊`);

        await logRollREsult(
          character1,
          "poder",
          diceResult1,
          character1.PODER
        );
        await logRollREsult(
          character2,
          "poder",
          diceResult2,
          character2.PODER
        );

        if(powerResult1 > powerResult2 && character2.PONTOS > 0){
            character2.PONTOS --;
            console.log(
              `${character1.NOME} venceu o confronto! ${character2.NOME} perdeu um ponto! 🐢`
            );
        }

        if(powerResult2 > powerResult1 && character1.PONTOS > 0){
            character1.PONTOS --;
            console.log(
              `${character2.NOME} venceu o confronto! ${character1.NOME} perdeu um ponto! 🐢`
            );
        }        

        console.log(powerResult1 === powerResult2 ? "Empate no confronto! Nenhum ponto perdido" : "");
        
      }

      if(skillTest1 > skillTest2) {
        character1.PONTOS ++;
        console.log(`${character1.NOME} venceu a rodada e marcou um ponto! 🏆`);
      }
      else if(skillTest2 > skillTest1) {
        character2.PONTOS ++;
        console.log(`${character2.NOME} venceu a rodada e marcou um ponto! 🏆`);
      }
      else if ((skillTest2 === skillTest1) && (block !== "CONFRONTO") ){
        console.log("Empate! Nenhum ponto foi marcado.");
      }
      
        console.log(`----------------------------------------`);

    }    

   
}

async function declareWinner(character1,character2) {

    console.log(`🏁 🏁 🏁 Corrida finalizada! 🏁 🏁 🏁`);
    console.log(`${character1.NOME} marcou ${character1.PONTOS} ponto(s).`);
    console.log(`${character2.NOME} marcou ${character2.PONTOS} ponto(s).`);
    console.log(`----------------------------------------`);
    
    if(character1.PONTOS === character2.PONTOS) {
        console.log("⛔️ Empate! Nenhum vencedor! ⛔️");
        return;
    }
    console.log(`🏆 🏆 🏆 Vencedor: ${character1.PONTOS > character2.PONTOS ? character1.NOME : character2.NOME } 🏆 🏆 🏆`);
        
}

(async function main(){
    console.log(`🏁 🚦 Corrida iniciando entre ${player1.NOME} e ${player2.NOME} ... \n`);

    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
        
})();