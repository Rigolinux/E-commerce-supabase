<script lang="ts">

import { supabase } from '../../config/supbaseClient';
// import router from '../../router';
type Categories = any;

export default {
  
  data: () => ({
    categories: [] as Categories[],
  }),
  methods: {

    ProductosPorCategoria(id_categoria: number) {
      this.$router.push({
        path: `/productsByCategory/${id_categoria}`,
      })
      // Verificar el mensaje en la consola
      console.log('Parámetro enviado a la otra vista:', id_categoria);
    }
  },

  async mounted() {
    const { data, error } = await supabase.from('categorias').select('*');
    if (error) {
      console.error('Error fetching categories:', error);
    } else {
      this.categories = data.map(category => ({ ...category }));
      console.log('Categories:', data);
    }
  },
};
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row style="padding-top: 50px;">
        <v-col cols="12" sm="3" v-for="category in categories" :key="category.id_producto">
          <v-card height="250" align="center" flat outlined tile>
            <v-img :src="category.imagen" width="250" height="110" contain></v-img>
            <v-card-text class="mt-n1">
              <strong>
                {{category.nombre}}
              </strong>
            </v-card-text>
          
            <v-card-actions>
              <v-btn class="mx-auto category-available">
                <a 
                  class="category-available-text" 
                  @click="ProductosPorCategoria (category.id_categoria)"
                >
                  Ver Productos
                </a>
              </v-btn>
            </v-card-actions>

          </v-card>
        </v-col>
      </v-row>
      <v-divider></v-divider>
    </v-container>
  </v-app>
</template>

<style scoped>
.category-available {
  background-color: green;
  width: 150px;
}
.category-available-text {
  color: white !important;
  text-transform: none;
  font-family: 'Roboto', sans-serif;
}
.category-available:hover {
  color: transparent !important;
  transform: scale(1.15);
}
</style>