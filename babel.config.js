/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.json'],
        alias: {
          'types': './@types',
          '@hooks': './src/hooks',
          '@screens': './src/screens',
          '@components': './src/components',
          '@services' : './src/services',
          "@store" : './src/store',
          '@theme' : './src/theme',
          '@graphql': "./src/graphql",
          '@utils': './src/utils.ts',
          '@constants': './src/constants'
        },
      },
    ],
    'inline-dotenv',
    'react-native-reanimated/plugin', // needs to be last
  ],
};
