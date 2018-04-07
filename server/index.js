var express = require('express');
var bodyParser = require('body-parser');
const api = require('binance');
var io = require('socket.io');
var MongoClient = require('mongodb').MongoClient;
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mysql');
var db = require('../database-mongo');

var app = express();

//UNCOMMENT FOR REACT
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
var ether = 1;
// binanceRest.tickerPrice('ETHUSDT',(err, data) => {
//   ether = (data.price);
// })
const binanceWS = new api.BinanceWS(true);

binanceWS.onKline('ETHUSDT', '1m', (data) => {
  ether=data.kline.close;
});


// binanceWS.onKline('ETHUSDT', '1m', (data) => {
//   console.log(data.kline.close);
// });  

// binanceWS.onDepthUpdate('BNBBTC', (data) => {
//   console.log(data);
// });

// binanceWS.onAggTrade('BNBBTC', (data) => {
//   console.log(data);
// });



// const streams = binanceWS.streams;

// binanceWS.onCombinedStream([
//         streams.depth('BNBBTC'),
//         streams.kline('BNBBTC', '5m'),
//         streams.trade('BNBBTC'),
//         streams.ticker('BNBBTC')
//     ],
//     (streamEvent) => {
//         switch(streamEvent.stream) {
//             case streams.depth('BNBBTC'):
//                 console.log('Depth event, update order book\n', streamEvent.data);
//                 break;
//             case streams.kline('BNBBTC', '5m'):
//                 console.log('Kline event, update 5m candle display\n', streamEvent.data);
//                 break;
//             case streams.trade('BNBBTC'):
//                 console.log('Trade event, update trade history\n', streamEvent.data);
//                 break;
//             case streams.ticker('BNBBTC'):
//                 console.log('Ticker event, update market stats\n', streamEvent.data);
//                 break;
//         }
//     }
// );

// app.post('/items', function(req, res) {
//   // binanceRest.myTrades('TRXETH', (err, data) => {
//   //   Promise.all(data)
//   //   .then(values => {
//   //     db.save(values);
//   //   });
//   // });
//   binanceRest.account((err, data) => {
//     let coinsWithValue = [];
//     data.balances.forEach(function(coin) {
//       if(coin.free != 0.00000000){
//         coinsWithValue.push(coin);
//       }
//     })
//     Promise.all(coinsWithValue)
//     .then(values => {
//       db.save(values);
//     });
//   });
// });

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

    // binanceWS.onKline('BTCUSDT', '1m', (data) => {
    //   // console.log('Bitcoin price', data.kline.close);
    // });
    // binanceWS.onKline('XLMETH', '1m', (data) => {
    //   // console.log('STELLAR price', data.kline.close*ether);
    // });
    // binanceWS.onKline('XRPETH', '1m', (data) => {
    //   // console.log('Ripple price', data.kline.close*ether);
    // });
    // binanceWS.onKline('ENGETH', '1m', (data) => {
    //   // console.log('Enigma price', data.kline.close*ether);
    // });
    // binanceWS.onKline('TRXETH', '1m', (data) => {
    //   //console.log('Tron price', data.kline.close*ether);
    // });
    

    // binanceWS.onKline('ENGBTC', '1m', (data) => {
    //   console.log("ENG Coins", coins);
    //   if (coins.length === 0) {
    //     coins.push({'ENG':data.kline.close});
    //     console.log('ENG', coins);
    //   } else {
    //     coins.splice(0,1,{'ENG':data.kline.close});
    //   }
    // });  
    // binanceWS.onKline('XRPUSDT', '1m', (data) => {
    //   if (coins.length === 1) {
    //     coins.push({'XRP':data.kline.close});
    //   } else {
    //     coins.splice(1,1,{'ENG':data.kline.close});
    //   }
    // }); 
    // binanceWS.onKline('TRXUSDT', '1m', (data) => {
    //   if (coins.length === 2) {
    //     coins.push({'TRX':data.kline.close});
    //   } else {
    //     coins.splice(2,1,{'ENG':data.kline.close});
    //   }
    // }); 
    // binanceWS.onKline('BTCUSDT', '1m', (data) => {
    //   if (coins.length === 3) {
    //     coins.push({'BTC':data.kline.close});
    //   } else {
    //     coins.splice(3,1,{'ENG':data.kline.close});
    //   }
    // }); 
    // binanceWS.onKline('ETHUSDT', '1m', (data) => {
    //   if (coins.length === 4) {
    //     coins.push({'ETH':data.kline.close});
    //   } else {
    //     coins.splice(4,1,{'ENG':data.kline.close});
    //   }
    // }); 
    // binanceWS.onKline('XLMUSDT', '1m', (data) => {
    //   if (coins.length === 5) {
    //     coins.push({'XLM':data.kline.close});
    //   } else {
    //     coins.splice(5,1,{'ENG':data.kline.close});
    //   }
    // }); 
    // binanceWS.onKline(['ETHUSDT', 'BTCUSDT', 'XRPUSDT'], '1m', (data) => {
    //   coins.push({data.kline.close});
    // });  


app.listen(3000, function() {
  console.log('listening on port 3000!');
});

