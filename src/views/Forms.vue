<template>
  <main class="home">
    <div class="validationForms">
      <FormVuelidate/>
      <FormVeeValidate/>
    </div>
  </main>
</template>

<script>
// @ is an alias to /src
import FormVuelidate from './../components/FormVuelidate'
import FormVeeValidate from './../components/FormVeeValidate'

export default {
  name: 'Forms',
  components: {
    FormVuelidate,
    FormVeeValidate
  }
}
</script>

<style>
.validationForms{
  max-width: 850px;
  margin: auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
