module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv',
        {
          envName: 'GOOGLE_MAPS_APIKEY',
          moduleName: '@env',
          path: '.env.local',
        },
      ],
    ],
  };
};
