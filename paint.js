const canvas = document.querySelector('#canvas')
const ctx = canvas.getContext('2d')
const color = document.querySelector('#color-picker')
const size = document.querySelector('#brush-size')
const clearButton = document.querySelector('[title=clear]')
const MODES = {
  DRAW: 'draw',
  ERASE: 'erase',
  FILL: 'fill',
  RECT: 'rect',
  CIRCLE: 'circle',
  LINE: 'line',
  PICKER: 'picker',
  CLEAR: 'clear'
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
  if (mode === MODES.PICKER) return
  if (mode === MODES.DRAW) {
    ctx.beginPath()
    ctx.moveTo(lastX, lastY)
    ctx.lineTo(offsetX, offsetY)
    ctx.strokeStyle = color.value
    ctx.lineWidth = size.value
    ctx.stroke()
    ;[lastX, lastY] = [offsetX, offsetY]
  }
  if (mode === MODES.RECT) {
    ctx.beginPath()
    ctx.rect(lastX, lastY, offsetX - lastX, offsetY - lastY)
    ctx.strokeStyle = color.value
    ctx.lineWidth = size.value
    ctx.stroke()
    ;[lastX, lastY] = [offsetX, offsetY]
  }
})

clearButton.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  setTimeout(() => clearButton.classList.remove('active'), 10)
})

const buttons = document.querySelector('aside').querySelectorAll('button')
buttons.forEach(button => {
  button.addEventListener('click', ({ target: { title } }) => {
    if (!title.includes(MODES.ERASE)) buttons.forEach(button => button.classList.remove('active'))
    button.classList.add('active')
    if (title.includes(MODES.DRAW)) mode = MODES.DRAW
    else if (title.includes(MODES.ERASE)) mode = MODES.ERASE
    else if (title.includes(MODES.FILL)) mode = MODES.FILL
    else if (title.includes(MODES.RECT)) mode = MODES.RECT
    else if (title.includes(MODES.CIRCLE)) mode = MODES.CIRCLE
    else if (title.includes(MODES.LINE)) mode = MODES.LINE
  })
})
/* rectangle */
canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  if (mode !== MODES.RECT) return
  ctx.beginPath()
  ctx.rect(lastX, lastY, offsetX - lastX, offsetY - lastY)
  ctx.strokeStyle = color.value
  ctx.lineWidth = size.value
  ctx.stroke()
  ;[lastX, lastY] = [offsetX, offsetY]
})
/* circle */
canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  if (mode !== MODES.CIRCLE) return
  ctx.beginPath()
  ctx.arc(offsetX, offsetY, size.value, 0, Math.PI * 2)
  ctx.strokeStyle = color.value
  ctx.lineWidth = size.value
  ctx.stroke()
})
/* line */
canvas.addEventListener('mousedown', ({ offsetX, offsetY }) => {
  if (mode !== MODES.LINE) return
  ctx.beginPath()
  ctx.moveTo(lastX, lastY)
  ctx.lineTo(offsetX, offsetY)
  ctx.strokeStyle = color.value
  ctx.lineWidth = size.value
  ctx.stroke()
  ;[lastX, lastY] = [offsetX, offsetY]
})