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
					<form class="form-register" method="post" autocomplete="off" @submit.prevent="onSubmitRegister" name="registerForm">
						<h2 class="">Registrarme</h2>
						<br />
						<div class="login-wrap b-toaster-bottom-center text-left">
							<label for="cuit" label-for="cuit">Cuit</label>
							<input id="cuit" name="cuit" v-model="cuit" v-validate="'required|numeric'" type="text" class="form-control" />
							<p v-show="errors.has('cuit')" class="help helpRegister2">
								{{ errors.first("cuit") }}
							</p>
							<br />
							<label label="email" label-for="email">Correo Electronico</label>
							<input id="email" name="email" v-model="email" v-validate="'required|email'" type="text" class="form-control" />
							<p v-show="errors.has('email')" class="help helpRegister2">
								{{ errors.first("email") }}
							</p>
							<br />
							<label for="phone" label-for="phone">Telefono</label>
							<input id="phone" name="phone" v-model="phone" v-validate="'required|numeric'" type="text" class="form-control" />
							<p v-show="errors.has('phone')" class="help helpRegister2">
								{{ errors.first("phone") }}
							</p>
							<br />
							<label for="password" label-for="password">Contraseña</label>
							<input type="password" id="password" v-model="password" name="password" v-validate="'required|min:6'" class="form-control" />

							<p v-show="errors.has('password')" class="help helpRegister2">
								{{ errors.first("password") }}
							</p>
							<br />
							<div class="form-check">
								<input type="checkbox" id="exampleCheck1" class="form-check-input" />
								<a href="../Terminos_Monotributa.pdf" target="a_blank" for="exampleCheck1" class="form-check-label" style="color: white">He leído y acepto los términos y condiciones</a>
							</div>
							<br />
						</div>
						<div class="btn b-toaster-bottom-center text-center">
							<button class="btn btn-lg btn-success btn-shadow border-0" type="submit" :disabled="btnLogin">Continuar</button>
							<!--<a class="btn btn-lg btn-primary btn-shadow border-0" @click="change = false"-->
							<!--style="color: white"> Iniciar Sesión</a>-->
						</div>
						<br />
						<div class="btns report-error" style="color: red; cursor: pointer">
							<router-link style="color: white" :to="{ name: 'Login-Client' }">Ya tengo una cuenta. Iniciar Sesión </router-link>
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
	name: "Register-Client",
	mounted() {},
	components: {},
	data() {
		return {
			btnLogin: false,
			cuit: "",
			password: "",
			email: "",
			phone: "",
		};
	},
	methods: {
		...mapActions(["loginClient", "registerClient", "addToastMessage"]),
		onSubmitRegister() {
			this.$validator.validate().then((result) => {
				if (result) {
					this.registerClient({
						cuit: this.cuit,
						password: this.password,
						email: this.email,
						phone: this.phone,
					})
						.then((data) => {
							if (data.code === 200) {
								this.addToastMessage({
									text: data.message,
									type: "success",
								});
								(this.cuit = ""), (this.password = ""), (this.email = ""), (this.phone = "");
								this.$validator.reset();
								this.$router.push("login");
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

<style>
.bbody {
	background-color: rgba(56, 55, 55, 0.76) !important;
	color: black;
	/*height: 100vh !important;*/
}

.container {
	border-radius: 18px 18px 18px 18px !important;
	-moz-border-radius: 18px 18px 18px 18px !important;
	-webkit-border-radius: 18px 18px 18px 18px !important;
	border: 3px solid #199e36 !important;
	color: black;
}

.helpRegister2 {
	color: #fd071e !important;
	font-size: 20px !important;
}
</style>