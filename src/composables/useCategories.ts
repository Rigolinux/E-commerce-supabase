import { InsertData, GetDataById } from "@/vueutils/UseTablesCategories"
import { supabase } from "../config/supbaseClient"
import { ref } from "vue"

export const useCategories = () => {

  const Category = ref<AddCategoryAndUpdate>({
    // El id_categporia debe de autoincrementarse en la base de datos
    nombre:       '',
    descripcion:  '',
    imagen:       '',
  });

  const CategoryZZZ = ref<ZZZ>({
    // El id_categporia debe de autoincrementarse en la base de datos
    id_categoria: 0,
    nombre:       '',
    descripcion:  '',
    imagen:       '',
  });

  // Funcion para leer los datos de la tabla categorias
  const GetCategories = async () => {
    try {
      const { data, error } = await supabase.from('categorias').select()
      if (error) {
        throw error
      }
      //console.log(data)
      return data
    } catch (error: any) {
      alert(error.message)
      return[]
    };
  };

  // Funcion para leer un dato de la tabla categorias por id
  const GetCategoryById = async (id: string | number) => {
    try {
      const data = await GetDataById('categorias', id)
      return data
    } catch (error: any) {
      alert(error.message)
    };
  };

  // Funcion para insertar datos en la tabla categorias
  const InsertCategory = async (category: Categories) => {
    try {
      const data = await InsertData( {
        nombre:       category.nombre,
        descripcion:  category.descripcion,
        imagen:       category.imagen,
      }, 'categorias')
      return data
    } catch (error: any) {
      alert(error.message)
    }
  }

  return {
    Category,
    CategoryZZZ,
    
    GetCategories,
    GetCategoryById,
    InsertCategory,

  }
}

export default useCategories;
