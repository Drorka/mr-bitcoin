// export const userService = {
// 	getUser,
// }

// function getUser() {
// 	const user = {
// 		name: 'Puki Ben David',
// 		balance: 100,
// 		transactions: [],
// 	}
// 	return user
// }

import { asyncStorageService } from './async-storage.service.js'
import { storageService } from './storage.service'
import { utilService } from './util.service.js'

const STORAGE_KEY_USER = 'userDB'
_createUsers()

export const userService = {
	get,
	remove,
	loginSignup,
	signup,
	login,
	logout,
	getEmptyCredentials,
	getLoggedinUser,
	transferFunds,
	getTransactions,
}

async function get(userId) {
	return await asyncStorageService.get(STORAGE_KEY_USER, userId)
}

function remove(userId) {
	return asyncStorageService.remove(STORAGE_KEY_USER, userId)
}

async function loginSignup(credentials) {
	try {
		const users = await asyncStorageService.query(STORAGE_KEY_USER)
		const user = users.find((u) => u.name === credentials.name)
		if (!user) {
			const newUser = await signup(credentials)
			return newUser
		} else {
			const loggedUser = await login(user)
			return loggedUser
		}
	} catch (err) {
		console.log('Failed to login')
		throw err
	}
}

async function signup(credentials) {
	try {
		const newUser = await asyncStorageService.post(
			STORAGE_KEY_USER,
			credentials
		)
		_saveLoggedinUser(newUser)
		return newUser
	} catch (err) {
		console.log('Failed to signup')
		throw err
	}
}

async function login(user) {
	try {
		// const users = await asyncStorageService.query(STORAGE_KEY_USER)
		// const user = users.find((u) => u.name === credentials.name)
		// if (!user) {
		// 	console.log('No such user')
		// 	throw err
		// }
		_saveLoggedinUser(user)
		return user
	} catch (err) {
		console.log('Failed to login')
		throw err
	}
}

function getEmptyCredentials(name = '', balance = 100, transactions = []) {
	return { name, balance, transactions }
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem('loggedinUser') || null)
}

function logout() {
	sessionStorage.removeItem('loggedinUser')
	return Promise.resolve()
}

function _saveLoggedinUser(user) {
	sessionStorage.setItem('loggedinUser', JSON.stringify(user))
}

async function transferFunds(contactId, contactName, amount) {
	const currUser = getLoggedinUser()
	console.log('service curr user before', currUser.balance)
	if (currUser.balance < amount) {
		throw new Error('No sufficient balance')
	}
	const transaction = {
		toId: contactId,
		to: contactName,
		at: Date.now(),
		amount: amount,
	}
	currUser.transactions.push(transaction)
	currUser.balance -= amount
	console.log('service curr user after', currUser.balance)
	_saveLoggedinUser(currUser)
	return currUser.balance
}

function getTransactions() {}

function _createUsers() {
	let users = storageService.load(STORAGE_KEY_USER)
	if (!users || !users.length) {
		users = []
		users.push(_createUser('Muki Da', 100, []))
		users.push(_createUser('Shuki Ba', 100, []))

		storageService.save(STORAGE_KEY_USER, users)
	}
}

function _createUser(name, balance, transactions) {
	const user = getEmptyCredentials(name, balance, transactions)
	user._id = utilService.makeId()
	return user
}
