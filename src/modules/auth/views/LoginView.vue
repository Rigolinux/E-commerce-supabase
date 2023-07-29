<script setup lang="ts">
import {handleLogin, handleSignup} from '@/vueutils/UseAuth';
import {ref} from 'vue';

const form = ref<Credentials>({email: '', password: ''});

</script>
<template>
    <div class="ml-2">
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
    </div>
</template>



<style scoped></style>