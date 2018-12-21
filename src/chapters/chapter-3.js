import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { hexToHSL, colorToHex, colorFromObject, blendModes, shapeTypes } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let HSLStroke, ui, pauseCallbacks = false

  const vars = {
    backgroundColor: {
      value: '#000000'
    },
    strokeColor: {
      value: '#ff0000',
      callback: (val, p) => {
        if(!pauseCallbacks) {
          HSLStroke = colorFromObject(hexToHSL(val), 1, p)
        }
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
    strokeColorMod: {
      value: 0.08,
      max: 1,
      step: 0.01,
      min: 0
    },
    blendMode: {
      options: blendModes(),
      label: 'Blend Mode',
      callback: (val, p) => p.blendMode(p[val])
    },
    steps: {
      value: 150,
      max: 1000,
      min: 1
    },
    yScale: {
      value: 10,
      max: 100,
      min: 1
    },
    shapeType: {
      options: shapeTypes()
    },
    loop: {
      value: true,
      callback: (val, p) => val ? p.loop() : p.noLoop()
    },
    clear: {
      value: false
    },
    clearButton: {
      type: 'button',
      label: 'Clear',
      callback: p => p.clear()
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
      selector: '.chapter-3-ui',
      uid: 'chapter-3-ui',
      save: true
    }
    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
    HSLStroke = colorFromObject(hexToHSL(ui.strokeColor), ui.strokeAlpha, p)
    if(!ui.loop) p.noLoop()
    p.blendMode(p[ui.blendMode])
    p.noFill()
  }

  p.draw = () => {
    if(ui.clear) p.clear()

    p.strokeWeight(ui.strokeWeight)
    p.stroke(HSLStroke)

    ui.shapeType == 'none' ? p.beginShape() : p.beginShape(p[ui.shapeType])

    const xStep = p.windowWidth / ui.steps
    let y = p.windowHeight / 2

    for(let x = 0; x <= p.windowWidth; x += xStep) {
      const ystep = ((Math.random() - 0.5) * ui.yScale)
      y = y + ystep
      p.vertex(x, y)
    }

    p.endShape()

    if(ui.strokeColorMod != 0) {
      const newStroke = {
        h: p.hue(HSLStroke) + ui.strokeColorMod,
        s: p.saturation(HSLStroke),
        l: p.lightness(HSLStroke)
      }
      HSLStroke = colorFromObject(newStroke, ui.strokeAlpha, p)
      pauseCallbacks = true
      ui.strokeColor = colorToHex(HSLStroke, p)
      pauseCallbacks = false
    }
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
