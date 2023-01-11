<template>
	<div class="bbody" style="text-align: -webkit-center">
		<div>
			<div class="col-md-4"></div>
			<div class="col-md-4">
				<br /><br /><br />
				<div class="container" style="background-color: #009bde">
					<div class="header-logo b-toaster-bottom-center">
						<br />
						<br />
						<img src="@/assets/logo.png" class="logo-center" />
					</div>
					<form v-if="!isLoggedIn" class="form-signin" method="post" autocomplete="off" @submit.prevent="onSubmit" name="loginForm" style="padding: 5%">
						<h2 style="color: white">Bienvenido</h2>

						<div class="login-wrap b-toaster-bottom-center text-left">
							<label style="color: white" for="email" label-for="email">email</label>
							<input id="email" name="email" v-model="email" v-validate="'required|email'" type="text" class="form-control" />
							<p v-show="errors.has('email')" class="help helpRegister2">
								{{ errors.first("email") }}
							</p>
							<br />
							<label style="color: white" for="password" label-for="password">pass</label>
							<input type="password" id="password" v-model="password" name="password" v-validate="'required'" class="form-control" />

							<p v-show="errors.has('password')" class="help helpRegister2">
								{{ errors.first("password") }}
							</p>
							<br />
						</div>
						<br />
						<div class="btns report-error" style="color: white; cursor: pointer; text-align: center">
							<button class="btn btn-lg btn-success btn-shadow border-0" type="submit" :disabled="btnLogin">Iniciar Sesión</button>
							<br />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "Login",
	mounted() {},
	components: {},
	data() {
		return {
			btnLogin: false,
			email: "email@email.com",
			password: "",
		};
	},
	methods: {
		...mapActions(["login", "logout"]),
		onSubmit() {
			this.$validator.validate().then((result) => {
				if (result) {
					this.btnLogin = true;
					this.login({
						user: this.user,
						password: this.password,
					})
						.then((data) => {
							// if (data.code === 200) {
							// this.btnLogin = false;
							this.$router.push("/home");
							// }
						})
						.catch((error) => {
							this.btnLogin = false;
						});
				}
			});
		},
	},
	computed: mapState({
		isLoggedIn: (state) => state.isLoggedIn,
		// user: (state) => state.user,
	}),
};
</script>

<style>
.logo-center {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}
</style>
