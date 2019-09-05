import React from 'react';
import Echo from './components/Echo'
import Header from './components/Header'  
import './App.css';

class App extends React.Component {
  constructor() {
    super()
    this.refreshInterval = 1000;
    this.state ={
      echoResult: {},
      nrRefresh: 0
    }
  }

  componentDidMount() {
    setInterval(this.getDataFromApi, this.refreshInterval)
  }

  getDataMock = () => {
    const nrRefresh = this.state.nrRefresh + 1
    const data = {
      "RADIX_APP": "echo",
      "RADIX_CLUSTERNAME": "dev-1",
      "RADIX_COMPONENT": "echo",
      "RADIX_ENVIRONMENT": "development",
      "HOSTNAME":"my-computer",
      "HOSTPLATFORM":"linux"
    };
    this.setState({ echoResult: data, nrRefresh: nrRefresh})
  }

  getDataFromApi = () => {
    const nrRefresh = this.state.nrRefresh + 1
    const myInit = this.getFetchInit()

    fetch('/api/echo', myInit)
      .then(result=> {return result.json()})
      .then(data => {
        this.setState({echoResult: data, nrRefresh: nrRefresh})
    })
  }

  // disable cache on http requests
  getFetchInit = () => {
    const myHeaders = new Headers();
    myHeaders.append('pragma', 'no-cache');
    myHeaders.append('cache-control', 'no-cache');
    return {
      method: 'GET',
      headers: myHeaders,
    };
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
