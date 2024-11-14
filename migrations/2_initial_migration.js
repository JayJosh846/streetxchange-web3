const ERC20Token = artifacts.require("ERC20Token");
const Operations = artifacts.require("Operations");
const Aeropaye = artifacts.require("Aeropaye");
const Getters = artifacts.require("Getters");


module.exports = async function (deployer) {

  //   // Deploy Operations
  await deployer.deploy(Operations);
  const operations = await Operations.deployed()


  // Deploy ERC20Token
  await deployer.deploy(ERC20Token, operations.address);
  const erc20token = await ERC20Token.deployed()

   // Deploy Aeropaye
  await deployer.deploy(Aeropaye, erc20token.address, operations.address);

  // Deploy Getters
  await deployer.deploy(Getters, erc20token.address, operations.address);




}; 