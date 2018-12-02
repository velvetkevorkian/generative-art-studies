import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { hexToHSL } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

let HSLStroke

export default new p5(p => {
  const vars = {
    backgroundColor: { value: '#000000' },
    strokeColor: { value: '#ff0000' },
    strokeAlpha: {
      value: 0.025,
      max: 1,
      step: 0.001
    },
    modulateStroke: { value: true },
    modulateValue: {
      value: 0.08,
      max: 1,
      step: 0.01
    },
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
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.colorMode(p.HSL)
    const options = {
      context: p,
      selector: '.chapter-3-ui'
    }
    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
    HSLStroke = p.colorFromObject(hexToHSL(ui.strokeColor), ui.strokeAlpha)
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

    p.stroke(HSLStroke)

    let lastX = startX, lastY = startY

    for(let x = startX + step; x < endX; x += step) {
      let ystep = (Math.random() - 0.5) * 10
      let y = lastY + ystep
      p.line(lastX, lastY, x, y)
      lastX = x
      lastY = y
    }

    if(ui.modulateStroke) {
      const newStroke = {
        h: p.hue(HSLStroke) + ui.modulateValue,
        s: p.saturation(HSLStroke),
        l: p.lightness(HSLStroke)
      }
      HSLStroke = p.colorFromObject(newStroke, ui.strokeAlpha)
    }
  }

  p.rgba = function(hex, alpha) {
    const col = p.color(hex)
    col.setAlpha(alpha)
    return col
  }

  p.colorFromObject = (obj, alpha = 1) => {
    return p.color(obj.h, obj.s, obj.l, alpha)
  }

  p.clear = () => {
    p.blendMode(p.BLEND)
    p.background(ui.backgroundColor)
    p.blendMode(p[ui.blendMode])
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    p.clear()
  }
}, document.querySelector('#chapter-3'))
