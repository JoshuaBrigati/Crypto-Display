import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';
import ListItem from './components/ListItem.jsx';
import styles from './styles.scss';
import running from './runningJS.js';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: [],
      ethPrice: [],
      btcPrice: [],
      trxPrice: [],
      xrpPrice: [],
      xlmPrice: [],
      engPrice: []
    }
  }

  componentDidMount() {
    var self = this;
    $.get('/streamETH', function(data) {
      self.setState({ethPrice: data});
    });

    setInterval(function() {
      $.post('/streamETH', function(data) {
        self.setState({ethPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamETH', function(data) {
        self.setState({ethPrice: data});
      })
    }, 10000);

    $.get('/streamBTC', function(data) {
      self.setState({btcPrice: data});
    });

    setInterval(function() {
      $.post('/streamBTC', function(data) {
        self.setState({btcPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamBTC', function(data) {
        self.setState({btcPrice: data});
      });
    }, 10000);

    $.get('/streamTRX', function(data) {
      self.setState({trxPrice: data});
    });

    setInterval(function() {
      $.post('/streamTRX', function(data) {
        self.setState({trxPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamTRX', function(data) {
        self.setState({trxPrice: data});
      });
    }, 10000);

    $.get('/streamXRP', function(data) {
      self.setState({xrpPrice: data});
    });

    setInterval(function() {
      $.post('/streamXRP', function(data) {
        self.setState({xrpPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamXRP', function(data) {
        self.setState({xrpPrice: data});
      });
    }, 10000);

    $.get('/streamXLM', function(data) {
      self.setState({xlmPrice: data});
    });

    setInterval(function() {
      $.post('/streamXLM', function(data) {
        self.setState({xlmPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamXLM', function(data) {
        self.setState({xlmPrice: data});
      });
    }, 10000);

    $.get('/streamENG', function(data) {
      self.setState({engPrice: data});
    });

    setInterval(function() {
      $.post('/streamENG', function(data) {
        self.setState({engPrice: data});
      });
    },30000);

    setInterval(function() {
      $.get('/streamENG', function(data) {
        self.setState({engPrice: data});
      });
    }, 10000);
  }
  
  render () {
    return (
      <div>
        {this.state.ethPrice.length && this.state.btcPrice.length && this.state.xrpPrice.length && this.state.trxPrice.length && this.state.xlmPrice.length && this.state.engPrice.length ? <List data={this.state}/> : null }
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));