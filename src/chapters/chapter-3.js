import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { hexToHSL } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

let HSLStroke, ui

export default new p5(p => {
  const vars = {
    backgroundColor: {
      value: '#000000'
    },
    strokeColor: {
      value: '#ff0000',
      callback: (val, p) => {
        HSLStroke = p.colorFromObject(hexToHSL(val))
      }
    },
    strokeAlpha: {
      value: 0.025,
      max: 1,
      step: 0.001
    },
    strokeWeight: {
      value: 1,
      min: 1,
      max: 10
    },
    modulateStroke: {
      value: true
    },
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
      value: ['ADD', 'BLEND', 'DARKEST', 'LIGHTEST', 'DIFFERENCE', 'EXCLUSION', 'MULTIPLY', 'SCREEN', 'REPLACE', 'OVERLAY', 'HARD_LIGHT', 'SOFT_LIGHT', 'DODGE', 'BURN'],
      label: 'Blend Mode',
      callback: (val, p) => { p.blendMode(p[val]) }
    },
    useVertices: {
      value: true
    },
    xStep: {
      value: 10,
      max: 100,
      min: 1
    },
    yScale: {
      value: 10,
      max: 100,
      min: 1
    },
    shapeType: {
      value: ['none', 'POINTS', 'LINES', 'TRIANGLES', 'TRIANGLE_STRIP', 'TRIANGLE_FAN', 'QUADS', 'QUAD_STRIP']
    },
    clear: {
      value: false
    },
    clearButton: {
      type: 'button',
      label: 'Clear',
      callback: p => { p.clear() }
    },
    saveButton: {
      type: 'button',
      label: 'Save image',
      callback: p => {
        const data = p.canvas.toDataURL()
        window.open(data)
      }
    }
  }

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
    p.noFill()
  }

  p.draw = () => {
    if(ui.clear) p.clear()

    const startX = 0, endX = p.windowWidth + (ui.xStep * 2)
    const startY = p.windowHeight / 2

    p.strokeWeight(ui.strokeWeight)

    p.stroke(HSLStroke)

    if(ui.useVertices) {
      ui.shapeType == 'none' ? p.beginShape() : p.beginShape(p[ui.shapeType])
    }
    let lastX = startX, lastY = startY

    for(let x = startX + ui.xStep; x < endX; x += ui.xStep) {
      const ystep = (Math.random() - 0.5) * ui.yScale
      const y = lastY + ystep

      if(ui.useVertices) p.vertex(lastX, lastY)
      else p.line(lastX, lastY, x, y)

      lastX = x
      lastY = y
    }

    if(ui.useVertices) p.endShape()

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
