import * as dat from 'dat.gui'

class DatGUI {
  constructor({ camera, light, floor }) {
    this.gui = new dat.GUI()
    this.setCamera(camera)
    this.setLight(light)
    this.setFloor(floor)
  }

  setCamera(camera) {
    const cameraGui = this.gui.addFolder('Camera position')
    cameraGui.add(camera.position, 'x').listen()
    cameraGui.add(camera.position, 'y').listen()
    cameraGui.add(camera.position, 'z').listen()
    cameraGui.open()

    var project = this.gui.addFolder('Camera projection')
    project.add(camera, 'fov').listen()
    project.add(camera, 'near').listen()
    project.add(camera, 'far').listen()
    project.open()
  }

  setFloor(floor) {
    const floorGui = this.gui.addFolder('Floor')
    floorGui.add(floor.rotation, 'x').listen()
    floorGui.add(floor.position, 'y').listen()
    floorGui.open()
  }

  setLight(light) {
    Object.keys(light).map(key => {
      const lightGui = this.gui.addFolder(`Light - ${key}`)
      lightGui.add(light[key].position, 'x').listen()
      lightGui.add(light[key].position, 'y').listen()
      lightGui.add(light[key].position, 'z').listen()
      lightGui.open()
    })
  }
}

export default DatGUI
