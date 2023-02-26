<template>
    <section class="home-page full main-layout">
        <section class="home-page-container">
        <h1 class="hero-title">We're here to help you achieve financial success</h1>
        <p class="hero-desc">Let's talk about money. Your money. And making more of it. Welcome to Mr.Bitcoin, where the power of money is powerful. And extremely desirable.
            <RouterLink to="/login">
            <button class="btn-pinkish start-btn">Get Started Now</button>
            </RouterLink>
        </p>
        <div class="home-page-tiles">
            <div class="tile-rate">
                <span class="tile-name">Rate</span>
                <span class="tile-data">$42.74</span>
            </div>
            <div class="tile-size">
                <span class="tile-name">Average size</span>
                <span class="tile-data">6.23MB</span>
            </div>
            <div class="tile-price">
            </div>
        </div>

        </section>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export default {
    data() {
        return {
            currRate: null,
        }
    },
    async created() {
        this.currRate = await bitcoinService.getRate()
        // this.priceHistory = await bitcoinService.getMarketPriceHistory()
        // this.avgBlockSize = await bitcoinService.getAvgBlockSize()
    },
    computed: {
        user() { return this.$store.getters.user }
    },
}
</script>

<style>

</style>