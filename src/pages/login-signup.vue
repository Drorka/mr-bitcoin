<template>
    <section class="login-signup main-layout">
        <form @submit.prevent="onLogin"
            v-if="user"
            class="login-signup-form">
            <h1>Welcome to Mr.Bitcoin!</h1>
            <div class="input-container">
                <div class="login-img-container">
                    <img  src="../assets/img/bitcoin-gd7e99d74e_1280.png" alt="bitcoin">
                </div>
                <!-- <label for="name">Name: </label> -->
                <input
                type="text"
                v-model="user.name"
                placeholder="Enter username"
                />
                <button class="btn-pinkish btn-login">Login / Signup</button>
            </div>
        </form>
    </section>

</template>

<script>
import { userService } from '../services/user.service.js'
import { eventBus } from '@/services/eventBus.service.js'


export default {
    data() {
        return {
            user: null,
        }
    },
    async created() {
        this.user = userService.getEmptyCredentials()
    },
    methods: {
        async onLogin() {
        console.log('user from cmp', this.user);
        const userToLogin = {...this.user}
        console.log('userToLogin',userToLogin);
        this.$store.dispatch({type: 'loginSignup', credentials: userToLogin})
            .then((user) => {
                const msg = {
                        txt: `User logged in.`,
                        type: 'success',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
                        this.$router.push('/user')
            })
            .catch(err => {
                const msg = {
                        txt: `Couldn't log in`,
                        type: 'error',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
            })
        },
    },
    computed:{
        // getTitle(){
        //     return  (this.contactToEdit._id ? 'Edit' : 'Add') + ' Contact'
        // }
    }
}
</script>

<style>

</style>