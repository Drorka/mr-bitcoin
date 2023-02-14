import { contactService } from '../services/contact.service.js'

export const contactStore = {
	state: {
		contacts: [],
		cart: [],
		lastRemovedContact: null,
	},
	getters: {
		contacts({ contacts }) {
			return contacts
		},
	},
	mutations: {
		setContacts(state, { contacts }) {
			// console.log('payload: ', payload)
			state.contacts = contacts
		},
		removeContact(state, { contactId }) {
			const idx = state.contacts.findIndex((p) => p._id === contactId)
			state.lastRemovedContact = state.contacts[idx]
			state.contacts.splice(idx, 1)
		},
		addContact(state, { contact }) {
			state.contacts.push(contact)
		},
		updateContact(state, { contact }) {
			const idx = state.contacts.findIndex((p) => p._id === contact._id)
			state.contacts.splice(idx, 1, contact)
		},
		clearRemoveContact(state) {
			state.lastRemovedContact = null
		},
		undoRemoveContact(state) {
			state.contacts.unshift(state.lastRemovedContact)
			state.lastRemovedContact = null
		},
	},
	actions: {
		async loadContacts({ commit }) {
			try {
				const contacts = await contactService.query()
				commit({ type: 'setContacts', contacts })
			} catch (err) {
				console.log('Failed to load contacts')
				throw err
			}
		},
		async removeContact({ commit }, payload) {
			commit(payload)
			try {
				await contactService.remove(payload.contactId)
				commit({ type: 'clearRemoveContact' })
			} catch (err) {
				commit({ type: 'undoRemoveContact' })
				throw err
			}
		},
		async saveContact({ commit }, { contact }) {
			console.log('saveContact from store', contact)
			const actionType = contact._id ? 'updateContact' : 'addContact'
			try {
				const savedContact = await contactService.save(contact)
				commit({ type: actionType, contact: savedContact })
			} catch (err) {
				console.log('Failed to save contact')
				throw err
			}
		},
	},
}
