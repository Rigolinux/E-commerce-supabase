
import { supabase } from '@/config/supbaseClient';
export const roleIdentifier =(to, from, next) => {
    
}

export const isAuthenicated = async(to:any, from:any, next:any) => {
    const {data} = await supabase.auth.getUser()
    console.log(data)
    if (data.user) {
        next()
    } else if(data.user == null)
    {
        next('/login')
    }
}