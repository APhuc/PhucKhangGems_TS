module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
          alias: {
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@handles": "./src/handles",
            "@modelApp": "./src/modelApp",
            "@navigation": "./src/navigation",
            "@networking": "./src/networking",
            "@reduxApp": "./src/reduxApp",
            "@screens": "./src/screens",
            "@storage": "./src/storage",
            "@themes": "./src/themes",
          }
        }
      ]
    ]
  };
};