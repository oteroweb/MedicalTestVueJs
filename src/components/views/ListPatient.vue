<template>
	<section>
		<b-card title="Listado de Pacientes">
			<b-row>
				<b-col md="10">
					<p>A continuación podrás visualizar todos los Pacientes registrados en el sistema.</p>
				</b-col>
			</b-row>
			<br />
			<b-row>
				<b-col lg="6">
					<b-form-group label="Filtrar por" label-cols-sm="3" label-align-sm="right" label-size="sm" label-for="filterInput" class="mb-0">
						<b-input-group size="sm">
							<b-form-input id="filterInput" v-model="filter" type="search" placeholder="Escribe para buscar"></b-form-input>
							<b-input-group-append>
								<b-button :disabled="!filter" @click="filter = ''"> Limpiar </b-button>
							</b-input-group-append>
						</b-input-group>
					</b-form-group>
				</b-col>
				<b-col lg="6">
					<b-form-group label="Por Página" label-cols-sm="6" label-cols-md="4" label-cols-lg="3" label-align-sm="right" label-size="sm" label-for="perPageSelect" class="mb-0">
						<b-form-select id="perPageSelect" v-model="perPage" size="sm" :options="pageOptions"></b-form-select>
					</b-form-group>
				</b-col>
			</b-row>
			<b-row class="mt-3 px-3">
				<b-col sm="12">
					<div>
						<b-table id="my-table" show-empty small stacked="md" :items="items" :fields="fields" :current-page="currentPage" :per-page="perPage" :filter="filter" :filter-included-fields="filterOn" :sort-by.sync="sortBy" :sort-desc.sync="sortDesc" :sort-direction="sortDirection" @filtered="onFiltered">
							<template v-slot:cell(actions)="row">
								<b-button v-if="row.item.active === 1" size="sm" variant="success" class="mr-2" title="Activado" @click="changeActive(row.item)">
									<i class="fa fa-check-square-o" />
								</b-button>
								<b-button v-if="row.item.active === 0" size="sm" variant="warning" class="mr-2" title="Desactivado" @click="changeActive(row.item)">
									<i class="fa fa-minus-square-o" />
								</b-button>

								<b-button size="sm" variant="info" class="mr-2" @click="editar(row.item)">
									<i class="fa fa-edit" />
								</b-button>
							</template>
						</b-table>
					</div>
					<p class="mt-3">Página Actual: {{ currentPage }}</p>
					<div>
						<b-pagination v-model="currentPage" :total-rows="rows" :per-page="perPage" aria-controls="my-table"></b-pagination>
					</div>
				</b-col>
			</b-row>
		</b-card>
		<div>
			<b-modal id="bv-modal-example" hide-footer ref="bv-modal-example">
				<template v-slot:modal-title> Balance del Monotributista </template>
				<div class="d-block text-left">
					<b-form>
						<b-form-group id="debit" label="Debito" label-for="debit">
							<b-form-input id="debit" v-model="debit" required></b-form-input>
						</b-form-group>
						<b-form-group id="credit" label="Credito" label-for="credit">
							<b-form-input id="credit" v-model="credit" required></b-form-input>
						</b-form-group>
					</b-form>
				</div>
				<b-row>
					<b-col lg="6" class="pb-2">
						<b-button size="sm" block @click="$bvModal.hide('bv-modal-example')">Cerrar</b-button>
					</b-col>
					<b-col lg="6" class="pb-2">
						<b-button variant="success" size="sm" block @click="balanceUser">Guardar</b-button>
					</b-col>
				</b-row>
			</b-modal>
		</div>
	</section>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
	name: "ListPatient",
	components: {},
	data() {
		return {
			debit: "",
			credit: "",
			fields: [
				{
					key: "name",
					label: "Nombre",
					sortable: true,
				},
				{
					key: "age",
					label: "Edad",
					sortable: true,
				},
				{
					key: "gender",
					label: "Genero",
					sortable: true,
				},
				{
					key: "telephone",
					label: "Telefono",
					sortable: true,
				},
				{
					key: "email",
					label: "Correo Electronico",
					sortable: true,
				},
				{
					key: "address",
					label: "Direccion",
					sortable: true,
				},
				{
					key: "medical_history",
					label: "Historial",
					sortable: true,
				},
				{
					key: "actions",
					label: "Acciones",
					sortable: false,
				},
			],
			items: [],
			currentPage: 1,
			perPage: 10,
			totalRows: 1,
			pageOptions: [10, 15, 20],
			sortBy: "",
			sortDesc: false,
			sortDirection: "asc",
			filter: null,
			filterOn: [],
		};
	},
	mounted() {
		this.listData();
	},
	methods: {
		...mapActions(["load_Patients"]),
		listData() {
			this.load_Patients()
				.then((response) => {
					console.log(response);
					this.items = response.data;
					// if (response.code === 200) {
					// 	this.items = response.data;
					// }
				})
				.catch((error) => {
					console.log(error);
				});
		},
		openBalance: function () {
			this.$refs["bv-modal-example"].show();
		},
		changeActive(data) {
			Swal.fire({
				title: "Confirmación",
				text: "¿Estas seguro de Cambiar el Estatus del Usuario?",
				type: "question",
				reverseButtons: true,
				showCancelButton: true,
				confirmButtonColor: "#37bd25",
				cancelButtonColor: "#d33",
				cancelButtonText: "Cancelar",
				confirmButtonText: "Cambiar ",
			}).then((result) => {
				if (result.value) {
					let active = data.active == 1 ? 0 : 1;

					this.changeActive_User({ id: data.id, active: active })
						.then((response) => {
							if (response.code == 200) {
								data.active = active;
								Swal.fire({
									title: "Listo!",
									text: "El Usuario ha sido Modificado.",
									type: "success",
								}).then((result) => {});
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			});
		},
		balanceUser(data) {
			this.$refs["bv-modal-example"].hide();
			return false;
			Swal.fire({
				title: "Confirmación",
				text: "¿Estas seguro de Cambiar el Estatus del Usuario?",
				type: "question",
				reverseButtons: true,
				showCancelButton: true,
				confirmButtonColor: "#37bd25",
				cancelButtonColor: "#d33",
				cancelButtonText: "Cancelar",
				confirmButtonText: "Cambiar ",
			}).then((result) => {
				if (result.value) {
					let active = data.active == 1 ? 0 : 1;

					this.changeActive_User({ id: data.id, active: active })
						.then((response) => {
							if (response.code == 200) {
								data.active = active;
								Swal.fire({
									title: "Listo!",
									text: "El Usuario ha sido Modificado.",
									type: "success",
								}).then((result) => {});
							}
						})
						.catch((error) => {
							console.log(error);
						});
				}
			});
		},
		editar(data) {
			this.$router.push("/editar/paciente/" + data.id);
		},
		onFiltered(filteredItems) {
			this.totalRows = filteredItems.length;
			this.currentPage = 1;
		},
	},
	computed: {
		...mapState({}),
		sortOptions() {
			return this.fields
				.filter((f) => f.sortable)
				.map((f) => {
					return { text: f.label, value: f.key };
				});
		},
		rows() {
			return this.items ? this.items.length : 0;
		},
	},
};
</script>
