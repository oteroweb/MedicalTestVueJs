import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './../vuex/store'
import { sync } from 'vuex-router-sync'
import Permission from "./../permission"

import Login from '@/components/auth/Login'
// import RegisterClient from '@/components/auth/client/Register'
// import LogoutClient from '@/components/auth/client/Logout'
// import ListPatient from "@/components/views/ListPatient";

import Home from '@/components/views/Home'

// const ifNotAuthenticated = (to, from, next) => {
//     if (!store.getters.isAuthenticated) {
//         next()
//         return
//     } else {
//         next('/login')
//     }

// }

// const ifAuthenticated = (to, from, next) => {
//     if (store.getters.isAuthenticated) {
//         next()
//         return
//     } else {
//         next('/login')
//     }

// }

Vue.use(VueRouter)

const routes = [
    // TODO Client
    {
        path: '/',
        name: 'Login',
        component: Login,
        //meta: { permission: Permission.LOGIN },
    },
    // {
    //     path: '/register',
    //     name: 'Register',
    //     component: RegisterClient,
    //     beforeEnter: ifNotAuthenticated,
    //     // meta: {permission: Permission.LOGIN},
    // },
    // {
    //     path: '/logout',
    //     name: 'Logout-Client',
    //     component: LogoutClient,
    //     // beforeEnter: ifAuthenticated,
    //     // meta: { permission: Permission.LOGIN },
    // },
    {
        path: '/home',
        // redirect: '/home',
        name: 'Home',
        component: Home,
        // meta: { requiresAuth: true, permission: Permission.CLIENT },
        // beforeEnter: ifAuthenticated,
        // children: [
        //     {
        //         path: 'home',
        //         name: 'Home',
        //         component: ListPatient,
        //         // meta: { permission: Permission.CLIENT },
        //     },
        // ]
    },
]

const router = new VueRouter({
    routes,
    mode: 'history',
    linkExactActiveClass: "activated",
})

// Sync Vuex and vue-router;
sync(store, router)

// router.beforeEach((to, from, next) => {
//     // store.dispatch('checkLoginSpa').then((data) => {
//     //
//     //     // if (store.state.auth.me.id_rol == 1) {
//     //     //     next('/admin')
//     //     // }
//     //     // if (store.state.auth.me.id_rol == 2) {
//     //     //     next('/estudio')
//     //     // }
//     //     // if (store.state.auth.me.id_rol == 3) {
//     //     //     next('/')
//     //     // }
//     // }).catch(() => {
//     // })
//     const accessToken = Cookies.get('access_token')
//     if (to.matched.some(record => record.meta.requiresAuth) && !store.state.auth.me && !accessToken) {
//         if (to.path != '/login') {
//             if (to.meta.permission === Permission.ADMIN) {
//                 next('/admin/login')
//             }
//             if (to.meta.permission === Permission.STUDY) {
//                 next('/estudio/login')
//             }
//             if (to.meta.permission === Permission.CLIENT) {
//                 next('/login')
//             }
//         }

//     } else if (store.state.auth.me && accessToken && !store.state.auth.permissions.includes(to.meta.permission)) {
//         next('/403')
//             //next()
//     } else {
//         next()
//     }

//     next()
// })

router.beforeEach((to, from, next) => {
    if (to.matched.some(route => route.meta.requiresAuth)) {
        if (store.state.isLoggedIn) {
            next()
        } else {
            next({ name: 'login' })
        }
    } else {
        next()
    }
})

export default router