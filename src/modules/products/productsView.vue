<script lang="ts">
import { supabase } from '../../config/supbaseClient';

interface Product {
  id_producto: number;
  nombre: string;
  marca: string;
  stock: number;
  costo_unitario: number;
  descripcion: string;
  imagen: string;
  loading: boolean;
}

export default {
  data: () => ({
    products: [] as Product[],
    loading: false,
    selection: 1,
  }),
  methods: {
    Detalles(productId: number) {
      this.$router.push({
        path: `/productDetail/${productId}`,
      })
      // Verificar el mensaje en la consola
      console.log('Parámetro enviado a la otra vista:', productId);
    }
  },

  async mounted() {
    const { data, error } = await supabase.from('productos').select('*');
    if (error) {
      console.error('Error fetching products:', error);
    } else {
      this.products = data.map(product => ({ ...product, loading: false }));
      console.log('Products:', data);
    }
  },
};
</script>

<template>
  <v-app>
    <v-container fluid>
      <v-row>
        <v-col cols="12" sm="3" v-for="product in products" :key="product.id_producto" style="padding-top: 50px;">
          <v-card height="350" align="center" flat outlined tile>
            <v-img :src="product.imagen" width="200" height="200" contain></v-img>
            <v-card-text class="mt-n1">
              <strong>
                {{product.nombre}}
              </strong>
            </v-card-text>
            <v-card-text class="mt-n4">
              <div class="h2-precio">
                $ {{ product.costo_unitario.toFixed(2) }}
              </div>
            </v-card-text>
          
            <v-card-actions>
              <v-btn 
                class="mx-auto" 
                :class="{
                  'stock-available': product.stock > 1,
                  'stock-not-available': product.stock === 0
                }"
                :disabled="product.stock === 1" 
                @click="product.stock > 1 ? Detalles(product.id_producto) : null"
              >
              <a class="stock-available-text">
                {{ product.stock > 1 ? 'Ver Detalles' : 'No Disponible' }}
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

.h2-precio {
  font-family: 'Roboto', sans-serif;
  font-weight: bold;
  color: #000000;
}

.stock-available {
  background-color: green;
  width: 150px;
}
.stock-available-text {
  color: white !important;
  text-transform: none;
  font-family: 'Roboto', sans-serif;
}
.stock-available:hover {
  color: transparent !important;
  transform: scale(1.15);
}
.stock-not-available {
  background-color: red;
  width: 150px;
}
.stock-not-available-text {
  color: white !important;
  text-transform: none;
  font-family: 'Roboto', sans-serif;
}
.stock-not-available:hover {
  color: transparent !important;
  /* transform: scale(1.15); */
}
</style>