<template>
    <b-container>
        Spisak aviona
        <b-table-simple>
                <b-tr>
                    <b-th>
                        Id:
                    </b-th>
                    <b-th>
                        Naziv:
                    </b-th>
                    <b-th>
                        Kapacitet
                    </b-th>
                    <b-th>
                        Akcija
                    </b-th>
                </b-tr>
                <b-tr v-for="red in avioni" :key="red.id">
                    <b-td>   
                        {{ red.id }}
                    </b-td>
                    <b-td>   
                        {{ red.naziv }}
                    </b-td>
                    <b-td>   
                        {{ red.kapacitet }}
                    </b-td>
                    <b-td>   
                        <b-button @click="obrisiAvion(red.id)" variant="danger">Ukloni avion</b-button>
                    </b-td>
                </b-tr>
            </b-table-simple>
            <div>
                <button @click="stranaNazad">
                    nazad
                </button>

                <button @click="stranaNapred">
                    napred
                </button>
            </div>
        <div class="row">
            <b-btn class="btn" variant="primary" @click="otvorenoDodavanjeNovogAviona=!otvorenoDodavanjeNovogAviona">Novi avion...</b-btn>
        </div>
        <div v-if="otvorenoDodavanjeNovogAviona" class="container">
            <b-table-simple>
                <b-tr>
                    <b-td>
                        <b-form-input v-model="noviAvion.naziv.value" placeholder="Naziv aviona..." :class="{'is-invalid': noviAvion.naziv.isInvalid}"></b-form-input>
                    </b-td>
                    <b-td>
                        <b-form-input v-model="noviAvion.kapacitet.value" placeholder="Kapacitet..." :class="{'is-invalid': noviAvion.kapacitet.isInvalid}"></b-form-input>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-btn class="btn" variant="danger" @click="otvorenoDodavanjeNovogAviona=!otvorenoDodavanjeNovogAviona">Cancel</b-btn>
                    </b-td>
                    <b-td>
                        <b-btn class="btn" variant="success" @click="dodajAvion()">Dodaj avion</b-btn>
                    </b-td>
                </b-tr>
            </b-table-simple>
        </div>
    </b-container>
</template>

<script>
import api from '../../api' 
import store from '../../store'

export default {
    data: function() {
        return {
            avioni: [],
            paginacija: {
                from: 0,
                count: 10
            },
            otvorenoDodavanjeNovogAviona: false,
            noviAvion: {
                naziv: {
                    value: "",
                    isInvalid: false,
                },
                kapacitet: {
                    value: "",
                    isInvalid: false
                }
            }
        }
    },
    mounted() {
        // Zastita od pristupa za ne-admina
        if(!store.getters.isAdmin) {
            this.$router.push('/');
        }
        this.ucitajAvione();
    },
    methods: {
        ucitajAvione() {
            api.sviAvioni({from:this.paginacija.from, count:this.paginacija.count}).then((res) => {
                this.avioni = res.data.data;
            })
        },
        stranaNapred() {
            if(this.avioni.length == 0){
                return;
            }
            this.paginacija.from +=this.paginacija.count;
        },
        stranaNazad() {
            this.paginacija.from -=this.paginacija.count;
            if(this.paginacija.from<0){
                this.paginacija.from=0;
            }
        },
        obrisiAvion(avionId) {
            api.obrisiAvion({
                avionId: avionId
            }).then((res) => {
                this.napraviToast('success', 'Uspeh', 'Avion uspešno uklonjen')
                this.ucitajAvione();
            }).catch((err) => {
                var res = err.response;
                if(res.status == 404) {
                    this.napraviToast('danger', 'Greška', 'Nije moguće obrisati nepostojeći avion')
                }
                if(res.status == 409) {
                    this.napraviToast('danger', 'Greška', 'Nije moguće obrisati avion koji je dodeljen nekom letu')
                }
            })
            
        },
        napraviToast(vrsta, title, poruka) {
            this.$bvToast.toast(poruka, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                variant: vrsta
            });
        },
        dodajAvion() {
            var naziv = this.noviAvion.naziv.value.trim();
            var kapacitet = this.noviAvion.kapacitet.value.trim();

            if(naziv.length == 0) {
                this.noviAvion.naziv.isInvalid = true;
            }
            // Ukoliko kapacitet nije broj, zaustavi ga
            if(isNaN(parseInt(kapacitet))) {
                this.noviAvion.kapacitet.isInvalid = true;
            }

            if(this.noviAvion.naziv.isInvalid || 
                this.noviAvion.kapacitet.isInvalid) {
                    return;
                }

            api.dodajAvion({
                naziv,
                kapacitet
            }).then((res) => {
                this.noviAvion.kapacitet="";
                this.noviAvion.naziv="";
                this.otvorenoDodavanjeNovogAviona=false;
                this.napraviToast('success', 'Uspeh', 'Avion uspešno dodat')
                this.ucitajAvione();
            })
        }
    }
}
</script>