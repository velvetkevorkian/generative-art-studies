import p5 from 'p5'

const chapterOne = new p5(p => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.noLoop()
    p.background(0, 0, 0)
  }
}, document.querySelector('#chapter-1'))

export default chapterOne