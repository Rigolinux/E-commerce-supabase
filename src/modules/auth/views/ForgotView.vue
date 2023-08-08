<script setup lang="ts">
import { handlePasswordReset } from '@/vueutils/UseAuth';
import {ref} from 'vue';

const form = ref<Credentials>({email: '', password: ''});

import { useRouter } from 'vue-router';
const router = useRouter();

const email = ref<string>('');

const submitForgotPassword = async () => {
    try{
        await handlePasswordReset(email.value);
        console.log('Solicitud de recuperación de contraseña exitosa');
        // router.push('/reset-password');

        // const token = router.currentRoute.value.params.token;
        // const accessToken = router.currentRoute.value.params.access_token;
        // router.push(`/reset-password?access_token=${accessToken}`);
        router.push('/login');

    } catch (error) {
        console.log('Error al solicitar la recuperación de contraseña: ', error);
        alert('Error al solicitar la recuperación de contraseña');
    }
};

</script>
<template>
    <v-container class="text-center d-flex">
        <v-row>
            <v-col class="border">
                <form @submit.prevent="submitForgotPassword">

                    <v-icon size="150px" class="mx-auto"> 
                        mdi-account-edit
                    </v-icon>

                    <v-text-field
                        v-model="email"
                        label="Correo Electronico" 
                        prepend-icon="mdi-email"
                        type="email"
                        class="mx-auto max-w-[400px]"
                    />

                    <v-btn type="submit" class="routerlink">
                        Recuperar mi contraseña
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

    <!-- <div class="ml-2">
        <h1>Register</h1>
        <form @submit.prevent="handleSignup(form)">
            <v-text-field  v-model="form.email" label="email" variant="underlined" 
                prepend-icon="mdi-email" type="email"
            />
            <v-text-field  variant="underlined" v-model="form.password" label="password"
                prepend-icon="mdi-lock" type="password"
            />
            <v-btn type="submit">Register</v-btn>
        </form>
    </div> -->
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