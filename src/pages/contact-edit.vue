<template>
    <h1>Edit</h1>
    <!-- <form @submit.prevent="save" v-if="contact" class="contact-edit">
        <input type="text" v-model="contact.vendor">
        <input type="number" v-model.number="contact.speed">
        <button>Save</button>
    </form> -->
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
    data() {
        // return {
        //     contact: null,
        // }
    },
    // async created(){
    //     const contactId = this.$route.params._id
    //     if(contactId) {
    //         this.contact = await contactService.get(contactId)
    //     } else {
    //         this.contact = contactService.getEmptyContact()
    //     }
    // },
    methods: {
        // async save() {
        //     await contactService.save(this.contact)
        //     this.$router.push('/contact')
        // }
    }
}
</script>

<style lang="scss"></style>
