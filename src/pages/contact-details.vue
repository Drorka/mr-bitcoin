<template>
    <div v-if="contact" class="contact-details">
        <h2>{{contact.name}}</h2>
        <h3>Email: {{contact.email}}</h3>
        <h3>Phone: {{contact.phone}}</h3>
        <img :src="`https://robohash.org/${contact._id}.png`">
        <RouterLink to="/contact">
            <button>Back</button>
        </RouterLink>
    </div>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
export default {
    data() {
        return {
            contact: null,
        }
    },
    async created(){
        const contactId = this.$route.params._id
        this.contact = await contactService.getContactById(contactId)
    }
}
</script>

<style lang="scss"></style>
