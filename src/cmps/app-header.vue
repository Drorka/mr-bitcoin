<template>
    <header class="app-header full main-layout">
        <div className="header-container">
        <div class="logo-container">
        <span >Mr.Bitcoin</span>
        </div>
        <nav>
            <RouterLink to="/home">Home</RouterLink>
            <RouterLink to="/contact">Contacts</RouterLink>
            <RouterLink to="/stats">Statistics</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
        <div class="user-info">
                <span v-if="user">{{ user.name }}</span>
        </div>
        <span v-if="rate">1$ = {{ rate }}₿</span>
        </div>
    </header>
</template>

<script>
import { bitcoinService } from '../services/bitcoin.service'

export default {
    data() {
        return {
            currRate: null,
        }
    },
    async created() {
        this.currRate = await bitcoinService.getRate()
    },
    computed: {
        user() { return this.$store.getters.user }
    },
}
</script>
