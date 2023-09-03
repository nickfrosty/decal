module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          // add custom resolvers to fix node->react native library resolution
          alias: {
            buffer: "buffer",
            // buffer: "@craftzdog/react-native-buffer",
            stream: "stream-browserify",
            crypto: "react-native-quick-crypto",
          },
        },
      ],
      // required for expo-router
      "expo-router/babel",
      // required for tailwind support
      "nativewind/babel",
      // required for better animations
      "react-native-reanimated/plugin",
    ],
  };
};
