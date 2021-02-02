const express = require('express'),
    mongoose = require('mongoose'),
    historyApiFallback = require("connect-history-api-fallback"),
    path = require("path"),
    config = require("./config"),
    webpack = require("webpack"),
    webpackHotMiddleware = require("webpack-hot-middleware"),
    webpackDevMiddleware = require("webpack-dev-middleware"),
    webpackConfig = require("../../webpack.config");


module.exports.init = () => {
    require('dotenv').config({ path: path.resolve(__dirname, '../../secret.env') });

    const isDev = process.env.NODE_ENV !== "production";

    // Configuration
    // ================================================================================================

    // Set up Mongoose
    const db = isDev ? config.db_dev : config.db;
    mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true });
    mongoose.Promise = global.Promise;

    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Own middleware
    app.use(require('cookie-parser')());

    //Routing
    app.use('/', require('../routes'));

    if (isDev) {
        const compiler = webpack(webpackConfig);

        app.use(
            historyApiFallback({
                verbose: false
            })
        );

        app.use(
            webpackDevMiddleware(compiler, {
                publicPath: webpackConfig.output.publicPath,
                contentBase: path.resolve(__dirname, "../client/public"),
                stats: {
                    colors: true,
                    hash: false,
                    timings: true,
                    chunks: false,
                    chunkModules: false,
                    modules: false
                }
            })
        );

        app.use(webpackHotMiddleware(compiler));
        app.use(express.static(path.resolve(__dirname, "../dist")));
    }
    else {
        app.use(express.static(path.resolve(__dirname, "../dist")));

        app.get("*", function (req, res) {
            res.sendFile(path.resolve(__dirname, "../dist/index.html"));
            res.end();
        });
    }

    return app
}
