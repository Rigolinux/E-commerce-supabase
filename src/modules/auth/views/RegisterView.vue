<script setup lang="ts">
// import { handleLogin, handleSignup } from '@/vueutils/UseAuth';
import { handleSignup } from '../../../vueutils/UseAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const showPassword = ref(false);

const form = ref<Credentials>({
  email: '',
  password: ''
});

const signup = async () => {
  console.log('Registro de usuario');
  try {
    if (form.value.email == '' || form.value.password == '') {
      alert('Por favor, ingresa tu correo electrónico y contraseña.');
      return;
    }
    const access_token = await handleSignup(form.value);
    if (access_token !== null) {
      console.log('Registro de usuario exitoso');
      console.log('access_token:', access_token);
      console.log('access_token == null:', access_token == null);
      // Refresh de la página
      location.reload();
      router.push('/');
    } else {
      console.log('Registro de usuario fallido');
    }
  } catch (error) {
    console.log('Error durante el registro:', error);
  }
};
</script>

<template>
  <div class="register-container">
    <v-row justify="center" align-content="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <div class="register-box" @submit.prevent="handleSignup(form)">
          
          <v-row justify="center">
            <v-icon size="200px" class="gradient-icon-color mx-auto">
              mdi-account-plus
            </v-icon>
          </v-row>
          
          <v-row>
            <v-col>
              <v-text-field
                v-model="form.email"
                label="Correo Electrónico"
                prepend-inner-icon="mdi-email"
                type="email"
                outlined
              />
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-text-field
                v-model="form.password"
                label="Contraseña"
                prepend-inner-icon="mdi-lock"
                outlined
                :type="showPassword ? 'text' : 'password'"
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
              <v-btn class="gradient-btn" large @click="signup">
                Crear Cuenta
              </v-btn>
            </v-col>
          </v-row>

          <br /> <br />

          <v-row class="text-links-row">
            <v-col class="text-caption text-center mt-3 mt-md-0">
              <a class="text">
                ¿Ya tienes una cuenta?
              </a>
              <router-link to="/login" class="gradient-text">
                Iniciar Sesión
              </router-link>
            </v-col>
          </v-row>

        </div>
      </v-col>
    </v-row>
  </div>
</template>

<style scoped>
.register-container {
  background: linear-gradient(to right, #170734, #062920);
  height: 100vh;
}
.register-box {
  background-color: #333;
  padding: 20px;
  border-radius: 8px;
  color: #ffff;
  border: 1px solid;
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