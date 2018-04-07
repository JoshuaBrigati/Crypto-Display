var express = require('express');
var bodyParser = require('body-parser');
const api = require('binance');
var io = require('socket.io');
var MongoClient = require('mongodb').MongoClient;
var db = require('../database-mongo');
var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));

const binanceRest = new api.BinanceRest({
    key: 'KbLMYUH3EfX7lrTFYNueX8e3g8P5SBIjYc93dwmsbBX2SlkddUzW3Q2vSoBt2tYy', // Get this from your account on binance.com
    secret: 'k4uoHDDV6FPgNR9kdYFZVPkr8YlgSzZlpyBDyYM7l4hRDUjpf5326ureZFlZwSeG', // Same for this
    timeout: 15000, // Optional, defaults to 15000, is the request time out in milliseconds
    recvWindow: 10000, // Optional, defaults to 5000, increase if you're getting timestamp errors
    disableBeautification: false,
    /*
     * Optional, default is false. Binance's API returns objects with lots of one letter keys.  By
     * default those keys will be replaced with more descriptive, longer ones.
     */
    handleDrift: false
    /* Optional, default is false.  If turned on, the library will attempt to handle any drift of
     * your clock on it's own.  If a request fails due to drift, it'll attempt a fix by requesting
     * binance's server time, calculating the difference with your own clock, and then reattempting
     * the request.
     */
});
const binanceWS = new api.BinanceWS(true);

var ether = 1;
binanceWS.onKline('ETHUSDT', '1m', (data) => {
  ether=data.kline.close;
});

app.get('/items', function (req, res) {
  db.selectAllOwned(function callback(err, data){res.send(data)});
});

app.get('/streamETH', function (req, res) {
  db.selectETH(function callback(err, data) {res.send(data)});
});

app.post('/streamETH', function(req, res) {
  binanceWS.onKline('ETHUSDT', '1m', (data) => {
    ether=data.kline.close;
    db.saveETH(data.kline.close);
  });
});

app.get('/streamBTC', function (req, res) {
  db.selectBTC(function callback(err, data) {res.send(data)});
});

app.post('/streamBTC', function(req, res) {
  binanceWS.onKline('BTCUSDT', '1m', (data) => {
    db.saveBTC(data.kline.close);
  });
});

app.get('/streamXRP', function (req, res) {
  db.selectXRP(function callback(err, data) {res.send(data)});
});
  
app.post('/streamXRP', function(req, res) {
  binanceWS.onKline('XRPETH', '1m', (data) => {
    db.saveXRP(data.kline.close*ether);
  });
});

app.get('/streamTRX', function (req, res) {
  db.selectTRX(function callback(err, data) {res.send(data)});
});
  
app.post('/streamTRX', function(req, res) {
  binanceWS.onKline('TRXETH', '1m', (data) => {
    db.saveTRX(data.kline.close*ether);
  });
});

app.get('/streamXLM', function (req, res) {
  db.selectXLM(function callback(err, data) {res.send(data)});
});
  
app.post('/streamXLM', function(req, res) {
  binanceWS.onKline('XLMETH', '1m', (data) => {
    db.saveXLM(data.kline.close*ether);
  });
});

app.get('/streamENG', function (req, res) {
  db.selectENG(function callback(err, data) {res.send(data)});
});
  
app.post('/streamENG', function(req, res) {
  binanceWS.onKline('ENGETH', '1m', (data) => {
    db.saveENG(data.kline.close*ether);
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

