<script setup lang="ts">
import { DxDataGrid } from 'devextreme-vue/data-grid';
import { GetProducts} from '@/vueutils/UseProducts'
import { ref } from 'vue';

let products = ref([]);

GetProducts().then((data) => {
  products.value = data;
});

</script>


<template>

<div>
    <DxDataGrid
     :dataSource="products"
    />

</div>
</template>


<style scoped>

</style>