import axios from 'axios';
import store from '../store'

axios.interceptors.request.use(config => {
    handleRequestInterceptor(config);
    return config;
});

function handleRequestInterceptor(config) {
    try {
        var currentJwt = store.getters.currentJwt;
        // test - var currentJwt = sessionStorage.getItem('jwt');
        console.log("Current JWT:", currentJwt)
        if(currentJwt) {
            config.headers['Authorization'] = currentJwt;
        }
    }
    catch(e) {
        console.error("INTERCEPTOR ERROR: "+e);
    }
}



var SERVIS1_URL = "http://localhost:8762/servis 1/";
var SERVIS2_URL = "http://localhost:8762/servis 2/";
var SERVIS3_URL = "http://localhost:8762/servis 3/";

export default {

    login: (params) => axios({
      url: `${SERVIS1_URL}/login`,
      method: 'POST',  
      data: {
          email: params.email,
          password: params.password
      }
    }),

    register: (params) => axios({
        url: `${SERVIS1_URL}/register`,
        method: 'POST',  
        data: {
            email: params.email,
            password: params.password,
            ime: params.ime,
            prezime: params.prezime,
            brojPasosa: params.brojPasosa
        }
      }),

    changeUser: (params) => axios({
        url: `${SERVIS1_URL}/changeUser`,
        method: 'POST',  
        data: {
            email: params.email,
            password: params.password,
            ime: params.ime,
            prezime: params.prezime,
            brojPasosa: params.brojPasosa
        }
    }),

    whoAmI: (params) => axios({
        url: `${SERVIS1_URL}/whoAmI`,
        method: 'GET'
    }),

    dodajKarticu: (params) => axios({
        url: `${SERVIS1_URL}/addCard`,
        method: 'POST',
        data: {
            ime: params.ime,
            prezime: params.prezime,
            brojKartice: params.brojKartice,
            sigurnosniBroj: params.ccv
        }
    }),

    ukloniKarticu: (params) => ({
        // Nije jos implementirano
    }),
    

    sviLetovi: (params) => {
        return axios({
            url: `${SERVIS2_URL}/letovi`,
            params
        })
    },

    sviAvioni: (params) => {
        return axios({
            url: `${SERVIS2_URL}/avioni`,
            params
        })
    },

    obrisiLet: (params) => {
        return axios({
            url: `${SERVIS2_URL}/ukloni-let/${params.letId}`,
            method: 'POST'
        })
    },

    obrisiAvion: (params) => {
        return axios({
            url: `${SERVIS2_URL}/ukloni-avion/${params.avionId}`,
            method: 'POST'
        })
    },

    dodajAvion: (params) => {
        // Da bi se prosledilo springu na nacin na koji moze da dekoduje
        var urlEnkodovanData = `naziv=${params.naziv}&kapacitet=${params.kapacitet}`;
        
        return axios({
            url: `${SERVIS2_URL}/napravi-avion`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: urlEnkodovanData
        })
    },

    dodajLet: (params) => {
        // Da bi se prosledilo springu na nacin na koji moze da dekoduje
        var urlEnkodovanData = `pocetnaDestinacija=${params.pocetnaDestinacija}&krajnjaDestinacija=${params.krajnjaDestinacija}&cena=${params.cena}&duzina=${params.duzina}&avion_id=${params.avionId}`;


        return axios({
            url: `${SERVIS2_URL}/napravi-let`,
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: urlEnkodovanData
        })
    }
    

}