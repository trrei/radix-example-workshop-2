import React from 'react';
import logo from './logo.svg';

const Header = () => {
  return <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>
      Welcome to Radix workshop
    </p>
    <a
      className="App-link"
      href="https://www.radix.equinor.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn Radix
    </a>
  </header>
}

export default Header;