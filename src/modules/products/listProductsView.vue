<script setup lang="ts">
import {
  DxDataGrid,
  DxColumn,
  DxRequiredRule,
  DxColumnChooser,
  DxColumnFixing,
  DxFilterRow,
  DxSearchPanel,
  DxGroupPanel,
  DxSelection,
  DxSummary,
  DxGroupItem,
  DxEditing,
  DxGrouping,
  DxToolbar,
  DxItem,
  DxMasterDetail,
  DxExport,
  DxPaging
} from 'devextreme-vue/data-grid';
import { DxButton } from 'devextreme-vue/button';
import { GetProducts } from '@/vueutils/UseProducts';
import { Workbook } from 'exceljs';
import * as saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';

import { DeleteData } from '../../vueutils/UseTablesProducts';

import { ref } from 'vue';
import router from '../../router';

let products = ref([]);

GetProducts().then((data:any) => {
  products.value = data;
  console.log(products.value);
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
      saveAs.default(new Blob([buffer], { type: 'application/octet-stream' }), 'Lista_de_Productos.xlsx');
    });
  });

  e.cancel = true;
}

const CreateProduct = () => {
  // Redirreccionando a la vista de creación de productos
  router.push({
    path: '/addproduct',
  })
}

const UpdateProduct = (id: number) => {
  // Redirreccionando a la vista de actualizar productos
  // console.log(id);
  // router.push({
  //   path: `/updateproduct/${id}}`,
  //   query: { id: id }
  // })
  console.log(id);
  router.push({
    name: 'editProduct',
    params: { id_producto: id }
  });
}

const DeleteProduct = async(id: number) => {
  console.log(id);
  await DeleteData('productos', id, 'id_producto');
  alert('Producto eliminado correctamente');
  GetProducts().then((data:any) => {
    products.value = data;
    console.log(products.value);
  });
}

</script>

<template>
  <h1>Lista de productos</h1>
  <div class="d-flex justify-center align-center">
    <DxDataGrid 
      id="dataGrid"
      :data-source="products"
      :key-expr="'id_producto'"
      :allow-column-resizing="true"
      :column-auto-width="true"
      :allow-column-reordering="true"
      :width="'90%'"
      
      :show-borders="true"
      @exporting="onExporting"
      
      @row-removed="DeleteProduct($event.data.id_producto)"

      

      @editing-start="UpdateProduct($event.data.id_producto)"
    >

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
            @click="CreateProduct()" 
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

    </DxDataGrid>
  </div>
</template>

<style scoped>
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