<script setup lang="ts">
import { InsertData } from '@/vueutils/UseTables';
import TheWelcome from '../components/TheWelcome.vue'


const genPurchase = async() => {
  const products:ProductCart[] =  JSON.parse(localStorage.getItem('product-cart') || '[]');

  if (products.length > 0) {
    let sum:number = 0;

    products.forEach((product) => {
      sum += product.cantidad * product.costo
    });

    sum = parseFloat(sum.toFixed(2));
    
    const purchaseH: SalesHeader = {
    total:                sum,
    descuento:             0,
    id_perfil:             1,
    direccion:             'Calle 1',
    telefono:              '1234567890',
    estado:                'Completo',
    referencia:            'trs 1',
    metodo_de_pago:        'Efectivo',
    }

    const data = await InsertData(purchaseH, 'ventas');
    
    if(data){
      const purcharseHDB: SalesHeader = data[0];
      let ArrayProducts: ProductCart[] = [];
      products.forEach((product) => {
        const productDb: any = {
          id_ventas: purcharseHDB.id_ventas,
          cantidad: product.cantidad, 
          id_productos: product.id_producto,
          nombre: product.nombre,
          subtotal: product.costo,
          descuento: 0,
          total: product.cantidad * product.costo
        }
        ArrayProducts.push(productDb);
      });

      const data2 = await InsertData(ArrayProducts, 'detalle_venta');

      console.log(data2);
    }
    //renombrar sub total - costo o precio
    //borrar trnasaccion
    //borrar localstorage
  } 
}


</script>

<template>
  <main>
    <v-btn
      @click.prevent="genPurchase"
    >
      Generate a purcharse
    </v-btn>
    <TheWelcome />
  </main>
</template>
