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
            <div class="tile-transactions">
                <span class="tile-name">Latest transactions</span>
                <TransactionList/>
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
import TransactionList from '../cmps/transaction-list.vue'


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
    components: {
        TransactionList
    }
}
</script>

<style>

</style>