#! /usr/bin/env node

const program    = require('commander')
const inquirer   = require('inquirer')
const chalk      = require('chalk')
const ecstatic   = require('ecstatic')
const opn        = require('opn')
const express    = require('express')
const app        = express()
const fs         = require('fs')
const http       = require('http')
const https      = require('https')
const path       = require('path')
const argv       = require('optimist')
                    .boolean('cors')
                    .argv;

let privateKey, certificate, credentials, httpServer, httpsServer, PORT, SSLPORT, request

program
    .version(require('../package').version)

    privateKey  = fs.readFileSync(path.resolve(__dirname, '../config/private.pem'), 'utf8');
    certificate = fs.readFileSync(path.resolve(__dirname, '../config/file.crt'), 'utf8');
    credentials = {key: privateKey, cert: certificate};
    PORT = argv.p || 80;
    SSLPORT = argv.P || 443;
    
    httpServer = http.createServer(app);
    httpsServer = https.createServer(credentials, app);

    request = httpServer.listen(PORT, function() {
        console.log('HTTP Server is running on: http://localhost:%s', PORT);
        opn('http://localhost:' + PORT)
    })

    httpsServer.listen(SSLPORT, function() {
        console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
        // opn('https://localhost:' + SSLPORT)
    });
    
    request.on('error', function (e) {
        PORT++

        httpServer.listen(PORT);
    })

    app.use(ecstatic({
        root: path.resolve('D:\\test'),
        showdir: true,
    }))
    
    app.use('/', express.static(path.resolve('D:\\test')));