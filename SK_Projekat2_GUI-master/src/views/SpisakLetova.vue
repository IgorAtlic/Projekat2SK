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

        <b-table-lite :items="letovi"></b-table-lite>

        <button @click="stranaNazad">
            nazad
        </button>

        <button @click="stranaNapred">
            napred
        </button>
    </b-container>
</template>

<script>
import api from '../api' 

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
            }
        }
    },
    mounted() {
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
        }
    }
}
</script>