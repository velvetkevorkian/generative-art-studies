import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import { hexToHSL } from '@velvetkevorkian/sketch-utils'
import '@velvetkevorkian/sketch-ui/src/ui.css'

let ui

export default new p5(p => {
  let ui

  const vars = {
    backgroundColor: {
      value: '#000000'
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
  }
}, document.querySelector('#chapter-4'))