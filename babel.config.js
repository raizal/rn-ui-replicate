module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    'nativewind/babel',
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        extensions: ['.js', '.jsx', ',ts', '.tsx'],
        root: ['./src/'],
        alias: {
          '@src': './src',
          '@icons': './src/common/icons',
          '@components': './src/common/components',
          '@hooks': './src/common/hooks',
          '@themes': './src/themes',
          '@features': './src/features',
        },
      },
    ],
  ],
};
