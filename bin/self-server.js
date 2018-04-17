#! /usr/bin/env node

const program    = require('commander')
const inquirer   = require('inquirer')
const chalk      = require('chalk')
const ecstatic   = require('ecstatic')
const opn        = require('opn')
const argv       = require('optimist')
                    .boolean('cors')
                    .argv;

program
    .version(require('../package').version)

    var express = require('express')
    var app = express();
    var fs = require('fs');
    var http = require('http');
    var https = require('https');
    var path = require('path')
    var privateKey  = fs.readFileSync(path.resolve(__dirname, '../config/private.pem'), 'utf8');
    var certificate = fs.readFileSync(path.resolve(__dirname, '../config/file.crt'), 'utf8');
    var credentials = {key: privateKey, cert: certificate};

    
    var httpServer = http.createServer(app);
    var httpsServer = https.createServer(credentials, app);
    var PORT = argv.p || 80;
    var SSLPORT = argv.P || 443;
    
    httpServer.listen(PORT, function() {
        console.log('HTTP Server is running on: http://localhost:%s', PORT);
        opn('http://localhost:' + PORT)
    });
    httpsServer.listen(SSLPORT, function() {
        console.log('HTTPS Server is running on: https://localhost:%s', SSLPORT);
        // opn('https://localhost:' + SSLPORT)
    });

    app.use(ecstatic({
        root: path.resolve('D:\\test'),
        showdir: true,
      }))
    
    app.use('/', express.static(path.resolve('D:\\test')));
    
    // Welcome
    // app.get('/', function(req, res) {
    //     if(req.protocol === 'https') {
    //         res.status(200).send('Welcome to Safety Land!');
    //     }
    //     else {
    //         res.status(200).send('Welcome!');
    //     }
    // });