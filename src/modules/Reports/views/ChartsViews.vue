<template>
  <div>
    <h1>Chart View</h1>

    <div v-if="Saleschart && Saleschart.length > 0">
      <DxChart :dataSource="Saleschart" >
        <DxSeries name="name" value-field="value" type="bar" color="#fac29a" />
      </DxChart>
    </div>
    <div v-else>
      No data available.
    </div>
    <DxChart
    id="chart"
    :data-source="Saleschart"
    title="World Population by Decade"
  >
    <DxArgumentAxis :tick-interval="10">
      <DxLabel format="decimal"/>
    </DxArgumentAxis>
    <DxSeries type="bar"/>
    <DxLegend :visible="false"/>
  </DxChart>
    
  </div>
</template>

<script lang="ts">
import { onMounted, ref } from 'vue';
import { useInvoices } from '@/composables/useInvoices';
import DxChart, {
  DxArgumentAxis,
  DxLegend,
  DxLabel,
  DxSeries,
} from 'devextreme-vue/chart';
export default {
  name: 'ChartView',
  components: {
    DxChart,
    DxArgumentAxis,
    DxLabel,
    DxLegend,
    DxSeries,

  },
  setup() {
    const { GetInvoicesData, Saleschart } = useInvoices();

    onMounted(async () => {
      await GetInvoicesData();
    });

    return {
      Saleschart,
      
    };
  },
};
</script>

<style scoped>
</style>
