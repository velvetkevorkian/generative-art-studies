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
      max: 10,
      step: 0.1
    },
    drawLines: {
      value: true
    },
    drawRects: {
      value: true
    },
    loop: {
      value: true,
      callback: (val, p) => val ? p.loop() : p.noLoop()
    },
    frameRate: {
      type: 'text',
      value: 0
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
    p.strokeCap(p.SQUARE)
    p.blendMode(p.ADD)

    window.setInterval(() => {
      ui.frameRate = p.frameRate().toFixed(2)
    }, 1000)
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
          alpha = noise,
          xSize = noise * xStep,
          ySize = noise * yStep,
          xSizeScaled = noise * xStep * ui.scaleFactor,
          ySizeScaled = noise * yStep * ui.scaleFactor,
          hue = noise * 360,
          col = p.color(hue, 50, 50, alpha)

        p.strokeWeight(ui.strokeWeight)
        p.stroke(col)
        p.push()
        p.translate(xpos, ypos)

        if(ui.drawLines) {
          p.rotate(noise * p.TWO_PI)
          p.line(xSizeScaled * -0.5, ySizeScaled * -0.5, xSizeScaled * 0.5, ySizeScaled * 0.5)
        }

        if(ui.drawRects) {
          p.noStroke()
          p.fill(col)
          p.rect(0, 0, xSize, ySize)
        }
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