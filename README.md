{
  "name": "restaurant",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "webpack-dev-server --config ./webpack.config.js",
    "build": "NODE_ENV=production webpack --config ./webpack.config.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "SanteyCode",
  "license": "ISC",
  "devDependencies": {
    "autoprefixer": "^8.6.3",
    "css-loader": "^0.28.11",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^1.1.11",
    "html-loader": "^0.5.5",
    "node-sass": "^4.9.0",
    "sass-loader": "^7.0.3",
    "style-loader": "^0.21.0",
    "uglifyjs-webpack-plugin": "^1.2.6",
    "webpack": "^4.12.0",
    "webpack-cli": "^3.0.8",
    "webpack-dev-server": "^3.1.4"
  }
}
