import { ref } from 'vue';
import { GetDataByParameter,InsertData, UpdateData } from "@/vueutils/UseTables";
import { supabase } from '@/config/supbaseClient';
import { formatDate } from '@/helpers/getFormatdate';



export const useUser = () => {

    const User = ref<User>({ 
        foto_de_perfil: '',
        nombre: '',
        apellido: '',
        email: '',
        
        sexo: '',
        no_dui: 0,
        direccion: '',
        telefono: 0,
      });

    const GetUser = async () => {
        try {
            const spdata =  await supabase.auth.getUser()
            
            if(!spdata.data.user?.email) return

            const data: any[] | undefined = await GetDataByParameter('perfiles','email',spdata.data.user?.email) ;
            if (data && data.length > 0) {
                User.value = data[0] as User;
            } else {
                User.value.email = spdata.data.user?.email
                User.value.fecha_de_nacimiento = formatDate(new Date())
                console.log(User.value)
               
            }
        } catch (error: any) {
            alert(error.message);
        }
    };

    const InsertUser = async (user: User) => {
        try {
            const data = await InsertData( {
                nombre: user.nombre,
                apellido: user.apellido,
                email: user.email,
                fecha_de_nacimiento: user.fecha_de_nacimiento,
                sexo: user.sexo,
                no_dui: user.no_dui,
                foto_de_perfil: user.foto_de_perfil,
                direccion: user.direccion,

            },'perfiles')
            
            return data
        } catch (error: any) {
            alert(error.message)
        }
    };

    const UpdateUser = async (user: User) => {
        try {

            if (!user.id_perfil) {
                throw new Error('User not found');
            }
            const data = await UpdateData( {
                nombre: user.nombre,
                apellido: user.apellido,
                fecha_de_nacimiento: user.fecha_de_nacimiento,
                sexo: user.sexo,
                no_dui: user.no_dui,
                foto_de_perfil: user.foto_de_perfil,
                direccion: user.direccion,

            },'perfiles',user.id_perfil)
            
            return data
        } catch (error: any) {
            alert(error.message)
        }
    };

    return {
        // Variables
        User,

        // Methods
        GetUser,
        InsertUser,
        UpdateUser,
    }
}


export default useUser;