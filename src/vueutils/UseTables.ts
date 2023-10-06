import { supabase } from '@/config/supbaseClient'

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

async function UpdateData(params: object, table: string, id: string | number) {
  try {
    const { data, error } = await supabase.from(table).update(params).match({ id: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

async function DeleteData(table: string, id: string) {
  try {
    const { data, error } = await supabase.from(table).delete().match({ id: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

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
  }
}

async function GetDataById(table: string, id: string) {
  try {
    const { data, error } = await supabase.from(table).select().match({ id: id })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

async function GetDataByParameter(table: string, name: string, value: string) {
  try {
    const { data, error } = await supabase.from(table).select().match({ [name]: value }).limit(1)
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

async function GetDataByColumn(table: string, column: string, value: string) {
  try {
    const { data, error } = await supabase
      .from(table)
      .select()
      .match({ [column]: value })
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

export { InsertData, UpdateData, DeleteData, GetData, GetDataById, GetDataByColumn, GetDataByParameter }
