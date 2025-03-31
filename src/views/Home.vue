<!-- src/views/Home.vue -->
<template>
  <div>
    <div class="pa-4 text-center">
      <div class="d-flex mb-2">
        <v-text-field
          :loading="loading"
          density="compact"
          label="Búscar por ID"
          variant="solo"
          hide-details
          class="mr-1"
          v-model="search"
        ></v-text-field>
        <v-btn @click="searchAppointment()"> Buscar </v-btn>
      </div>

      <div class="d-flex justify-space-around">
        <v-btn
          text="Nueva cita"
          @click="appointmentForm()"
          :disabled="loading"
        ></v-btn>
        <v-btn
          text="Todas las citas"
          @click="getAppointments()"
          :disabled="loading"
        ></v-btn>
        <v-btn
          text="Citas Activas"
          @click="getFilteredAppointments(1)"
          :disabled="loading"
          color="success"
        ></v-btn>
        <v-btn
          text="Citas Eliminadas"
          @click="getFilteredAppointments(0)"
          :disabled="loading"
          color="warning"
        ></v-btn>
      </div>
    </div>
    <v-alert
      v-if="statusResponse?.message"
      :type="statusResponse.type"
      variant="outlined"
    >
      {{ statusResponse.message }}
    </v-alert>
    <v-table>
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index" class="text-left">
            {{ header.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(appointment, index) in appointments">
          <td>{{ appointment.id }}</td>
          <td>{{ appointment.numeroCita }}</td>
          <td>{{ appointment.paciente }}</td>
          <td>{{ appointment.fechaHora }}</td>
          <td>{{ appointment.tipoCita }}</td>
          <td>{{ appointment.medico }}</td>
          <td>
            <v-chip :color="appointment.eliminada ? 'red' : 'success'">
              {{ appointment.eliminada ? "Eliminada" : "Activa" }}
            </v-chip>
          </td>
          <td>
            <div class="d-flex justify-center">
              <v-btn
                density="compact"
                color="red"
                v-if="!appointment.eliminada"
                @click="deleteAppointment(appointment.id)"
                class="text-decoration-underline ma-1"
              >
                Eliminar
              </v-btn>
              <v-btn
                density="compact"
                color="warning"
                v-if="!appointment.eliminada"
                @click="editAppoinAppointment(appointment)"
                class="text-decoration-underline ma-1"
              >
                Editar
              </v-btn>
            </div>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-dialog v-model="newAppointment">
      <v-card title="Formulario de citas" class="pa-2">
        <v-card-text>
          <v-text-field
            :disabled="loading || edited"
            placeholder="Número de cita"
            type="text"
            v-model="form.numeroCita"
            required
            variant="underlined"
            class="w-100"
          ></v-text-field>
          <v-text-field
            :disabled="loading || edited"
            placeholder="Paciente"
            type="text"
            v-model="form.paciente"
            required
            variant="underlined"
            class="w-100"
          ></v-text-field>

          <input
            type="datetime-local"
            id="fechaHora"
            v-model="form.fechaHora"
            :min="minDateTime"
            :disabled="loading"
          />

          <v-text-field
            :disabled="loading"
            placeholder="Tipo cita"
            type="text"
            v-model="form.tipoCita"
            required
            variant="underlined"
            class="w-100"
          ></v-text-field>

          <v-text-field
            :disabled="loading"
            placeholder="Medico"
            type="text"
            v-model="form.medico"
            required
            variant="underlined"
            class="w-100"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            :disabled="loading"
            :loading="loading"
            @click="edited ? updateAppointment() : saveAppointment()"
            >{{ edited ? "Actualizar" : "Guardar" }}</v-btn
          >
          <v-btn
            text="Cerrar"
            variant="text"
            @click="newAppointment = false"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "@/plugins/axios";

export default {
  name: "Home",
  data() {
    return {
      headers: [
        {
          title: "ID",
        },
        { title: "Numero de cita" },
        { title: "Paciente" },
        { title: "Fecha/Hora" },
        { title: "Tipo cita" },
        { title: "Medico" },
        { title: "Estado" },
        { title: "Accion" },
      ],
      appointments: [],
      newAppointment: false,
      form: {
        eliminada: 0,
      },
      loading: false,
      menu: false,
      time: null,
      minDateTime: null,
      statusResponse: {
        type: "success",
        message: "",
      },
      search: "",
      edited: null,
    };
  },
  methods: {
    editAppoinAppointment(item) {
      this.edited = true;
      this.form = item;
      this.newAppointment = true;
    },
    async searchAppointment() {
      try {
        let response = await axios.get(`/citas/${this.search}`);
        this.appointments = response.data ? [response.data] : [];
      } catch (error) {
        this.statusResponse = "No se han encontrado registros";
        this.type = "success";
        this.appointments = [];
      }
    },
    async getFilteredAppointments(type) {
      try {
        let response = await axios.get(
          `citas/${type ? "activas" : "eliminadas"}`
        );
        this.appointments = response.data;
      } catch (error) {
        console.error(error);
        this.appointments = [];
      }
    },
    async getAppointments() {
      try {
        let response = await axios.get(`/citas`);
        this.appointments = response.data;
      } catch (error) {
        console.error(error);
        this.appointments = [];
      }
    },
    async saveAppointment() {
      try {
        this.loading = true;
        let response = await axios.post(`/citas`, this.form);
        this.appointments = response.data;
        this.statusResponse.message = "Se ha guardado correctamente";
        this.statusResponse.type = "success";
        this.newAppointment = false;
        this.getAppointments();
      } catch (error) {
        this.statusResponse.message = error;
        this.statusResponse.type = "warning";
        this.appointments = [];
      }
      this.loading = false;
    },
    setMinDate() {
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, "0");
      const day = String(now.getDate()).padStart(2, "0");
      const hours = String(now.getHours()).padStart(2, "0");
      const min = String(now.getMinutes()).padStart(2, "0");
      this.minDateTime = `${year}-${month}-${day}T${hours}:${min}`;
    },
    appointmentForm() {
      this.edited = false;
      this.form = {};
      this.statusResponse.message = "";
      this.newAppointment = true;
    },
    async deleteAppointment(appointmentId) {
      try {
        this.loading = true;
        let response = await axios.delete(`/citas/${appointmentId}`);
        this.statusResponse.message = "Eliminado correctamente";
        this.statusResponse.type = "success";
        this.newAppointment = false;
        this.getAppointments();
      } catch (error) {
        this.statusResponse.message = error;
        this.statusResponse.type = "warning";
        this.appointments = [];
      }
      this.loading = false;
    },
    async updateAppointment() {
      try {
        this.loading = true;
        let response = await axios.put(`/citas/${this.form.id}`, this.form);
        this.statusResponse.message = "Actualizado correctamente";
        this.statusResponse.type = "success";
        this.newAppointment = false;
        this.edited = null;
        this.getAppointments();
      } catch (error) {
        console.log(error);
        this.statusResponse.message = error;
        this.statusResponse.type = "warning";
        this.appointments = [];
      }
      this.loading = false;
    },
  },
  mounted() {
    this.setMinDate();
    this.getAppointments();
  },
};
</script>
