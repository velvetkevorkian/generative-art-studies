import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'

const chapterOne = new p5(p => {
  p.setup = () => {
    p.noLoop()
    p.background(0, 0, 0)
  }
}, document.querySelector('#chapter-1'))

const chapterTwo = new p5(p => {
  p.setup = () => {
    p.noLoop()
    p.background(255, 0, 0)
  }
}, document.querySelector('#chapter-2'))