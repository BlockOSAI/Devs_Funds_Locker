const {
    time,
    loadFixture,
  } = require('@nomicfoundation/hardhat-network-helpers')
  const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
  const { expect } = require('chai')
  const { ethers } = require('hardhat')
  const assert = require('assert')
  
  let hardhatLocker
  let tokenAddress
  let accounts
  let token
  let hacktonRunning
  describe('BlockOSAI', () => {
    beforeEach(async () => {
      const Token = await ethers.getContractFactory('BlockOSAI')
      token = await Token.deploy()
      await token.deployed()
      tokenAddress = token.address
      // Get the list of accounts
      const [owner, dev1, dev2, god] = await ethers.getSigners()
  
      const Locker = await ethers.getContractFactory('BOSAI_Dev_Funds_Locker')
      hardhatLocker = await Locker.deploy(tokenAddress, god.address)
      await hardhatLocker.deployed()
      // Transfer tokens to the locker
      const connectedToken = token.connect(owner)
      await connectedToken.transfer(hardhatLocker.address, 1000000000)
    })
    describe('Deploying the locker smart contract', function () {
      it('Should deploy the locker contract and assign the token address we have, to the constructor and god', async function () {
        const [owner, dev1, dev2, god] = await ethers.getSigners()
  
        const Locker = await ethers.getContractFactory('BOSAI_Dev_Funds_Locker')
        hardhatLocker = await Locker.deploy(tokenAddress, owner.address)
        await hardhatLocker.deployed()
      })
    })
    describe('Adding devs to the', function () {
      it('Should check if msg.sender is god', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
  
        // Add dev1 as a participating dev
        try {
          const connectLocker = hardhatLocker.connect(owner)
          await connectLocker.addDev(dev1.address)
        } catch (error) {
          expect(error.message).to.include(
            'You are not in the developer participating list',
          )
        }
      })
      it('Should revert if is not participating list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        try {
          const connectLocker = hardhatLocker.connect(dev1)
          await connectLocker.addDev(dev3.address)
        } catch (error) {
          expect(error.message).to.include(
            'You are not in the developer participating list',
          )
        }
      })
      it('Should revert if hackathon is not running', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
  
        hacktonRunning = await hardhatLocker.isHacktonRunning()
        expect(hacktonRunning).to.be.true
  
        try {
          const connectLocker = hardhatLocker.connect(god)
          await connectLocker.stopHacktonWhitelist()
        } catch (error) {
          hacktonRunning = await hardhatLocker.isHacktonRunning()
          expect(hacktonRunning).to.be.false
          try {
            const connectLocker = hardhatLocker.connect(god)
            await connectLocker.addDev(dev1)
          } catch (error) {
            expect(error.message).to.include('Time to add developer has ended')
          }
        }
      })
      it('Should revert if dev is already on the list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
  
        const theGOD = await hardhatLocker.connect(god)
        await theGOD.addDev(dev1.address)
        try {
          await theGOD.addDev(dev1.address)
        } catch (error) {
          expect(error.message).to.include(
            'BOSAI_Dev_Funds_Locker_Address_Already_In_List()',
          )
        }
      })
      it('Should add the developer on the list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        let theGOD
        theGOD = await hardhatLocker.connect(god)
        await theGOD.addDev(dev1.address)
        theGOD = await hardhatLocker.connect(dev1)
        await theGOD.addDev(dev2.address)
        const addDe1v = await theGOD.partetipatingDev(dev2.address)
        expect(addDe1v).to.be.true
      })
    })
    describe('Removing devs from the list', function () {
      it('Should check if msg.sender is god', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
  
        // Add dev1 as a participating dev
        try {
          const connectLocker = hardhatLocker.connect(owner)
          await connectLocker.addDev(dev1.address)
        } catch (error) {
          expect(error.message).to.include(
            'You are not in the developer participating list',
          )
        }
      })
      it('Should revert if dev is on the list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
  
        const theGOD = await hardhatLocker.connect(god)
  
        try {
          await theGOD.removeDev(dev1.address)
        } catch (error) {
          expect(error.message).to.include(
            'The developer does not exist in the list',
          )
        }
      })
      it('Should remove the developer from the list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        let theGOD
        theGOD = await hardhatLocker.connect(god)
        await theGOD.addDev(dev1.address)
        await theGOD.removeDev(dev1.address)
        const addDe1v = await theGOD.partetipatingDev(dev1.address)
        expect(addDe1v).to.be.false
      })
    })
    describe('Claim rewards', function () {
      it('Should revert if is not participating list', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        try {
          const connectLocker = hardhatLocker.connect(dev1)
          await connectLocker.addDev(dev3.address)
        } catch (error) {
          expect(error.message).to.include(
            'You are not in the developer participating list',
          )
        }
      })
      it('Should check if reward has been alrady claimed', async function () {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        const connectLocker = hardhatLocker.connect(dev1)
  
        const claimed = await connectLocker.hasClaimed(dev1.address)
        expect(claimed).to.be.false
      })
      it('Should allow developers to claim rewards after specific time', async () => {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        let connectLocker
        connectLocker = hardhatLocker.connect(god)
        connectLocker.addDev(dev1.address)
        connectLocker.updateTotalFunds()
        const connectedToken = token.connect(owner)
        await connectedToken.transfer(hardhatLocker.address, 1000000000)
  
        const amounperdev = await connectLocker.checkAmountPerDev()
        const timeToPass = 1713340800
        await time.increase(time.duration.seconds(BigInt(timeToPass)))
        //     // Claim rewards
        connectLocker = hardhatLocker.connect(dev1)
        await connectLocker.claim()
        const balance = await connectedToken.balanceOf(dev1.address)
  
        expect(balance).to.equal(amounperdev)
      })
  
      it('Should revert if developers try to claim rewards before specific time', async () => {
        const [owner, dev1, dev2, god, dev3] = await ethers.getSigners()
        const connectLocker = hardhatLocker.connect(god)
        connectLocker.addDev(dev1.address)
  
        // Try to claim rewards before specific time
        try {
          await hardhatLocker.connect(dev1).claim()
        } catch (error) {
          expect(error.message).to.include(
            'BOSAI_Dev_Funds_Locker_Too_Early_To_Withdraw()',
          )
        }
      })
    })
  })