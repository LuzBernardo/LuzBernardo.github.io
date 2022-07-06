const stringPixelBoard = 'pixel-board';
const stringColorPalette = 'color-palette';
const stringColorSelected = 'color selected';

function criandoADivDaPaleta() {
  const elementCabecalho = document.getElementById('cabecalho');
  const paleta = document.createElement('div');
  paleta.id = stringColorPalette;
  elementCabecalho.appendChild(paleta);
}
criandoADivDaPaleta();

const paletas = document.getElementById(stringColorPalette);

function criandoAPaleta() {
  for (let i = 0; i < 4; i += 1) {
    const divDaCor = document.createElement('div');
    divDaCor.className = 'color';
    divDaCor.style.height = '25px';
    divDaCor.style.width = '25px';
    divDaCor.style.border = '1px solid black';
    paletas.appendChild(divDaCor);
  }
}
criandoAPaleta();

const paletasFilhos = paletas.children;

function getRandomColor() {
  const options = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i += 1) {
    color += options[Math.floor(Math.random() * 16)];
  }
  return color;
}

paletasFilhos[0].style.backgroundColor = 'black';
paletasFilhos[1].style.backgroundColor = getRandomColor();
paletasFilhos[2].style.backgroundColor = getRandomColor();
paletasFilhos[3].style.backgroundColor = getRandomColor();

function criandoPixelBoard(n) {
  const pixelBoard = document.getElementById(stringPixelBoard);
  for (let i = 0; i < n; i += 1) {
    const pixels = document.createElement('div');
    pixels.className = 'pixel';
    pixels.style.backgroundColor = 'white';
    pixels.style.width = '40px';
    pixels.style.height = '40px';
    pixels.style.border = '1px solid black';
    pixelBoard.appendChild(pixels);
  }
}
criandoPixelBoard(25);

function blackSelected() {
  const firstColorSelected = document.querySelector('.color');
  firstColorSelected.className = stringColorSelected;
}
blackSelected();

const paletaDeCores = document.getElementById(stringColorPalette);
function selecionandoCores(event) {
  const evento = event;
  const corSelecionada = document.getElementsByClassName(stringColorSelected);
  const eventTargetClassName = event.target.className;
  if (eventTargetClassName === stringColorSelected) {
    evento.target.className = stringColorSelected;
  }
  if (eventTargetClassName === 'color') {
    corSelecionada[0].className = 'color';
    evento.target.className = stringColorSelected;
  }
}
paletaDeCores.addEventListener('click', selecionandoCores);

const pixelBoard = document.getElementById(stringPixelBoard);
function pintandoOQuadro(event) {
  const evento = event;
  const corSelecionada = document.getElementsByClassName(stringColorSelected);
  console.log(event.target.style.backgroundColor);
  console.log(event.target);
  console.log(corSelecionada[0].style.backgroundColor);
  if (
    event.target.style.backgroundColor !== corSelecionada[0].style.backgroundColor
  ) {
    evento.target.style.backgroundColor = corSelecionada[0].style.backgroundColor;
  }
}
pixelBoard.addEventListener('click', pintandoOQuadro);

const divBotao = document.getElementById('btn-reset');
function reset() {
  const pixel = document.getElementsByClassName('pixel');
  for (let i = 0; i < pixel.length; i += 1) {
    pixel[i].style.backgroundColor = 'white';
  }
}
divBotao.addEventListener('click', reset);

function inputSpace() {
  const caixaDeInput = document.createElement('input');
  const botaoModificador = document.createElement('button');
  const divDoInput = document.getElementById('modificador');
  caixaDeInput.id = 'board-size';
  caixaDeInput.type = 'number';
  caixaDeInput.min = '1';
  caixaDeInput.step = '1';
  caixaDeInput.placeholder = 'Escreve o tamanho do quadro de pixels';
  botaoModificador.id = 'generate-board';
  botaoModificador.innerText = 'VQV';
  divDoInput.append(caixaDeInput);
  divDoInput.append(botaoModificador);
}
inputSpace();

function removePixels() {
  const pixels = document.getElementsByClassName('pixel');
  const tamanho = pixels.length;
  for (let i = 0; i < tamanho; i += 1) {
    pixelBoard.firstElementChild.remove();
  }
}

function tamanhoEmValor() {
  const tamanhoEscrito = document.getElementById('board-size');
  let valorEscrito = parseInt(tamanhoEscrito.value, 10);
  if (valorEscrito < 5 && valorEscrito > 0) valorEscrito = 5;
  if (valorEscrito > 50) valorEscrito = 50;
  return valorEscrito;
}

function clicandoNoBotao() {
  const tamanhoDoBoard = document.getElementById(stringPixelBoard);
  const valorEscrito = tamanhoEmValor();
  if (valorEscrito > 0) {
    removePixels();
    criandoPixelBoard(valorEscrito * valorEscrito);
    tamanhoDoBoard.style.width = `${valorEscrito * 42}px`;
    tamanhoDoBoard.style.height = `${valorEscrito * 42}px`;
  } else {
    alert('Board inválido!');
  }
}

function redimensionandoOsPixels() {
  const botaoModificador = document.getElementById('generate-board');
  botaoModificador.addEventListener('click', clicandoNoBotao);
}
redimensionandoOsPixels();
