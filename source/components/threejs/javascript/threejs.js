import Environment from '@utilities/environment'
import RafThrottle from '@utilities/raf-throttle'
import { CameraHelper, Scene } from 'three'

import { Birds, Floor } from './components'
import { camera, components, light, renderer } from './config'
import { Camera, DatGUI, Light, Renderer } from './helpers'

const JS_HOOK_CANVAS = '[js-hook-threejs-canvas]'

class ThreeJS {
  constructor(element) {
    this.container = element
    this.canvas = element.querySelector(JS_HOOK_CANVAS)

    this.mousePos = { x: 0, y: 0 }

    this.scene = new Scene()

    this.renderer = new Renderer(this.canvas, renderer)
    this.camera = new Camera(this.renderer.instance, camera)
    const cameraHelper = new CameraHelper(this.camera.instance)
    this.scene.add(cameraHelper)
    this.light = new Light(this.scene, light)
    this.floor = new Floor(this.scene, components.floor)
    this.birds = new Birds(this.scene, components.birds)

    this.init()
    this.bindEvents()

    if (Environment.isLocal) {
      this.initGui()
    }
  }

  init() {
    this.setSize()
    this.loop()
  }

  initGui() {
    new DatGUI({
      camera: this.camera.instance,
      light: this.light.instance,
      floor: this.floor.instance,
    })
  }

  loop() {
    const { bird1, bird2, bird3 } = this.birds

    const tempHA = (this.mousePos.x - this.width / 2) / 200
    const tempVA = (this.mousePos.y - this.height / 2) / 200
    const userHAngle = Math.min(Math.max(tempHA, -Math.PI / 3), Math.PI / 3)
    const userVAngle = Math.min(Math.max(tempVA, -Math.PI / 3), Math.PI / 3)
    bird1.look(userHAngle, userVAngle)

    if (bird1.hAngle < -Math.PI / 5 && !bird2.intervalRunning) {
      bird2.lookAway(true)
      bird2.intervalRunning = true
      bird2.behaviourInterval = setInterval(function() {
        bird2.lookAway(false)
      }, 1500)
    } else if (bird1.hAngle > 0 && bird2.intervalRunning) {
      bird2.stare()
      clearInterval(bird2.behaviourInterval)
      bird2.intervalRunning = false
    } else if (bird1.hAngle > Math.PI / 5 && !bird3.intervalRunning) {
      bird3.lookAway(true)
      bird3.intervalRunning = true
      bird3.behaviourInterval = setInterval(function() {
        bird3.lookAway(false)
      }, 1500)
    } else if (bird1.hAngle < 0 && bird3.intervalRunning) {
      bird3.stare()
      clearInterval(bird3.behaviourInterval)
      bird3.intervalRunning = false
    }

    bird2.look(bird2.shyAngles.h, bird2.shyAngles.v)
    bird2.bodyBird.material.color.setRGB(bird2.color.r, bird2.color.g, bird2.color.b)

    bird3.look(bird3.shyAngles.h, bird3.shyAngles.v)
    bird3.bodyBird.material.color.setRGB(bird3.color.r, bird3.color.g, bird3.color.b)

    this.render()
  }

  render() {
    this.renderer.render(this.scene, this.camera.instance)
    requestAnimationFrame(() => this.loop())
  }

  setSize() {
    const { deviceWidth, deviceHeight, width, height, needResize } = this.renderer.getSizing()

    this.width = width
    this.height = height

    if (needResize) {
      this.camera.setSize({ width: deviceWidth, height: deviceHeight })
    }
  }

  handleMouseMove(event) {
    this.mousePos = { x: event.clientX, y: event.clientY }
  }

  handleTouchStart(event) {
    if (event.touches.length > 1) {
      event.preventDefault()
      this.mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY }
    }
  }

  handleTouchEnd() {
    this.mousePos = { x: this.width / 2, y: this.height / 2 }
  }

  handleTouchMove(event) {
    if (event.touches.length == 1) {
      event.preventDefault()
      this.mousePos = { x: event.touches[0].pageX, y: event.touches[0].pageY }
    }
  }

  bindEvents() {
    RafThrottle.set([
      {
        element: window,
        event: 'resize',
        namespace: 'ThreeJSResize',
        fn: () => this.setSize(),
      },
    ])

    document.addEventListener('mousemove', e => this.handleMouseMove(e), false)
    document.addEventListener('touchstart', e => this.handleTouchStart(e), false)
    document.addEventListener('touchend', () => this.handleTouchEnd(), false)
    document.addEventListener('touchmove', e => this.handleTouchMove(e), false)
  }
}

export default ThreeJS
