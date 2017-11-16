# Getting started

```
git clone https://github.com/alexey0306/test_frontend
npm install 
```

Open file ***node_modules/react-scripts/config/webpack.config.dev.js***, find the section **plugins** and add the following line: 

```
new webpack.ProvidePlugin({$: "jquery",jQuery: "jquery"})
```

So, it should look like the following: 

```
new CaseSensitivePathsPlugin(),
// If you require a missing module and then `npm install` it, you still have
// to restart the development server for Webpack to discover it. This plugin
// makes the discovery automatic so you don't have to restart.
// See https://github.com/facebookincubator/create-react-app/issues/186
new WatchMissingNodeModulesPlugin(paths.appNodeModules),
// Moment.js is an extremely popular library that bundles large locale files
// by default due to how Webpack interprets its code. This is a practical
// solution that requires the user to opt into importing specific locales.
// https://github.com/jmblog/how-to-optimize-momentjs-with-webpack
// You can remove this if you don't use Moment.js:
new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
new webpack.ProvidePlugin({$: "jquery",jQuery: "jquery"})
```

Start the Development server:

```
npm start
```
