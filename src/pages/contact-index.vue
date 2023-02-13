<template>
    <div class="main-container">
        <ContactFilter @filter="onSetFilterBy" />
        <RouterLink to="/contact/edit"><button>Add a Contact</button></RouterLink>
        <ContactList @remove="removeContact" v-if="contacts" :contacts="contacts" />
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { eventBus } from '@/services/eventBus.service.js'

import ContactList from '@/cmps/contact-list.vue'
import ContactFilter from '@/cmps/contact-filter.vue'

export default {
    data() {
        return {
            contacts: null,
            filterBy: {},
        }
    },
    async created() {
        this.loadContacts()
    },
    methods: {
        async loadContacts() {
        this.contacts = await contactService.getContacts(this.filterBy)
        },
        async removeContact(contactId) {
            const msg = {
                txt: `Contact ${contactId} deleted.`,
                type: 'success',
                timeout: 2500,
            }
            await contactService.deleteContact(contactId)
            this.contacts = this.contacts.filter(contact => contact._id !== contactId)
            eventBus.emit('user-msg', msg)
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
            this.loadContacts()
        },
    },
    computed: {
    },
    components: {
        ContactList,
        ContactFilter,
    },
}
</script>

<style lang="scss">
.main-container {
    position: relative;
}
</style>
