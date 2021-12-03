/**
 * Simple test server
 */

const port = 14280;

const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));

function get_html(file, iife, exec, modifyCallback) {

    if (iife) {
        iife = JSON.parse(iife);
    } else {
        iife = {
            src: 'test.js',
            async: false
        };
    }

    if (exec) {
        exec = JSON.parse(exec);
    }

    return new Promise(function(resolve, reject) {

        fs.readFile(path.resolve(__dirname, file), 'utf8', function(err, html) {

            if (err) {
                reject(err);
                return;
            }

            html = html.replace('<!-- IIFE -->', '<script' + ((iife.async) ? ' async' : '') + ' src="' + iife.src + '"' + ((iife.attr_config) ? ' data-c=\'' + JSON.stringify(iife.attr_config).replace(/'/g, '&apos;') + '\'' : '') + '></script>');

            if (exec) {
                html = html.replace('<!-- AFTER -->', '<script>' + exec + '</script><!-- AFTER -->');
            }

            if (modifyCallback) {
                modifyCallback(html).then(function(html) {
                    resolve(html);
                });
            } else {
                resolve(html);
            }
        });

    });
}

// base test
app.get('/', function(req, res) {
    get_html('./base.html', req.query.iife, req.query.exec)
        .then(function(html) {

            res.setHeader('Content-Type', 'text/html');
            res.status(200);
            res.send(html);
        })
        .catch(function(err) {
            console.log(500, err);
            res.status(500);
            res.send('HTML template not found');
        })
});

// scripts
app.get(/^\/[^\/]+\.js$/, function(req, res) {
    fs.readFile(path.resolve(__dirname, 'iife/' + req.url.substring(1)), 'utf8', function(err, js) {

        if (err) {
            console.log(500, err, 'failed to load IIFE script ' + req.url);
            res.status(500);
            res.send('failed to load IIFE script ' + req.url);
            return;
        }

        res.setHeader('Content-Type', 'application/javascript');
        res.status(200);
        res.send(js);
    });
});

// stylesheets
app.get(/^\/[^\/]+\.css$/, function(req, res) {
    fs.readFile(path.resolve(__dirname, req.url.substring(1)), 'utf8', function(err, css) {

        if (err) {
            console.log(500, err, 'failed to load stylesheet ' + req.url);
            res.status(500);
            res.send('failed to load stylesheet ' + req.url);
            return;
        }

        res.setHeader('Content-Type', 'text/css');
        res.status(200);
        res.send(css);
    });
});

app.listen(port, function() {
    console.log("Listening on " + port);
});