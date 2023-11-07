<script setup lang="ts">
import { resetPassword } from '../../../vueutils/UseAuth';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../../../config/supbaseClient';

const showPassword = ref(false);
const showPassword2 = ref(false);

const router = useRouter();
const logout = async() =>await supabase.auth.signOut()
const password = ref<string>('');
const password_confirmation = ref<string>('');

const performPasswordReset = async () => {
  console.log('Restableciendo contraseña');
  try {
    if (password.value != password_confirmation.value) {
      alert('Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
      return;
    }
    // const userId = router.currentRoute.value.params.userId;
    await resetPassword(password.value);
    alert('Contraseña restablecida exitosamente. Inicia sesión con tu nueva contraseña.');
    logout();
    router.push('/login');
    location.reload();
  } catch (error) {
    console.error('Error al restablecer la contraseña:', error);
    alert('Error al restablecer la contraseña');
  }
};
</script>

<template>
  <div class="register-container">
    <v-row justify="center" align-content="center" class="fill-height">
      <v-col cols="12" md="6" lg="4">
        <form @submit.prevent="performPasswordReset">
          <div class="register-box">
            
            <v-row justify="center">
              <v-icon size="200px" class="gradient-icon-color mx-auto">
                mdi-lock-reset
              </v-icon>
            </v-row>
            
            <v-row>
              <v-col>
                <v-text-field
                  v-model="password"
                  label="Nueva Contraseña"
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
              <v-col>
                <v-text-field
                  v-model="password_confirmation"
                  label="Confirmar Contraseña"
                  prepend-inner-icon="mdi-lock"
                  outlined
                  :type="showPassword2 ? 'text' : 'password'"
                >
                  <template #append-inner>
                    <v-icon class="custom-eye-icon" @click="showPassword2 = !showPassword2">
                      {{
                        showPassword2 ? 'mdi-eye-off' : 'mdi-eye'
                      }}
                    </v-icon>
                  </template>
                </v-text-field>
              </v-col>
            </v-row>
            
            <v-row>
              <v-col class="text-center">
                <v-btn class="gradient-btn" type="submit">
                  Restablecer Contraseña
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
        </form>
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