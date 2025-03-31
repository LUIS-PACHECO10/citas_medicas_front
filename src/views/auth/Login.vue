<template>
  <v-container fluid class="background-grey lighten-5">
    <v-row justify="center">
      <v-col col="12" md="4">
        <v-card rounded class="elevation-10">
          <v-row>
            <v-card-text class="mt-4">
              <div class="text-center">
                <v-avatar size="120">
                  <v-img alt="John" :src="'public/isotipo.png'"></v-img>
                </v-avatar>
                <h3 class="text--accent-3 mb-2"><br />Iniciar sesión</h3>
              </div>

              <v-col cols="12">
                <form @submit.prevent="submit">
                  <label class="mb-2" style="font-size: 14px">Usuario:</label>
                  <v-text-field
                    class="mb-n3 w-100"
                    placeholder="Ingrese Usuario"
                    type="text"
                    solo
                    v-model="form.username"
                    variant="underlined"
                    required
                  ></v-text-field>
                  <label class="mb-2" style="font-size: 14px"
                    >Contraseña:</label
                  >
                  <v-text-field
                    placeholder="Ingrese Contraseña"
                    solo
                    :type="showPassword ? 'text' : 'password'"
                    v-model="form.password"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    required
                    variant="underlined"
                    class="w-100"
                  ></v-text-field>
                  <div class="text-center">
                    <v-btn type="submit" rounded block color="green">
                      {{ loading ? "Validando..." : "Iniciar Sesión" }}
                    </v-btn>
                  </div>
                </form>
                <div class="text-center mt-5 mb-4">
                  <v-card-subtitle class="text-center" style="color: #999">
                    ¿Has olvidado tu contraseña?
                  </v-card-subtitle>
                </div>
              </v-col>
            </v-card-text>
          </v-row>
        </v-card>
      </v-col>
      <v-skeleton-loader
        v-if="loading"
        type="list-item-three-line"
      ></v-skeleton-loader>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "LogIn",
  data() {
    return {
      production: this.$production,
      showPassword: false,
      loading: false,
      hasError: false,
      recaptcha: null,
      msg: null,
      form: {
        username: "user@user.com",
        password: "password",
      },
      loading: false,
    };
  },
  methods: {
    ...mapActions({
      signIn: "auth/signIn",
    }),
    submit() {
      //Reseteo de LocalStorage al iniciar sesión
      this.loading = true;
      let data = { password: this.form.password, username: this.form.username };

      this.signIn(data)
        .then(() => {
          this.$router.replace({
            name: "Home",
          });
        })
        .catch((err) => {
          console.log(err);
        });
      this.loading = false;
    },
    isValidEmail(email) {
      const emailRegex =
        /^[a-zA-Z0-9_.+]+(?<!^[0-9]*)@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      return emailRegex.test(email);
    },
  },
};
</script>

<style scoped>
.v-carousel__controls {
  align-items: center;
  background: rgba(0, 0, 0, 0.3);
  bottom: 0;
  display: flex;
  height: 50px;
  justify-content: center;
  list-style-type: none;
  position: absolute;
  width: 150%;
  z-index: 1;
}
.text-center {
  text-align: center;
}

.g-recaptcha {
  display: inline-block;
}
</style>
