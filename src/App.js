import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import web3 from "./web3";
import lottery from "./lottery";

class App extends Component {
  state = {
    manager: "",
    players: [],
    balance: "",
    value: "",
    statusMessage: "..",
  };

  onSubmit = async (event) => {
    event.preventDefault(); // prevent itself submittion by the form
    await window.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    this.setState({ statusMessage: "Waiting on transactions success...." });
    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, "ether"),
    });
    this.setState({ statusMessage: "You have been entered!" });
  };

  onClick = async () => {
    // await windows.ethereum.enable();
    const accounts = await web3.eth.getAccounts();
    this.setState({ statusMessage: "Waiting on transactions success...." });
    await lottery.methods.pickWinner().send({
      from: accounts[0],
    });
    this.setState({ statusMessage: "A winner has been picked!!" });
  };

  async componentDidMount() {
    //.call({ from: accounts[0] }); when we has set Metamask as web3 provider we don't need specify the account from
    const manager = await lottery.methods.owner().call();
    const players = await lottery.methods.getPlayers().call();
    const balance = await web3.eth.getBalance(lottery.options.address);
    this.setState({ manager, players, balance });
  }
  render() {
    web3.eth.getAccounts().then(console.log);

    return (
      <div>
        <h2> Lottery Contract</h2>
        <p> This contract is managed by {this.state.manager}</p>
        <p>
          There are currently {this.state.players.length} peoples entered ,
          Competing to win {web3.utils.fromWei(this.state.balance, "ether")}{" "}
          ethers
        </p>

        <form onSubmit={this.onSubmit}>
          <h3>Want to try your luck?</h3>
          <label>Amount of ether to enter</label>
          <input
            value={this.state.value}
            onChange={(event) => this.setState({ value: event.target.value })}
          ></input>
          <button>Enter</button>
        </form>
        <hr />
        <h4> Ready to pick a winner?</h4>
        <button onClick={this.onClick}>Pick a winner</button>
        <hr />
        <h1>{this.state.statusMessage}</h1>
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
