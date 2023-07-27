
import { supabase } from '@/config/supbaseClient';


export const isAuthenicated = async(_to:any, _from:any, next:any) => {
    const {data} = await supabase.auth.getUser()
    
    if(data.user == null)
    {
        next('/login')
    }
    if (data.user) {
        next()
    } 
}

export const isAdmin = async(_to:any, _from:any, next:any) => {


    const {data ,error} = await supabase.auth.getUser()
    
    if(error) {
        console.log(error)
        next('/login')
    }

    if(data)
    {
        const id = data.user?.id
        const resp = await supabase.rpc('get_claims', {uid: id });
        if(resp.error) {
            
            next('/login')
        }
        if(resp.data.Adminlevel)
        next()
        else
        next('/login')
    }
}

export const requierAuth = async(_to:any, _from:any, next:any) => {
    const {data} = await supabase.auth.getUser()
    console.log(data)

    if(data.user == null)
    {
        next()
    }
    if (data.user) {
        
        next('/')
    }  
}