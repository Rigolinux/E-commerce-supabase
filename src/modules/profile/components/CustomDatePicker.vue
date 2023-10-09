<script lang="ts" setup>
  import { ref } from 'vue';
import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

  const time2 = ref(new Date());
</script>

<template>
  <div >

    <date-picker style="min-height: 100%;" v-model:value="time2" valueType="format"></date-picker>
   
  </div>
</template>