<template>
    <section class="user-details" v-if="user">
        <h1>Welcome {{user.name}}</h1>
        <div class="user-details-tiles">
            <div class="tile-rate">
                <span class="tile-name">Bitcoin rate</span>
                <span class="tile-data">&#36;1:&#8383;{{currRate}}</span>
            </div>
            <div class="tile-balance">
                <span class="tile-name">Your balance</span>
                <span class="tile-data">&#8383;{{user.balance}}</span>
            </div>
        </div>
            <div class="user-img-container">
                <img  src="../assets/img/cryptocurrency-g1d7e4b128_1280.jpg" alt="bitcoin">
            </div>
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