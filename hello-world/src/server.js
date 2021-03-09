const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

// app.get('/hello-world/', function (req, res) {
app.get('/', function (req, res) {
    const pathToHtmlFile = path.resolve(__dirname, '../dist/hello-world.html');
    const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
    res.send(contentFromHtmlFile);
});

// app.get('/kiwi/', function (req, res) {
//     const pathToHtmlFile = path.resolve(__dirname, '../dist/kiwi.html');
//     const contentFromHtmlFile = fs.readFileSync(pathToHtmlFile, 'utf-8');
//     res.send(contentFromHtmlFile);
// });

app.use('/', express.static(path.resolve(__dirname, '../dist')));  // to load js and css bundles

app.listen(9001, function () {
    console.log('Application is running on http://localhost:9001');
});
