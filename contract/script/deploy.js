const { ethers } = require("hardhat");

async function main() {
    const EchoChain = await ethers.getContractFactory("EchoChain");
    const echoChain = await EchoChain.deploy();
    await echoChain.deployed();

    console.log(`EchoChain deployed to: ${echoChain.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
