<script setup lang="ts">
import { useRoute } from 'vue-router';
import { UsePayment } from '@/composables/usePayment';

const { ProccessPayment } = UsePayment();
const route = useRoute();

console.log(route.query);

const makePayment = async() => {
    
     ProccessPayment(route.query);
   
}

</script>


<template>
    <div>
        <h1>Processing Orders</h1>
    </div>
    <div>
        <v-btn @click="makePayment">Proccess Payment</v-btn>
    </div>
</template>


<style scoped>
</style>