<template>
    <section v-if="user">
        <h1>Welcome {{user.name}}</h1>
        <p>Your current balance is: <span>{{user.balance}}</span></p>
        <p v-if="currRate">The current rate is: <span>{{currRate}}</span></p>
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