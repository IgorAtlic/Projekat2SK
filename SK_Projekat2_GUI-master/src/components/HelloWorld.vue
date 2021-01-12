<template>
  <div class="hello">
    <button @click="test">Test</button>
  </div>
</template>

<script>
import utils from '../utils'


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods: {
    test() {
      var claims = utils.parseJwt(utils.TEMP_JWT);
      console.log(claims);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
