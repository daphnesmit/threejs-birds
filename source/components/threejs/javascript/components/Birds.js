import Bird from './Bird'

class Birds {
  constructor(scene, config) {
    this.config = config
    this.scene = scene
    this.bird1 = this.createBird1()
    this.bird2 = this.createBird2()
    this.bird3 = this.createBird3()

    this.init()
  }

  createBird1() {
    const bird1 = new Bird()
    bird1.instance.position.x = 0
    return bird1
  }

  createBird2() {
    const bird2 = new Bird()
    bird2.instance.position.x = -250
    bird2.side = 'right'
    bird2.instance.scale.set(0.8, 0.8, 0.8)
    bird2.instance.position.y = -8
    return bird2
  }

  createBird3() {
    const bird3 = new Bird()
    bird3.instance.position.x = 250
    bird3.side = 'left'
    bird3.instance.scale.set(0.8, 0.8, 0.8)
    bird3.instance.position.y = -8
    return bird3
  }

  init() {
    this.scene.add(this.bird1.instance)
    this.scene.add(this.bird2.instance)
    this.scene.add(this.bird3.instance)
  }
}

export default Birds
