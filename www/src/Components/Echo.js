import React from 'react';

const Echo = (props) => {
    const result = props.result
    const refreshInterval =props.refreshInterval
    return <div>
        <p>Response from the Grand Echo service (page refreshed every {refreshInterval} seconds)</p>
        <p>Radix Application: <b>{result.RADIX_APP}</b></p>
        <p>Radix Cluster name: <b>{result.RADIX_CLUSTERNAME}</b></p>
        <p>Radix Component: <b>{result.RADIX_COMPONENT}</b></p>
        <p>Radix Environment: <b>{result.RADIX_ENVIRONMENT}</b></p>
        <p>Radix Host name: <a href="{result.RADIX_HOSTNAME}" className="App-link" target="_blank" rel="noopener noreferrer">link</a></p>
        <p>Radix Host platform: <b>{result.RADIX_HOSTPLATFORM}</b></p>
    </div>
}

export default Echo;