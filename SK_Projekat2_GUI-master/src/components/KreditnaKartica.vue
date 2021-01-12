<template>
    <b-card
        :title="brojKartice"
        img-top
        style="max-width: 20rem;"
        class="mb-2"
        >
        <b-card-text>
            {{ ime }} {{ prezime }}
        </b-card-text>
        <b-card-text>
            {{ ccv }}
        </b-card-text>
        

        <b-button @click="ukloni" variant="primary"><b-icon icon="trash" aria-hidden="true"></b-icon> Ukloni</b-button>
  </b-card>
</template>

<script>
export default {
    props: [
        "ime","prezime","brojKartice","ccv"
    ],
    methods: {
        ukloni() {
            
        }
    }
}
</script>