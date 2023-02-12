<template>
    <section>
        <h1>List</h1>
        <!-- <TransitionGroup name="list" tag="ul" class="car-list">
            <li class="car-preview" v-for="car in cars" :key="car._id">
                <CarPreview :car="car" />
                <section class="actions">
                    <RouterLink :to="`/car/${car._id}`">
                        <button>Details</button>
                    </RouterLink>
                    <RouterLink :to="`/car/edit/${car._id}`">
                        <button>Edit</button>
                    </RouterLink>
                    <button @click="onRemoveCar(car._id)">x</button>
                </section>
            </li>
        </TransitionGroup> -->
    </section>
</template>

<script>
import ContactPreview from '@/cmps/contact-preview.vue'
export default {
    // props: ['cars']
    props: {
        // contacts: {
        //     type: Array,
        //     required: true,
        // },
    },
    methods: {
        // onRemoveCar(carId) {
        //     this.$emit('remove', carId)
        // },
    },
    components: {
        ContactPreview,
    },
}
</script>

<style lang="scss"></style>
