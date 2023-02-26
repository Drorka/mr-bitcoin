<template>
    <ul class="transaction-list clean-list">
        <span class="transaction-list-header">Contact</span>
        <span class="transaction-list-header">Date</span>
        <span class="transaction-list-header">Amount</span>
        
        <li class="transaction-preview" v-for="transaction in transactions" v-bind:key="transaction.at">
        <span>{{ transaction.to }}</span>
        <span>{{formatDate(transaction) }}</span>
        <span>${{ transaction.amount }}</span>
        </li>
    </ul>
</template>

<script>
import { userService } from '../services/user.service';
import {utilService} from '../services/util.service';

export default {
    props: {
        contact: Object,
        required: true
    },
    data() {
        return {
        user: null,
        transactions: [],
        }
    },
    computed : {
        formatDate() {
        return (transaction) => utilService.getFormattedDate(transaction.at);
        }

    },
    async created() {
        this.user = this.$store.getters.user 
        console.log(this.user);
        // const user = await userService.get(userService.getLoggedinUser()._id)
        if (this.contact) {
        this.transactions = this.user.transactions.filter(transaction => transaction.toId === this.contact._id)
        } else {
            this.transactions = this.user.transactions.slice(-3)
        }
    },
}
</script>

// <style lang="scss">

</style>
