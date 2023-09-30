<script setup lang="ts">
import { DxChart, DxSeries } from 'devextreme-vue/chart';

import { GetData } from '@/vueutils/UseTables';

const data:ProductCart = await GetData('detalle_venta');

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