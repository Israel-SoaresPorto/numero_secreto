let tentativa = 1;
let limite = 10;

function exibirTextoNaTela(tag, conteudo) {
  let campo = document.querySelector(tag);
  campo.innerHTML = conteudo;
  responsiveVoice.speak(conteudo, 'Brazilian Portuguese Female', {rate: 1.2})
}

function exibirTelaInicial() {
  exibirTextoNaTela("h1", "Jogo do número secreto");
  exibirTextoNaTela("p", "escolha um número entre 1 e 10");
}

let numerosAleatoriosSorteados = [];

function gerarNumeroAleatorio() {
  let numeroEscolhido = Math.floor(Math.random() * (limite - 1) + 1);
  let quantidadeDeElementosDaLista = numerosAleatoriosSorteados.length;

  if(quantidadeDeElementosDaLista == limite) {
    numerosAleatoriosSorteados = [];
  }

  if (numerosAleatoriosSorteados.includes(numeroEscolhido)) {
    return gerarNumeroAleatorio();
  }

  numerosAleatoriosSorteados.push(numeroEscolhido);
  return numeroEscolhido;
}

let numeroAleatorio = gerarNumeroAleatorio();

exibirTelaInicial();

function limparCampo() {
  document.querySelector("input").value = "";
}

function verificarChute() {
  let chute = document.querySelector("input").value;

  if (chute == numeroAleatorio) {
    exibirTextoNaTela("h1", "Acertou");
    let palavraTentativa = tentativa > 1 ? "tentativas" : "tentativa";
    let mensagenTentativa = `Voçê descobriu o número secreto com ${tentativa} ${palavraTentativa}`;
    exibirTextoNaTela("p", mensagenTentativa);
    document.getElementById("reiniciar").removeAttribute("disabled");
  } else {
    if (chute < numeroAleatorio) {
      exibirTextoNaTela("p", "o número secreto é maior");
    } else {
      exibirTextoNaTela("p", "o número secreto é menor");
    }
    tentativa++;
  }
  limparCampo();
}

function reiniciarJogo() {
  limparCampo();
  numeroAleatorio = gerarNumeroAleatorio();
  tentativa = 1;
  exibirTelaInicial();
  document.getElementById("reiniciar").setAttribute("disabled", true);
}
