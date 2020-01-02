export default {
  light: {
    type: 'Hemisphere',
    color: 0xffffff,
    groundColor: 0xffffff,
    intensity: 0.3,
    x: 0,
    y: 0,
    z: 0,
  },
  shadowLight: {
    type: 'Directional',
    color: 0xffffff,
    intensity: 0.3,
    x: 200,
    y: 200,
    z: 200,
    castShadow: true,
  },
  backLight: {
    type: 'Directional',
    color: 0xffffff,
    intensity: 0.4,
    x: -100,
    y: 200,
    z: 50,
    castShadow: true,
  },
}
