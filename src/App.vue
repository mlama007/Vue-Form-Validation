<template>
  <div id="app">
    <Forms></Forms>
  </div>
</template>

<script>
import Forms from './views/Forms'

export default {
  name: 'App',
  components: {
    Forms
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
