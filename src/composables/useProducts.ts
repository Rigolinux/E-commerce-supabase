import { InsertData, GetDataById  } from "@/vueutils/UseTablesProducts";
import { supabase } from "@/config/supbaseClient";
import { ref } from 'vue';

export const useProducts = () => {
  // Variable momentaria para ganancia
  const ganancia = 0;

  const Product = ref<AddProductAndUpdate>({
    id_categoria:           1,
    nombre:                 '',
    marca:                  '',
    stock:                  0,
    valor_total_precio:     0,
    precio_unitario:        0,
    costo:                  0,
    valor_stock_promedio:   0,
    descripcion:            '',
    descuento:              0,
    estado:                 true,
    imagen:                 '',
  });
  // nombre:                 '',
  // descripcion:            '',
  // marca:                  '',
  // stock:                  0,
  // costo:                  0,
  // descuento:              0,
  // id_categoria:           1,
  // estado:                 true,
  // valor_total_precio:     0,
  // precio_unitario:        0,
  // valor_stock_promedio:   0,
  // imagen:                 '',

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

  return { 
    // Variables
    Product,
    ganancia,

    // Funciones
    GetProducts,
    GetProductById,
    InsertProduct,

  }
}

export default useProducts;
