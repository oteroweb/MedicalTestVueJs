<template>
	<aside class="sidebar mr-5 bg-dark pt-4">
		<ul class="pl-0 mt-md-5">
			<li>
				<a class="nav-link" @click="logoutDefault"><i class="fa fa-sign-out mr-2"></i>Salir</a>
			</li>
		</ul>
	</aside>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "Sidebar",
	props: {
		rol: Number,
	},
	mounted() {},
	components: {},
	data() {
		return {};
	},
	computed: {
		...mapState({}),
	},
	methods: {
		...mapActions(["logout", "addToastMessage"]),
		logoutDefault() {
			this.logout();
			this.$router.push("/");
		},
	},
};
</script>

<style>
aside .btn.dropdown-toggle.btn-secondary {
	background: no-repeat;
	border: 0;
}

aside .dropdown-menu {
	background-color: #35404d;
}

aside .dropdown-menu .dropdown-item {
	text-decoration: none;
	display: block;
	padding: 15px 0 15px 10px;
	font-size: 12px;
	outline: none;
	transition: all 0.3s ease;
}

aside .dropdown-menu .dropdown-item:hover {
	background: none;
}

aside .dropdown-menu .dropdown-item a {
	color: #aeb2b7 !important;
}

aside .dropdown-menu .dropdown-item a:hover {
	color: #fff !important;
	font-size: 120%;
	text-decoration: none;
}
</style>

<style scoped>
* {
	transition: all 0.3s ease;
}

.nav-link {
	color: #aeb2b7;
	text-decoration: none;
	display: block;
	padding: 15px 0 15px 10px;
	outline: none;
	-webkit-transition: all 0.3s ease;
	-moz-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	-ms-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.nav-link:hover {
	background: #35404d;
	color: #fff;
	display: block;
	border-radius: 4px;
	-webkit-border-radius: 4px;
	-webkit-transition: all 0.3s ease;
	-moz-transition: all 0.3s ease;
	-o-transition: all 0.3s ease;
	-ms-transition: all 0.3s ease;
	transition: all 0.3s ease;
}

.bg-dark {
	background-color: #009bde !important;
}

.navbar-nav,
.navbar-nav:hover {
	display: flex;
	justify-content: space-around;
}
</style>