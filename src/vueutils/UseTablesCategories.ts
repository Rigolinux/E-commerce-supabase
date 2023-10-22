import { supabase } from "@/config/supbaseClient";

// Funcion para leer los datos de la tabla categorias
async function GetData(table: string) {

  try {
    const { data, error } = await supabase.from(table).select()
    if (error) {
      throw error
    }
    console.log(data)
    return data
  } catch (error: any) {
    alert(error.message)
    return[]
  }
}

// Funcion para traer Id_categoria y nombre de la tabla categorias
async function GetIdAndNameCategories(table: string) {
  try {
    const { data, error } = await supabase.from(table).select('id_categoria, nombre')
    if (error) {
      throw error
    }
    console.log(data)
    return data
  } catch (error: any) {
    alert(error.message)
    return[]
  }
}

// Funcion para leer los datos de la tabla categorias por id
async function GetDataById(table: string, id: string | number, column: string = 'id_categoria') {
  try {
    const { data, error } = await supabase.from(table).select().match({ [column]: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

// Funcion para insertar datos en la tabla categorias
async function InsertData(params: object, table: string) {
  try {
    const { data, error } = await supabase.from(table).insert(params).select()
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

// Funcion para actualizar datos en la tabla categorias
async function UpdateData(params: object, table: string, id: string | number, column: string = 'id_categoria') {
  try {
    const { data, error } = await supabase.from(table).update(params).match({ [column]: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

// Funcion para eliminar datos en la tabla categorias
async function DeleteData(table: string, id: string | number, column: string = 'id_categoria') {
  try {
    const { data, error } = await supabase.from(table).delete().match({ [column]: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

// Funcion para eliminar datos en la tabla categorias y los productos de la tabla productos que tengan el id_categoria
async function DeleteDataAndProducts(table: string, id: string | number, column: string = 'id_categoria') {
  try {

    // Eliminar los productos que tengan el id_categoria
    const { data: productData, error: productError } = await supabase.from('productos').delete().match({ [column]: id })
    if (productError) {
      console.log('Error al eliminar los productos asociados a la categoria', productError)
      throw productError
    }

    // Eliminar la categoria
    const { data: categoryData, error: categoryError } = await supabase.from(table).delete().match({ [column]: id })
    if (categoryError) {
      console.log('Error al eliminar la categoria', categoryError)
      throw categoryError
    }

    return {
      categoryData,
      productData
    }

  } catch (error: any) {
    alert(error.message)
  }
}

export {
  GetData,

  GetIdAndNameCategories,

  GetDataById,
  InsertData,
  UpdateData,
  DeleteData,
  DeleteDataAndProducts,
  
}
