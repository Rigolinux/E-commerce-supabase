<script setup lang="ts">
import {handleLogin,handleSignup} from '@/vueutils/UseAuth';
import {ref} from 'vue';

const form = ref<Credentials>({email: '', password: ''});

</script>
<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="handleLogin(form)">
            <input type="text" v-model="form.email" placeholder="email" />
            <input type="password" v-model="form.password" placeholder="password" />
            <button type="submit">Login</button>
        </form>
    </div>
</template>



<style scoped></style>