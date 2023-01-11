<template></template>

<script>
    import {
        mapActions
    } from "vuex";

    export default {
        name: 'Logout-Admin',
        mounted() {

            this.logout()
                .then(data => {
                    if (data.code === 200) {
                        this.addToastMessage({
                            text: data.message,
                            type: "info"
                        });

                        this.$router.push("/admin/login");
                    }


                })
                .catch((data) => {
                    this.error = data.message
                    this.errors = data.errors || {}
//                    this.$router.go(-1)
                })
        },

        methods: {
            ...mapActions(["logout", "addToastMessage"]),
        }
    }
</script>
