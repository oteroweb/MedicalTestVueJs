<template></template>

<script>
    import {
        mapActions
    } from "vuex";

    export default {
        name: 'Logout-Study',
        mounted() {
            this.logoutStudy()
                .then(data => {
                    if(data.code === 200){
                        this.addToastMessage({
                            text: data.message,
                            type: "info"
                        });

                        this.$router.push("/estudio/login");
                    }


                })
                .catch((data) => {
                    this.error  = data.message
                    this.errors = data.errors || {}
//                    this.$router.go(-1)
                })
        },

        methods: {
            ...mapActions(["logoutStudy", "addToastMessage"]),
        }
    }
</script>
