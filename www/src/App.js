import React from 'react';
import Echo from './Components/Echo'
import Header from './Components/Header'  
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
      "HOSTNAME":"https://external-preview.redd.it/7a_iqSnsaDNABkxgJDq_hhmMlXp0B6TXwg7mgaGFBRk.jpg?auto=webp&s=aa42f6e3468e517efa41e8b857ac84d56fdfa909",
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
