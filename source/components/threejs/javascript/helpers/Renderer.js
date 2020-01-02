import { PCFSoftShadowMap, sRGBEncoding, WebGLRenderer } from 'three'

class Renderer {
  constructor(canvas, config) {
    this.canvas = canvas
    this.instance = new WebGLRenderer({ canvas, ...config })

    this.instance.outputEncoding = sRGBEncoding
    this.instance.shadowMap.enabled = true
    this.instance.shadowMap.type = PCFSoftShadowMap
    // this.instance.shadowMap.renderSingleSided = false // default is true
    // this.instance.shadowMap.autoUpdate = true
  }

  render(scene, camera) {
    this.instance.render(scene, camera)
  }

  getSizing() {
    const pixelRatio = window.devicePixelRatio
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const deviceWidth = (this.canvas.clientWidth * pixelRatio) | 0
    const deviceHeight = (this.canvas.clientHeight * pixelRatio) | 0
    const needResize = this.canvas.width !== deviceWidth || this.canvas.height !== deviceHeight
    if (needResize) {
      this.instance.setSize(deviceWidth, deviceHeight, false)
    }
    return { deviceWidth, deviceHeight, width, height, needResize }
  }
}

export default Renderer
