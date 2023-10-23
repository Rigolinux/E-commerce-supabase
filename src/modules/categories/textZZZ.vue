<script setup lang="ts">

import { ref } from 'vue';

// const selectGetIdAndName1 = [
//   { text: 'Producto 1', value: 1 },
//   { text: 'Producto 2', value: 2 },
//   { text: 'Producto 3', value: 3 }
// ];

// let selectedValue = ref(null);

// const getSelectedValue = () => {
//   console.log('selectedValue: ', selectedValue.value);
// }

// ==================== NUEVO ====================

import { GetIdAndName } from '../../vueutils/useCategories';

let selectedValue2 = ref(null);
const categoryIDandName = ref<{ id: number; name: string}[]>([]);

const getSelectedValue2 = () => {
  console.log('selectedValue2: ', selectedValue2.value);
}

const fetchData = async () => {
  const data2 = await GetIdAndName();

  data2.sort((a:any, b:any) => a.id_categoria - b.id_categoria);

  categoryIDandName.value = data2.map((item:any) => {
    return {
      id: item.id_categoria,
      name: item.nombre
    }
  });

  console.log('Resultado: ', categoryIDandName.value);
}

fetchData();

// ===============================================



</script>

<template>
  <v-container>
    <h1>Test</h1>

    <!-- <select v-model="selectedValue" class="select_category" @change="getSelectedValue">
      <option v-for="item in selectGetIdAndName1" :key="item.value" :value="item.value" class="option_category">
        {{ `${item.value} - ${item.text}` }}
      </option>
    </select> -->

    <select v-model="selectedValue2" class="select_category" @change="getSelectedValue2">
      <option v-for="item in categoryIDandName" :key="item.id" :value="item.id" class="option_category">
        {{ `${item.name}` }}
      </option>
    </select>

  </v-container>
</template>


<style scoped>
.select_category {
  width:    100%;
  height:   50px;
  margin:   10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  padding-left: 10px;
  appearance: none;
  background-color: white;
}
.select_category::after {
  content: "▼";
  font-size: 12px;
  position: absolute;
  right: 0;
  top: 0;
  z-index: 1;
  pointer-events: none;
  height: 50px;
}
.option_category {
  /* Nuevas confs */
  padding: 10px 15px;
  font-size: 18px;
}
.option_category:checked {
  background-color: #ddd;
}
</style>