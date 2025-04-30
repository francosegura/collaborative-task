module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      require.resolve("expo-router/babel"),
      require.resolve("@babel/plugin-proposal-export-namespace-from"),
      "react-native-reanimated/plugin", // este sí va como string
    ],
  };
};
