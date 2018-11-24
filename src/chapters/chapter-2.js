import p5 from 'p5'

const chapterTwo = new p5(p => {
  p.setup = () => {
    p.createCanvas(p.windowWidth, p.windowHeight)
    p.noLoop()
    p.background(255, 0, 0)
  }
}, document.querySelector('#chapter-2'))

export default chapterTwo