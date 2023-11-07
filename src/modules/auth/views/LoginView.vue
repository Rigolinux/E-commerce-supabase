<script setup lang="ts">
// import { handleLogin, handleSignup } from '@/vueutils/UseAuth';
import { handleLogin } from '../../../vueutils/UseAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPassword = ref(false);

const form = ref<Credentials>({
  email: '',
  password: ''
});

const login = async () => {
  console.log('Inicio de sesión');
  try {
    if (form.value.email == '' || form.value.password == '') {
      alert('Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }
    console.log(form.value);
    const access_token = await handleLogin(form.value);

    if (access_token !== null) {
      router.push('/');
    } else {
      console.log('Inicio de sesion fallido');
    }
  } catch (error) {
    console.log('Error durante el inicio de sesión:', error);
  }
};
</script>

<template>
  <div class="login-container">
    <v-row justify="center" align-content="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <div class="login-box" @submit.prevent="handleLogin(form)">

          <v-row justify="center">
            <v-icon size="200px" class="gradient-icon-color mx-auto">
              mdi-account-circle
            </v-icon>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                label="Correo Electrónico"
                outlined
                prepend-inner-icon="mdi-email"
                v-model="form.email"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
                <v-text-field
                  label="Contraseña"
                  :type="showPassword ? 'text' : 'password'"
                  outlined
                  prepend-inner-icon="mdi-lock"
                  v-model="form.password"
                >
                  <template #append-inner>
                    <v-icon class="custom-eye-icon" @click="showPassword = !showPassword">
                      {{
                        showPassword ? 'mdi-eye-off' : 'mdi-eye'
                      }}
                    </v-icon>
                  </template>
                </v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col class="text-center">
              <v-btn class="gradient-btn" large @click="login">
                Iniciar Sesión
              </v-btn>
            </v-col>
          </v-row>

          <br /> <br />

          <v-row class="text-links-row">
            <v-col class="text-caption text-center mt-3 mt-md-0">
                <a class="text">
                    ¿No tienes una cuenta?
                </a>
                <router-link to="/register" class="gradient-text">
                    Registrate
                </router-link>
            </v-col>
            <v-col class="text-caption text-center mt-3 mt-md-0">
                <a class="text">
                    ¿Olvidaste tu contraseña?
                </a>
                <router-link to="/forgot-password" class="gradient-text">
                    Recuperar contraseña
                </router-link>
            </v-col>
          </v-row>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.login-container {
  /* background: linear-gradient(to right, #170734, #062920); */
  /* #425466, #4DBA87); */
  background: linear-gradient(to right, #170734, #062920);
  height: 100vh;
}
.login-box {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  color: #ffff;
  border: 1px solid;
  /* border-image-source: linear-gradient(to right, #7E25F1, #32E2A4); */
  border-image-source: linear-gradient(to right, #7E25F1, #32E2A4);
  border-image-slice: 1;
  opacity: 0.8;
}
.gradient-icon-color {
  background: linear-gradient(to right, #7E25F1, #32E2A4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.login-box .v-input__icon--append-inner .v-icon {
  color: white !important;
  visibility: visible !important;
  background-color: red;
}
.custom-eye-icon {
  color: white !important;
  cursor: pointer;
}
.gradient-btn {
  background: linear-gradient(to right, #7E25F1, #32E2A4);
  border: none;
  color: white;
  font-size: 18px;
  font-weight: bold;
  text-transform: none;
  width: 80%;
}
.gradient-btn:hover {
  opacity: 0.9;
}
@media (min-width: 600px) {
  .gradient-btn {
    width: 80%;
  }
  .text-links-row {
    flex-direction: column;
  }
}
.text {
  color: white;
  font-size: 14px;
}
.gradient-text {
    background: linear-gradient(to right, #4877CA, #32E2A4);
    color: transparent;
    background-clip: text;
    -webkit-background-clip: text;
    cursor: pointer;
    text-decoration: none;
    font-size: 14px;
    font-weight: bold;
}
.gradient-text:hover {
    text-decoration: underline;
}
</style>