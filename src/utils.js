// based on https://codepen.io/pankajparashar/pen/oFzIg
function hexToHSL(hex, hScale = 360, sScale = 100, lScale = 100) {
  let r = parseInt(hex.substring(1, 3), 16) / 255
  let g = parseInt(hex.substring(3, 5), 16) / 255
  let b = parseInt(hex.substring(5), 16) / 255

  var max = Math.max(r, g, b), min = Math.min(r, g, b)
  var h, s, l = (max + min) / 2

  if (max == min) { h = s = 0 }
  else {
    var d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max){
    case r: h = (g - b) / d + (g < b ? 6 : 0); break
    case g: h = (b - r) / d + 2; break
    case b: h = (r - g) / d + 4; break
    }

    h /= 6
  }

  return {
    h: (h * hScale + 0.5)|0,
    s: (s * sScale + 0.5)|0,
    l: (l * lScale + 0.5)|0
  }
}

export {hexToHSL}