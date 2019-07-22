import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import VeeValidate from 'vee-validate'
import VueMask from 'v-mask'
import router from './router'
import scss from './scss/main.scss'

Vue.config.productionTip = false
Vue.use(Vuelidate)
Vue.use(VueMask);
Vue.use(VeeValidate);

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')

Vue.directive('grid', {
  bind: function (el, binding) {
    let columns = binding.value
    el.style.display = 'grid'
    el.style.gridTemplateColumns = columns
  }
})