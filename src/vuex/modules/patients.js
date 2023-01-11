import axios from 'axios'
import * as Config from '../../config'

const state = {
    patients: {
        current_page: 1,
        data: [
            {
                "id": 1,
                "name": "Juan Pérez",
                "age": 35,
                "gender": "masculino",
                "address": "Calle Falsa 123",
                "telephone": "555-555-5555",
                "email": "juanperez@example.com",
                "medical_history": "Hipertensión, diabetes tipo 2"
            },
            {
                "id": 2,
                "name": "Maria García",
                "age": 42,
                "gender": "femenino",
                "address": "Avenida Siempre Viva 789",
                "telephone": "555-555-5556",
                "email": "mariagarcia@example.com",
                "medical_history": "Asma, alergia a la penicilina"
            },
            {
                "id": 3,
                "name": "Pedro Sánchez",
                "age": 55,
                "gender": "masculino",
                "address": "Calle del Medio 321",
                "telephone": "555-555-5557",
                "email": "pedrosanchez@example.com",
                "medical_history": "Enfermedad coronaria, colesterol alto"
            },
            {
                "id": 4,
                "name": "Ana López",
                "age": 29,
                "gender": "femenino",
                "address": "Calle Real 456",
                "telephone": "555-555-5558",
                "email": "analopez@example.com",
                "medical_history": "Embarazo"
            },
            {
                "id": 5,
                "name": "Carlos Hernández",
                "age": 42,
                "gender": "masculino",
                "address": "Calle Sin Salida 555",
                "telephone": "555-555-5559",
                "email": "carloshernandez@example.com",
                "medical_history": "Artritis, columna vertebral con hernia de disco"
            },
        ],
    },
    patient: {},
}

const actions = {

    loadPatients({ commit, dispatch }, params) {
        commit('LOAD_PATIENTS')
        console.log(patients);
        return new Promise((resolve, reject) => {
            axios.get(Config.apiPath + 'patients', { params })
                .then(
                    response => {
                        if (response.data.code !== 500) {
                            commit('LOAD_PATIENTS_OK', response.data.patients)
                            resolve()
                        } else {
                            commit('LOAD_PATIENTS_FAIL')
                            reject()
                        }

                    })
                .catch(error => {
                    commit('LOAD_PATIENTS_FAIL')
                    reject()
                })
        })
    },


    updatePatient({ commit, dispatch }, { id, form }) {
        commit('UPDATE_PATIENT')

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'patient/' + id, { _method: 'PUT', ...form })
                .then(
                    response => {
                        commit('UPDATE_PATIENT_OK', response.data.patient)
                        resolve()
                    })
                .catch(error => {
                    commit('UPDATE_PATIENT_FAIL')
                    reject(error.response.data)
                })
        })
    },
    loadGender({ commit, dispatch }) {
        //commit('UPDATE_PASSWORD')

        return new Promise((resolve, reject) => {
            axios.get(Config.apiPath + 'patient/list/gender')
                .then(
                    response => {

                        //commit('UPDATE_PASSWORD_OK', response.data)
                        resolve(response.data)
                    })
                .catch(error => {
                    //commit('UPDATE_PASSWORD_FAIL')
                    reject(error.response.data)
                })
        })
    },

    //TODO NEW
    load_Patients({ commit, dispatch }) {
        return state.patients;

        return new Promise((resolve, reject) => {

            axios.get(Config.apiPath + 'patient/list/all')
                .then(
                    response => {
                        //commit('LOAD_PACKAGES',response.data)
                        resolve(response.data);

                    })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    load_Patient({ commit, dispatch }, form) {
        return new Promise((resolve, reject) => {
            axios.get(Config.apiPath + 'patient/consult/' + form.id)
                .then(
                    response => {
                        //commit('LOAD_PACKAGE', data);
                        resolve(response.data);

                    })
                .catch(error => {
                    reject(error.response.data);
                });
        });

    },
    new_Patient({ commit, dispatch }, form) {

        return new Promise((resolve, reject) => {
            axios.post(Config.apiPath + 'patient/store', form)
                .then(
                    response => {
                        resolve(response.data);
                    })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    changeActive_Patient({ commit, dispatch }, form) {

        return new Promise((resolve, reject) => {
            axios.put(Config.apiPath + 'patient/change/active/' + form.id + '/' + form.active)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    changeStatus_Patient({ commit, dispatch }, form) {

        return new Promise((resolve, reject) => {
            axios.put(Config.apiPath + 'patient/change/status/' + form.id + '/' + form.status)
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    },
    update_Patient({ commit, dispatch }, form) {

        return new Promise((resolve, reject) => {
            axios.put(Config.apiPath + 'patient/update/' + form.id, form)
                .then(
                    response => {
                        resolve(response.data);
                    })
                .catch(error => {
                    reject(error.response.data);
                });
        });
    }

}

const mutations = {

    LOAD_PATIENTS_OK(state, patients) {
        state.patients = patients
    },

    LOAD_PATIENT_OK(state, patient) {
        state.patient = patient
    },

    LOAD_PATIENT_POINT_OK(state, patient) {
        state.patient = patient
    },

    UPDATE_PATIENT_OK(state, patient) {
        state.patient = patient
    },

}

export default {
    state,
    actions,
    mutations
}