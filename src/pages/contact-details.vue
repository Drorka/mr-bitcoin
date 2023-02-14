<template>
    <section v-if="contact" class="contact-details">
        <h1>Contact Details</h1>
        <h2 class="name">{{contact.name}}</h2>
        <h3 class="email">Email: {{contact.email}}</h3>
        <h3 class="phone">Phone: {{contact.phone}}</h3>
        <img :src="`https://robohash.org/${contact._id}.png`">
        <RouterLink to="/contact">
            <button class="btn-bluish btn-back">Back</button>
        </RouterLink>
    </section>
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
        this.contact = await contactService.getById(contactId)
    }
}
</script>

<style lang="scss"></style>
