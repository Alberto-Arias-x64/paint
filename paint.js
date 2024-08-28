const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const color = document.querySelector('#color-picker')
const clearButton = document.querySelector('[title=clear]')
const MODES = {
  DRAW: 'draw',
  ERASE: 'erase',
  FILL: 'fill',
  RECT: 'rect',
  CIRCLE: 'circle',
  LINE: 'line'
}

let isDrawing = false
let startX = 0
let startY = 0
let lastX = 0
let lastY = 0
let mode = MODES.DRAW

canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  isDrawing = true
  ;[lastX, lastY] = [offsetX, offsetY]
})

canvas.addEventListener('mouseup', () => {
  isDrawing = false
})

canvas.addEventListener('mouseleave', () => {
  isDrawing = false
})

canvas.addEventListener('mousemove', ({ offsetX, offsetY }) => {
  if (!isDrawing) return
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(offsetX, offsetY)
  ctx.strokeStyle = color.value
  ctx.lineWidth = 2
  ctx.stroke()
  ;[lastX, lastY] = [offsetX, offsetY]
})

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
})
