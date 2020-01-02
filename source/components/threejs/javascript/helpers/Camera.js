import Environment from '@utilities/environment'
import { PerspectiveCamera, Vector3 } from 'three'
import OrbitControls from 'three-orbitcontrols'

class Camera {
  constructor(renderer, config) {
    const width = renderer.domElement.width
    const height = renderer.domElement.height
    this.instance = new PerspectiveCamera(config.fov, width / height, config.near, config.far)
    this.instance.position.set(config.posX, config.posY, config.posZ)
    this.instance.lookAt(new Vector3(0, 0, 0))

    if (Environment.isLocal) {
      this.controls = new OrbitControls(this.instance, renderer.domElement)
      this.controls.update()
    }
  }

  setSize({ width, height }) {
    // Update camera aspect ratio with window aspect ratio
    this.instance.aspect = width / height
    // Always call updateProjectionMatrix on camera change
    this.instance.updateProjectionMatrix()
  }
}

export default Camera
