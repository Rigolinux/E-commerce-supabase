<script setup lang="ts">
import { useRoute,useRouter } from 'vue-router';
import { UsePayment } from '@/composables/usePayment';

const { ProccessPayment } = UsePayment();
const route = useRoute();
const router = useRouter();

console.log(route.query);

const makePayment = async() => {
    
    await ProccessPayment(route.query);
    
    router.push({ 
        name: 'home' 
    })
}

makePayment();

</script>


<template>
    <div>
        <h1>Estamos Procesando su orden</h1>
    </div>
    
</template>


<style scoped>
</style>