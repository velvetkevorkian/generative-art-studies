import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let ui

  const vars = {
    backgroundColor: {
      value: '#000000'
    },
  }

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    const options = {
      context: p,
      selector: '.chapter-5-ui',
      uid: 'chapter-5-ui',
      save: true
    }

    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
  }

  p.draw = () => {
    clear()

  }

  const clear = () => {
    p.clear()
    p.background(ui.backgroundColor)
  }

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth, p.windowHeight)
    clear()
  }
}, document.querySelector('#chapter-5'))