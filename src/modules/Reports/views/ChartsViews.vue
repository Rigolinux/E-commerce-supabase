<script setup lang="ts">
import { DxChart, DxSeries } from 'devextreme-vue/chart';
import  type { Ref } from 'vue';
import { ref } from 'vue';
import { GetData } from '@/vueutils/UseTables';

const data: Ref<ProductCart | any | [] > = ref([]);

GetData('detalle_venta').then((data:any) => {
  data.value = data;
});

</script>

<template>
<div>
    <h1>Chart View</h1>

    <div>
        <DxChart
        :DataSource="data"
        id="chart"
        >
        <DxSeries
        argument-field="nombre"
        value-field="cantidad"
        name="Cantidad Vendida"
        type="bar"
      />
        

        </DxChart>

    </div>

</div>
</template>


<style scoped >
</style>