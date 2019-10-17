import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import VueMask from 'v-mask'
import scss from './scss/main.scss'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask);
Vue.use(VeeValidate);

new Vue({
  scss,
  render: h => h(App),
}).$mount('#app')

Vue.directive('focus', {
  inserted: function (el) {
    el.focus()
  }
})