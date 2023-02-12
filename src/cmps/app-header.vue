<template>
    <header>
        <span>Mr.Bitcoin</span>
        <nav>
            <RouterLink to="/">Home</RouterLink>
            <RouterLink to="/contact">Contacts</RouterLink>
            <RouterLink to="/about">About</RouterLink>
        </nav>
        <span v-if="user">{{user.name}}</span>
        <span v-if="currRate">Current rate: {{currRate}}</span>
    </header>
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
    },
}
</script>
