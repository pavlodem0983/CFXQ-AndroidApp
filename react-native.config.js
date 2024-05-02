module.exports = {
  dependencies: {
    'react-native-flipper': {
      platforms: {
        ios: null
      }
    },
  },
  project: {
    ios: {},
    android: {}, // grouped into "project"
  },
  assets: ['./src/theme/assets/fonts/'],
}