import { BackSide, Color, Mesh, ShaderMaterial, SphereBufferGeometry } from 'three'

class Sky {
  constructor(scene, config, light) {
    this.config = config
    this.light = light
    this.scene = scene
    this.instance = this.createInstance()

    this.init()
  }

  createInstance() {
    const vertexShader = document.querySelector('[js-hook-three-vertexShader]').textContent
    const fragmentShader = document.querySelector('[js-hook-three-fragmentShader]').textContent
    const uniforms = {
      topColor: { value: new Color(0x0077ff) },
      bottomColor: { value: new Color(0xffffff) },
      offset: { value: 33 },
      exponent: { value: 0.6 },
    }
    uniforms['topColor'].value.copy(this.light.color)
    this.scene.fog.color.copy(uniforms['bottomColor'].value)

    const skyGeo = new SphereBufferGeometry(1000, 35, 15)
    const skyMat = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
      side: BackSide,
    })
    const sky = new Mesh(skyGeo, skyMat)
    return sky
  }

  init() {
    this.scene.add(this.instance)
  }
}

export default Sky
