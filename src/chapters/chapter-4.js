import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { blendModes, colorFromObject, hexToHSL, colorToHex } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let ui, x, y, pauseCallbacks = false, HSLStroke

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
    animateStrokeColor: {
      value: true
    },
    modulateValue: {
      value: 0.08,
      max: 1,
      step: 0.01
    },
    steps: {
      value: 200,
      min: 3,
      max: 500
    },
    radius: {
      value: 50,
      max: 1000
    },
    animateRadius: {
      value: true
    },
    animateRadiusAmount: {
      value: 5,
      min: 0,
      max: 20
    },
    noise: {
      value: 5,
      min: 0,
      max: 500
    },
    spiral: {
      value: false
    },
    degrees: {
      value: 360,
      max: 360 * 10
    },
    blendMode: {
      options: blendModes(),
      label: 'Blend Mode',
      callback: (val, p) => p.blendMode(p[val])
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
      selector: '.chapter-4-ui',
      uid: 'chapter-4-ui',
      save: true
    }
    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
    x = p.windowWidth/2
    y = p.windowHeight/2
    HSLStroke = colorFromObject(hexToHSL(ui.strokeColor), ui.strokeAlpha, p)
    if(!ui.loop) p.noLoop()
    p.blendMode(p[ui.blendMode])
    p.noFill()
  }

  p.draw = () => {
    if(ui.clear) p.clear()

    p.strokeWeight(ui.strokeWeight)
    p.stroke(HSLStroke)

    p.beginShape()
    const angleStep = p.radians(ui.degrees)/ui.steps
    const radiusStep = ui.radius / ui.steps

    for(let step = 0; step <= ui.steps; step = step + 1) {

      const angle = angleStep * step
      const rad = ui.spiral ? (ui.radius - radiusStep * step) : ui.radius
      const xpos = x + (rad * p.cos(angle))
      const ypos = y + (rad * p.sin(angle))

      const xnoise = ((p.noise(xpos, p.frameCount) - 0.5) * ui.noise)
      const ynoise = ((p.noise(ypos, p.frameCount) - 0.5) * ui.noise)

      p.vertex(xpos + xnoise, ypos + ynoise)
    }
    p.endShape()
    p.updateRadius()
    p.updateStroke()
  }

  p.updateRadius = () => {
    if(ui.animateRadius) {
      ui.radius = ui.radius + p.random(ui.animateRadiusAmount * -1, ui.animateRadiusAmount)
    }
  }

  p.updateStroke = () => {
    if(ui.animateStrokeColor) {
      const newStroke = {
        h: p.hue(HSLStroke) + ui.modulateValue,
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
    x = p.windowWidth/2
    y = p.windowHeight/2
  }
}, document.querySelector('#chapter-4'))