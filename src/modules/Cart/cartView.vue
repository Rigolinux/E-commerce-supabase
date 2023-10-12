<script lang="ts">

interface ProductCartView {
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
      cart: [] as ProductCartView[],
    };
  },
  created() {
    // Cargando el carrito desde el LocalStorage
    let datacart = localStorage.getItem('product-cart');
    if(datacart !== null) {
      this.cart = JSON.parse(datacart);
    }
  },
  methods: {
    calculateSubTotal() {
      return this.cart.reduce((total, item) => total + item.precio_unitario * item.cantidad, 0);
    },
    calculateDiscount() {
      return this.cart.reduce((total, item) => total + item.descuento * item.cantidad, 0);
    },
    calculateTotal() {
      
    },
    // Eliminar un producto del carrito por su indice en el array
    removeFromCart(index: number) {
      this.cart.splice(index, 1);
      localStorage.setItem('product-cart', JSON.stringify(this.cart));
    },
    // Actualizar la cantidad de un producto en el carrito por su indice en el array
    updateCart(product: any, index: number) {

      // Validar que la cantidad no sea menor a 1 y que no sea mayor al stock
      if (product.cantidad > 0) {
        if (product.cantidad <= product.stock) {
          alert('Se actualizo la cantidad');
          this.cart[index].cantidad = product.cantidad;
          localStorage.setItem('product-cart', JSON.stringify(this.cart));
        } else {
          alert('No se puede actualizar la cantidad, no hay suficiente stock');
          this.cart[index].cantidad = 1;
        }
      } else {
        alert('No se puede actualizar la cantidad a 0');
        this.cart[index].cantidad = 1;
      }
    },
    // Metodo de pago por paypal
    paypalPayment() {
      console.log('paypalPayment');
      console.log('this.cart:', this.cart);
    },
    // Metodo de pago por wompy
    wompyPayment() {
      console.log('wompyPayment');
      console.log('this.cart:', this.cart);
    },
  },
};
</script>

<template>
  <br>
  <v-container>
    <span class="v-span-title">Mi Carretilla</span>
    <br /><br /><br /><br />
    <v-row>
      <v-col cols="12" sm="8">
        <v-simple-table>
           <template v-slot:default>
            <tbody>
              <tr>
                <td class="table-container-left">
                  <span class="div-titles-text-left">Mi Carretilla</span>
                </td>
                <td class="spacer"></td>
                <td class="table-container-right">
                  <v-icon left class="div-titles-btn">mdi-arrow-left</v-icon>
                  <a class="div-titles-text-right" @click="$router.push('/products')">
                    Continuar Comprando
                  </a>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <v-col cols="12" sm="8">
        <v-simple-table>
          <template v-slot:default>
            <tbody>
              <tr v-for="(product, index) in cart" :key="index">
                <td style="width: 20%;">
                  <!-- <v-img :src="product.imagen" width="100px" height="100px" contain></v-img> -->
                  <v-img class="centered-image" :src="product.imagen" style="max-width: 75%; max-height: 75%;" contain></v-img>
                </td>
                <td style="width: 40%;">
                  <div>
                    {{ product.nombre }}
                    <br>
                    <!-- $ {{ product['Precio Unitario'].toFixed(2) }} -->
                    $ {{ product.precio_unitario.toFixed(2) }}
                  </div>
                </td>
                <td style="width: 35%;">
                  <div>
                    <v-text-field v-model="product.cantidad" type="number" label="Cantidad" variant="underlined" min="1" />
                  </div>
                </td>
                &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                <td class="text-right">
                  <div>
                    <v-btn @click="removeFromCart(index)" class="v-btn-delete">
                      <v-icon class="v-btn-delete-icon">mdi-delete</v-icon>
                    </v-btn>
                    <v-btn @click="updateCart(product, index)" class="v-btn-update">
                      <v-icon class="v-btn-update-icon">mdi-autorenew</v-icon>
                    </v-btn>
                  </div>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-col>

      <!-- Columna del resumen de compra -->
      <v-col cols="12" sm="4">
        <v-card>
          <v-card-title class="v-card-title">
            <div class="div-titles">
              Resumen de la Orden
            </div>
            <div class="div-calTotal">
              Sub-Total &nbsp; : $ {{ calculateSubTotal().toFixed(2) }}
              <br>
              Descuento : $ {{ calculateDiscount().toFixed(2) }}
            </div>
            <div class="div-total">
              <!-- $ {{ calculateTotal().toFixed(2) }} -->
              $ {{ (calculateSubTotal() - calculateDiscount()).toFixed(2) }}
            </div>
            <v-btn @click="paypalPayment" dark block class="v-btn-paypal">
              <v-icon left>mdi-paypal</v-icon>
              Pagar con PayPal
            </v-btn>
            <v-btn @click="paypalPayment" dark block class="v-btn-wompy">
              <v-icon left>mdi-paypal</v-icon>
              Pagar con Wompy
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
.v-container {
  background-color: white;
  color: black;
}
.v-span-title {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 32px;
  text-transform: none;
  font-weight: bold;
}
.v-card-title {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  text-transform: bold;
}
.v-card-subtitle {
  color: black;
  font-family: 'Roboto', sans-serif;
  font-size: 20px;
  text-transform: none;
  /* text-transform: bold; */
}
.v-btn-delete {
  margin: 2px;
  background-color: white !important;
}
.v-btn-delete-icon {
  color: red !important;
}
.v-btn-delete:hover {
  color: transparent !important;
  transform: scale(1.15);
}
.v-btn-update {
  margin: 2px;
  background-color: white !important;
}
.v-btn-update-icon {
  color: darkblue !important;
}
.v-btn-update:hover {
  color: transparent !important;
  transform: scale(1.15);
}
.div-calTotal {
  color: black;
  margin-top: 20px;
  font-size: 16px;
}
.div-total {
  color: black;
  margin-top: 50px;
  margin-bottom: 50px;
  font-size: 30px;
  text-align: center;
}
.v-btn-paypal {
  background-color: blue;
  margin-bottom: 10px;
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.v-btn-wompy {
  background-color: brown;
  color: white;
  font-weight: bold;
  text-decoration: none;
}
.v-btn-paypal:hover, .v-btn-wompy:hover {
  color: white !important;
  transform: scale(1.05);
}
.centered-image {
  display: block;
  margin-left: auto;
  margin-right: auto;
}
.div-titles {
  /* background-color: rgb(247, 247, 247); */
  text-align: center;
  font-size: 20px;
  font-weight: bold;
}
.table-container-left, .table-container-right {
  width: 100%;
}
.spacer {
  width: 80%;
}
.table-container-left {
  text-align: left;
  font-size: 20px;
  font-weight: bold;
}
.table-container-right {
  color: rgb(79, 103, 241);
  text-align: right;
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  white-space: nowrap;
}
.div-titles-text-left {
  font-size: 20px;
  font-weight: bold;
}
.div-titles-text-right {
  color: rgb(79, 103, 241);
  font-size: 20px;
  font-weight: bold;
  cursor: pointer;
}
.div-titles-btn {
  color: rgb(79, 103, 241);
  font-weight: bold;
  cursor: pointer;
    /* margin-right: 10px; */
}
.table-container-left, .div-titles-text-left {
  font-size: 22px;
}
.table-container-right:hover {
  color: transparent !important;
  transform: scale(1.15);
  transition: transform 0.5s;
}
@media (max-width: 768px) {
  .table-container-left,
  .div-titles-text-right {
    font-size: 18px;
  }
}
@media (max-width: 576px) {
  .table-container-left,
  .div-titles-text-right {
    font-size: 16px;
  }
}
</style>