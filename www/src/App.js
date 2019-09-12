import React from 'react';
import Echo from './components/Echo';
import Header from './components/Header';
import EchoService from './services/Echo';
import './App.css';

class App extends React.Component {
  constructor() {
    super()

    this.refreshInterval = 1000;
    this.useMockData = false;
    
    this.state ={
      echoResult: {},
      nrRefresh: 0
    }
  }

  componentDidMount() {
    setInterval(this.loadData, this.refreshInterval) 
  }

  loadData = () => {
    const echoService = EchoService(this.useMockData)
    const nrRefresh = this.state.nrRefresh + 1

    echoService.fetch('/api/echo').then(data => this.setState({ echoResult: data, nrRefresh: nrRefresh}))
  }
  
  render() {
    return (
      <div className="App">
        <Header />
        <Echo result={this.state.echoResult} refreshInterval={this.refreshInterval} nrRefresh={this.state.nrRefresh} />
      </div>
    );
  }
}

export default App;
