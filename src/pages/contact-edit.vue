<template>
    <form
        @submit.prevent="onSave"
        v-if="contactToEdit"
        class="contact-edit main-layout"
    >
        <h1>{{ getTitle }}</h1>
        <img :src="'https://robohash.org/' + contactToEdit.name" alt="" />
        <input
        type="text"
        v-model="contactToEdit.name"
        placeholder="Enter contact name..."
        />
        <input
        type="text"
        v-model="contactToEdit.email"
        placeholder="Enter contact email..."
        />
        <input
        type="text"
        v-model.number="contactToEdit.phone"
        placeholder="Enter contact phone..."
        />
        <button class="primary">Save</button>
    </form>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import { eventBus } from '@/services/eventBus.service.js'

export default {
    data() {
        return {
        contactToEdit: null,
        }
    },
    async created() {
        const contactId = this.$route.params._id
        if (contactId) {
        this.contactToEdit = await contactService.getContactById(contactId)
        } else {
        this.contactToEdit = contactService.getEmptyContact()
        }
    },
    methods: {
        async onSave() {
        console.log('contactToEdit from cmp', this.contactToEdit);
        const contactToSave = {...this.contactToEdit}
        this.$store.dispatch({type: 'saveContact', contact: contactToSave})
            .then((contact) => {
                const msg = {
                        txt: `Contact saved.`,
                        type: 'success',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
                        this.$router.push('/contact')
            })
            .catch(err => {
                const msg = {
                        txt: `Couldn't save contact`,
                        type: 'error',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
            })
        },
    },
    computed:{
        getTitle(){
            return  (this.contactToEdit._id ? 'Edit' : 'Add') + ' Contact'
        }
    }
}
</script>

<style lang="scss"></style>
