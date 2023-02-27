<template>
    <header class="app-header full main-layout">
        <div className="header-container">
            <div class="logo-container">
            <span >Mr.Bitcoin</span>
            </div>
            <nav>
                <RouterLink to="/">Home</RouterLink>
                <RouterLink to="/contact">Contacts</RouterLink>
                <RouterLink to="/stats">Statistics</RouterLink>
                <!-- <RouterLink to="/about">About</RouterLink> -->
            </nav>
            <!-- <div class="login-logout">
            </div> -->
            <div class="user-info">
                <!-- <span v-if="user">{{ user.name }}</span> -->
                <RouterLink v-if="user" to="/user">{{ user.name }}</RouterLink>
                <!-- <button class="btn-pinkish btn-logout" v-if="user">Logout</button> -->
                <!-- <RouterLink v-if="user" @click="onLogout" to="/login">Logout</RouterLink> -->
                <button class="btn-bluish" v-if="user" @click="onLogout">Logout</button>
                <RouterLink v-if="!user" to="/login">Login</RouterLink>
            </div>
            <!-- <span v-if="rate">1$ = {{ rate }}₿</span> -->
        </div>
    </header>
</template>

<script>
import { bitcoinService } from '../services/bitcoin.service'
import {userService} from '../services/user.service'

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
    methods: {
        async onLogout() {
            console.log('logout');
            try {
                this.$store.dispatch({type: 'logout'})
                this.$router.push('/login')
            } catch (err) {
                console.log('Failed to logout');
            }
        }
    }
}
</script>
