<script setup lang="ts">
import { InsertData } from '@/vueutils/UseTables';
import TheWelcome from '../components/TheWelcome.vue'

import ChartViews from '@/modules/Reports/views/ChartsViews.vue'
import { ref } from 'vue';
import { useInvoices } from '@/composables/useInvoices';


const {Categories, GetInvoicesData,InvoicesDetails,InvoicesHeaders, Users, Saleschart} = useInvoices();

const loading = ref(true);

GetInvoicesData().then(()=>{
  loading.value = false;
})




</script>

<template>
  <main>
  
    <div
    v-if="loading"
    >
      Cargando ...
    </div>


      <template
      v-if="!loading"
      >
        <ChartViews
        
        />
      </template>
   
      
  </main>
</template>
