<template>
    <b-container>
        <div>
            <h3>Registracija</h3>

            <div class="form-group">
                <label>Email addresa</label>
                <input v-model="email" type="email" class="form-control form-control-lg" />
            </div>

            <div class="form-group">
                <label>Lozinka</label>
                <input v-model="password" type="password" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Lozinka ponovo</label>
                <input v-model="passwordPonovo" type="password" class="form-control form-control-lg" />
            </div>
            <hr/>
            <div class="form-group">
                <label>Ime</label>
                <input v-model="ime" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Prezime</label>
                <input v-model="prezime" type="text" class="form-control form-control-lg" />
            </div>
            <div class="form-group">
                <label>Broj pasosa</label>
                <input v-model="brojPasosa" type="text" class="form-control form-control-lg" />
            </div>
            <div class="error-msg">
                {{ error }}
            </div>

            <button @click="attemptRegister" class="btn btn-dark btn-lg btn-block">Završi registraciju</button>

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
            passwordPonovo: "",
            ime: "",
            prezime: "",
            brojPasosa: "",
            error: ""
        }
    },
    methods: {
        attemptRegister() {
            this.error = "";
            if(this.password != this.passwordPonovo) {
                this.error = "Molimo vas proverite unos lozinki."
                return;
            }

            var email = this.email.trim();
            var password = this.password;
            var ime = this.ime.trim();
            var prezime = this.prezime.trim();
            var brojPasosa = this.brojPasosa.trim();
            // Validacija polja
            if(email.length == 0) {
                this.error = "Molimo vas unesite email.";
                return;
            }
            if(ime.length == 0) {
                this.error = "Molimo vas unesite ime.";
                return;
            }
            if(prezime.length == 0) {
                this.error = "Molimo vas unesite prezime.";
                return;
            }
            if(brojPasosa.length == 0) {
                this.error = "Molimo vas unesite broj pasosa.";
                return;
            }
            

            api.register({
                email: email,
                password: password,
                prezime: prezime,
                ime: ime,
                brojPasosa: brojPasosa
                
            }).then((res) => {
                this.napraviToast('success', 'Uspeh', 'Uspešno ste se registrovali! Možete se sada prijaviti klikom ovde.')
            }).catch((e) => {
                this.error = "Registracija neuspešna"
            })
        },
        napraviToast(vrsta, title, poruka) {
            this.$bvToast.toast(poruka, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                to: "/login",
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