import { supabase } from "@/config/supbaseClient";

// Funcion para leer los datos de la tabla productos
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
    return []
  }
}

// Funcion para leer un dato de la tabla productos por id
async function GetDataById(table: string, id: string | number, column: string = 'id_producto') {
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

// Funcion para insertar datos en la tabla productos
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

// Funcion para actualizar datos en la tabla productos
async function UpdateData(params: object, table: string, id: string | number, column: string = 'id_producto') {
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

// Funcion para eliminar datos en la tabla productos
async function DeleteData(table: string, id: string | number, column: string = 'id_producto') {
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

// async function DeleteData(table: string, id: string) {
//   try {
//     const { data, error } = await supabase.from(table).delete().match({ id: id })
//     if (error) {
//       throw error
//     }
//     return data
//   } catch (error: any) {
//     alert(error.message)
//   }
// }


export { 
  GetData,
  GetDataById,
  InsertData,
  UpdateData,
  DeleteData,

}