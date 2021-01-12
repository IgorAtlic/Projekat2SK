<template>
  <div class="home">
    <b-jumbotron header="Mikroservisne Karte" lead="Dobro došli u mikroservisni servis za kupovinu karata!">
    <p>Za kupovinu karata možete kliknuti ovde</p>
    <b-button variant="primary" to="/letovi">Pregled karata</b-button>
    <p>* Za finalizaciju kupovine morate se <b-link to="/login">ulogovati</b-link></p>
    </b-jumbotron>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>
