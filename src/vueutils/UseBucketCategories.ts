import { supabase } from "@/config/supbaseClient";

async function UploadCategoryImg (file: File, bucketName: string) {
  try {
    // rename file for random name
     const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `public/${fileName}`
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
      })
    if (error) {
      throw error
    }
    const PublicUrl = await GetUrlImage(data.path, bucketName)
    return PublicUrl?.publicUrl
  } catch (error: any) {
    alert(error.message)
  }
}

// Actualizar imagen y eliminar la anterior

async function UpdateCategoryImg(file: File, bucketName: string, previousImagePath: string) {
  try {

    // Subir nueva imagen
    const fileExt = file.name.split('.').pop()
    const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`
    const filePath = `public/${fileName}`
    const { data, error } = await supabase.storage
      .from(bucketName)
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      })

    if (error) {
      throw error
    }

    // Obtener URL pública de la nueva imagen
    const PublicUrl = await GetUrlImage(data.path, bucketName)
    const newImageUrl = PublicUrl?.publicUrl

    // Eliminar imagen anterior
    const { error: deleteError } = await supabase.storage
      .from(bucketName)
      .remove([previousImagePath])

    if (deleteError) {
      throw deleteError
    }

    return newImageUrl

  } catch (error: any) {
    alert(error.message)
  }
}


async function GetUrlImage(filePath: string, bucketName: string) {
  try {
    const { data } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

export {
  UploadCategoryImg,
  UpdateCategoryImg,
  
}