<template>
    <b-container>
        <div>
            <h3>Prijava</h3>

            <div class="form-group">
                <label>Email addresa</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Lozinka</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>
            <div class="error-msg">
                {{ error }}
            </div>

            <button @click="attemptLogin" class="btn btn-dark btn-lg btn-block">Prijavi</button>

        </div>
        
    </b-container>
</template>

<script>
import api from '../api';
import { mapGetters } from 'vuex'
import store from '../store'


export default {
    data: function() {
        return {
            email: "",
            password: "",
            error: ""
        }
    },
    methods: {
        attemptLogin() {
            this.error = "";
            api.login({
                email: this.email,
                password: this.password
            }).then((res) => {
                var jwtToken = res.headers.authorization;
                store.commit('SET_JWT', jwtToken)
                this.napraviToast('success', 'Uspeh', 'Uspešno ste se prijavili! Bicete preuspmereni za 2 sekunde');
                setTimeout(() => {
                    this.$router.push('/letovi');
                }, 2000);
            }).catch((e) => {
                // error najverovatnije znaci da je login neuspesan
                this.error = "Neuspešna prijava. Molimo vas proverite email i lozinku."
            })
        },
        napraviToast(vrsta, title, poruka) {
            this.$bvToast.toast(poruka, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                variant: vrsta
            });
        }
    },
    computed: {
        ...mapGetters(['currentJwt'])
    }
}
</script>

<style scoped>
.error-msg {
    color: red;
}
</style>