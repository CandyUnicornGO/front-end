import Web3 from 'web3'
// Here's how we would access our contract:
const ABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "zombies",
		"outputs": [
			{
				"name": "name",
				"type": "string"
			},
			{
				"name": "dna",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "zombieId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "dna",
				"type": "uint256"
			}
		],
		"name": "NewZombie",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createRandomZombie",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
]

const CONTRACT_ADDRESS = '0x07dB39EeA5e6418197d84d3fC7fd2aBf3D7e1b91'

const repeatString = (str, size) => {
  let result = str
  while (result.length < size) {
    result += str
  }
  return result
}

const makeUnicorn = (zombieId, name, dna) => {
	const dnaStr = repeatString(String(dna), 16)
	return {
		headChoice: dnaStr.substring(0, 2) % 3 + 1,
		hairChoice: dnaStr.substring(2, 4) % 3 + 1,
		cornChoice: dnaStr.substring(4, 6) % 1 + 1,
		earsChoice: dnaStr.substring(6, 8) % 1 + 1,
		eyesChoise: dnaStr.substring(8, 10) % 1 + 1,
		headColor: parseInt(dnaStr.substring(10, 12) / 100 * 360),
		hairColor: parseInt(dnaStr.substring(12, 14) / 100 * 360),
		zombieName: name,
	}
}

class SmartUnicorn {
	constructor() {
		this.handleAccount = this.handleAccount.bind(this)
		this.handleMetamask = this.handleMetamask.bind(this)
		this.watchForAccount = this.watchForAccount.bind(this)
		this.watchForNetwork = this.watchForNetwork.bind(this)
		this.watchForMetamask = this.watchForMetamask.bind(this)
		this.events = {
			'metamask': [this.handleMetamask],
			'account': [this.handleAccount]
		}
		this.network = 1
		this.watchForMetamask()
	}

	watchForMetamask() {
		if (typeof web3 !== 'undefined' && web3.currentProvider.isMetaMask) {
			this.trigger('metamask')
		} else {
			setTimeout(this.watchForMetamask, 100)
		}
	}

	watchForAccount() {
		this.web3.eth.getAccounts().then((accounts) => {
			if (accounts.length > 0) {
				if (this.web3.eth.defaultAccount !== accounts[0]) {
					this.web3.eth.defaultAccount = accounts[0]
					this.trigger('account', accounts[0])
				}
			} else {
				if (this.web3.eth.defaultAccount != undefined) {
					this.web3.eth.defaultAccount = undefined
					this.trigger('account', undefined)
				}
			}
			setTimeout(this.watchForAccount, 500)
		})
	}

	watchForNetwork() {
		const {net} = this.web3.eth
		net.getId().then(id => {
			if (this.network !== id) {
				this.network = id
				switch (id) {
					case 1:
						this.trigger('network', 'main')
						break
					default:
						this.trigger('network', 'wrong')
				}
			}
			setTimeout(this.watchForNetwork, 200)
		})
	}

	handleMetamask() {
		this.web3 = new Web3(web3.currentProvider)
		this.watchForAccount()
		this.watchForNetwork()
	}

	signMessage(message) {
		const address = this.web3.eth.defaultAccount
		return this.web3.eth.sign(message, address)
	}

	handleAccount() {
		//this.initFactory()
	}

	initFactory() {
		const contract = this.web3.eth.contract(ABI)
    this.factory = contract.at(CONTRACT_ADDRESS)
    this.factory.NewZombie((error, result) => {
  		if (!error) {
				const {zombieId, name, dna} = result.args
				const details = makeUnicorn(zombieId, name, dna)
				this.trigger('created', details)
			}
  	})
	}

	make(name) {
    this.factory.createRandomZombie(name, (error, result) => {
  		console.log(error, result)
  	})
	}

	on(event, callback) {
		if (typeof this.events[event] !== 'undefined') {
			this.events[event].push(callback)
		} else {
			this.events[event] = [callback]
		}
	}

	trigger(event, data) {
		if (typeof this.events[event] !== 'undefined') {
			this.events[event].forEach(callback => {
				if (typeof callback === 'function') {
					callback(data)
				}
			})
		}
	}

	info() {
		const metamask = typeof this.web3 !== 'undefined'
		return {
			metamask,
			wallet: metamask ? this.web3.eth.defaultAccount : undefined
		}
	}
}

export default new SmartUnicorn()
