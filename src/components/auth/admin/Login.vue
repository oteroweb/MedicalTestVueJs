<template>
	<div class="bbody" style="text-align: -webkit-center">
		<div>
			<div class="col-md-4"></div>
			<div class="col-md-4">
				<br /><br /><br />
				<div class="container" style="background-color: #005699">
					<div class="header-logo b-toaster-bottom-center">
						<br />
						<br />
						<img src="@/assets/logo.png" class="logo-center" />
					</div>
					<form class="form-signin" method="post" @submit.prevent="onSubmit" name="loginForm">
						<br />
						<br />
						<h2 style="color: white">Bienvenido Administrador</h2>
						<div class="login-wrap b-toaster-bottom-center text-left" style="padding: 5%">
							<label for="username" label-for="username" style="color: white">Nombre de Usuario / Correo Electronico</label>
							<input id="username" name="username" v-model="username" v-validate="'required'" type="text" autofocus class="form-control" />
							<p v-show="errors.has('username')" class="help helpRegister2">
								{{ errors.first("username") }}
							</p>
							<br />
							<label for="password" style="color: white" label-for="password">Contraseña</label>
							<input type="password" id="password" v-model="password" name="password" v-validate="'required'" class="form-control" />

							<p v-show="errors.has('password')" class="help helpRegister2">
								{{ errors.first("password") }}
							</p>
							<br />
						</div>
						<div class="btn b-toaster-bottom-center text-center">
							<button class="btn btn-lg btn-success btn-shadow border-0" type="submit" :disabled="btnLogin">Iniciar Sesión</button>
							<!--<a class="btn btn-lg btn-primary btn-shadow border-0" href="#"-->
							<!--style="color: white">Registrarse</a>-->
						</div>
						<div class="btns report-error">
							<a href="#">Reportar un Problema</a>
						</div>
					</form>
				</div>
			</div>
			<div class="col-md-4"></div>
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
			abbreviation: "",
			username: "",
			password: null,
		};
	},
	methods: {
		...mapActions(["login", "addToastMessage"]),
		onSubmit() {
			this.$validator.validate().then((result) => {
				if (result) {
					this.btnLogin = true;
					this.login({
						username: this.username,
						password: this.password,
					})
						.then((data) => {
							this.btnLogin = false;
							if (data.code === 200) {
								this.addToastMessage({
									text: data.message,
									type: "success",
								});

								this.$router.push("/admin/home");
							}
						})
						.catch((data) => {
							this.btnLogin = false;

							// if (data.code === 401 && data.data.verify) {
							//     this.verifyEmail(data)
							// } else {
							//     this.error = data.message
							// }
						});
				}
			});
		},
	},
	computed: {
		...mapState({}),
	},
};
</script>

<!--<style>-->
<!--.bbody {-->
<!--background-color: rgba(0, 36, 70, 0.76) !important;-->
<!--color: black;-->
<!--height: 100vh !important;-->
<!--}-->

<!--.container {-->
<!--border-radius: 18px 18px 18px 18px !important;-->
<!-- -moz-border-radius: 18px 18px 18px 18px !important;-->
<!-- -webkit-border-radius: 18px 18px 18px 18px !important;-->
<!--/* border: 3px solid #199e36 !important;*/-->
<!--color: black;-->
<!--}-->

<!--.helpRegister2 {-->
<!--color: #fd071e !important;-->
<!--font-size: 20px !important;-->
<!--}-->
<!--</style>-->

<style>
.logo-center {
	display: block;
	margin-left: auto;
	margin-right: auto;
	width: 50%;
}
</style>