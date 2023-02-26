<template>
    <section>
        <form @submit.prevent="onTransfer"
            class="transfer-form">
            <div class="input-container">
                <input
                type="number"
                placeholder="Enter amount"
                v-model="amount"
                />
            </div>
            <button class="btn-pinkish btn-transfer">Transfer funds</button>
        </form>
    </section>
</template>

<script>
import {userService} from '../services/user.service'
import { eventBus } from '@/services/eventBus.service.js'

export default {
    props: {
        contact: {
            type: Object,
            required: true,
        },
    },
    data() {
        return {
            amount: null,
        }
    },
    async created() {
        // this.user = userService.getEmptyCredentials()
    },
    methods: {
        onTransfer() {
            console.log('onTransfer', this.contact._id, this.contact.name, this.amount);
            this.$store.dispatch({type: 'transfer', contactId:this.contact._id, contactName:this.contact.name, amount:this.amount})
            .then(() => {
                const msg = {
                        txt: `Funds transferred successfully!.`,
                        type: 'success',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
            })
            .catch(err => {
                const msg = {
                        txt: `Couldn't transfer funds`,
                        type: 'error',
                        timeout: 2500,
                        }
                        eventBus.emit('user-msg', msg)
            })
        },
    },

}
</script>

<style lang="scss"></style>
