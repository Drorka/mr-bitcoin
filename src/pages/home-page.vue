<template>
    <section class="home-page" v-if="user">
        <h1>Welcome {{user.name}}</h1>
        <div class="home-page-balance">
        <p>Your current balance is: <span>{{user.balance}}</span></p>
        </div>
        <div class="home-page-rate">
        <p v-if="currRate">The current bitcoin rate is: 1:<span>{{currRate}}</span></p>
        </div>
    </section>
</template>

<script>
import { userService } from '../services/user.service'
import { bitcoinService } from '../services/bitcoin.service'

export default {
    data() {
        return {
            user: null,
            currRate: null,
        }
    },
    async created() {
        this.user = userService.getUser()
        this.currRate = await bitcoinService.getRate()
        // this.priceHistory = await bitcoinService.getMarketPriceHistory()
        // this.avgBlockSize = await bitcoinService.getAvgBlockSize()
    },
}
</script>

<style>

</style>