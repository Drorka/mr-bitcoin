<template>
    <article class="contact-container">
        <img :src="`https://api.dicebear.com/5.x/croodles/svg?seed=${contact.imgId}`" />
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
