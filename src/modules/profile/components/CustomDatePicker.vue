<!-- eslint-disable vue/no-mutating-props -->
<script lang="ts" setup>
  import { defineProps, ref } from 'vue';
import DatePicker from 'vue-datepicker-next';
  import 'vue-datepicker-next/index.css';

interface Props {
  date? : Date | string | null;
}


const props = defineProps<Props>();
console.log(props.date);
const date =  ref<Date | null>(props.date);

const onChange = (date: Date) => {
  console.log(date);
}
  
</script>

<template>
  <div >

    <date-picker style="min-height: 100%;" v-model:value="date"
    @change="onChange"
    valueType="format"></date-picker>
   
  </div>
</template>