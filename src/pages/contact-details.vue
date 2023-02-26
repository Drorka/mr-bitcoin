<template>
    <section v-if="contact" class="contact-details">
        <h1>Contact Details</h1>
        <h2 class="name">{{contact.name}}</h2>
        <h3 class="email">Email: {{contact.email}}</h3>
        <h3 class="phone">Phone: {{contact.phone}}</h3>
        <img :src="`https://api.dicebear.com/5.x/croodles/svg?seed=${contact.imgId}`">
        <div class="contact-actions">
            <TransferFunds :contact="contact"/>
            <RouterLink to="/contact">
                <button class="btn-bluish btn-back">Back</button>
            </RouterLink>
        </div>
    </section>
</template>

<script>
import { contactService } from '@/services/contact.service.js'
import TransferFunds from '../cmps/transfer-funds.vue'
export default {
    data() {
        return {
            contact: null,
        }
    },
    async created(){
        const contactId = this.$route.params._id
        this.contact = await contactService.getById(contactId)
    },
    components: {
        TransferFunds
    }
}
</script>

<style lang="scss"></style>
