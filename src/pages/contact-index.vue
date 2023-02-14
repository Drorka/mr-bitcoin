<template>
    <div class="contact-index-main-container">
        <section class="contact-index-actions">
        <ContactFilter @filter="onSetFilterBy" />
        <!-- <div><RouterLink to="/contact/edit"><button>Add a Contact</button></RouterLink></div> -->
        <div class="add-contact">
            <button class="btn-pinkish">
                <RouterLink to="/contact/edit">Add a Contact</RouterLink>
            </button>
        </div>
        </section>
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
            filterBy: {},
        }
    },
    async created() {
        this.$store.dispatch({type: 'loadContacts'})
    },
    methods: {
        async removeContact(contactId) {            
            this.$store.dispatch({type: 'removeContact', contactId})
                    .then(() => {
                        const msg = {
                        txt: `Contact ${contactId} deleted.`,
                        type: 'success',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
                    })
                    .catch(err => {
                        const msg = {
                        txt: `Couldn't delete ${contactId}`,
                        type: 'error',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
                    })
        },
        onSetFilterBy(filterBy) {
            this.filterBy = filterBy
            this.loadContacts()
        },
    },
    computed: {
        contacts() { return this.$store.getters.contacts }
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
