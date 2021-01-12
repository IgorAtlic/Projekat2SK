<template>
    <b-container>
        <b-row>
            <b-button-group>
                <b-button to="/">Home</b-button>
                <b-button to="/letovi">Kupovina karata</b-button>
                <b-dropdown right text="Admin" v-if="isAdmin">
                    <b-dropdown-item to="/admin/letovi">Letovi</b-dropdown-item>
                    <b-dropdown-item to="/admin/avioni">Avioni</b-dropdown-item>
                </b-dropdown>
                <b-button v-if="currentJwt" to="/profile">Moj profil</b-button>
                <b-button v-if="currentJwt" @click="logout">Odjavi se</b-button>
                <b-button v-else to="/login">Prijava</b-button>
            </b-button-group>
        </b-row>
    </b-container>
</template>

<script>
import { mapGetters } from 'vuex'
import store from '../store'

export default {
    methods: {
        logout() {
            store.commit('DESTROY_JWT')
        }
    },
    computed: {
        ...mapGetters(['currentJwt', 'isAdmin'])
    }
}
</script>