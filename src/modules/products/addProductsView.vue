<script setup lang="ts">
import useProducts from '../../composables/useProducts';
import { InsertData } from '../../vueutils/UseTablesProducts';
import { UploadProductImg } from '../../vueutils/UseBucketProducts';
import { ref, type Ref } from 'vue';
import router from '../../router';

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

          <v-select
            :items="[
              1, 2, 3
            ]"
            label="Categoría del producto"
            v-model="form.id_categoria" 
            outlined
            full-width
          ></v-select>

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
</style>