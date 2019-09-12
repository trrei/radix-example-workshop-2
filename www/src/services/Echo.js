
const EchoService = (useMockData) => {
  let fetch = loadDataFromApi;
  if (useMockData) {
    fetch = loadDataMock;
  }
  return {
    fetch: fetch
  };
}

const loadDataMock = () => {  
  return new Promise(function(resolve) {
      const data = {
        "RADIX_APP": "app_name",
        "RADIX_CLUSTERNAME": "dev-1",
        "RADIX_COMPONENT": "echo",
        "RADIX_ENVIRONMENT": "development",
        "HOSTNAME":"my-computer",
        "HOSTPLATFORM":"mac",
        "PASSWORD":"random_password",
        "PASSPHRASE":"random_passphrase"
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