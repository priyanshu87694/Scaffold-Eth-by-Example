const { network } = require("../hardhat.config")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    const simpleStorage = await deploy ("SimpleStorage", {
        from: deployer,
        args: [],
        log: true,
        waitConfirmations: 1
    })
}

module.exports.tags = ["SimpleStorage"]