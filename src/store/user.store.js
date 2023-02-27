import { userService } from '../services/user.service.js'

export const userStore = {
	state: {
		user: userService.getLoggedinUser(),
	},
	getters: {
		user({ user }) {
			return user
		},
	},
	mutations: {
		setUser(state, { user }) {
			state.user = user
		},
		setUserBalance(state, { balance }) {
			state.user.balance = balance
		},
	},
	actions: {
		async loginSignup({ commit }, { credentials }) {
			try {
				const user = await userService.loginSignup(credentials)
				commit({ type: 'setUser', user })
				return user
			} catch (err) {
				console.log('Failed to set user', err)
				throw err
			}
		},
		deposit(context, { amount }) {
			console.log('context', context)
			return userService.updateBalance(amount).then((balance) => {
				context.commit({ type: 'setUserBalance', balance })
				return balance
			})
		},
		async transfer(context, { contactId, contactName, amount }) {
			console.log('context', context, 'data', contactId, contactName, amount)
			try {
				const user = await userService.transferFunds(
					contactId,
					contactName,
					amount
				)
				let { balance } = user
				context.commit({ type: 'setUserBalance', balance })
				context.commit({ type: 'setUser', user })
				return user
			} catch (err) {
				console.log('Failed to transfer funds', err)
				throw err
			}
		},
	},
}
