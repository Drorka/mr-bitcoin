<template>
    <article class="contact-container">
        <img :src="'https://robohash.org/' + contact._id" alt="{{contact.name}}" />
        <h3>{{contact.name}}</h3>
    </article>
</template>

<script>
export default {
    props: {
        contact: {
            type: Object,
            required: true,
        }
    }
}
</script>

<style lang="scss"></style>
