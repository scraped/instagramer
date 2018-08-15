const session = require('express-session');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const authenticationService = require('./AuthenticationService');
const fs = require('fs');
const path = require('path');
const express = require('express');
function appMiddleware(app) {
    app.use(express.static('static'));
    app.use(bodyParser.json());
    app.use(cookieParser());
    app.use(helmet());
}


function responseHeaders(app) {
    app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept, Cache-control, Expires, Pragma, ETag',
        );
        res.header('Access-Control-Request-Method', 'GET, POST, PUT, DELETE, OPTIONS');
        res.header('Cache-Control', 'max-age=0, must-revalidate');
        res.header('Expires', 0);

        next();
    });
}


function appSession(app) {
    app.use(session({
        secret: 'fintess secret',
        resave: true,
        saveUninitialized: true,
        name: 'fitness.connect.sid',
    }));
}


function auth(app) {
    return authenticationService.auth(app);
}


function routes(app) {
    const files = fs.readdirSync(path.resolve('src/server/routes'));
    files.forEach((file) => {
        let controller;
        let controllerPath = path.resolve(`src/server/controllers/${file.replace('Route', 'Controller')}`);
        if (fs.existsSync(controllerPath)) {
            controller = require(controllerPath);
        }
        if (file.indexOf('Route.js') >= 0) {
            require(`./../routes/${file}`).index(app, controller);
        }
    });
}


function runServer(app) {
    const exitHandler = (options = {exit: false, cleanup: false}) => {
        return (code) => {
            if (code) {
                console.log(`about to exit with code '${code}'`);
            }
            if (options.exit) {
                process.exit();
            }
        };
    };
    // do something when app is closing
    process.on('exit', exitHandler({cleanup: true}));
    // catches ctrl+c event
    process.on('SIGINT', exitHandler({exit: true}));
    // catches uncaught exceptions
    process.on('uncaughtException', exitHandler({exit: true}));

    let port = (process.env.PORT || 3000);
    app.listen(port, () => {
        console.info(`The server is running at ${process.env.HOST || 'localhost'}:${port}`);
    });
}


function initDevWebpack(app) {
    let webpack = require('webpack');
    let webpackMiddleware = require('webpack-dev-middleware');
    let compiler = webpack(require('./../../../webpack.development.config.js'));
    app.use(webpackMiddleware(compiler, {
      publicPath: '/static',
      noInfo: true,
    }));
  }


module.exports = {appMiddleware, responseHeaders, appSession, auth, routes, runServer, initDevWebpack};
