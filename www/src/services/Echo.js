
const EchoService = (mockData) => {
  let fetch = loadDataFromApi;
  if (mockData) {
    fetch = loadDataMock;
  }
  return {
    fetch: fetch
  };
}

const loadDataMock = () => {  
  return new Promise(function(resolve) {
      const data = {
        "RADIX_APP": "echo",
        "RADIX_CLUSTERNAME": "dev-1",
        "RADIX_COMPONENT": "echo",
        "RADIX_ENVIRONMENT": "development",
        "HOSTNAME":"my-computer",
        "HOSTPLATFORM":"linux"
      };
      resolve(data)
    })
}

const loadDataFromApi = (path) => {
  return fetch(path, getFetchInit()).then(result=> {return result.json()})
}

// disable cache on http requests
const getFetchInit = () => {
  const myHeaders = new Headers();
  myHeaders.append('pragma', 'no-cache');
  myHeaders.append('cache-control', 'no-cache');
  return {
    method: 'GET',
    headers: myHeaders,
  };
}

export default EchoService;