<template>
	<div id="app">
		<NavBar />
		<Sidebar :rol="rol" />
		<main class="">
			<ListPatient> </ListPatient>
		</main>
		<Default-Footer />
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

import NavBar from "./NavBar.vue";
import Sidebar from "./Sidebar.vue";
import DefaultFooter from "./DefaultFooter";
import ListPatient from "@/components/views/ListPatient";

export default {
	name: "DefaultContainer",
	components: {
		NavBar,
		Sidebar,
		DefaultFooter,
		ListPatient,
	},
	data() {
		return {
			rol: 3,
		};
	},
	computed: {
		// name() {
		// 	return this.$route.name;
		// },
		// list() {
		// 	return this.$route.matched.filter((route) => route.name || route.meta.label);
		// },
		...mapState({
			open_swipe: (state) => state.general.settings.open_swipe,
			// rol: state => state.auth.me.rol.id,
			isLoggedIn: (state) => state.isLoggedIn,
			// user: (state) => state.user,
		}),
	},
	methods: {
		...mapActions(["swipe_refresh"]),
		swipe_right() {
			if (!this.open_swipe) {
				let open = true;
				this.swipe_refresh(open);
			}
		},
		swipe_left() {
			if (this.open_swipe) {
				let open = false;
				this.swipe_refresh(open);
			}
		},
	},
};
</script>

<style>
* {
	font-family: "Avenir LT Std 55 Roman" !important;
}

.fa {
	font: normal normal normal 14px/1 FontAwesome !important;
}

body {
	color: #797979 !important;
}

li {
	list-style: none;
}

#app {
	position: absolute;
	top: 0;
	width: 100%;
	min-height: 100%;
	padding-bottom: 20px;
}

main {
	margin-top: 4rem;
	margin-bottom: 4rem;
}

main section {
	/*background-color: #f1f2f7;*/
	/*margin-left: 230px;*/
	padding: 1rem !important;
}

aside {
	width: 210px;
	height: 100%;
	position: fixed;
	width: 100%;
	height: max-content;
	position: absolute;
	top: 0;
}

aside {
	width: 100%;
	height: max-content;
	position: absolute;
	top: 0;
	z-index: 1000;
}

aside.d-none + main section {
	margin-left: 0;
}

aside.mobil {
	width: 100%;
	height: max-content;
	position: fixed;
	z-index: 1000;
}

aside.mobil + main section {
	margin-left: 0;
}

@media (min-width: 600px) {
	aside {
		width: 210px;
		height: max-content;
		position: fixed;
		width: 210px;
		height: 100%;
		position: fixed;
	}

	main section {
		margin-left: 230px;
	}
}

@media (min-width: 768px) {
	.mt-md-5,
	.my-md-5 {
		margin-left: 1rem !important;
	}
}

.dropdown-menu.dropdown-menu-right.show {
	display: flex;
	flex-wrap: wrap;
	display: flex !important;
}

.dropdown-menu li {
	flex: 50% !important;
}

.card-header {
	padding-bottom: 0 !important;
}

.new-facturation label {
	font-size: 14px;
}

.bg-dark {
	background-color: #009bde !important;
}

.bg-green {
	background-color: #b1fba7 !important;
}

.shadow-div {
	box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24) !important;
}

/*
    @font-face {
      src: url('./fonts/Avenir.ttc') format('truetype');
      font-weight: normal;
      font-style: normal;
    }
    .font-avenir {
      font-family: 'Avenir';
    }
    */
</style>

