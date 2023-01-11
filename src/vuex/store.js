import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import axios from 'axios'

import patients from './modules/patients'

Vue.use(Vuex)

const state = {
    isLoggedIn: false,
    user: null
}

const mutations = {
    login(state, user) {
        state.isLoggedIn = true
        state.user = user
    },
    logout(state) {
        state.isLoggedIn = false
        state.user = null
    }
}

const actions = {
    async login({ commit }, { email, password }) {
        try {
            // en lugar de hacer una llamada a una api, se consulta un json local
            // const response = await axios.get('users.json')
            // const users = response.data

            // buscar el usuario
            const user = {
                "id": 1,
                "name": "John Doe",
                "email": "johndoe@example.com",
                "password": "password1"
            };

            // const user = users.find(u => u.email === email && u.password === password)
            // if (!user) {
            // throw new Error('Correo o contraseña inválida')
            // }
            // almacenar el usuario en el estado de la aplicación
            commit('login', user)
        } catch (error) {
            throw error
        }
    },
    logout({ commit }) {
        commit('logout')
    }
}

const store = new Vuex.Store({
    state,
    mutations,
    actions,
    modules: {
        patients,
    }
})

export default store
