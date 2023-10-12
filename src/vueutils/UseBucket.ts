
import { supabase } from '@/config/supbaseClient';


async function UploadProfileImg (file: File, bucketName: string) {
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

async function DeleteProfileImg (filePath: string[]) {
  try {
    // rename file for random name
     
    const { data, error } = await supabase.storage
      .from('profile_photos')
      .remove(filePath)
    if (error) {
      throw error
    }
    return data
  } catch (error: any) {
    alert(error.message)
  }
}

async function GetUrlImage(filePath: string, bucketName: string) {
  try {
    // rename file for random name
     
    const { data } = await supabase.storage
      .from(bucketName)
      .getPublicUrl(filePath)
    return data
  } catch (error: any) {
    alert(error.message)
  }
}


export { UploadProfileImg, DeleteProfileImg }