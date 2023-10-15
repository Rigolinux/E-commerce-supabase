import { InsertData, GetDataById  } from "@/vueutils/UseTablesProducts";
import { supabase } from "@/config/supbaseClient";
import { ref } from 'vue';

interface Product {
  id_categoria: number;
  nombre: string;
  marca: string;
  stock: number;
  valor_total_precio: number;
  precio_unitario: number;
  costo: number;
  // costo_unitario: number;
  valor_stock_promedio: number;
  descripcion: string;
  descuento: number;
  estado: boolean;
  imagen: string;
  // cantidad: number;
  // ganancia: number;
}

export const useProducts = () => {

  // Variable momentaria para ganancia
  const ganancia = 0;

  const Product = ref<Product>({
    nombre:                 '',
    descripcion:            '',
    marca:                  '',
    stock:                  0,
    costo:                  0,
    descuento:              0,
    id_categoria:           1,
    estado:                 true,
    valor_total_precio:     0,
    precio_unitario:        0,
    valor_stock_promedio:   0,
    imagen:                 '',
    // ganancia:               0,
  });

  // Funcion para leer los datos de la tabla productos
  const GetProducts = async () => {
    try {
      const { data, error } = await supabase.from('productos').select()
      if (error) {
        throw error
      }
      // console.log(data)
      return data
    } catch (error: any) {
      alert(error.message)
      return []
    };
  };

  // Funcion para leer un dato de la tabla productos por id
  const GetProductById = async (id: string | number) => {
    try {
      const data = await GetDataById('productos', id)
      return data
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Funcion para insertar datos en la tabla productos
  const InsertProduct = async (product: Product) => {
    try {
      const data = await InsertData( {
        id_categoria:           product.id_categoria,
        nombre:                 product.nombre,
        marca:                  product.marca,
        descripcion:            product.descripcion,
        estado:                 product.estado,
        imagen:                 product.imagen,
        stock:                  product.stock,
        costo:                  product.costo,
        descuento:              product.descuento,
        valor_total_precio:     product.valor_total_precio,
        precio_unitario:        product.precio_unitario,
        valor_stock_promedio:   product.valor_stock_promedio,
      }, 'productos')
      return data
    } catch (error: any) {
      alert(error.message)
    }
  }

  // Funcion para actualizar datos en la tabla productos
  // const UpdateProduct = async (product: Product) => {
  //   try {
  //     if (!product.id_categoria) {
  //       throw new Error('Product not found');
  //     }
  //     const data = await supabase.from('productos').update({
  //       id_categoria:           product.id_categoria,
  //       nombre:                 product.nombre,
  //       marca:                  product.marca,
  //       descripcion:            product.descripcion,
  //       estado:                 product.estado,
  //       imagen:                 product.imagen,
  //       stock:                  product.stock,
  //       costo:                  product.costo,
  //       descuento:              product.descuento,
  //       valor_total_precio:     product.valor_total_precio,
  //       precio_unitario:        product.precio_unitario,
  //       valor_stock_promedio:   product.valor_stock_promedio,
  //     }).match({ id_producto: product.id_producto })
  //     return data
  //   } catch (error: any) {
  //     alert(error.message)
  //   }
  // }

  return { 
    // Variables
    Product,
    ganancia,

    // Funciones
    GetProducts,
    GetProductById,
    InsertProduct,
    // UpdateProduct,

  }
}

export default useProducts;
