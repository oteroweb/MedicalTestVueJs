import axios from 'axios'
import * as Config from '../../config'
import Cookies from 'js-cookie'
import Permission from "../../permission";
//import store from '../store'


const state = {
    token: Cookies.get('access_token') || '',
    status: '',
    me: '',
    study: '',
    client: {},
    permissions: []
}
const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,
}

const actions = {

    checkLoginSpa({ commit, dispatch }) {

        const accessToken = Cookies.get('access_token')
        return new Promise((resolve, reject) => {
            if (!accessToken) {
                commit('CHECK_LOGIN_FAIL')
                return reject(new Error('No access token stored'))
            }
            // commit('SET_ROL')
            return resolve()
        })
    },
    login({ commit, dispatch }, form) {
        commit('LOGIN')
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/admin/login', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            const accessToken = response.data.access_token
                                // Cookies.set('access_token', accessToken)
                            Cookies.set('access_token', accessToken, {
                                expires: 0.041666667
                            });
                            commit('LOGIN_OK', response.data)
                            resolve(response.data)
                        } else {
                            commit('LOGIN_FAIL')
                            reject(response.data)
                        }


                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },
    verifyCode({ commit, dispatch }, form) {
        commit('LOGIN')
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/user/verify/code', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            const accessToken = response.data.access_token
                            Cookies.set('access_token', accessToken)
                            commit('LOGIN_OK', response.data)
                            resolve(response.data)
                        } else {
                            commit('LOGIN_FAIL')
                            reject(response.data)
                        }

                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },
    logout({ commit, dispatch }) {
        // remove the axios default header
        // delete axios.defaults.headers.common['Authorization']
        // resolve()

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/admin/logout')
                .then(
                    response => {
                        resolve(response.data)
                        commit('LOGOUT_OK')
                        Cookies.remove('access_token')
                            // Object.keys(Cookies.get()).forEach(function (cookieName) {
                            //     var neededAttributes = {
                            //         // Here you pass the same attributes that were used when the cookie was created
                            //         // and are required when removing the cookie
                            //     };
                            //     Cookies.remove(cookieName, neededAttributes);
                            // });
                    })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    register({ commit, dispatch }, form) {
        commit('REGISTER')

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/signup', form)
                .then(
                    response => {
                        //const accessToken = response.data.access_token
                        //Cookies.set('access_token', accessToken)

                        //commit('REGISTER_OK', response.data.user)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('REGISTER_FAIL')
                    reject(error.response.data)
                })
        })
    },
    verify_email({ commit, dispatch }, hash) {
        commit('REGISTER')

        return new Promise((resolve, reject) => {
            axios.get(Config.apiPath + 'auth/verify/email/' + hash)
                .then(
                    response => {
                        // commit('REGISTER_OK', response.data.user)
                        commit('REGISTER_FAIL')
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('REGISTER_FAIL')
                    reject(error.response.data)
                })
        })
    },
    changeImg({ commit, dispatch }, form) {
        commit('UPDATE_PROFILE')

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'user/change_image', form, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                })
                .then(
                    response => {
                        commit('UPDATE_PROFILE_OK', response.data.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('UPDATE_PROFILE_FAIL')
                    reject(error.response.data)
                })
        })
    },
    updateProfile({ commit, dispatch }, form) {
        commit('UPDATE_PROFILE')

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'user/update_profile', form)
                .then(
                    response => {
                        commit('UPDATE_PROFILE_OK', response.data.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('UPDATE_PROFILE_FAIL')
                    reject(error.response.data)
                })
        })
    },
    updatePassword({ commit, dispatch }, form) {
        commit('UPDATE_PASSWORD')

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'user/update_password', form)
                .then(
                    response => {
                        Object.keys(Cookies.get()).forEach(function(cookieName) {
                            var neededAttributes = {};
                            Cookies.remove(cookieName, neededAttributes);
                        });
                        commit('UPDATE_PASSWORD_OK', response.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('UPDATE_PASSWORD_FAIL')
                    reject(error.response.data)
                })
        })
    },
    loadUser({ commit, dispatch }) {
        commit('LOAD_USER')
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/user')
                .then(
                    response => {
                        commit('LOAD_USER_OK', response.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('LOAD_USER_FAIL')
                    reject(error.response.data)
                })
        })
    },
    imgBase64({ commit, dispatch }) {
        commit('LOAD_USER')
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/user/img/base64')
                .then(
                    response => {
                        commit('LOAD_USER_OK', response.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    commit('LOAD_USER_FAIL')
                    reject(error.response.data)
                })
        })
    },

    //TODO OF MONOTRIBUTA
    loginClient({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/client/login', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            const accessToken = response.data.access_token
                                // Cookies.set('access_token', accessToken)
                            Cookies.set('access_token', accessToken, {
                                expires: 0.041666667
                            });
                            commit('MONO_LOGIN_OK', response.data)
                            resolve(response.data)
                        } else {
                            commit('LOGIN_FAIL')
                            reject(response.data)
                        }


                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },
    logoutClient({ commit, dispatch }) {
        // remove the axios default header
        // delete axios.defaults.headers.common['Authorization']
        // resolve()

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/client/logout')
                .then(
                    response => {
                        resolve(response.data)
                        commit('LOGOUT_OK')
                        Cookies.remove('access_token')
                            // Object.keys(Cookies.get()).forEach(function (cookieName) {
                            //     var neededAttributes = {
                            //         // Here you pass the same attributes that were used when the cookie was created
                            //         // and are required when removing the cookie
                            //     };
                            //     Cookies.remove(cookieName, neededAttributes);
                            // });
                    })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    registerClient({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/client/register', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            resolve(response.data)
                        } else {
                            reject(response.data)
                        }


                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },

    //TODO OF STUDY
    loginStudy({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/study/login', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            const accessToken = response.data.access_token
                                //Cookies.set('access_token', accessToken)
                            Cookies.set('access_token', accessToken, {
                                expires: 0.041666667
                            });

                            commit('STUDY_LOGIN_OK', response.data)
                            resolve(response.data)
                        } else {
                            commit('LOGIN_FAIL')
                            reject(response.data)
                        }


                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },
    logoutStudy({ commit, dispatch }) {
        // remove the axios default header
        // delete axios.defaults.headers.common['Authorization']
        // resolve()

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/study/logout')
                .then(
                    response => {
                        resolve(response.data)
                        commit('LOGOUT_OK')
                        Cookies.remove('access_token')
                            // Object.keys(Cookies.get()).forEach(function (cookieName) {
                            //     var neededAttributes = {
                            //         // Here you pass the same attributes that were used when the cookie was created
                            //         // and are required when removing the cookie
                            //     };
                            //     Cookies.remove(cookieName, neededAttributes);
                            // });
                    })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },
    registerStudy({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/study/register', form)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            resolve(response.data)
                        } else {
                            reject(response.data)
                        }


                    })
                .catch(error => {
                    commit('LOGIN_FAIL')
                    reject(error.response.data)
                })
        })
    },

    //TODO VERIFCAR ACCOUNT
    verifyAccount({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'auth/verify/account/' + form.token)
                .then(
                    response => {
                        if (response.data.code === 200) {
                            resolve(response.data)
                        } else {
                            reject(response.data)
                        }

                    })
                .catch(error => {
                    reject(error.response.data)
                })
        })
    },

    //TODO SETEAR EL ENTORNO
    setAdmin({ commit, dispatch }) {
        commit('SET_PERMISSION_ADMIN');
    },
    setStudy({ commit, dispatch }, data) {
        commit('SET_PERMISSION_STUDY', data);
    },
    setMono({ commit, dispatch }, data) {
        commit('SET_PERMISSION_MONO', data);
    },
}

const mutations = {

    // CHECK_LOGIN_OK(state, data) {
    //     state.me = data.user
    //     state.permissions = data.permissions
    //     state.status = 'success'
    //         // state.token = data.access_token
    // },
    LOGIN(state) {
        state.status = 'loading'
    },
    LOGIN_OK(state, data) {
        state.me = data.user
        state.permissions = data.permissions
        state.token = data.access_token
        state.status = 'success'
    },
    STUDY_LOGIN_OK(state, data) {
        state.study = data.user
        state.permissions = data.permissions
        state.token = data.access_token
        state.status = 'success'
    },
    MONO_LOGIN_OK(state, data) {
        state.client = data.user
        state.permissions = data.permissions
        state.token = data.access_token
        state.status = 'success'
    },
    LOGOUT_OK(state) {
        state.me = ''
        state.study = ''
        state.client = ''
        state.permissions = []
        state.token = ''
        state.status = 'error'
    },
    LOGIN_FAIL(state) {
        state.me = ''
        state.study = ''
        state.permissions = []
        state.token = null
        state.status = 'error'
    },
    CHECK_LOGIN_FAIL(state) {
        state.me = ''
        state.study = ''
        state.permissions = []
        state.token = null
        state.status = 'error'
    },
    REGISTER_OK(state, user) {
        state.me = user
    },
    UPDATE_PROFILE_OK(state, user) {
        state.me = user
    },

    SET_PERMISSION_ADMIN(state) {
        // state.permissions = [1, 2]
        // state.study = []
    },
    SET_PERMISSION_STUDY(state, data) {
        state.study = data
    },
    SET_PERMISSION_MONO(state, data) {
        state.client = data
    }

}

export default {
    state,
    getters,
    actions,
    mutations
}