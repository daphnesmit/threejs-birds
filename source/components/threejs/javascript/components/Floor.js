import { Mesh, MeshLambertMaterial, PlaneBufferGeometry } from 'three'

class Floor {
  constructor(scene, config) {
    this.config = config
    this.scene = scene
    this.instance = this.createInstance()

    this.init()
  }

  createInstance() {
    const groundGeo = new PlaneBufferGeometry(10000, 10000)
    const groundMat = new MeshLambertMaterial({ color: 0xe0dacd })
    const floor = new Mesh(groundGeo, groundMat)
    floor.rotation.x = this.config.rotation.x
    floor.position.y = this.config.position.y
    floor.receiveShadow = this.config.receiveShadow

    return floor
  }

  init() {
    this.scene.add(this.instance)
  }
}

export default Floor
