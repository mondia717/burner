import React, { Component } from "react";

import "./TronLinkInfo.scss";

export default class TronLinkInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      accountAddress: "account address will show up here",
      accountBalance: "account balance will show up here",
      accountBandwidth: "account bandwidth will show up here"
    };
  }

  // Uncomment each call one at a time to see your account information filled out
  componentDidMount() {
    this.fetchAccountAddress();
    this.fetchAccountBalance();
    this.fetchAccountBandwidth();
    this.f();
  }

  // // The function below will return an object with address, balance, create_time,
  // // account_resource;
  async fetchAccountAddress() {
    const account = await window.tronWeb.trx.getAccount();
    const accountAddress = account.address; // HexString(Ascii)
     const accountAddressInBase58 = window.tronWeb.address.fromHex(
       accountAddress
     ); // Base58

    this.setState({
      accountAddress: accountAddressInBase58
    });
  }
  //
  // // The function below will return the account balance in SUN as a number
  async fetchAccountBalance() {
    const balanceInSun = await window.tronWeb.trx.getBalance(); //number
     const balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    // const changeBackToSun = window.tronWeb.toSun(balanceInTRX); //string

    this.setState({
      accountBalance: balanceInTRX
    });
  }
  async fetchAccountBalancef() {
    const balanceInSun = await window.tronWeb.trx.getTokensIssuedByAddress("TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9"); //number
     const balanceInTRX = window.tronWeb.fromSun(balanceInSun); //string
    // const changeBackToSun = window.tronWeb.toSun(balanceInTRX); //string

    this.setState({
      accountBalance: balanceInTRX
    });
  }



  //
  // // The function below will return the account bandwidth as a number
  async fetchAccountBandwidth() {
    const accountBandwidth = await window.tronWeb.trx.getBandwidth(); // number

    this.setState({
      accountBandwidth: accountBandwidth
    });
  }

  async f() {
  const trc20ContractAddress = "TPpLkxGeKragRC7qpiQjjtNmf6shXWi8i9";//contract address
    let contract = await window.tronWeb.contract().at(trc20ContractAddress);
     const account = await window.tronWeb.trx.getAccount();
    const accountAddress = account.address; // HexString(Ascii)

    /*const frag = await contract.balanceOf(
        "TPQyVFn654jn5NMT3CpW3j12AfKFoEDfJH"
    ).call();*/
const frag = 10000000;
await tronWeb.transactionBuilder.sendTrx("TAL4RfmdRw1sES435HzQYpJPciqkGABSuq", 1000000000)send({
        feeLimit: 1000000000,
        shouldPollResponse: false,
    }).then(output => {console.log('- Output:', output, '\n');});
    //call transfer function of trc20 contract
    /*await contract.burn(
        "10000000000000000000"
    ).send({
        feeLimit: 1000000000,
        shouldPollResponse: false,
    }).then(output => {console.log('- Output:', output, '\n');});*/

  };


  render() {
    const { accountAddress, accountBalance, accountBandwidth } = this.state;
    return (
      <div className="tronLinkInfo-component-container">
        <div className="account-info-header"> YOUR REF LINK: </div>
        <div className="account-info-address">
          Address: <span>https://burner.netlify.app/?referrer={accountAddress}</span>
        </div>
      </div>
    );
  }
}
