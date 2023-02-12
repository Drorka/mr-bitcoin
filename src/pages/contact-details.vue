<template>
    <h1>Details</h1>
    <!-- <div v-if="contact" class="contact-details">
        <h2>{{contact.vendor}}</h2>
        <h3>{{contact.speed}}</h3>
        <RouterLink to="/contact">
            <button>Back</button>
        </RouterLink>
    </div> -->
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
    //     this.contact = await contactService.get(contactId)
    // }
}
</script>

<style lang="scss"></style>
