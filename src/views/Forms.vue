<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <div v-grid="'1fr 1fr'" class="validationForms">
      <FormVulidate/>
      <FormVeeValidate/>
    </div>
    
  </div>
</template>

<script>
// @ is an alias to /src
import FormVulidate from './../components/FormVulidate'
import FormVeeValidate from './../components/FormVeeValidate'

export default {
  name: 'Forms',
  components: {
    FormVulidate,
    FormVeeValidate
  }
}
</script>

<style>
.validationForms{
  max-width: 850px;
  margin: auto
}
</style>
