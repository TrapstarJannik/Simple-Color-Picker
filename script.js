// script.js

const colorPalette = document.getElementById('colorPalette');
const colorHexInput = document.getElementById('colorHex');
const colorRGBInput = document.getElementById('colorRGB');
const colorDisplay = document.getElementById('colorDisplay');

const colorPickerWrapper = document.getElementById('colorPickerWrapper');
colorPickerWrapper.style.margin = '20px auto'; 

const canvasSize = 256; 
colorPalette.width = canvasSize;
colorPalette.height = canvasSize;

const ctx = colorPalette.getContext('2d');
const paletteSize = canvasSize;

for (let i = 0; i < paletteSize; i++) {
  for (let j = 0; j < paletteSize; j++) {
    const angle = Math.atan2(i - paletteSize / 2, j - paletteSize / 2) + Math.PI;
    const hue = angle * (180 / Math.PI);
    const saturation = Math.sqrt(Math.pow(i - paletteSize / 2, 2) + Math.pow(j - paletteSize / 2, 2)) / (paletteSize / 2);
    ctx.fillStyle = `hsl(${hue}, ${saturation * 100}%, 50%)`;
    ctx.fillRect(i, j, 1, 1);
  }
}

let selectedX = paletteSize / 2;
let selectedY = paletteSize / 2;

updateColor(selectedX, selectedY);

colorPalette.addEventListener('mousedown', function(event) {
  updateColor(event.offsetX, event.offsetY);
  colorPalette.addEventListener('mousemove', onMouseMove);
});

document.addEventListener('mouseup', function() {
  colorPalette.removeEventListener('mousemove', onMouseMove);
});

function onMouseMove(event) {
  updateColor(event.offsetX, event.offsetY);
}

function updateColor(x, y) {
  selectedX = Math.max(0, Math.min(x, paletteSize - 1));
  selectedY = Math.max(0, Math.min(y, paletteSize - 1));

  const pixel = ctx.getImageData(selectedX, selectedY, 1, 1);
  const data = pixel.data;
  const hexColor = "HEX: " + rgbToHex(data[0], data[1], data[2]); 
  const rgbColor = `RGB: ${data[0]}, ${data[1]}, ${data[2]}`;
  colorHexInput.value = hexColor;
  colorRGBInput.value = rgbColor;
  colorDisplay.style.backgroundColor = rgbToHex(data[0], data[1], data[2]); 
  colorDisplay.style.left = `${selectedX - 5}px`;
  colorDisplay.style.top = `${selectedY - 5}px`;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function componentToHex(c) {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}