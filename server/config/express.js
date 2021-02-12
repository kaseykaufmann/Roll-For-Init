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
    // Configuration
    const isDev = process.env.NODE_ENV !== "production";

    // Set up Mongoose
    const mongoDB = isDev ? config.db_dev : config.db;
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    };

    mongoose.connect(mongoDB, mongoOptions).then((db) => {
        console.log('Successfully connected to mongoose database.')
    }, (error) => {
        console.log('MongoDB Connection Error:', error)
    });

    // Set up express
    const app = express();
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Middleware
    app.use(require('cookie-parser')());

    // API Routing
    app.use('/api/', require('../routes'));

    // Serve static files
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
    } else {
        app.use(express.static(path.resolve(__dirname, "../dist")));

        app.get("*", function (req, res) {
            res.sendFile(path.resolve(__dirname, "../dist/index.html"));
            res.end();
        });
    }

    return app
}
