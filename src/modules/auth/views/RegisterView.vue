<script setup lang="ts">
import {handleSignup} from '@/vueutils/UseAuth';
import {ref} from 'vue';

const form = ref<Credentials>({email: '', password: ''});

import { useRouter } from 'vue-router';
const router = useRouter();

const signup = async () => {
    try {
        const access_token = await handleSignup(form.value);

        if (access_token !== null) {
            router.push('/login');
            console.log('Registro de usuario exitoso');
            console.log('access_token:', access_token);
            console.log('access_token == null:', access_token == null);
        } else {
            console.log('Registro de usuario fallido');
        }
    } catch (error) {
        console.log('Error durante el registro:', error);
    }
};

</script>
<template>
    <v-container class="text-center d-flex">
        <v-row>
            <v-col class="border">
                <form @submit.prevent="handleSignup(form)">
                    
                    <v-icon size="150px" class="mx-auto"> 
                        mdi-account-plus
                    </v-icon>

                    <!-- <v-icon size="150px" class="mx-auto"> 
                        mdi-account-edit
                    </v-icon> -->

                    <v-text-field
                        v-model="form.email"
                        label="Correo Electronico" 
                        prepend-icon="mdi-email"
                        type="email"
                        class="mx-auto max-w-[400px]"
                    />
                    
                    <v-text-field 
                        v-model="form.password"
                        label="Contraseña" 
                        prepend-icon="mdi-lock"
                        type="password"
                        class="mx-auto max-w-[400px]"
                    />

                    <!-- <v-btn type="submit" class="mx-auto max-w-[400px]">
                        Iniciar Sesion
                    </v-btn>

                    <router-link to="/about">
                        <v-btn class="mx-auto max-w-[400px]">
                            Iniciar Sesion2
                        </v-btn>
                    </router-link> -->

                    <v-btn @click="signup" class="routerlink">
                        Iniciar Sesion
                    </v-btn>

                    <!-- <router-link to="/login">
                        <v-btn class="mx-auto max-w-[400px]">
                            Registrar Usuario.
                        </v-btn>
                    </router-link> -->

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