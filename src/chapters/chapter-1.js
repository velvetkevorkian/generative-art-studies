import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import '@velvetkevorkian/sketch-ui/src/ui.css'

const chapterOne = new p5(p => {
  const vars = {
    backgroundColor: {
      value: '#000000'
    }
  }

  const options = {
    context: p,
    selector: '.chapter-1-ui'
  }

  const ui = new UI(vars, options).proxy

  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.background(ui.backgroundColor)
  }

  p.draw = () => {
    p.background(ui.backgroundColor)
  }
}, document.querySelector('#chapter-1'))

export default chapterOne