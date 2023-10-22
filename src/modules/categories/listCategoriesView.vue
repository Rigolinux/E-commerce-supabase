<script setup lang="ts">
import {
  DxDataGrid,
  DxColumnFixing,
  DxSearchPanel,
  DxSelection,
  DxEditing,
  DxToolbar,
  DxItem,
  DxExport,
  DxPaging,
  // DxSorting,
  // DxColumn
} from 'devextreme-vue/data-grid';

import { GetCategories } from '../../vueutils/useCategories';
import { Workbook } from 'exceljs';
// import * as saveAs from 'file-saver';
import { saveAs } from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

import { 
  // DeleteData, 
  DeleteDataAndProducts 
} from '../../vueutils/UseTablesCategories';

import { ref } from 'vue';
import router from '../../router';


let category = ref([]);

GetCategories().then((data:any) => {
  data.sort((a:any, b:any) => a.id_categoria - b.id_categoria);
  category.value = data;
  console.log(category.value);
});

// Exportar a excel unicamente
const onExporting = (e: any) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Main sheet');

  exportDataGrid({
    component: e.component,
    worksheet,
    autoFilterEnabled: true
  }).then(() => {
    workbook.xlsx.writeBuffer().then((buffer: any) => {
      // saveAs.default(new Blob([buffer], { type: 'application/octet-stream' }), 'Lista_de_Categorias.xlsx');
      saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Lista_de_Categorias.xlsx');
    });
  });

  e.cancel = true;
}

// Crear una nueva categoria
const CreateCategory = () => {
  router.push({
    path: '/addCategory'
  })
}

// Editar/Actualizar una categoria
const UpdateCategory = (id: number) => {
  // Redireccionar a la ruta de editar categoria
  console.log(id);
  router.push({
    name: 'updateCategory',
    params: { id_categoria: id }
  });
  // router.push({
    // path: '/updateCategory',
    // query: { id: id }
  // })
}

// Eliminar una categoria
// const DeleteCategory = (id: number) => {
//   console.log(id);
  // DeleteData(id);
// }

// Eliminar una categoria y sus productos
const DeleteCategoryAndProducts = async(id: number) => {
  console.log(id);
  await DeleteDataAndProducts('categorias', id, 'id_categoria');
  alert('Se ha eliminado la categoria y sus productos');

  GetCategories().then((data:any) => {
    category.value = data;
    console.log(category.value);
  });
}



</script>

<template>
  <br>
  <v-container>
    <span class="v-span-title">Lista de categorías:</span>
    <br /><br />

    <div class="d-flex justify-center align-center">
      <DxDataGrid 
        id="dataGrid"
        :data-source="category"
        :key-expr="'id_categoria'"
        :allow-column-resizing="true"
        :column-auto-width="true"
        :allow-column-reordering="true"
        :width="'90%'"  
        :show-borders="true"
        @exporting="onExporting"

        @row-removed="DeleteCategoryAndProducts($event.data.id_categoria)"

        @editing-start="UpdateCategory($event.data.id_categoria)"
      >
      <!-- @row-removed="DeleteCategory($event.data.id_categoria)" -->

      <DxSelection mode="multiple" />
      <DxColumnFixing :enabled="true" />
      <DxSearchPanel :visible="true" />
      
      <DxEditing
        mode="popup"
          :allow-updating="true"
          :allow-adding="true"
          :allow-deleting="true"
      />
      
      <DxToolbar>
        <DxItem>
          <template #default>
            <button 
              @click="CreateCategory()" 
              class="custom-button"
            >
              <i class="dx-icon-add"></i>&nbsp; Crear Nuevo
            </button>
          </template>
        </DxItem>
        
        <DxItem name="exportButton" />
        <DxItem name="columnChooserButton" />
        <DxItem name="searchPanel" />
      </DxToolbar>
      
      <DxExport
        :enabled="true"
        :allow-export-selected-data="true"
      />
      
      <DxPaging 
        :enabled= "true" 
        :pageSize="6"
      />
      
      <!-- <DxSorting mode="multiple" />
      <DxColumn
        data-field="id_categoria"
        sortOrder="asc"
      /> -->

      </DxDataGrid>
    </div>
  </v-container>
</template>

<style scoped>
.v-span-title {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  text-transform: none;
  font-weight: bold;
}
.employee-photo {
  height: 140px;
  float: left;
  padding: 0 20px 20px 0;
}
.employee-notes {
  text-align: justify;
  white-space: normal;
}
#dataGrid {
  height: 500px;
}
#app-container {
  width: 900px;
  position: relative;
}
#selected-employee {
  position: absolute;
  left: 50%;
  transform: translate(-50%, 0);
}
.custom-button {
  display: inline-flex;
  align-items: center;
  padding: 8px;
  background-color: #f5f5f5;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}
/* .custom-button:hover {
  background-color: #e0e0e0;
} */
</style>