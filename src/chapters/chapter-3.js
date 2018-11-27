import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  const vars = {
    backgroundColor: { value: '#000000' },
    strokeColor: { value: '#ff0000' },
    strokeAlpha: { value: 20 },
    loop: {
      value: true,
      callback: (val, p) => {
        val == true ? p.loop() : p.noLoop()
      }
    },
    blendMode: {
      value: ['ADD', 'BLEND'],
      label: 'Blend Mode',
      callback: (val, p) => { p.blendMode(p[val]) }
    },
    clear: { value: false },
    clearButton: {
      type: 'button',
      label: 'Clear',
      callback: p => { p.clear() }
    }
  }

  let ui

  p.setup = () => {
    const options = {
      context: p,
      selector: '.chapter-3-ui'
    }

    ui = new UI(vars, options).proxy
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(ui.backgroundColor)
    if(!ui.loop) p.noLoop()
    p.blendMode(p[ui.blendMode])
  }

  p.draw = () => {
    if(ui.clear) p.clear()

    const offset = 0
    const startX = offset, endX = p.windowWidth - offset
    const step = 10
    const startY = p.windowHeight / 2

    p.strokeWeight(2)

    p.stroke(p.rgba(ui.strokeColor, ui.strokeAlpha))

    let lastX = startX, lastY = startY

    for(let x = startX + step; x < endX; x += step) {
      let ystep = (Math.random() - 0.5) * 10
      let y = lastY + ystep
      p.line(lastX, lastY, x, y)
      lastX = x
      lastY = y
    }
  }

  p.rgba = function(hex, alpha) {
    const col = p.color(hex)
    col.setAlpha(alpha)
    return col
  }

  p.clear = () => {
    p.blendMode(p.BLEND)
    p.background(ui.backgroundColor)
    p.blendMode(p[ui.blendMode])
  }
}, document.querySelector('#chapter-3'))
