<script lang="ts">
import { supabase } from '../../config/supbaseClient';

interface ProductCart {
  id_producto:            number;
  id_categoria:           number;
  nombre:                 string;
  marca:                  string;
  stock:                  number;
  valor_total_precio:     number;
  precio_unitario:        number;
  costo:                  number;
  costo_unitario:         number;
  descripcion:            string;
  descuento:              number;
  estado:                 string;
  imagen:                 string;
  cantidad:               number;
}

export default {
  data() {
    return {
      product: null as any,
      productId: null,
      // LocalStorage
      cart: [] as ProductCart[],
    }
  },
  created() {
    const productId = this.$route.params.id_producto as any;
    console.log('productId:', productId);
    this.getProduct(productId);

    // LocalStorage
    let datacart = localStorage.getItem('product-cart');
    if(datacart !== null) {
      this.cart = JSON.parse(datacart);
    }
  },
  methods: {
    async getProduct(productId: number) {
      try {
        const { data: product, error } = await supabase
          .from('productos')
          .select('*')
          .eq('id_producto', productId)
          .single();

        if (error) {
          console.error('Error cargando el producto:', error);
        } else {
          this.product = product;
          console.log('Product:', product);
        }
      } catch (e) {
        console.error('Error fetching product:', e);
      }
    },
    // Usando localStorage para guardar en consola el producto seleccionado
    addToCart(product: ProductCart) {
      // Asignamos un valor de 1 a la cantidad de productos
      this.product.cantidad = 1;
      this.cart.push(product);
      localStorage.setItem("product-cart", JSON.stringify(this.cart));
    },
  }
}
</script>

<template>
  <br>
  <!-- <v-container class="bg-surface-variant mb-6"> -->
  <v-container>
    <v-row align="center" no-gutters>
      <v-col cols="12" sm="6" class="image-container">
        <v-img style="max-width: 75%; max-height: 75%" :src="product?.imagen" />
      </v-col>
      <!-- Informacion -->
      <v-col cols="12" sm="6">
        <v-icon left class="v-icon-det">mdi-information</v-icon>
        <span class="v-icon-det-text">
          Información del producto:
        </span>
        <!-- Nombre del producto -->
        <v-col cols="12" sm="6">
          <h2 class="Title-text"> &nbsp; &nbsp; {{ product?.nombre }} :</h2>
        </v-col>
        <!-- Descripcion -->
        <v-col cols="12" sm="6">
          <div class="Subtitle-text">
            {{ product?.descripcion }}
          </div>
        </v-col>
        <!-- Precio -->
        <v-col cols="12" sm="6">
          <div class="Subtitle-text-1 price-container">
            <span>
              &nbsp; &nbsp; $
              <!-- {{ 
                Math.floor(product?.['Costo Unitario'])
              }} -->
              {{ 
                Math.floor(product?.costo_unitario)
              }}
            </span>
            <span class="decimal-digits">
              <!-- {{ ' ' + (product?.['Costo Unitario'] % 1).toFixed(2).substring(2) }} -->
              {{ ' .' + (product?.costo_unitario % 1).toFixed(2).substring(2) }}
            </span>
          </div>
        </v-col>
        <!-- Boton Añadir a carrito -->
        <v-col cols="12" sm="6">
          <div>
            <v-btn class="mx-auto btnclass-cart" @click="addToCart(product)">
              <v-icon left class="v-icon-buy">mdi-cart-heart</v-icon>
              <span class="v-icon-buy-text">
                &nbsp; Añadir al carrito
              </span>
            </v-btn>
          </div>
        </v-col>
        <!-- Detalles -->
        <v-col cols="12">
          <v-icon left class="v-icon-det">mdi-chevron-down</v-icon>
            <span class="v-icon-det-text">
              Detalles
            </span>
            <!-- Marca -->
            <v-col cols="12">
              <v-icon left class="v-icon-det">mdi-star-three-points</v-icon>
              <span class="Subtitle-text-black">
                &nbsp; &nbsp; Marca: {{ product?.marca }}
              </span>
            </v-col>
            <!-- Descuento -->
            <v-col cols="12">
              <v-icon left class="v-icon-det">mdi-star-three-points</v-icon>
              <span class="Subtitle-text-black">
                &nbsp; &nbsp; {{ product?.descuento > 0 ? 'Descuento: $' + product?.descuento.toFixed(2) : 'Descuento: ' + 'No aplicable' }}
              </span>
            </v-col>
            <!-- Descuento -->
            <v-col cols="12">
              <v-icon left class="v-icon-det">mdi-star-three-points</v-icon>
              <span class="Subtitle-text-black">
                &nbsp; &nbsp; Estado: {{ product?.estado }}
              </span>
            </v-col>
            <!-- Metodos de pago -->
            <v-col cols="12">
              <v-icon left class="v-icon-det">mdi-star-three-points</v-icon>
              <span class="Subtitle-text-black">
                &nbsp; &nbsp; Metodos de pago:
              </span>
              <br /><br /><br />
              <span style="display: flex;">
                <v-img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" 
                  class="d-none d-md-inline" 
                  max-width="275px" 
                  max-height="75px" 
                />
                <v-img src="https://bancos.vip/wp-content/uploads/2020/10/filebanco-agricola-sv-png-wikimedia-commons.png" 
                  class="d-inline d-md-none ml-5" 
                  max-width="275px" 
                  max-height="75px" 
                />
              </span>
            </v-col>
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: white;
}
.v-icon-buy {
  color: rgb(64, 136, 71);
}
.v-icon-buy-text {
  color: rgb(64, 136, 71);
  text-transform: none;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}
.btnclass-cart:hover {
  color: transparent !important;
  transform: scale(1.15);
}
.v-icon-det {
  color: rgb(64, 164, 155);
}
.v-icon-det-text {
  color: rgb(64, 164, 155);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}
.Title-text {
  color: rgb(64, 136, 71);
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}
.Subtitle-text {
  color: rgb(64, 164, 155);
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}
.Subtitle-text-1 {
  color: rgb(64, 136, 71);
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
}
.Subtitle-text-black {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 16px;
}
.price-container {
  display: inline-block;
  font-size: 24px;
}
.decimal-digits {
  font-size: 18px;
  vertical-align: super;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>