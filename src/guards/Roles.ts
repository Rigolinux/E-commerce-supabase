
import { supabase } from '@/config/supbaseClient';


export const isAuthenicated = async(_to:any, _from:any, next:any) => {
    const {data} = await supabase.auth.getUser()
    console.log(data)
    if (data.user) {
        next()
    } else if(data.user == null)
    {
        next('/login')
    }
}

export const isAdmin = async(_to:any, _from:any, next:any) => {


    const {data,error} = await supabase.auth.getUser()
    
    if(error) {
        console.log(error)
        next('/login')
    }

    if(data)
    {
        const { data, error } = await supabase.rpc('get_claims', {uid:'9cc7c223-752f-4f7d-b3a2-1babb3bc5f5c'});
        if(error) {
            console.log(error)
            next('/login')
        }
        if(data.Adminlevel)
        next()
        else
        next('/login')
    }
}