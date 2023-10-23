<script setup lang="ts">

// import useProducts from '../../composables/useProducts';
import useCategories from '../../composables/useCategories';
import { InsertData } from '../../vueutils/UseTablesCategories';
import { UploadCategoryImg } from '../../vueutils/UseBucketCategories';
import { ref, type Ref } from 'vue';
import router from '../../router';

// const { Product:form } = useProducts();
const { Category:form } = useCategories();

const url = ref<string | null>(null);
const image: Ref<Blob | null | File[] | any > = ref(null);

// Preview de la imagen
const PreviewImage = (e:any) => {
    console.log(e.target.files[0]);
    image.value = e.target.files[0];
  url.value = URL.createObjectURL(e.target.files[0]);
};

const CreateCategory = async() => {
  // Mandando los datos a la base de datos
  let url = null;
  if(image.value){
    url = await UploadCategoryImg(image.value, 'categories-photos');
  }
  if(url){
    form.value.imagen = url ;
  }
  
  // Insertando los datos en la tabla y recordando que el id es autoincrementable
  delete form.value.id_categoria;

  await InsertData(form.value, 'categorias');
  console.log(form.value);

  // Alert momentanio
  alert('Categoria agregada correctamente');

  // Redirreccionando a la vista lista de categorias
  router.push({
    path: '/listcategories',
  })
}

// Redireccionando en caso de cancelar
const cancelBtn = () => {
  // Redirreccionando a la vista lista de categorias
  router.push({
    path: '/listcategories',
  })
}

</script>

<template>
  <v-container>
    <br />
    <span class="v-span-title">Agregar Categoría:</span>
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
                <v-btn 
                  block color="primary"
                  @click="CreateCategory"
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