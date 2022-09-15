"use strict";

 // Unpkg imports
const Web3Modal = window.Web3Modal.default;
const WalletConnectProvider = window.WalletConnectProvider;
const evmChains = window.evmChains;

// Web3modal instance
let web3Modal

// Chosen wallet provider given by the dialog window
let provider;


// Address of the selected account
let selectedAccount;

let abi = {
  "_format": "hh-sol-artifact-1",
  "contractName": "Mecole",
  "sourceName": "contracts/Mecole.sol",
  "abi": [
      {
          "inputs": [],
          "stateMutability": "nonpayable",
          "type": "constructor"
      },
      {
          "inputs": [],
          "name": "ApprovalCallerNotOwnerNorApproved",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "ApprovalQueryForNonexistentToken",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "ApproveToCaller",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "BalanceQueryForZeroAddress",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "MintERC2309QuantityExceedsLimit",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "MintToZeroAddress",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "MintZeroQuantity",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "OwnerQueryForNonexistentToken",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "OwnershipNotInitializedForExtraData",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "TransferCallerNotOwnerNorApproved",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "TransferFromIncorrectOwner",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "TransferToNonERC721ReceiverImplementer",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "TransferToZeroAddress",
          "type": "error"
      },
      {
          "inputs": [],
          "name": "URIQueryForNonexistentToken",
          "type": "error"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "approved",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "Approval",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "indexed": false,
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "ApprovalForAll",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "fromTokenId",
                  "type": "uint256"
              },
              {
                  "indexed": false,
                  "internalType": "uint256",
                  "name": "toTokenId",
                  "type": "uint256"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              }
          ],
          "name": "ConsecutiveTransfer",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "previousOwner",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "OwnershipTransferred",
          "type": "event"
      },
      {
          "anonymous": false,
          "inputs": [
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "indexed": true,
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "Transfer",
          "type": "event"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_editionToActive",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_editionToCount",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_editionToMaxSupply",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_editionToPrice",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_editionToTokenUri",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "name": "_idToEdition",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "approve",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              }
          ],
          "name": "balanceOf",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "getApproved",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "owner",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              }
          ],
          "name": "isApprovedForAll",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "edition",
                  "type": "uint256"
              }
          ],
          "name": "mintEdition",
          "outputs": [],
          "stateMutability": "payable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "name",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "owner",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "ownerOf",
          "outputs": [
              {
                  "internalType": "address",
                  "name": "",
                  "type": "address"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "renounceOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              },
              {
                  "internalType": "bytes",
                  "name": "_data",
                  "type": "bytes"
              }
          ],
          "name": "safeTransferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "operator",
                  "type": "address"
              },
              {
                  "internalType": "bool",
                  "name": "approved",
                  "type": "bool"
              }
          ],
          "name": "setApprovalForAll",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "edition",
                  "type": "uint256"
              },
              {
                  "internalType": "string",
                  "name": "baseURI",
                  "type": "string"
              }
          ],
          "name": "setBaseURI",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "edition",
                  "type": "uint256"
              },
              {
                  "internalType": "bool",
                  "name": "active",
                  "type": "bool"
              }
          ],
          "name": "setEditionActive",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "edition",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "newSupply",
                  "type": "uint256"
              }
          ],
          "name": "setEditionMaxSupply",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "edition",
                  "type": "uint256"
              },
              {
                  "internalType": "uint256",
                  "name": "price",
                  "type": "uint256"
              }
          ],
          "name": "setEditionPrice",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "bytes4",
                  "name": "interfaceId",
                  "type": "bytes4"
              }
          ],
          "name": "supportsInterface",
          "outputs": [
              {
                  "internalType": "bool",
                  "name": "",
                  "type": "bool"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "symbol",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "tokenURI",
          "outputs": [
              {
                  "internalType": "string",
                  "name": "",
                  "type": "string"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "totalSupply",
          "outputs": [
              {
                  "internalType": "uint256",
                  "name": "",
                  "type": "uint256"
              }
          ],
          "stateMutability": "view",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "from",
                  "type": "address"
              },
              {
                  "internalType": "address",
                  "name": "to",
                  "type": "address"
              },
              {
                  "internalType": "uint256",
                  "name": "tokenId",
                  "type": "uint256"
              }
          ],
          "name": "transferFrom",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [
              {
                  "internalType": "address",
                  "name": "newOwner",
                  "type": "address"
              }
          ],
          "name": "transferOwnership",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "inputs": [],
          "name": "withdraw",
          "outputs": [],
          "stateMutability": "nonpayable",
          "type": "function"
      }
  ]
}


/**
 * Setup the orchestra
 */
function init() {

  console.log("Initializing example");
  console.log("WalletConnectProvider is", WalletConnectProvider);
  console.log("window.web3 is", window.web3, "window.ethereum is", window.ethereum);

  // Check that the web page is run in a secure context,
  // as otherwise MetaMask won't be available
//   if(location.protocol !== 'https:') {
//     // https://ethereum.stackexchange.com/a/62217/620
//     const alert = document.querySelector("#alert-error-https");
//     alert.style.display = "block";
//     document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
//     return;
//   }

  // Tell Web3modal what providers we have available.
  // Built-in web browser provider (only one can exist as a time)
  // like MetaMask, Brave or Opera is added automatically by Web3modal
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        // Mikko's test key - don't copy as your mileage may vary
        infuraId: "018a1557b0e34090a84c111da5c01426",
      }
    },
  };

  web3Modal = new Web3Modal({
    cacheProvider: false, // optional
    providerOptions, // required
    disableInjectedProvider: false, // optional. For MetaMask / Brave / Opera.
  });

  console.log("Web3Modal instance is", web3Modal);
}


/**
 * Kick in the UI action after Web3modal dialog has chosen a provider
 */
async function fetchAccountData() {

  // Get a Web3 instance for the wallet
  const web3 = new Web3(provider);

  console.log("Web3 instance is", web3);

  // Get connected chain id from Ethereum node
  const chainId = await web3.eth.getChainId();
  // Load chain information over an HTTP API
  const chainData = evmChains.getChain(chainId);
  // document.querySelector("#network-name").textContent = chainData.name;
  console.log(chainData)

  // Get list of accounts of the connected wallet
  const accounts = await web3.eth.getAccounts();

  // MetaMask does not give you all accounts, only the selected account
  console.log("Got accounts", accounts);
  selectedAccount = accounts[0];
  document.querySelector("#address-field").style.display = "block";
  document.querySelector("#address-field").textContent = "Mint with " + selectedAccount.substring(0, 6) + "..." + selectedAccount.substring(selectedAccount.length - 4);
  document.querySelector("#address-field").addEventListener("click", onMintPresale);
  // document.querySelector("account-string").textContent = selectedAccount;
  // document.querySelector("#selected-account").textContent = selectedAccount;

  // Get a handl
  // const template = document.querySelector("#template-balance");
  // const accountContainer = document.querySelector("#accounts");

  // Purge UI elements any previously loaded accounts
  // accountContainer.innerHTML = '';

  // Go through all accounts and get their ETH balance
  const rowResolvers = accounts.map(async (address) => {
    const balance = await web3.eth.getBalance(address);
    // ethBalance is a BigNumber instance
    // https://github.com/indutny/bn.js/
    const ethBalance = web3.utils.fromWei(balance, "ether");
    const humanFriendlyBalance = parseFloat(ethBalance).toFixed(4);
    console.log(humanFriendlyBalance);
    // Fill in the templated row and put in the document
    // const clone = template.content.cloneNode(true);
    // clone.querySelector(".address").textContent = address;
    // clone.querySelector(".balance").textContent = humanFriendlyBalance;
    // accountContainer.appendChild(clone);
  });

  // Because rendering account does its own RPC commucation
  // with Ethereum node, we do not want to display any results
  // until data for all accounts is loaded
  await Promise.all(rowResolvers);

  // Display fully loaded UI for wallet data
  // document.querySelector("#prepare").style.display = "none";
  // document.querySelector("#connected").style.display = "block";
}



/**
 * Fetch account data for UI when
 * - User switches accounts in wallet
 * - User switches networks in wallet
 * - User connects wallet initially
 */
async function refreshAccountData() {

  // If any current data is displayed when
  // the user is switching acounts in the wallet
  // immediate hide this data
  // document.querySelector("#connected").style.display = "none";
  // document.querySelector("#prepare").style.display = "block";

  // Disable button while UI is loading.
  // fetchAccountData() will take a while as it communicates
  // with Ethereum node via JSON-RPC and loads chain data
  // over an API call.
  // document.querySelector("#btn-connect").setAttribute("disabled", "disabled")
  await fetchAccountData(provider);
  // document.querySelector("#btn-connect").removeAttribute("disabled")
}

async function mintEdition(edition, price) {
    try {
        const web3 = new Web3(provider);
        const contract = new web3.eth.Contract(abi.abi, "0x7a06B84AC9A194e8601850345ac098e512E16a00");
        await contract.methods.mintEdition(edition).send({from: selectedAccount, value: price, mintEdition: edition}).on("receipt", (receipt) => {
          console.log("done");
        });
    } catch {
        window.alert("Make sure your wallet is connected and you have enough eth to mint!")
    }
  
}


/**s
 * Connect wallet button pressed.
 */
async function onConnect() {

  console.log("Opening a dialog", web3Modal);
  try {
    provider = await web3Modal.connect();
  } catch(e) {
    console.log("Could not get a wallet connection", e);
    return;
  }

  // Subscribe to accounts change
  provider.on("accountsChanged", (accounts) => {
    fetchAccountData();
  });

  // Subscribe to chainId change
  provider.on("chainChanged", (chainId) => {
    fetchAccountData();
  });

  // Subscribe to networkId change
  provider.on("networkChanged", (networkId) => {
    fetchAccountData();
  });

  await refreshAccountData();
  document.querySelector("#btn-connect").style.display = "none";
  // document.querySelector("#btn-mint").style.display = "inline";
}

async function onMintSeason() {
    mintEdition(1, 40000000000000000);
    console.log("season mint")
}

async function onMintPlayoffs() {
    mintEdition(2, 70000000000000000);
    console.log("playoffs mint")
}

async function onMintConference() {
    mintEdition(3, 300000000000000000);
    console.log("conference mint")
}

async function onMintSuperBowl() {
    mintEdition(4, 6000000000000000000);
    console.log("sb mint")
}

async function onMintPresale() {
    mintEdition(5, 60000000000000000);
    console.log("presale mint")
}

/**
 * Disconnect wallet button pressed.
 */
async function onDisconnect() {

  console.log("Killing the wallet connection", provider);

  // TODO: Which providers have close method?
  if(provider.close) {
    await provider.close();

    // If the cached provider is not cleared,
    // WalletConnect will default to the existing session
    // and does not allow to re-scan the QR code with a new wallet.
    // Depending on your use case you may want or want not his behavir.
    await web3Modal.clearCachedProvider();
    provider = null;
  }

  selectedAccount = null;

  // Set the UI back to the initial state
  document.querySelector("#prepare").style.display = "block";
  document.querySelector("#connected").style.display = "none";
}

console.log('here')
/**
 * Main entry point.
 */
window.addEventListener('load', async () => {
  init();
  document.querySelector("#btn-connect").addEventListener("click", onConnect);
//   document.querySelector("#btn-mint").addEventListener("click", onMint);
//   document.querySelector("#btn-mint").style.display = "none";
  // document.querySelector("#regular-season-mint").addEventListener("click", onMintSeason);
  // document.querySelector("#playoffs-mint").addEventListener("click", onMintPlayoffs);
  // document.querySelector("#conference-mint").addEventListener("click", onMintConference);
  // document.querySelector("#sb-mint").addEventListener("click", onMintSuperBowl);
  document.querySelector("#address-field").style.display = "none";
  
});