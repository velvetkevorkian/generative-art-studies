import p5 from 'p5'
import UI from '@velvetkevorkian/sketch-ui'
import '@velvetkevorkian/sketch-ui/src/ui.css'

export default new p5(p => {
  let ui,
    cachedFrameCount = 0,
    noiseXPosition = p.random(),
    noiseYPosition = p.random()

  const vars = {
    backgroundColor: {
      value: '#000000'
    },
    steps: {
      value: 50,
      min: 10,
      max: 100
    },
    noiseFactor: {
      value: 100,
      max: 500,
      min: 1
    },
    strokeWeight: {
      value: 1,
      max: 10,
      min: 1
    },
    scaleFactor: {
      value: 2,
      min: 1,
      max: 5,
      step: 0.25
    },
    animateNoiseTime: {
      value: true
    },
    noisePositionIncrement: {
      value: 0.1,
      min: 0,
      max: 100,
      step: 0.5
    },
    loop: {
      value: true,
      callback: (val, p) => val ? p.loop() : p.noLoop()
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
      selector: '.chapter-5-ui',
      uid: 'chapter-5-ui',
      save: true
    }

    ui = new UI(vars, options).proxy

    p.background(ui.backgroundColor)
    if(!ui.loop) p.noLoop()
    p.rectMode(p.CENTER)
    p.blendMode(p.ADD)
    p.noStroke()
  }

  p.draw = () => {
    clear()

    const
      xStep = p.windowWidth / ui.steps,
      yStep = p.windowHeight / ui.steps

    for(let y = 0; y <= p.windowHeight; y = y + yStep) {
      for(let x = 0; x <= p.windowWidth; x = x + xStep) {
        const
          xpos = x + xStep/2,
          ypos = y + yStep/2,
          zpos = cachedFrameCount / ui.noiseFactor,
          noise = p.noise((xpos + noiseXPosition) / ui.noiseFactor, (ypos + noiseYPosition) / ui.noiseFactor, zpos),
          alpha = 0.75,
          xSize = noise * xStep * ui.scaleFactor,
          ySize = noise * yStep * ui.scaleFactor,
          hue = noise * 360,
          col = p.color(hue, 50, 50, alpha)
        p.strokeWeight(ui.strokeWeight)
        p.stroke(col)
        p.push()
        p.translate(xpos, ypos)
        p.rotate(noise * p.TWO_PI)
        p.line(xSize * -0.5, ySize * -0.5, xSize * 0.5, ySize * 0.5)
        p.pop()
      }
    }

    if(ui.animateNoiseTime) cachedFrameCount = cachedFrameCount + 1
    noiseXPosition = noiseXPosition + ui.noisePositionIncrement
    noiseYPosition = noiseYPosition + ui.noisePositionIncrement
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