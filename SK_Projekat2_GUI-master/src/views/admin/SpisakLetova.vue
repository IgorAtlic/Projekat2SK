<template>
    <b-container>
        Spisak letova
        <div>
            <b-table-simple>
                <b-tr>
                    <b-td>
                        Pocetna destinacija:
                    </b-td>
                    <b-td>
                        Krajnja destinacija:
                    </b-td>
                    <b-td>
                        Duzina
                    </b-td>
                    <b-td>
                        Cena
                    </b-td>
                    <b-td>
                        Avion
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>   
                        <b-form-input v-model="filteri.pocetnaDestinacija"></b-form-input>
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.krajnjaDestinacija"></b-form-input>
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.duzinaOd" placeholder="Duzina od"></b-form-input> - 
                        <b-form-input v-model="filteri.duzinaDo" placeholder="Duzina do"></b-form-input> 
                    </b-td>
                    <b-td>   
                        <b-form-input v-model="filteri.cenaOd" placeholder="Cena od"></b-form-input> - 
                        <b-form-input v-model="filteri.cenaDo" placeholder="Cena do"></b-form-input> 
                    </b-td>
                    <b-td>   
                        <b-form-select v-model="filteri.avionId" :options="avioni"></b-form-select>
                    </b-td>
                </b-tr>
                    <b-td>
                        <b-btn class="btn" variant="secondary" @click="filtriraj">Filtriraj</b-btn>
                    </b-td>
                <b-tr>

                </b-tr>
            </b-table-simple>
        </div>

        <b-table-simple>
            <b-tr>
                <b-th>
                    Id
                </b-th>

                <b-th>
                    Avion
                </b-th>
            
                <b-th>
                    Pocetna destinacija
                </b-th>
            
                <b-th>
                    Krajnja destinacija
                </b-th>
            
                <b-th>
                    Duzina leta (km)
                </b-th>
            
                <b-th>
                    Cena (EUR)
                </b-th>
            
                <b-th>
                    STATUS
                </b-th>
                <b-th>
                    Radnja
                </b-th>
            </b-tr>

            <b-tr v-for="red in letovi" :key="red.id">
                <b-td>
                    {{ red.id }}
                </b-td>
                <b-td>
                    {{ red.avion }}
                </b-td>
                <b-td>
                    {{ red.pocetnaDestinacija }}
                </b-td>
                <b-td>
                    {{ red.krajnjaDestinacija }}
                </b-td>
                <b-td>
                    {{ red.duzinaLeta }}
                </b-td>
                <b-td>
                    {{ red.cena }}
                </b-td>
                <b-td>
                    {{ red.status }}
                </b-td>
                <b-td>
                    <b-button v-if="red.status != 'CANCELLED'" @click="obrisiLet(red.id)" variant="danger">Ukloni let</b-button>
                    <b-button v-else disabled @click="obrisiLet(red.id)" variant="danger">Ukloni let</b-button>
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
            <b-btn class="btn" variant="primary" @click="otvorenoDodavanjeNovogLeta=!otvorenoDodavanjeNovogLeta">Novi let...</b-btn>
        </div>
        <div v-if="otvorenoDodavanjeNovogLeta" class="container">
            <b-table-simple>
                <b-tr>
                    <b-td>
                        <b-form-input v-model="noviLet.pocetnaDestinacija.value" placeholder="Pocetna destinacija..." :class="{'is-invalid': noviLet.pocetnaDestinacija.isInvalid}"></b-form-input>
                    </b-td>
                    <b-td>
                        <b-form-input v-model="noviLet.krajnjaDestinacija.value" placeholder="Krajnja destinacija..." :class="{'is-invalid': noviLet.krajnjaDestinacija.isInvalid}"></b-form-input>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-form-input v-model="noviLet.duzina.value" placeholder="Duzina ..." :class="{'is-invalid': noviLet.duzina.isInvalid}"></b-form-input>
                    </b-td>
                    <b-td>
                        <b-form-input v-model="noviLet.cena.value" placeholder="Cena ..." :class="{'is-invalid': noviLet.cena.isInvalid}"></b-form-input>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-form-select v-model="noviLet.avionId.value" :options="avioni" :class="{'is-invalid': noviLet.avionId.isInvalid}"></b-form-select>
                    </b-td>
                </b-tr>
                <b-tr>
                    <b-td>
                        <b-btn class="btn" variant="danger" @click="otvorenoDodavanjeNovogLeta=!otvorenoDodavanjeNovogLeta">Cancel</b-btn>
                    </b-td>
                    <b-td>
                        <b-btn class="btn" variant="success" @click="dodajLet()">Dodaj let</b-btn>
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
    data: function(){
        return {
            letovi: [],
            avioni: [],
            totalRows: 0,
            filteri: {
                pocetnaDestinacija: "",
                krajnjaDestinacija: "",
                duzinaOd: "",
                duzinaDo: "",
                cenaOd: "",
                cenaDo: "",
                avionId: null
            },
            paginacija: {
                from: 0,
                count: 10 // count se realno nece menjati
            },
            otvorenoDodavanjeNovogLeta: false,
            noviLet: {
                pocetnaDestinacija: {
                    value: "",
                    isInvalid: false
                },
                krajnjaDestinacija: {
                    value: "",
                    isInvalid: false
                },
                duzina: {
                    value: "",
                    isInvalid: false
                },
                cena: {
                    value: "",
                    isInvalid: false
                },
                avionId: {
                    value: null,
                    isInvalid: false
                }
            }
        }
    },
    mounted() {
        if(!store.getters.isAdmin) {
            this.$router.push('/');
        }
        var p = this.pripremiParametre();
        this.ucitajLetove(p);
        this.ucitajAvione();
    },
    methods: {
        ucitajLetove(parametri) {
            api.sviLetovi(parametri).then((res) => {
                var podaci = [];
                var serverData = res.data.data;
                for(var i=0; i<serverData.length; i++){
                    var serverLet = serverData[i];
                    
                    podaci.push({
                        id: serverLet.id,
                        avion: serverLet.avion.naziv,
                        pocetnaDestinacija: serverLet.pocetnaDestinacija,
                        krajnjaDestinacija: serverLet.krajnjaDestinacija,
                        duzinaLeta: serverLet.duzinaLeta,
                        cena: serverLet.cena,
                        status: serverLet.status
                    })
                }
                this.totalRows = res.data.total_count;
                this.letovi = podaci;
            })
        },
        ucitajAvione() {
            // Uzimamo sve letove, paginacija nije moguca u dropdownu
            api.sviAvioni({from:0, count:100}).then((res) => {
                // Moramo promeniti strukturu zbog dropdowna
                var serverPodaci = res.data.data;
                var podaci = [{
                    value: null,
                    text: 'Svi avioni'
                }];
                for(var i=0; i<serverPodaci.length; i++){
                    podaci.push({
                        value: serverPodaci[i].id,
                        text: serverPodaci[i].naziv
                    });
                }
                this.avioni = podaci;
            })
        },
        filtriraj() {
            var p = this.pripremiParametre();
            this.ucitajLetove(p);
        },
        pripremiParametre() {
            var parametri = {
                from: this.paginacija.from,
                count: this.paginacija.count
            };

            if(this.filteri.pocetnaDestinacija.trim().length>0){
                parametri.pocetnaDestinacija = this.filteri.pocetnaDestinacija.trim();
            }
            if(this.filteri.cenaOd.trim().length>0){
                parametri.cenaOd = this.filteri.cenaOd.trim();
            }
            if(this.filteri.cenaDo.trim().length>0){
                parametri.cenaDo = this.filteri.cenaDo.trim();
            }
            if(this.filteri.duzinaOd.trim().length>0){
                parametri.duzinaOd = this.filteri.duzinaOd.trim();
            }
            if(this.filteri.duzinaDo.trim().length>0){
                parametri.duzinaDo = this.filteri.duzinaDo.trim();
            }
            if(this.filteri.avionId!=null){
                parametri.avionId = this.filteri.avionId;
            }
            
            return parametri;
        },
        obrisiLet(letId) {
            api.obrisiLet({
                letId
            }).then(() => {
                // Najverovatnije ce uvek sve biti okej
                this.filtriraj();
            })
        },
        dodajLet() {
            this.noviLet.pocetnaDestinacija.isInvalid = false;
            this.noviLet.krajnjaDestinacija.isInvalid = false;
            this.noviLet.cena.isInvalid = false;
            this.noviLet.duzina.isInvalid = false;
            this.noviLet.avionId.isInvalid = false;

            var pocetnaDestinacija = this.noviLet.pocetnaDestinacija.value.trim();
            var krajnjaDestinacija = this.noviLet.krajnjaDestinacija.value.trim();
            var cena = this.noviLet.cena.value.trim();
            var duzina = this.noviLet.duzina.value.trim();
            var avionId = this.noviLet.avionId.value;

            if(pocetnaDestinacija.length == 0)
                this.noviLet.pocetnaDestinacija.isInvalid = true;

            if(krajnjaDestinacija.length == 0)
                this.noviLet.krajnjaDestinacija.isInvalid = true;

            if(cena.length == 0)
                this.noviLet.cena.isInvalid = true;

            if(duzina.length == 0)
                this.noviLet.duzina.isInvalid = true;

            if(avionId == null)
                this.noviLet.avionId.isInvalid = true;

            
            // Ako nesto nije u redu, ne salji zahtev
            if(this.noviLet.pocetnaDestinacija.isInvalid ||
                this.noviLet.krajnjaDestinacija.isInvalid ||
                this.noviLet.cena.isInvalid ||
                this.noviLet.duzina.isInvalid ||
                this.noviLet.avionId.isInvalid) {
                    return;
                }

            api.dodajLet({
                pocetnaDestinacija,
                krajnjaDestinacija,
                cena,
                duzina,
                avionId
            }).then((res) => {
                this.filtriraj();
                // Cistimo formu za dodavanje
                this.noviLet.pocetnaDestinacija="";
                this.noviLet.krajnjaDestinacija="";
                this.noviLet.cena="";
                this.noviLet.duzina="";
                this.noviLet.avionId=null;
                this.otvorenoDodavanjeNovogLeta = false;
                this.napraviToast('success', 'Uspeh', 'Uspešno dodat let')
            }).catch((err) => {
                var res = err.response;
                if(res.status == 422) {
                    this.napraviToast('danger', 'Greska', 'Podaci za novi let pravilno popunjeni')
                }
            })
        },
        stranaNapred() {
            if(this.letovi.length == 0){
                return;
            }
            this.paginacija.from +=this.paginacija.count;
            this.filtriraj();
        },
        stranaNazad() {
            this.paginacija.from -=this.paginacija.count;
            if(this.paginacija.from<0){
                this.paginacija.from=0;
            }
            this.filtriraj();
        },
        napraviToast(vrsta, title, poruka) {
            this.$bvToast.toast(poruka, {
                title: title,
                autoHideDelay: 5000,
                appendToast: true,
                variant: vrsta
            });
        },
    }
}
</script>