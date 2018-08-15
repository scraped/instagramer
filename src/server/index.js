const express = require('express');
const serverConfigService = require('./services/ServerConfigService');
const app = global.app = express();

async function init() {
    try {
        await serverConfigService.appMiddleware(app);
        serverConfigService.appSession(app);
        serverConfigService.responseHeaders(app);
        serverConfigService.auth(app);
        serverConfigService.routes(app);
        serverConfigService.initDevWebpack(app);
        serverConfigService.runServer(app);
    } catch (err) {
        console.error(err);
    }
}

init();


module.exports = app;
