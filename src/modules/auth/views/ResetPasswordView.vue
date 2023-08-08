<script setup lang="ts">
import { resetPassword } from '@/vueutils/UseAuth';
import { computed, ref } from 'vue';

// const showNavbar = false;

// const showNavbar = computed(() => {
//     return router.currentRoute.value.meta.showNavbar;
// })

// const form = ref<Credentials>({email: '', password: ''});

import { useRouter } from 'vue-router';
const router = useRouter();

// Visualizando en la ruta que nos encontramos
// console.log(router.currentRoute.value);


import { supabase } from '@/config/supbaseClient';
const logout = async() =>await supabase.auth.signOut()

// const email = ref<string>('');

const password = ref<string>('');
const password_confirmation = ref<string>('');

const performPasswordReset = async () => {
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
    } catch (error) {
        console.error('Error al restablecer la contraseña:', error);
        alert('Error al restablecer la contraseña');  
    }
}

// export default {
//     setup() {
//         return {
//             showNavbar,
//         }
//     }
// }

</script>

<template>
    <v-container class="text-center d-flex">
        <v-row>
            <v-col class="border">
                <form @submit.prevent="performPasswordReset">

                    <v-icon size="150px" class="mx-auto"> 
                        mdi-lock-reset
                    </v-icon>

                    <v-text-field 
                        v-model="password" 
                        label="Nueva Contraseña"
                        prepend-icon="mdi-lock"
                        type="password"
                        class="mx-auto max-w-[400px]"
                    />
                    
                    <v-text-field
                        v-model="password_confirmation"
                        label="Confirmar Contraseña"
                        prepend-icon="mdi-lock"
                        type="password"
                        class="mx-auto max-w-[400px]"
                    />

                    <v-btn type="submit" class="routerlink">
                        Restablecer Contraseña
                    </v-btn>

                </form>

                <p style="margin-top: 30px;">
                    ¿Ya tienes una cuenta?
                    <router-link to="/login">
                        Iniciar Sesion
                    </router-link>
                </p>

            </v-col>
        </v-row>
    </v-container>
</template>

<style scoped>

.routerlink {
    color: black;
    background-color: rgb(0, 189, 126);
    block-size: 36px;
    max-width: 400px;
    border-radius: 6px;
    margin: 0 auto;
    align-items: center;
    display: flex;
    justify-content: center;
}

</style>