<template></template>

<script>
    import {
        mapActions
    } from "vuex";

    export default {
        name: 'Logout-Client',
        mounted() {
            this.logoutClient()
                .then(data => {
                    if(data.code === 200){
                        this.addToastMessage({
                            text: data.message,
                            type: "info"
                        });
                        //TODO RECARGAR PARA QUE NO QUEDE CARGADO EL SCRIPT
                        location.href ="/login";
                        // this.$router.push("/login");
                    }


                })
                .catch((data) => {
                    this.error  = data.message
                    this.errors = data.errors || {}
//                    this.$router.go(-1)
                })
        },

        methods: {
            ...mapActions(["logoutClient", "addToastMessage"]),
        }
    }
</script>
