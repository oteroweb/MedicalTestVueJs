import Vue from 'vue'
import store from './vuex/store' // vuex store instance
import App from './App'
import router from './router/index'
import VeeValidate from 'vee-validate'

import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VeeValidate, { fieldsBagName: 'formFields' })
const options = {
    confirmButtonColor: '#41b882',
    cancelButtonColor: '#ff7674'
}

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
new Vue({
    el: '#app',
    store: store,
    router,
    template: '<App/>',
    components: {
        App,
    },
    render: h => h(App),

})

// store.dispatch('checkLogin').then(() => {
//     // router.replace('/dashboard')
// }).catch(() => {})
