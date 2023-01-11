<template>
	<div class="header">
		<b-navbar type="dark" variant="dark" class="py-0">
			<span class="navbar-toggler-icon" @click="toggleSidebar"></span>
			<b-navbar-brand href="#">
				<img id="logo" src="@/assets/logo.png" class="img-responsive" />
			</b-navbar-brand>

			<b-collapse id="nav-collapse" is-nav>
				<!-- Right aligned nav items -->
				<b-navbar-nav class="ml-auto bg-green align-items-center">
					<b-nav-item>Bienvenido {{ user.name }}</b-nav-item>
					<button @click="handleLogout">Cerrar sesión</button>
				</b-navbar-nav>
			</b-collapse>
		</b-navbar>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "NavBar",
	data() {
		return {};
	},
	computed: {
		...mapState({
			isLoggedIn: (state) => state.isLoggedIn,
			user: (state) => state.user,
		}),
	},
	methods: {
		...mapActions(["logout"]),
		handleLogout() {
			this.$router.push("/");
			this.logout();
		},
		toggleSidebar() {
			let test = document.querySelector(".navbar-toggler-icon");
			let aside = document.querySelector("aside");

			test.addEventListener("click", (e) => {
				aside.classList.toggle("d-none");
				aside.classList.toggle("mobil");
			});
		},
	},
};
</script>

<style scoped>
.header {
	position: fixed;
	left: 0;
	right: 0;
	z-index: 1002;
}

@media screen and (min-width: 768px) {
	.navbar-brand {
		width: 200px;
	}
}

.navbar-nav {
	border-radius: 2.25rem;
}

.nav-link {
	color: black !important;
	font-family: "Avenir LT Std 95 Black" !important;
	padding-top: 0 !important;
	padding-bottom: 0 !important;
}

.bg-dark {
	background-color: #093b5b !important;
}
#logo {
	width: 30px;
}
</style>