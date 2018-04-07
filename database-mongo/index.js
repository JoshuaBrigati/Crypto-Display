var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  commissionAsset: String,
  qty: String,
  price: String,
  orderId: {
    type: Number,
    required: true,
    unique: true,
    dropDups: true
  }
});

var Item = mongoose.model('Item', itemSchema);

var ownedCoins = mongoose.Schema({
  asset: {
    type: String,
    required: true,
    unique: true,
    dropDups: true
  },
  coins: String
});

var Coin = mongoose.model('Coins', ownedCoins);

var priceETH = mongoose.Schema({
  price: String
});

var ETH = mongoose.model('ETH', priceETH);

var priceBTC = mongoose.Schema({
  price: String
});

var BTC = mongoose.model('BTC', priceBTC);

var priceXRP = mongoose.Schema({
  price: String
});

var XRP = mongoose.model('XRP', priceXRP);

var priceTRX = mongoose.Schema({
  price: String
});

var TRX = mongoose.model('TRX', priceTRX);

var priceXLM = mongoose.Schema({
  price: String
});

var XLM = mongoose.model('XLM', priceXLM);

var priceENG = mongoose.Schema({
  price: String
});

var ENG = mongoose.model('ENG', priceENG);

var selectAllOwned = function(callback) {
  Coin.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  });
};

var selectETH = function(callback) {
  ETH.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
};

var selectBTC = function(callback) {
  BTC.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
}

var selectXRP = function(callback) {
  XRP.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
}

var selectTRX = function(callback) {
  TRX.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
}

var selectXLM = function(callback) {
  XLM.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
}

var selectENG = function(callback) {
  ENG.find({}, function(err, items) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, items);
    }
  })
}

let save = (data) => {
  if (typeof data === 'object') {
    if (Object.keys(data[0]).length === 10) {
      for (var i = 0; i<data.length; i++) {
        var coin = new Item({
          commissionAsset: data[i].commissionAsset,
          qty: data[i].qty,
          price: data[i].price,
          orderId: data[i].orderId
        });
        coin.save();
      }
    } else if (Object.keys(data[0]).length === 3) {
      for (var j = 0; j<data.length; j++) {
        var coins = new Coin({
          asset: data[j].asset,
          coins: data[j].free
        });
        coins.save();
      }
    } 
  } 
}

let saveETH = (data) => {
  var newETHPrice = new ETH({
    price: data
  });
  newETHPrice.save();
}

let saveBTC = (data) => {
  var newBTCPrice = new BTC({
    price: data
  });
  newBTCPrice.save();
}

let saveXRP = (data) => {
  var newXRPPrice = new XRP({
    price: data
  });
  newXRPPrice.save();
}

let saveTRX = (data) => {
  var newTRXPrice = new TRX({
    price: data
  });
  newTRXPrice.save();
}

let saveXLM = (data) => {
  var newXLMPrice = new XLM({
    price: data
  });
  newXLMPrice.save();
}

let saveENG = (data) => {
  var newENGPrice = new ENG({
    price: data
  });
  newENGPrice.save();
}

module.exports.selectAllOwned = selectAllOwned;
module.exports.selectETH = selectETH;
module.exports.selectBTC = selectBTC;
module.exports.selectXRP = selectXRP;
module.exports.selectTRX = selectTRX;
module.exports.selectXLM = selectXLM;
module.exports.selectENG = selectENG;
module.exports.save = save;
module.exports.saveETH = saveETH;
module.exports.saveBTC = saveBTC;
module.exports.saveXRP = saveXRP;
module.exports.saveTRX = saveTRX;
module.exports.saveXLM = saveXLM;
module.exports.saveENG = saveENG;
