import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import web3 from './web3';
import lottery from './lottery';

class App extends Component {

    constructor(props){
      super(props);
      this.state = {manager: ''};
    }

    async componentDidMount(){
      const manager = await lottery.methods.owner().call();
        this.setState({manager});    
    }
    render(){
      console.log(window.web3.currentProvider)
      console.log(web3.version)

      return (

        <div>
          <h2> Lottery Contract</h2>
          <p> This contract is managed by {this.state.manager}</p>
        </div>
      );
    }
}

// function App() {
//   // to get Permission to view the accounts from Metamask
//   window.ethereum.enable()
//       .then(web3.eth.getAccounts()
//         .then(console.log));

//     web3.eth.getAccounts().then((e)=>{
//       console.log(e)
//     })
//     console.log(window.web3.currentProvider);
//     console.log(web3.eth);

//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a 
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
