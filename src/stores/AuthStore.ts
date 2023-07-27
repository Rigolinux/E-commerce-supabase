import { defineStore } from "pinia";

import { supabase } from "@/config/supbaseClient";



export const useAuthStore = defineStore({
    id: "auth",
    state: ():UserStore => {
        return {
            user: null,
            role: null
        }
    }
    ,

    actions: {
        async setupUser() {

        },
        async getRole() {
            const {data ,error} = await supabase.auth.getUser()
    
    if(error) {
        console.log(error)
        this.role = 'Not Authenticated'
    }

    if(data)
    {
        this.user = data.user
        const id = data.user?.id
        const resp = await supabase.rpc('get_claims', {uid: id });
        if(resp.error) {
        
            this.role = 'Error while getting user'
           
        }
        if(resp.data.Adminlevel)
        this.role = 'Admin'
        else
        this.role = 'User'
       
    }
        }

    }
});