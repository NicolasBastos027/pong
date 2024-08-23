//variaveis da bolinha
let xBolinha = 300;
let yBolinha = 200;
let velocidadeX = 5;
let velocidadeY = 5;
let diametro = 13;
let raio = diametro / 2;

//variaveis da raquete
let xRaquete = 5;
let yRaquete = 150;
let raqueteComprimento = 10;
let raqueteAltura = 90;

//raquete inimigo
let xRaqueteInimigo = 585;
let yRaqueteInimigo = 150;
let velocidadeYInimigo;
let chanceDeErrar = 0;

//placar
let meusPontos = 0;
let pontosInimigo = 0;

//sons do jogo
let raquetada;
let trilha;
let ponto;

function preload() {
  trilha = loadSound("trilha.mp3");
  ponto = loadSound("ponto.mp3");
  raquetada = loadSound("raquetada.mp3");
}
function setup() {
  createCanvas(600, 400);
  //trilha.loop();
}

function draw() {
  background(0);
  mostraBolinha();
  movimentaBolinha();
  verificaColisaoBorda();
  mostrarRaquete(xRaquete, yRaquete);
  movimentoRaquete();
  verificaoColisaoRaquete();
  mostrarRaquete(xRaqueteInimigo, yRaqueteInimigo);
  verificacaoColisaoRaqueteBolinha(xRaquete, yRaquete);
  verificacaoColisaoRaqueteBolinha(xRaqueteInimigo, yRaqueteInimigo);
  verificaoColisaoRaquete();
  incluirPlacar();
  movimentaRaqueteInimigo();
  marcaPonto();
}

//criação da bolinha
function mostraBolinha() {
  circle(xBolinha, yBolinha, 20);
}

//velocidade da bolinha
function movimentaBolinha() {
  xBolinha += velocidadeX;
  yBolinha += velocidadeY;
}

//colisao da bolinha
function verificaColisaoBorda() {
  if (xBolinha + raio > width || xBolinha - raio < 0) {
    velocidadeX *= -1;
  }

  if (yBolinha + raio > height || yBolinha - raio < 0) velocidadeY *= -1;

  function bolinhaNaoFicaPresa() {
    if (XBolinha - raio < 0) {
      XBolinha = 23;
    }
  }

  //mostrar raquete
}
function mostrarRaquete(x, y) {
  rect(x, y, raqueteComprimento, raqueteAltura);
}

function mostrarRaqueteInimigo() {
  rect(xRaqueteInimigo, yRaqueteInimigo, raqueteComprimento, raqueteAltura);
}

function movimentoRaquete() {
  if (keyIsDown(UP_ARROW)) {
    yRaquete -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRaquete += 10;
  }
  yRaquete = constrain(yRaquete, 0 , 310);
}
function verificaoColisaoRaquete() {
  if (
    xBolinha - raio > xRaquete &&
    yBolinha - raio < yRaquete + raqueteAltura &&
    yBolinha + raio > yRaquete
  ) {
    velocidadeX *= -1;
    raquetada.play();
  }
}
var colidiu = false;
function verificacaoColisaoRaqueteBolinha(x, y) {
  colidiu = collideRectCircle(
    x,
    y,
    raqueteComprimento,
    raqueteAltura,
    xBolinha,
    yBolinha,
    raio
  );
  if (colidiu) {
    velocidadeX *= -1;
    raquetada.play();
  }
}

function movimentaRaqueteInimigo() {
  velocidadeYInimigo = yBolinha - yRaqueteInimigo - raqueteComprimento / 2 - 50;
  yRaqueteInimigo += velocidadeYInimigo + chanceDeErrar;
  calculaChanceDeErrar();

  yRaqueteInimigo = constrain(yRaqueteInimigo, 0, 510);
}
function calculaChanceDeErrar() {
  if (pontosInimigo >= meusPontos) {
    chanceDeErrar += 1;
    if (chanceDeErrar >= 39) {
      chanceDeErrar = 80;
    }
  } else {
    chanceDeErrar -= 1;
    if (chanceDeErrar <= 35) {
      chanceDeErrar = 35;
    }
  }
}
function incluirPlacar() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 40, 0));
  rect(150, 10, 40, 20);
  fill(255);
  text(meusPontos, 170, 26);
  fill(color(225, 40, 0));
  rect(450, 10, 40, 20);
  fill(255);
  text(pontosInimigo, 470, 26);
}
function marcaPonto() {
  if (xBolinha > 590) {
    meusPontos += 1;
    ponto.play();
  }
  if (xBolinha < 10) {
    pontosInimigo += 1;
    ponto.play();
  }
}
