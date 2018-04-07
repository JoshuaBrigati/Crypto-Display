import React from 'react';
import ListItem from './ListItem.jsx';
import styles from '../styles.scss';

const List = (props) => (
  console.log('ETHEREUM ',props.data.ethPrice[props.data.ethPrice.length-1].price),
  console.log('BITCOIN ',props.data.btcPrice[props.data.btcPrice.length-1].price),
  console.log('RIPPLE ',props.data.xrpPrice[props.data.xrpPrice.length-1].price),
  console.log('TRON ',props.data.trxPrice[props.data.trxPrice.length-1].price),
  console.log('STELLAR ',props.data.xlmPrice[props.data.xlmPrice.length-1].price),
  console.log('ENIGMA ',props.data.engPrice[props.data.engPrice.length-1].price),
  <div>

    <div className="Ethereum">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1027.png" className="EthereumImg"/>
      Ethereum: {props.data.ethPrice[props.data.ethPrice.length-1].price}
    </div>

    <div className="Bitcoin">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1.png" className="BitcoinImg"/>
      Bitcoin: {props.data.btcPrice[props.data.btcPrice.length-1].price}
    </div>

    <div className="Ripple">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/52.png" className="RippleImg"/>
      Ripple: {props.data.xrpPrice[props.data.xrpPrice.length-1].price}
      </div>

    <div className="Tron">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/1958.png" className="TronImg"/>
      Tron: {props.data.trxPrice[props.data.trxPrice.length-1].price}
    </div>  

    <div className="Stellar">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/512.png" className="StellarImg"/>
      Stellar: {props.data.xlmPrice[props.data.xlmPrice.length-1].price}
    </div>

    <div className="Enigma">
      <img src="https://s2.coinmarketcap.com/static/img/coins/32x32/2044.png" className="EnigmaImg"/>
      Enigma: {props.data.engPrice[props.data.engPrice.length-1].price}
    </div>

  </div>
)

export default List;