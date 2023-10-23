<script setup lang="ts">
import useProducts from '../../composables/useProducts';
import { InsertData } from '../../vueutils/UseTablesProducts';
import { UploadProductImg } from '../../vueutils/UseBucketProducts';
import { ref, type Ref } from 'vue';
import router from '../../router';

// ==================== NUEVO ====================

import { GetIdAndName } from '../../vueutils/useCategories';

let selectedValue2 = ref<number>(0);
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



const { Product:form } = useProducts();
const url = ref<string | null>(null);
const image: Ref<Blob | null | File[] | any > = ref(null);

// Preview de la imagen
const PreviewImage = (e:any) => {
    console.log(e.target.files[0]);
    image.value = e.target.files[0];
  url.value = URL.createObjectURL(e.target.files[0]);
};

const gananciaform = ref<number>(0);

const CreateProduct = async() => {
  // Mandando los datos a la base de datos
  let url = null;
  if(image.value){
    url = await UploadProductImg(image.value, 'products_photos');
  }
  if(url){
    form.value.imagen = url ;
  }
  // Realizando calculos
  const costo               = form.value.costo;                           // Costo del producto
  const costoMod: number = parseFloat(costo.toString());
  const gananciaMod: number = parseFloat(gananciaform.value.toString());
  const precioUnitario      = costoMod + gananciaMod;                     // Precio normal del producto
  const valorTotalPrecio    = precioUnitario - form.value.descuento;      // Precio para el cliente
  const valorStockPromedio  = form.value.stock * form.value.costo;        // Valor del stock

  form.value.precio_unitario      = precioUnitario;
  form.value.valor_total_precio   = valorTotalPrecio;
  form.value.valor_stock_promedio = valorStockPromedio;

  form.value.id_categoria = selectedValue2.value;

  await InsertData( form.value, 'productos');
  
  // await InsertData( form.value, 'productos');
  console.log(form.value);

  // Alert momentanio
  alert('Producto agregado correctamente');

  // Redirreccionando a la vista lista de productos
  router.push({
    path: '/listproducts',
  })
}

// Redireccionando en caso de cancelar
const cancelBtn = () => {
  // Redirreccionando a la vista lista de productos
  router.push({
    path: '/listproducts',
  })
}

</script>

<template>
<v-container>
  <br />
  <span class="v-span-title">Agregar Producto</span>
  <br /><br /><br /><br />
  <div>
    <v-row>
      <v-col cols="12" md="4">

        <div>
          <div class="d-flex flex-column align-center">
            <v-img
              :src="url ?? form.imagen"
              width="200"
              />
          </div>
          <br />
          <v-file-input
            @change="PreviewImage"
            accept="image/png, image/jpeg, image/bmp"
            prepend-icon="mdi-camera"
            label="Agregar imagen"
          >
          </v-file-input>
        </div>

      </v-col>
      <v-col cols="12" md="8">
        <div>
          <v-text-field v-model="form.nombre" label="Nombre" outlined full-width></v-text-field>
          <v-text-field v-model="form.descripcion" label="Descripcion" outlined full-width></v-text-field>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.marca" label="Marca" outlined full-width></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.stock" label="Stock" outlined full-width></v-text-field>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-text-field v-model="form.costo" label="Precio" prefix="$" outlined full-width></v-text-field>
            </v-col>
            <v-col cols="12" md="6">
              <v-text-field v-model="gananciaform" label="Ganancia" prefix="$" outlined full-width></v-text-field>
            </v-col>
          </v-row>

          <v-text-field v-model="form.descuento" label="Descuento" prefix="$" outlined full-width></v-text-field>

          <!-- <v-select
            :items="[
              1, 2, 3, 4, 5, 6
            ]"
            label="Categoría del producto"
            v-model="form.id_categoria" 
            outlined
            full-width
          ></v-select> -->

          <select v-model="selectedValue2" class="select_category" @change="getSelectedValue2">
            <option v-for="item in categoryIDandName" :key="item.id" :value="item.id" class="option_category">
              {{ `${item.name}` }}
            </option>
          </select>

          <v-switch
            v-model="form.estado"
            label="Visible en mi tienda"
            color="green"
            inset
          ></v-switch>

          <v-row>
            <v-col cols="12" md="6">
              <v-btn 
                block color="primary"
                @click="CreateProduct"
              >
                Guardar
              </v-btn>
            </v-col>
            <v-col cols="12" md="6">
              <v-btn block color="grey lighten-1"  @click="cancelBtn()" >Cancelar</v-btn>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </div>
</v-container>
</template>

<style>
.v-span-title {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  text-transform: none;
  font-weight: bold;
}

/* ==================== NUEVO ==================== */
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
/* =============================================== */

</style>