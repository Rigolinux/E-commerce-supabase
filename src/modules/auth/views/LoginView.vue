<script setup lang="ts">
import {handleLogin, handleSignup} from '@/vueutils/UseAuth';
import {ref} from 'vue';

const form = ref<Credentials>({email: '', password: ''});

import { useRouter } from 'vue-router';
const router = useRouter();

const login = async () => {
    try {
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
    <!-- <div class="ml-2">
        <h1>Login</h1>
        <form @submit.prevent="handleLogin(form)">
            <v-text-field  v-model="form.email" label="email" variant="underlined" 
                prepend-icon="mdi-email" type="email"
            />
            <v-text-field  variant="underlined" v-model="form.password" label="password"
                prepend-icon="mdi-lock" type="password"
            />
            <v-btn type="submit">Login

                <v-icon>mdi-abugida-thai</v-icon>
            </v-btn>
        </form>
    </div> -->

    <v-container class="text-center d-flex">
        <v-row>
            <v-col class="border">
                <form @submit.prevent="handleLogin(form)">

                    <v-icon size="150px" class="mx-auto">
                        mdi-account-circle
                    </v-icon>

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

                    <v-btn @click="login" class="routerlink">
                        Iniciar Sesion
                    </v-btn>

                </form>

                <p style="margin-top: 30px;">
                    ¿No tienes una cuenta? 
                    <router-link to="/register">
                        Registrate
                    </router-link>
                </p>

                <p style="margin-top: 30px;">
                    ¿Olvidaste tu contraseña? 
                    <router-link to="/forgot-password">
                        Recuperar contraseña
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