module.exports = {
  networks: {
    base: {
      provider: () => new HDWalletProvider(mnemonic, "https://base.rpc.url"),
      network_id: "*",       // Any network (default: none)
      gas: 4500000,          // Gas limit
      gasPrice: 10000000000, // 10 gwei (or adjust to current network)
    },
  },
  compilers: {
    solc: {
      version: "0.8.0",      // Specify Solidity version
    }
  }
};
