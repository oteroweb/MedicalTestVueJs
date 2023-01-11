<template>
	<DefaultContainer> <ListPatient> </ListPatient></DefaultContainer>
</template>

<script>
import { mapState, mapActions } from "vuex";
import DefaultContainer from "../layout/DefaultContainer.vue";
import ListPatient from "@/components/views/ListPatient";

export default {
	name: "Home",
	mounted() {},
	computed: {
		...mapState({
			// rolAdmin: (state) => state.auth.me.id_rol,
			// id_rol: (state) => state.auth.study.id_rol,
			// study: (state) => state.auth.study,
			// me: (state) => state.auth.client,
		}),
	},
	components: { DefaultContainer, ListPatient },
	data() {
		return {};
	},
	methods: {
		...mapActions(["addToastMessage", "loadIndicators"]),
		getIndicators() {
			this.loadIndicators(this.me.id)
				.then((response) => {
					if (response.code === 200) {
						this.indicators = response.data;
						this.statusChart = 1;
					}
				})
				.catch((error) => {
					console.error("error", error);
				});
		},
		changeRecate() {
			if (this.showRecate === 3) {
				this.showRecate = 1;
			} else {
				this.showRecate = this.showRecate + 1;
			}
		},
	},
};
</script>
<style>
.card-footer {
	padding: 0.5rem 0.25rem !important;
}
body {
	background: red;
}
</style>
