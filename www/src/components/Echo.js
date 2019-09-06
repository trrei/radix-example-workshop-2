import React from 'react';

const Echo = (props) => {
  const {
    result,
    refreshInterval,
    nrRefresh } = props

  return <div>
    <p>Response from the Grand Echo service (page refreshed every {refreshInterval} milliseconds)</p>
    <p>Number of refresh: <b>{nrRefresh}</b></p>
    <p>Radix Application: <b>{result.RADIX_APP}</b></p>
    <p>Radix Cluster name: <b>{result.RADIX_CLUSTERNAME}</b></p>
    <p>Radix Component: <b>{result.RADIX_COMPONENT}</b></p>
    <p>Radix Environment: <b>{result.RADIX_ENVIRONMENT}</b></p>
    <p>Radix Host name: <b>{result.HOSTNAME}</b></p>
    <p>Radix Host platform: <b>{result.HOSTPLATFORM}</b></p>
  </div>
}

export default Echo;