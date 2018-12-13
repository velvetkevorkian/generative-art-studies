import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { blendModes } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let ui

  const vars = {
    backgroundColor: {
      value: '#000000'
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
      uid: 'chapter-4-ui'
    }
    ui = new UI(vars, options).proxy
    p.background(ui.backgroundColor)
  }

  p.draw = () => {
    if(ui.clear) p.clear()
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
}, document.querySelector('#chapter-4'))