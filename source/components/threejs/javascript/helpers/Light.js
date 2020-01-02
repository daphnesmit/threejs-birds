import Environment from '@utilities/environment'
import {
  AmbientLight,
  CameraHelper,
  DirectionalLight,
  DirectionalLightHelper,
  HemisphereLight,
  HemisphereLightHelper,
} from 'three'

class Light {
  constructor(scene, config) {
    this.scene = scene
    this.config = config
    this.instance = {}

    this.addLight()
    this.addShadowLight()
    this.addBackLight()

    if (Environment.isLocal) {
      this.addHelpers()
    }
  }

  addLight() {
    const { color, groundColor, intensity, x, y, z } = this.config.light
    this.instance.light = new HemisphereLight(color, groundColor, intensity)
    this.instance.light.position.set(x, y, z)

    // Add to scene
    this.scene.add(this.instance.light)
  }

  addShadowLight() {
    const { color, intensity, x, y, z, castShadow } = this.config.shadowLight
    this.instance.shadowLight = new DirectionalLight(color, intensity)
    this.instance.shadowLight.position.set(x, y, z)
    this.instance.shadowLight.castShadow = castShadow

    var d = 200
    this.instance.shadowLight.shadow.camera.left = -d
    this.instance.shadowLight.shadow.camera.right = d
    this.instance.shadowLight.shadow.camera.top = d
    this.instance.shadowLight.shadow.camera.bottom = -d
    this.instance.shadowLight.shadow.camera.far = 2000
    this.instance.shadowLight.shadow.bias = -0.0001

    this.scene.add(new AmbientLight(0x404040))

    // Add to scene
    this.scene.add(this.instance.shadowLight)
  }

  addBackLight() {
    const { color, intensity, x, y, z, castShadow } = this.config.backLight
    this.instance.backLight = new DirectionalLight(color, intensity)
    this.instance.backLight.position.set(x, y, z)
    this.instance.backLight.castShadow = castShadow

    // Add to scene
    this.scene.add(this.instance.backLight)
  }

  addHelpers() {
    // Hemi Helpers
    const hemiLightHelper = new HemisphereLightHelper(this.instance.light, 10)
    this.scene.add(hemiLightHelper)

    // ShadowLight Helpers
    const shadowLightHelper = new DirectionalLightHelper(this.instance.shadowLight, 10)
    const shadowLightCameraHelper = new CameraHelper(this.instance.shadowLight.shadow.camera)
    this.scene.add(shadowLightHelper)
    this.scene.add(shadowLightCameraHelper)

    // Backlight Helpers
    const backLightHelper = new DirectionalLightHelper(this.instance.backLight, 10)
    const backLightCameraHelper = new CameraHelper(this.instance.backLight.shadow.camera)
    this.scene.add(backLightHelper)
    this.scene.add(backLightCameraHelper)
  }
}

export default Light
