<script setup lang="ts">
import useProducts from '../../composables/useProducts';
import { UpdateData } from '../../vueutils/UseTablesProducts';
import { UpdateProductImg } from '../../vueutils/UseBucketProducts';
import { onMounted, ref } from 'vue';
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

const { Product: form, GetProductById } = useProducts();

const url                       = ref<string | null>(null);
const image                     = ref<Blob | null | File[] | any >(null);
const gananciaform              = ref<number>(0);
const oldStockRef               = ref<number>(0);
const oldValorStockPromedioRef  = ref<number>(0);

// Preview de la imagen
const PreviewImage = (e:any) => {
  image.value = e.target.files[0];
  url.value = URL.createObjectURL(e.target.files[0]);
};

// Cargar el producto cuando se monta el componente
const productId = ref(router.currentRoute.value.params.id_producto as any);
console.log('LA ID QUE LLEGO: ' + productId.value);

const productIDFINAL = parseInt(productId.value.toString());
console.log('LA ID QUE LLEGO final: ' + productIDFINAL);

const fetchProduct = async() => {
  const productData = await GetProductById(productId.value);
  if (productData && productData[0]) {
    form.value = productData[0];
    selectedValue2.value = productData[0].id_categoria;
    gananciaform.value = productData[0].precio_unitario - productData[0].costo;

    // Guardar los valores antiguos para hacer los cálculos en UpdateProduct
    oldStockRef.value               = productData[0].stock;
    oldValorStockPromedioRef.value  = productData[0].valor_stock_promedio;
  }
}

onMounted(fetchProduct); // Necesitarías importar onMounted de Vue

const UpdProduct = async() => {

  let newImagenUrl = null;

  const previousImagePath = form.value.imagen;

  if (image.value) {
    newImagenUrl = await UpdateProductImg(image.value, 'products_photos', previousImagePath);
  }

  if (newImagenUrl) {
    form.value.imagen = newImagenUrl;
  }

  const costo                       = form.value.costo;
  const costoMod                    = parseFloat(costo.toString());
  const gananciaMod                 = parseFloat(gananciaform.value.toString());
  const precioUnitario              = costoMod + gananciaMod;
  const stockNew                    = oldStockRef.value!;
  const stockNewMod                 = parseFloat(stockNew.toString());
  const stockNewFinal               = stockNewMod + form.value.stock;
  const valorStockPromedio          = form.value.stock * form.value.costo;
  const valorStockPromedioMod       = parseFloat(valorStockPromedio.toString());
  const valorStockPromedioNew       = oldValorStockPromedioRef.value!;
  const valorStockPromedioNewMod    = parseFloat(valorStockPromedioNew.toString());
  // const valorStockPromedioFinal  = (valorStockPromedioMod + valorStockPromedioNewMod) / (stockNewFinal);
  const valorStockPromedioFinal     = (valorStockPromedioMod + valorStockPromedioNewMod);
  const valorTotalPrecio            = precioUnitario - form.value.descuento;

  form.value.stock                  = stockNewFinal;
  form.value.valor_total_precio     = valorTotalPrecio;
  form.value.precio_unitario        = precioUnitario;
  form.value.valor_stock_promedio   = valorStockPromedioFinal;

  form.value.id_categoria           = selectedValue2.value;

  console.log(form.value);

  await UpdateData(form.value, 'productos', productIDFINAL);

  alert('Producto actualizado correctamente');
  
  router.push({
    path: '/listproducts',
  });
}

const cancelBtn = () => {
  router.push({
    path: '/listproducts',
  });
}

</script>

<template>
<v-container>
  <br />
  <span class="v-span-title">Actualizar Producto</span>
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
              <v-text-field v-model.number="form.stock" label="Stock" outlined full-width></v-text-field>
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
              1, 2, 3
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
                @click="UpdProduct"
              >
                Actualizar
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
</style>