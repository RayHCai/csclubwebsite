const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');

exports.cssFiles = fs.readdirSync('./src/css/').map(
    (file) => `./src/css/${file}`
);

// Generate list of HTML Webpack Plugins for each page
exports.pages = fs.readdirSync('./src/pages/').map(
    (file) => new HtmlWebpackPlugin({
        file,
        filename: file,
        template: `./src/pages/${file}`,
        inject: true,
        chunks: [file]
    })
);
